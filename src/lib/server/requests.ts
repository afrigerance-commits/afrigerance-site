import "server-only";

import type postgres from "postgres";
import { eventLabels, notificationEmail } from "@/content/admin";
import type { RequestRecord } from "@/lib/requests/records";
import type {
  NotificationStatus,
  RequestStatus,
  RequestType,
} from "@/lib/requests/types";
import { requireAdmin } from "./auth";
import { getSql, isUuid, requireSql } from "./db";
import { getMailConfig, sendMail } from "./mailer";
import { formatNotificationEmail } from "./notifications";

/**
 * Accès aux demandes enregistrées.
 * Les fonctions « admin » vérifient elles-mêmes la connexion : aucune donnée ne sort sans session valide.
 */

export type RequestRow = {
  id: string;
  reference: string;
  type: RequestType;
  status: RequestStatus;
  answers: unknown;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  summary: string;
  notification_status: NotificationStatus;
  notification_error: string | null;
  notification_attempts: number;
  notification_claimed_at: Date | null;
  notified_at: Date | null;
  received_at: Date;
  updated_at: Date;
};

export type RequestEvent = {
  id: string;
  occurred_at: Date;
  actor: string;
  kind: "created" | "status_changed" | "notification_sent" | "notification_failed";
  detail: string | null;
};

/** Délai de grâce avant de considérer une notification « en attente » comme non envoyée. */
const NOTIFICATION_GRACE = "2 minutes";

// ---------------------------------------------------------------------------
// Côté public : enregistrement d'une demande
// ---------------------------------------------------------------------------

/** Limites anti-abus par connexion (empreinte IP). */
const RATE_LIMITS = [
  { window: "10 minutes", max: 5 },
  { window: "24 hours", max: 20 },
] as const;

export async function findReferenceByKey(sql: postgres.Sql, key: string): Promise<string | null> {
  const rows = await sql<{ reference: string }[]>`
    SELECT reference FROM requests WHERE idempotency_key = ${key}`;
  return rows[0]?.reference ?? null;
}

export async function isRateLimited(sql: postgres.Sql, ipHash: string): Promise<boolean> {
  for (const limit of RATE_LIMITS) {
    const [{ count }] = await sql<{ count: number }[]>`
      SELECT count(*)::int AS count FROM requests
      WHERE ip_hash = ${ipHash} AND received_at > now() - ${limit.window}::interval`;
    if (count >= limit.max) return true;
  }
  return false;
}

type NewRequest = {
  type: RequestType;
  reference: string;
  record: RequestRecord;
  idempotencyKey: string;
  ipHash: string | null;
};

/**
 * Enregistre la demande et son premier événement dans une même transaction.
 * Si la même clé a déjà été enregistrée (double clic, nouvel essai), renvoie la demande existante.
 */
export async function insertRequest(
  sql: postgres.Sql,
  input: NewRequest,
): Promise<{ id: string; reference: string; duplicate: boolean }> {
  return sql.begin(async (tx) => {
    const { record } = input;
    const inserted = await tx<{ id: string; reference: string }[]>`
      INSERT INTO requests (
        reference, type, answers, name, company, email, phone, summary, idempotency_key, ip_hash,
        notification_claimed_at
      ) VALUES (
        ${input.reference}, ${input.type}, ${tx.json(record.answers as postgres.JSONValue)},
        ${record.name}, ${record.company}, ${record.email}, ${record.phone}, ${record.summary},
        ${input.idempotencyKey}, ${input.ipHash}, now()
      )
      ON CONFLICT (idempotency_key) DO NOTHING
      RETURNING id, reference`;
    if (inserted.length === 0) {
      const [existing] = await tx<{ id: string; reference: string }[]>`
        SELECT id, reference FROM requests WHERE idempotency_key = ${input.idempotencyKey}`;
      return { ...existing, duplicate: true };
    }
    await tx`
      INSERT INTO request_events (request_id, actor, kind)
      VALUES (${inserted[0].id}, ${eventLabels.systemActor}, 'created')`;
    return { ...inserted[0], duplicate: false };
  });
}

