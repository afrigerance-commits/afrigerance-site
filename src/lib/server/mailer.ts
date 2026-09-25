import "server-only";

/**
 * Envoi d'emails de notification via l'API HTTP de Resend (https://resend.com).
 * Aucune dépendance : un simple appel HTTPS depuis le serveur.
 * Les variables sont lues uniquement côté serveur et ne sont jamais envoyées au navigateur.
 *
 *   RESEND_API_KEY           clé API Resend (secrète)
 *   NOTIFICATION_EMAIL_FROM  expéditeur, ex. "AFRIGERANCE <onboarding@resend.dev>"
 *   NOTIFICATION_EMAIL_TO    destinataire(s) des demandes, séparés par des virgules
 */

export type MailConfig = {
  apiKey: string;
  from: string;
  to: string[];
  endpoint: string;
};

export type MailMessage = {
  subject: string;
  text: string;
  replyTo?: string;
  /** Identifiant unique : évite un double envoi si la même demande est rejouée. */
  idempotencyKey: string;
};

export type MailResult = { ok: true } | { ok: false; reason: string };

const DEFAULT_ENDPOINT = "https://api.resend.com/emails";

/** Renvoie la configuration, ou null si l'envoi n'est pas (entièrement) configuré. */
export function getMailConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.NOTIFICATION_EMAIL_FROM?.trim();
  const to = (process.env.NOTIFICATION_EMAIL_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (!apiKey || !from || to.length === 0) return null;
  return {
    apiKey,
    from,
    to,
    endpoint: process.env.RESEND_API_URL?.trim() || DEFAULT_ENDPOINT,
  };
}

export async function sendMail(config: MailConfig, message: MailMessage): Promise<MailResult> {
  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": message.idempotencyKey,
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        subject: message.subject,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return { ok: false, reason: `HTTP ${response.status} ${detail.slice(0, 300)}` };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : String(error) };
  }
}
