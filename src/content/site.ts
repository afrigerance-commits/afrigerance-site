/**
 * Contenus centralisés du site AFRIGÉRANCE : identité, navigation, coordonnées.
 * Les autres textes sont dans src/content/ (home.ts, services.ts, pages.ts, forms.ts, faq.ts).
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
    "Infogérance et intégration de solutions technologiques pour les entreprises au Sénégal.",
  locale: "fr_SN",
} as const;

export const routes = {
  home: "/",
  services: "/services",
  serviceInfogerance: "/services/infogerance",
  serviceIntegration: "/services/integration",
  about: "/a-propos",
  faq: "/faq",
  contact: "/contact",
  quote: "/devis",
  appointment: "/rendez-vous",
  legal: "/mentions-legales",
  privacy: "/confidentialite",
} as const;

/** Menu principal (le logo ramène à l'accueil). */
export const mainNav: NavLink[] = [
  { label: "Nos services", href: routes.services },
  { label: "À propos", href: routes.about },
  { label: "FAQ", href: routes.faq },
  { label: "Contact", href: routes.contact },
];

/** Appels à l'action de l'en-tête (cahier des charges : devis et rendez-vous visibles). */
export const headerCta: NavLink = {
  label: "Demander un devis",
  href: routes.quote,
};

export const headerSecondaryCta: NavLink = {
  label: "Prendre rendez-vous",
  href: routes.appointment,
};

/** Pied de page : appel final, colonnes de liens et mentions. */
export const footer = {
  eyebrow: "Prochaine étape",
  titleLead: "Parlons de",
  titleAccent: "votre projet.",
  text: "Décrivez votre besoin : nous étudierons avec vous la réponse adaptée à votre activité, à votre environnement et à vos priorités.",
  primaryCta: { label: "Demander un devis", href: routes.quote },
  secondaryCta: { label: "Prendre rendez-vous", href: routes.appointment },
  tertiaryCta: { label: "Nous écrire", href: routes.contact },
  about:
    "Entreprise sénégalaise d’infogérance et d’intégration de solutions technologiques.",
  /** Titre du bloc de coordonnées (affiché seulement si contactDetails en contient). */
  contactTitle: "Coordonnées",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Infogérance", href: routes.serviceInfogerance },
        { label: "Intégration de solutions technologiques", href: routes.serviceIntegration },
        { label: "Tous nos services", href: routes.services },
      ],
    },
    {
      title: "AFRIGÉRANCE",
      links: [
        { label: "À propos", href: routes.about },
        { label: "Questions fréquentes", href: routes.faq },
        { label: "Contact", href: routes.contact },
      ],
    },
    {
      title: "Démarrer",
      links: [
        { label: "Demander un devis", href: routes.quote },
        { label: "Prendre rendez-vous", href: routes.appointment },
      ],
    },
  ] satisfies { title: string; links: NavLink[] }[],
  legalLinks: [
    { label: "Mentions légales", href: routes.legal },
    { label: "Données personnelles", href: routes.privacy },
  ] satisfies NavLink[],
  copyright: (year: number) => `© ${year} AFRIGÉRANCE`,
} as const;

/** Lien du pied de page utilisé par les tests et les pages légales. */
export const footerNav: NavLink[] = [
  { label: "Contact", href: routes.contact },
  ...footer.legalLinks,
];

export const hero = {
  badge: "Votre partenaire IT au Sénégal",
  titleLead: "Votre système,",
  titleAccent: "notre responsabilité.",
  description:
    "AFRIGÉRANCE accompagne les entreprises, établissements et particuliers dans la gestion de leur informatique et l’intégration de solutions technologiques. Décrivez votre besoin : nous vous aidons à définir une réponse adaptée à votre contexte.",
  primaryCta: { label: "Demander un devis", href: routes.quote },
  secondaryCta: { label: "Prendre rendez-vous", href: routes.appointment },
  tertiaryCta: { label: "Découvrir nos services", href: routes.services },
  /** Étiquettes flottantes autour de la carte : les deux pôles. */
  chips: [
    { label: "Infogérance", detail: "Parc, support, cybersécurité", href: routes.serviceInfogerance },
    { label: "Intégration", detail: "Réseau, vidéo, accès, incendie", href: routes.serviceIntegration },
  ],
  mapLabel: "Dakar, Sénégal",
  scrollHint: "Défiler",
  /**
   * Image décorative fondue dans le dégradé bleu, sous la carte (côté droit ; en bas sur mobile).
   * Pour la changer : déposer une photo dans public/accueil/ (JPG ou WebP, 1600 px de large ou plus)
   * et indiquer son chemin ici, ex. "/accueil/banniere.jpg". Mettre null pour la retirer.
   * Illustration actuelle : motif « réseau » provisoire, créé pour le site.
   */
  image: { src: "/accueil/banniere.svg" } as { src: string } | null,
} as const;

/** Libellés d'interface communs (accessibilité, navigation, pages d'attente). */
export const uiText = {
  skipLink: "Aller au contenu principal",
  mainNavLabel: "Navigation principale",
  footerNavLabel: "Liens du pied de page",
  legalNavLabel: "Informations légales",
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  menuTitle: "Menu",
  homeLink: "retour à l’accueil",
  backHome: "Retour à l’accueil",
  placeholderBadge: "Page en préparation",
  breadcrumbLabel: "Fil d’Ariane",
  home: "Accueil",
  notFound: {
    eyebrow: "Erreur 404",
    title: "Cette page est introuvable",
    text: "La page demandée n’existe pas ou a été déplacée. Les liens ci-dessous vous ramènent en terrain connu.",
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

// Coordonnées confirmées par AFRIGÉRANCE (octobre 2026).
export const contactDetails: ContactDetails = {
  phone: "+221 78 666 51 51",
  email: "afrigerance@gmail.com",
  whatsapp: null,
  address: ["Scat Urbam, en face de La Brioche Dorée", "Grand Yoff, Dakar"],
  hours: null,
};

/** Indique si au moins une coordonnée publique est renseignée. */
export function hasContactDetails(details: ContactDetails = contactDetails): boolean {
  return Object.values(details).some((value) => (Array.isArray(value) ? value.length > 0 : Boolean(value)));
}
