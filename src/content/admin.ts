/**
 * Textes de l'espace administrateur (/admin).
 * Espace privé : il n'apparaît ni dans le menu du site ni dans les moteurs de recherche.
 */
import type { NotificationStatus, RequestStatus, RequestType } from "@/lib/requests/types";

export const adminText = {
  metaTitle: "Espace administrateur",
  areaName: "Espace administrateur",
  logout: "Se déconnecter",
  signedInAs: "Connecté :",
  backToSite: "Voir le site",

  login: {
    title: "Connexion",
    intro: "Accès réservé aux gestionnaires d’AFRIGÉRANCE.",
    email: "Adresse email",
    password: "Mot de passe",
    submit: "Se connecter",
    submitting: "Connexion…",
    invalid: "Adresse email ou mot de passe incorrect.",
    missing: "Saisissez votre adresse email et votre mot de passe.",
    throttled:
      "Trop de tentatives de connexion. Pour des raisons de sécurité, réessayez dans 15 minutes.",
    unavailable:
      "La connexion est impossible : la base de données n’est pas configurée ou ne répond pas.",
    loggedOut: "Vous êtes déconnecté.",
    expired: "Votre session a expiré. Connectez-vous à nouveau.",
  },

  list: {
    title: "Demandes reçues",
    empty: "Aucune demande ne correspond à ces filtres.",
    emptyAll: "Aucune demande n’a encore été reçue.",
    count: (total: number) => `${total} demande${total > 1 ? "s" : ""}`,
    columns: {
      reference: "Référence",
      receivedAt: "Reçue le",
      type: "Type",
      contact: "Demandeur",
      summary: "Objet",
      status: "Statut",
      notification: "Notification",
    },
    open: "Ouvrir",
    previous: "Page précédente",
    next: "Page suivante",
    page: (current: number, total: number) => `Page ${current} sur ${total}`,
    notificationAlert: (count: number) =>
      `${count} demande${count > 1 ? "s" : ""} dont la notification par email n’a pas été envoyée.`,
    notificationAlertLink: "Afficher ces demandes",
  },

  filters: {
    title: "Filtrer les demandes",
    type: "Type",
    status: "Statut",
    notification: "Notification",
    from: "Reçues à partir du",
    to: "Reçues jusqu’au",
    all: "Tous",
    allNotifications: "Toutes",
    notificationIssues: "Non envoyée (échec ou en attente)",
    apply: "Filtrer",
    reset: "Réinitialiser",
    invalidDates: "La date de début doit précéder la date de fin.",
  },

  detail: {
    back: "Retour à la liste",
    receivedAt: "Reçue le",
    contactTitle: "Coordonnées",
    nameLabel: "Nom",
    companyLabel: "Entreprise",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    pending: "…",
    answersTitle: "Réponses du formulaire",
    statusTitle: "Suivi de la demande",
    statusIntro: "Statut actuel :",
    setStatus: (label: string) => `Passer à « ${label} »`,
    notificationTitle: "Notification par email",
    notificationAttempts: (count: number) => `Tentatives d’envoi : ${count}`,
    notifiedAt: "Envoyée le",
    lastError: "Dernière erreur :",
    resend: "Renvoyer la notification",
    resent: "La notification a été envoyée.",
    resendFailed: "La notification n’a pas pu être envoyée. Consultez l’erreur ci-dessus.",
    historyTitle: "Historique",
    notFound: "Cette demande n’existe pas ou a été supprimée.",
    call: "Appeler",
    write: "Écrire",
    notProvided: "Non renseigné",
  },

  notFound: {
    title: "Page introuvable",
    back: "Retour aux demandes",
  },
} as const;

export const requestTypeLabels: Record<RequestType, string> = {
  devis: "Devis",
  contact: "Contact",
  "rendez-vous": "Rendez-vous",
};

export const requestStatusLabels: Record<RequestStatus, string> = {
  new: "Nouveau",
  in_progress: "En cours",
  done: "Traité",
};

export const notificationStatusLabels: Record<NotificationStatus, string> = {
  pending: "En attente",
  sent: "Envoyée",
  failed: "Échec",
};

/** Libellés de l'historique d'une demande. */
export const eventLabels = {
  created: "Demande reçue depuis le site",
  status_changed: (from: string, to: string) => `Statut : ${from} → ${to}`,
  notification_sent: "Notification envoyée",
  notification_failed: "Échec de la notification",
  systemActor: "Site",
} as const;

/** Email envoyé au gestionnaire à chaque nouvelle demande (notification uniquement). */
export const notificationEmail = {
  subject: (typeLabel: string, reference: string, name: string) =>
    `Nouvelle demande (${typeLabel}) ${reference} — ${name}`,
  intro: "Une nouvelle demande est arrivée sur le site AFRIGÉRANCE.",
  outroWithLink: "Consultez et traitez la demande dans l’espace administrateur :",
  outroWithoutLink:
    "Consultez et traitez la demande dans l’espace administrateur du site (adresse du site suivie de /admin).",
  notConfigured:
    "Envoi d’email non configuré : renseigner RESEND_API_KEY, NOTIFICATION_EMAIL_FROM et NOTIFICATION_EMAIL_TO.",
  labels: {
    type: "Type",
    reference: "Référence",
    receivedAt: "Reçue le",
    name: "Nom",
    company: "Entreprise",
    summary: "Objet",
  },
} as const;
