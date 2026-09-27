import "server-only";

import { notificationEmail, requestTypeLabels } from "@/content/admin";
import type { RequestType } from "@/lib/requests/types";

type NotificationSource = {
  id: string;
  reference: string;
  type: RequestType;
  name: string;
  company: string | null;
  email: string | null;
  summary: string;
  received_at: Date;
};

function adminLink(id: string): string | null {
  const base = process.env.SITE_URL?.trim().replace(/\/+$/, "");
  return base ? `${base}/admin/demandes/${id}` : null;
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString("fr-FR", {
    timeZone: "Africa/Dakar",
    dateStyle: "short",
    timeStyle: "short",
  });
}

/**
 * Email envoyé au gestionnaire : il signale la demande sans en recopier tout le contenu.
 * Le suivi complet se fait dans l'espace administrateur.
 */
export function formatNotificationEmail(request: NotificationSource) {
  const labels = notificationEmail.labels;
  const typeLabel = requestTypeLabels[request.type];
  const link = adminLink(request.id);
  const lines = [
    notificationEmail.intro,
    "",
    `${labels.type} : ${typeLabel}`,
    `${labels.reference} : ${request.reference}`,
    `${labels.receivedAt} : ${formatDateTime(request.received_at)}`,
    `${labels.name} : ${request.name}`,
    ...(request.company ? [`${labels.company} : ${request.company}`] : []),
    `${labels.summary} : ${request.summary}`,
    "",
    link ? `${notificationEmail.outroWithLink}\n${link}` : notificationEmail.outroWithoutLink,
  ];
  return {
    subject: notificationEmail.subject(typeLabel, request.reference, request.name),
    text: lines.join("\n"),
    replyTo: request.email ?? undefined,
  };
}
