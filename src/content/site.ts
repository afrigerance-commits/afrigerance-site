/**
 * Contenus centralisés du site AFRIGÉRANCE.
 * Modifier les textes, liens et libellés ici : les composants les lisent tels quels.
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
    "Infogérance et intégration de solutions technologiques pour les entreprises au\u00a0Sénégal.",
  locale: "fr_SN",
} as const;

export const routes = {
  home: "/",
  services: "/services",
  infogerance: "/services/infogerance",
  integration: "/services/integration-solutions-technologiques",
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

export type ServicePole = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const servicePoles: ServicePole[] = [
  {
    id: "infogerance",
    title: "Infogérance",
    description:
      "Gestion du parc, support, infrastructures, cybersécurité, téléphonie IP, sauvegardes et audit.",
    href: routes.infogerance,
  },
  {
    id: "integration",
    title: "Intégration de solutions technologiques",
    description:
      "Câblage réseau Ethernet et fibre, installation de systèmes de vidéosurveillance, contrôle d’accès biométrique, systèmes de pointage et sécurité incendie.",
    href: routes.integration,
  },
];

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
  services: {
    title: "Nos services",
    intro:
      "AFRIGÉRANCE intervient sur deux pôles : l’infogérance et l’intégration de solutions technologiques.",
    status: "La présentation détaillée de nos services est en cours de préparation.",
  },
  infogerance: {
    title: servicePoles[0].title,
    intro: servicePoles[0].description,
    status: "La présentation détaillée de ce pôle est en cours de préparation.",
  },
  integration: {
    title: servicePoles[1].title,
    intro: servicePoles[1].description,
    status: "La présentation détaillée de ce pôle est en cours de préparation.",
  },
  about: {
    title: "À propos",
    intro: "Cette page présentera AFRIGÉRANCE, sa mission et sa démarche.",
    status: "Son contenu est en cours de préparation.",
  },
  contact: {
    title: "Contact",
    intro:
      "Les coordonnées d’AFRIGÉRANCE et le formulaire de contact seront publiés sur cette page dès leur validation.",
    status: "Aucun message ne peut encore être envoyé depuis le site.",
  },
  quote: {
    title: "Demander un devis",
    intro:
      "Le formulaire de demande de devis est en cours de mise en place. Il sera publié dès qu’il pourra réellement transmettre votre demande à notre équipe.",
    status: "Aucune demande ne peut encore être envoyée depuis le site.",
  },
  legal: {
    title: "Mentions légales",
    intro:
      "Les mentions légales seront publiées dès réception des informations officielles de l’entreprise.",
    status: "Contenu en attente de validation.",
  },
} satisfies Record<string, PlaceholderPage>;
