import "server-only";

import { after } from "next/server";
import type { SubmitErrorCode } from "@/content/forms";
import type { FieldErrors } from "@/lib/forms/common";
import type { RequestRecord } from "@/lib/requests/records";
import type { RequestType } from "@/lib/requests/types";
import { getSql } from "./db";
import { clientIp, hashIp } from "./ip";
import { findReferenceByKey, insertRequest, isRateLimited, notifyNewRequest } from "./requests";

/** Taille maximale acceptée pour le corps d'une requête (en caractères). */
const MAX_BODY_LENGTH = 20_000;
/** En dessous de ce temps passé sur le formulaire, l'envoi est considéré comme automatique. */
const MIN_ELAPSED_MS = 2_000;
const IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9-]{16,64}$/;

type Handler<T> = {
  type: RequestType;
  /** Préfixe de la référence communiquée au visiteur, ex. "DV" pour devis. */
  referencePrefix: string;
  parse: (input: unknown) => T & { website: string };
  validate: (data: T) => FieldErrors;
  toRecord: (data: T) => RequestRecord;
};

function fail(status: number, code: SubmitErrorCode, fieldErrors?: FieldErrors) {
  return Response.json({ ok: false, code, ...(fieldErrors ? { fieldErrors } : {}) }, { status });
}

function succeed(reference: string) {
  return Response.json({ ok: true, reference });
}

function makeReference(prefix: string, date: Date): string {
  const day = date.toISOString().slice(0, 10).replaceAll("-", "");
  const random = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `${prefix}-${day}-${random}`;
}

/**
 * Traitement commun des formulaires publics :
 * 1. contrôles (format, champ piège, délai minimal, clé anti-doublon, validation) ;
 * 2. enregistrement en base — la confirmation n'est renvoyée que s'il a réussi ;
 * 3. email de notification au gestionnaire, envoyé après la réponse : un échec est
 *    conservé sur la demande (visible et renvoyable dans l'administration), jamais perdu.
 */
export async function handleSubmission<T>(request: Request, handler: Handler<T>) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail(415, "bad_request");
  }

  const body = await request.text();
  if (body.length > MAX_BODY_LENGTH) return fail(413, "bad_request");

  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return fail(400, "bad_request");
  }
  const meta = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;

  const data = handler.parse(input);
  if (data.website) return fail(400, "bad_request");

  const elapsedMs = Number(meta.elapsedMs);
  if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_ELAPSED_MS) return fail(400, "bad_request");

  const idempotencyKey = typeof meta.idempotencyKey === "string" ? meta.idempotencyKey : "";
  if (!IDEMPOTENCY_KEY_PATTERN.test(idempotencyKey)) return fail(400, "bad_request");

  const fieldErrors = handler.validate(data);
  if (Object.keys(fieldErrors).length > 0) return fail(422, "invalid", fieldErrors);

  const sql = getSql();
  if (!sql) {
    console.warn("[demandes] DATABASE_URL n'est pas configurée : demande refusée, rien n'est enregistré.");
    return fail(503, "not_configured");
  }

  try {
    const existing = await findReferenceByKey(sql, idempotencyKey);
    if (existing) return succeed(existing);

    const ipHash = await hashIp(sql, clientIp(request.headers));
    if (ipHash && (await isRateLimited(sql, ipHash))) return fail(429, "rate_limited");

    const saved = await insertRequest(sql, {
      type: handler.type,
      reference: makeReference(handler.referencePrefix, new Date()),
      record: handler.toRecord(data),
      idempotencyKey,
      ipHash,
    });
    if (!saved.duplicate) after(() => notifyNewRequest(saved.id));
    return succeed(saved.reference);
  } catch (error) {
    console.error("[demandes] Enregistrement impossible :", (error as Error).message);
    return fail(503, "storage_failed");
  }
}
