/**
 * Contenus centralisés du site AFRIGÉRANCE : identité, navigation, coordonnées.
 * Les autres textes sont dans src/content/ (services.ts, pages.ts, forms.ts).
 * Ne jamais ajouter de chiffre, client, tarif, certification ou coordonnée non validés.
 */

export type NavLink = {
  label: string;
  href: string;
};

export const site = {
  name: "AFRIGÉRANCE",
  tagline: "Votre système, notre responsabilité",
  description:
    "Infogérance et intégration de solutions technologiques pour les entreprises au Sénégal.",
  locale: "fr_SN",
} as const;

export const routes = {
  home: "/",
  services: "/services",
  about: "/a-propos",
  contact: "/contact",
  quote: "/devis",
  legal: "/mentions-legales",
} as const;

export const mainNav: NavLink[] = [
  { label: "Accueil", href: routes.home },
  { label: "Nos services", href: routes.services },
  { label: "À propos", href: routes.about },
  { label: "Contact", href: routes.contact },
];

export const headerCta: NavLink = {
  label: "Demander un devis",
  href: routes.quote,
};

export const footerNav: NavLink[] = [
  { label: "Contact", href: routes.contact },
  { label: "Mentions légales", href: routes.legal },
];

export const hero = {
  badge: "Votre partenaire IT au Sénégal",
  titleLead: "Votre système,",
  titleAccent: "notre responsabilité.",
  description: site.description,
  primaryCta: { label: "Demander un devis", href: routes.quote },
  secondaryCta: { label: "Nous contacter", href: routes.contact },
} as const;

/** Libellés d'interface communs (accessibilité, navigation, pages d'attente). */
export const uiText = {
  skipLink: "Aller au contenu principal",
  mainNavLabel: "Navigation principale",
  footerNavLabel: "Liens du pied de page",
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  homeLink: "retour à l’accueil",
  backHome: "Retour à l’accueil",
  placeholderBadge: "Page en préparation",
  notFound: {
    eyebrow: "Erreur 404",
    title: "Page introuvable",
    text: "La page demandée n’existe pas ou a été déplacée.",
  },
} as const;

/**
 * Coordonnées publiques d'AFRIGÉRANCE.
 * Renseigner une valeur UNIQUEMENT lorsqu'elle est confirmée par AFRIGÉRANCE :
 * chaque ligne (et son lien téléphone, email ou WhatsApp) n'apparaît que si elle est remplie.
 */
export type ContactDetails = {
  /** Numéro affiché et appelable, format international. Ex. : "+221 00 000 00 00" */
  phone: string | null;
  /** Adresse email publique. */
  email: string | null;
  /** Numéro WhatsApp au format international (chiffres, espaces et + acceptés). */
  whatsapp: string | null;
  /** Adresse postale, une ligne par élément du tableau. */
  address: string[] | null;
  /** Horaires d'ouverture, une ligne par élément du tableau. */
  hours: string[] | null;
};

export const contactDetails: ContactDetails = {
  phone: null,
  email: null,
  whatsapp: null,
  address: null,
  hours: null,
};

/**
 * Pages pas encore développées : elles existent pour que chaque lien mène
 * quelque part, affichent honnêtement leur statut et ne sont pas indexées.
 */
export type PlaceholderPage = {
  title: string;
  intro: string;
  status: string;
};

export const placeholderPages = {
  legal: {
    title: "Mentions légales",
    intro:
      "Les mentions légales seront publiées dès réception des informations officielles de l’entreprise.",
    status: "Contenu en attente de validation.",
  },
} satisfies Record<string, PlaceholderPage>;
