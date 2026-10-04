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
    resendFailed: "La notification n’a pas pu être envoyée. Consultez l’erreur ci-dessous.",
    resendBusy: "Un envoi de cette notification est déjà en cours. Actualisez la page dans quelques instants.",
    alreadySent: "Cette notification a déjà été envoyée : aucun nouvel email n’est parti.",
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

/**
 * Email envoyé au gestionnaire à chaque nouvelle demande.
 * Il reprend toutes les réponses et coordonnées ; le suivi se fait dans l'espace administrateur.
 */
export const notificationEmail = {
  subject: {
    devis: (reference: string, name: string) => `Nouvelle demande de devis ${reference} — ${name}`,
    contact: (reference: string, name: string) => `Nouveau message de contact ${reference} — ${name}`,
    "rendez-vous": (reference: string, name: string) =>
      `Nouvelle demande de rendez-vous ${reference} — ${name}`,
  } satisfies Record<RequestType, (reference: string, name: string) => string>,
  intro: {
    devis: "Une nouvelle demande de devis a été enregistrée sur le site AFRIGÉRANCE.",
    contact: "Un nouveau message de contact a été enregistré sur le site AFRIGÉRANCE.",
    "rendez-vous": "Une nouvelle demande de rendez-vous a été enregistrée sur le site AFRIGÉRANCE.",
  } satisfies Record<RequestType, string>,
  sectionTitle: {
    devis: "BESOIN",
    contact: "MESSAGE",
    "rendez-vous": "DEMANDE",
  } satisfies Record<RequestType, string>,
  contactSection: "COORDONNÉES",
  timezone: "(heure de Dakar)",
  replyHint: "Répondre à cet email écrit directement au demandeur.",
  outroWithLink: "Voir et traiter la demande dans l’espace administrateur :",
  outroWithoutLink:
    "Pour la traiter, connectez-vous à l’espace administrateur du site (/admin). Renseignez SITE_URL pour recevoir un lien direct vers la fiche.",
  notConfigured:
    "Envoi d’email non configuré : renseigner RESEND_API_KEY, NOTIFICATION_EMAIL_FROM et NOTIFICATION_EMAIL_TO.",
  notProvided: "Non renseigné",
  receivedAt: {
    devis: "Reçue le",
    contact: "Reçu le",
    "rendez-vous": "Reçue le",
  } satisfies Record<RequestType, string>,
  labels: {
    reference: "Référence",
    name: "Nom",
    company: "Entreprise",
    email: "Email",
    phone: "Téléphone",
  },
} as const;