/** Résultat d'une tentative de notification. */
export type NotifyOutcome = "sent" | "failed" | "busy" | "already_sent" | "not_found";

/** Au-delà de ce délai, un verrou d'envoi est considéré comme abandonné (envoi interrompu). */
const CLAIM_EXPIRY = "2 minutes";

/**
 * Pose le verrou d'envoi s'il est libre (ou expiré) et que la notification n'est pas déjà partie.
 * Empêche deux envois simultanés de la même notification.
 */
async function claimNotification(
  sql: postgres.Sql,
  id: string,
): Promise<"claimed" | "busy" | "already_sent" | "not_found"> {
  const claimed = await sql`
    UPDATE requests SET notification_claimed_at = now()
    WHERE id = ${id}
      AND notification_status <> 'sent'
      AND (notification_claimed_at IS NULL
        OR notification_claimed_at < now() - ${CLAIM_EXPIRY}::interval)
    RETURNING id`;
  if (claimed.length > 0) return "claimed";
  const [row] = await sql<{ notification_status: NotificationStatus }[]>`
    SELECT notification_status FROM requests WHERE id = ${id}`;
  if (!row) return "not_found";
  return row.notification_status === "sent" ? "already_sent" : "busy";
}

/**
 * Envoie l'email d'une demande dont le verrou est détenu, enregistre le résultat
 * (statut, erreur, tentatives, historique) puis lève le verrou.
 * Ne crée jamais de nouvelle demande et ne lève pas d'erreur.
 */
async function deliverNotification(
  sql: postgres.Sql,
  id: string,
  actor: string,
): Promise<"sent" | "failed" | "not_found"> {
  const [request] = await sql<RequestRow[]>`SELECT * FROM requests WHERE id = ${id}`;
  if (!request) return "not_found";

  const config = getMailConfig();
  const result = config
    ? await sendMail(config, {
        ...formatNotificationEmail(request),
        idempotencyKey: `${request.reference}-notification-${request.notification_attempts + 1}`,
      })
    : ({ ok: false, reason: notificationEmail.notConfigured } as const);

  const error = result.ok ? null : result.reason.slice(0, 500);
  await sql.begin(async (tx) => {
    await tx`
      UPDATE requests SET
        notification_status = ${result.ok ? "sent" : "failed"},
        notification_error = ${error},
        notification_attempts = notification_attempts + 1,
        notified_at = CASE WHEN ${result.ok} THEN now() ELSE notified_at END,
        notification_claimed_at = NULL,
        updated_at = now()
      WHERE id = ${id}`;
    await tx`
      INSERT INTO request_events (request_id, actor, kind, detail)
      VALUES (${id}, ${actor}, ${result.ok ? "notification_sent" : "notification_failed"}, ${error})`;
  });
  if (!result.ok) console.error(`[demandes] Notification non envoyée pour ${request.reference} : ${error}`);
  return result.ok ? "sent" : "failed";
}

/** Premier envoi, juste après l'enregistrement (le verrou a été posé à l'insertion). */
export async function notifyNewRequest(id: string): Promise<NotifyOutcome> {
  const sql = getSql();
  if (!sql) return "failed";
  try {
    return await deliverNotification(sql, id, eventLabels.systemActor);
  } catch (error) {
    console.error(`[demandes] Suivi de notification impossible pour ${id} :`, (error as Error).message);
    await sql`UPDATE requests SET notification_claimed_at = NULL WHERE id = ${id}`.catch(() => undefined);
    return "failed";
  }
}

// ---------------------------------------------------------------------------
// Côté administration (connexion obligatoire)
// ---------------------------------------------------------------------------

export type RequestFilters = {
  type?: RequestType;
  status?: RequestStatus;
  notificationIssues?: boolean;
  /** Dates au format AAAA-MM-JJ, heure de Dakar. */
  from?: string;
  to?: string;
  page: number;
};

export const PAGE_SIZE = 25;

export type RequestListItem = Pick<
  RequestRow,
  "id" | "reference" | "type" | "status" | "name" | "company" | "summary" | "notification_status" | "received_at"
>;

