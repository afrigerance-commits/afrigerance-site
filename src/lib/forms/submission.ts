/**
 * Échange navigateur ↔ serveur pour l'envoi des formulaires.
 * Le succès n'est affiché que si le serveur confirme explicitement l'envoi (ok: true + référence).
 */
import type { SubmitErrorCode } from "@/content/forms";

export type SubmissionResponse =
  | { ok: true; reference: string }
  | { ok: false; code: SubmitErrorCode; fieldErrors?: Record<string, string> };

const knownCodes: SubmitErrorCode[] = [
  "not_configured",
  "send_failed",
  "network",
  "invalid",
  "bad_request",
];

export async function postForm(url: string, data: unknown): Promise<SubmissionResponse> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    return { ok: false, code: "network" };
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // Réponse illisible : traitée comme un échec ci-dessous.
  }

  const result = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  if (response.ok && result.ok === true && typeof result.reference === "string") {
    return { ok: true, reference: result.reference };
  }

  const code = knownCodes.includes(result.code as SubmitErrorCode)
    ? (result.code as SubmitErrorCode)
    : response.status >= 500
      ? "send_failed"
      : "bad_request";
  const fieldErrors =
    result.fieldErrors && typeof result.fieldErrors === "object"
      ? (result.fieldErrors as Record<string, string>)
      : undefined;
  return { ok: false, code, fieldErrors };
}
