/** Types partagés des demandes (navigateur, serveur, administration). */

export const requestTypes = ["devis", "contact", "rendez-vous"] as const;
export type RequestType = (typeof requestTypes)[number];

export const requestStatuses = ["new", "in_progress", "done"] as const;
export type RequestStatus = (typeof requestStatuses)[number];

export const notificationStatuses = ["pending", "sent", "failed"] as const;
export type NotificationStatus = (typeof notificationStatuses)[number];

export function isRequestType(value: unknown): value is RequestType {
  return typeof value === "string" && (requestTypes as readonly string[]).includes(value);
}

export function isRequestStatus(value: unknown): value is RequestStatus {
  return typeof value === "string" && (requestStatuses as readonly string[]).includes(value);
}

/** Métadonnées envoyées avec chaque formulaire (anti-doublon et anti-robot). */
export type SubmissionMeta = {
  /** Identifiant unique du formulaire rempli : un même envoi répété n'est enregistré qu'une fois. */
  idempotencyKey: string;
  /** Temps passé sur le formulaire, en millisecondes. */
  elapsedMs: number;
};
