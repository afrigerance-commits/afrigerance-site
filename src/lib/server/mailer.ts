import "server-only";

import { readMailConfig, sendResendEmail } from "./resend-client.mjs";

/**
 * Envoi d'emails de notification via Resend, côté serveur uniquement.
 * La logique d'appel est dans resend-client.mjs (partagée avec `npm run email:test`).
 *
 *   RESEND_API_KEY           clé API Resend (secrète)
 *   NOTIFICATION_EMAIL_FROM  expéditeur, ex. "AFRIGERANCE <onboarding@resend.dev>"
 *   NOTIFICATION_EMAIL_TO    destinataire(s) des notifications, séparés par des virgules
 */

export type MailConfig = { apiKey: string; from: string; to: string[]; endpoint: string };

export type MailMessage = {
  subject: string;
  text: string;
  replyTo?: string;
  /** Identifiant unique : évite un double envoi si le même appel est rejoué. */
  idempotencyKey: string;
};

export type MailResult = { ok: true; id: string | null } | { ok: false; reason: string };

/** Renvoie la configuration, ou null si l'envoi n'est pas (entièrement) configuré. */
export function getMailConfig(): MailConfig | null {
  return readMailConfig(process.env);
}

export function sendMail(config: MailConfig, message: MailMessage): Promise<MailResult> {
  return sendResendEmail(config, message);
}