function notificationIssueCondition(sql: postgres.Sql) {
  return sql`(notification_status = 'failed'
    OR (notification_status = 'pending' AND received_at < now() - ${NOTIFICATION_GRACE}::interval))`;
}

export async function listRequests(filters: RequestFilters) {
  await requireAdmin();
  const sql = requireSql();

  const conditions = [
    filters.type ? sql`type = ${filters.type}` : null,
    filters.status ? sql`status = ${filters.status}` : null,
    filters.notificationIssues ? notificationIssueCondition(sql) : null,
    filters.from ? sql`(received_at AT TIME ZONE 'Africa/Dakar')::date >= ${filters.from}::date` : null,
    filters.to ? sql`(received_at AT TIME ZONE 'Africa/Dakar')::date <= ${filters.to}::date` : null,
  ].filter((condition) => condition !== null);
  const where = conditions.length
    ? sql`WHERE ${conditions.reduce((all, condition) => sql`${all} AND ${condition}`)}`
    : sql``;

  const [{ total }] = await sql<{ total: number }[]>`SELECT count(*)::int AS total FROM requests ${where}`;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(Math.max(1, filters.page), pageCount);
  const rows = await sql<RequestListItem[]>`
    SELECT id, reference, type, status, name, company, summary, notification_status, received_at
    FROM requests ${where}
    ORDER BY received_at DESC
    LIMIT ${PAGE_SIZE} OFFSET ${(page - 1) * PAGE_SIZE}`;
  return { rows, total, page, pageCount };
}

export async function countRequests(): Promise<number> {
  await requireAdmin();
  const [{ total }] = await requireSql()<{ total: number }[]>`SELECT count(*)::int AS total FROM requests`;
  return total;
}

export async function countNotificationIssues(): Promise<number> {
  await requireAdmin();
  const sql = requireSql();
  const [{ total }] = await sql<{ total: number }[]>`
    SELECT count(*)::int AS total FROM requests WHERE ${notificationIssueCondition(sql)}`;
  return total;
}

export async function getRequestDetail(id: string) {
  await requireAdmin();
  if (!isUuid(id)) return null;
  const sql = requireSql();
  const [request] = await sql<RequestRow[]>`SELECT * FROM requests WHERE id = ${id}`;
  if (!request) return null;
  const events = await sql<RequestEvent[]>`
    SELECT id, occurred_at, actor, kind, detail FROM request_events
    WHERE request_id = ${id} ORDER BY occurred_at, id`;
  return { request, events };
}

/** Change le statut et l'inscrit dans l'historique. Renvoie false si rien n'a changé. */
export async function updateRequestStatus(id: string, status: RequestStatus): Promise<boolean> {
  const admin = await requireAdmin();
  if (!isUuid(id)) return false;
  return requireSql().begin(async (tx) => {
    const [current] = await tx<{ status: RequestStatus }[]>`
      SELECT status FROM requests WHERE id = ${id} FOR UPDATE`;
    if (!current || current.status === status) return false;
    await tx`UPDATE requests SET status = ${status}, updated_at = now() WHERE id = ${id}`;
    await tx`
      INSERT INTO request_events (request_id, actor, kind, detail)
      VALUES (${id}, ${admin.email}, 'status_changed', ${`${current.status}:${status}`})`;
    return true;
  });
}

/**
 * Renvoi manuel depuis l'administration : uniquement si la notification n'est pas déjà partie
 * et qu'aucun autre envoi n'est en cours. Ne crée jamais de seconde demande.
 */
export async function resendRequestNotification(id: string): Promise<NotifyOutcome> {
  const admin = await requireAdmin();
  if (!isUuid(id)) return "not_found";
  const sql = requireSql();
  const claim = await claimNotification(sql, id);
  if (claim !== "claimed") return claim;
  try {
    return await deliverNotification(sql, id, admin.email);
  } catch (error) {
    console.error(`[demandes] Renvoi impossible pour ${id} :`, (error as Error).message);
    await sql`UPDATE requests SET notification_claimed_at = NULL WHERE id = ${id}`.catch(() => undefined);
    return "failed";
  }
}
