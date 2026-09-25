import "server-only";

import type { SubmitErrorCode } from "@/content/forms";
import type { FieldErrors } from "@/lib/forms/common";
import { getMailConfig, sendMail } from "./mailer";

/** Taille maximale acceptée pour le corps d'une requête (en caractères). */
const MAX_BODY_LENGTH = 20_000;

type Handler<T> = {
  /** Préfixe de la référence communiquée au visiteur, ex. "DV" pour devis. */
  referencePrefix: string;
  parse: (input: unknown) => T & { website: string };
  validate: (data: T) => FieldErrors;
  format: (data: T, reference: string, receivedAt: Date) => {
    subject: string;
    text: string;
    replyTo?: string;
  };
};

function fail(status: number, code: SubmitErrorCode, fieldErrors?: FieldErrors) {
  return Response.json({ ok: false, code, ...(fieldErrors ? { fieldErrors } : {}) }, { status });
}

function makeReference(prefix: string, date: Date): string {
  const day = date.toISOString().slice(0, 10).replaceAll("-", "");
  const random = crypto.randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `${prefix}-${day}-${random}`;
}

/**
 * Traitement commun d'un formulaire : lecture, validation, puis envoi réel.
 * Le succès (200) n'est renvoyé que si le service d'envoi a accepté le message.
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

  const data = handler.parse(input);
  if (data.website) return fail(400, "bad_request");

  const fieldErrors = handler.validate(data);
  if (Object.keys(fieldErrors).length > 0) return fail(422, "invalid", fieldErrors);

  const config = getMailConfig();
  if (!config) {
    console.warn(
      "[formulaires] Envoi non configuré : définir RESEND_API_KEY, NOTIFICATION_EMAIL_FROM et NOTIFICATION_EMAIL_TO.",
    );
    return fail(503, "not_configured");
  }

  const receivedAt = new Date();
  const reference = makeReference(handler.referencePrefix, receivedAt);
  const email = handler.format(data, reference, receivedAt);
  const result = await sendMail(config, { ...email, idempotencyKey: reference });

  if (!result.ok) {
    console.error(`[formulaires] Échec de l'envoi ${reference} : ${result.reason}`);
    return fail(502, "send_failed");
  }
  return Response.json({ ok: true, reference });
}
