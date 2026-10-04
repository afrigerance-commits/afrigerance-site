import "server-only";

import { notificationEmail } from "@/content/admin";
import { formatAnswers } from "@/lib/requests/records";
import type { RequestType } from "@/lib/requests/types";

type NotificationSource = {
  id: string;
  reference: string;
  type: RequestType;
  answers: unknown;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  received_at: Date;
};

/** Lien vers la fiche dans l'administration, seulement si SITE_URL est une adresse http(s) valide. */
export function adminLink(id: string): string | null {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return null;
  try {
    const base = new URL(raw);
    if (base.protocol !== "https:" && base.protocol !== "http:") return null;
    return new URL(`/admin/demandes/${id}`, base).toString();
  } catch {
    return null;
  }
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString("fr-FR", {
    timeZone: "Africa/Dakar",
    dateStyle: "short",
    timeStyle: "short",
  });
}

/** Retire retours à la ligne et caractères de contrôle d'un texte placé dans l'objet. */
function oneLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, 120);
}

/**
 * Email envoyé au gestionnaire pour chaque nouvelle demande :
 * référence, date, toutes les réponses (pôles, prestations, description, ville…) et coordonnées,
 * puis un lien vers la fiche d'administration si SITE_URL est configurée.
 */
export function formatNotificationEmail(request: NotificationSource) {
  const labels = notificationEmail.labels;
  const empty = notificationEmail.notProvided;
  const answers = formatAnswers(request.type, request.answers);
  const shortRows = answers.filter((row) => !row.long);
  const longRows = answers.filter((row) => row.long);
  const link = adminLink(request.id);

  const lines = [
    notificationEmail.intro[request.type],
    "",
    `${labels.reference} : ${request.reference}`,
    `${notificationEmail.receivedAt[request.type]} : ${formatDateTime(request.received_at)} ${notificationEmail.timezone}`,
    "",
    `— ${notificationEmail.sectionTitle[request.type]} —`,
    ...shortRows.map((row) => `${row.label} : ${row.value || empty}`),
    ...longRows.flatMap((row) => ["", `${row.label} :`, row.value || empty]),
    "",
    `— ${notificationEmail.contactSection} —`,
    `${labels.name} : ${request.name}`,
    ...(request.type !== "contact" ? [`${labels.company} : ${request.company ?? empty}`] : []),
    `${labels.email} : ${request.email ?? empty}`,
    `${labels.phone} : ${request.phone ?? empty}`,
    ...(request.email ? ["", notificationEmail.replyHint] : []),
    "",
    link ? `${notificationEmail.outroWithLink}\n${link}` : notificationEmail.outroWithoutLink,
  ];

  return {
    subject: oneLine(notificationEmail.subject[request.type](request.reference, request.name)),
    text: lines.join("\n"),
    replyTo: request.email ?? undefined,
  };
}
