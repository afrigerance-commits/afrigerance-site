/**
 * Client minimal de l'API d'envoi d'emails Resend (https://resend.com/docs/api-reference/emails/send-email).
 * Partagé entre l'application (via mailer.ts) et le script `npm run email:test`.
 * Sans dépendance : un appel HTTPS depuis le serveur. La clé ne quitte jamais le serveur.
 *
 * Variables lues :
 *   RESEND_API_KEY           clé API Resend (secrète, commence par « re_ »)
 *   NOTIFICATION_EMAIL_FROM  expéditeur, ex. « AFRIGERANCE <onboarding@resend.dev> »
 *   NOTIFICATION_EMAIL_TO    destinataire(s), séparés par des virgules
 *   RESEND_API_URL           (tests uniquement) autre adresse d'API
 */

const DEFAULT_ENDPOINT = "https://api.resend.com/emails";

/**
 * @typedef {{ apiKey: string, from: string, to: string[], endpoint: string }} MailConfig
 * @typedef {{ subject: string, text: string, replyTo?: string, idempotencyKey: string }} MailMessage
 * @typedef {{ ok: true, id: string | null } | { ok: false, reason: string }} MailResult
 */

/**
 * Configuration d'envoi, ou null si une des trois variables manque.
 * @param {Record<string, string | undefined>} env
 * @returns {MailConfig | null}
 */
export function readMailConfig(env) {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.NOTIFICATION_EMAIL_FROM?.trim();
  const to = (env.NOTIFICATION_EMAIL_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (!apiKey || !from || to.length === 0) return null;
  return { apiKey, from, to, endpoint: env.RESEND_API_URL?.trim() || DEFAULT_ENDPOINT };
}

/**
 * Envoie un email. Ne lève jamais d'erreur : renvoie ok:false avec la raison
 * (code HTTP et message de Resend) pour qu'elle soit enregistrée et affichée.
 * @param {MailConfig} config
 * @param {MailMessage} message
 * @returns {Promise<MailResult>}
 */
export async function sendResendEmail(config, message) {
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
    const body = await response.text().catch(() => "");
    if (!response.ok) {
      return { ok: false, reason: `HTTP ${response.status} ${body.slice(0, 300)}`.trim() };
    }
    let id = null;
    try {
      id = JSON.parse(body).id ?? null;
    } catch {
      // Réponse acceptée sans identifiant lisible : l'envoi reste accepté.
    }
    return { ok: true, id };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : String(error) };
  }
}
