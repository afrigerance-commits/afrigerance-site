/**
 * Textes des pages intérieures (Services, À propos, Contact, Devis).
 * Rédigés à partir du cahier des charges : aucune date, équipe, certification,
 * référence ou statistique n'est mentionnée tant qu'elle n'est pas confirmée.
 */
import { routes, site } from "./site";

export const servicesPage = {
  metaTitle: "Nos services",
  metaDescription:
    "Infogérance et intégration de solutions technologiques pour les entreprises au Sénégal : gestion du parc, support, cybersécurité, câblage, vidéosurveillance, contrôle d’accès…",
  eyebrow: "Nos services",
  title: "Infogérance et intégration de solutions technologiques",
  intro:
    "AFRIGÉRANCE intervient sur deux pôles complémentaires. Chaque prestation est définie avec vous selon votre activité, vos équipements et vos priorités.",
  jumpLabel: "Accès direct aux pôles",
  poleLabel: "Pôle",
  prestationsLabel: "Prestations du pôle",
  quoteCta: "Demander un devis",
  prepare: {
    title: "Préparer votre demande",
    intro: "Pour étudier votre besoin, quelques informations nous sont utiles :",
    items: [
      "le site ou les locaux concernés et la ville d’intervention ;",
      "le nombre approximatif d’utilisateurs ou d’équipements ;",
      "la situation actuelle et le résultat souhaité ;",
      "vos contraintes de calendrier ;",
      "vos coordonnées pour vous recontacter.",
    ],
    warning:
      "Ne transmettez jamais de mot de passe, de code d’accès ni de donnée sensible dans une demande.",
    primaryCta: { label: "Demander un devis", href: routes.quote },
    secondaryCta: { label: "Nous contacter", href: routes.contact },
  },
} as const;

export const aboutPage = {
  metaTitle: "À propos",
  metaDescription:
    "AFRIGÉRANCE accompagne les entreprises au Sénégal dans la gestion de leur informatique et l’intégration de solutions technologiques.",
  eyebrow: "À propos",
  title: "Un partenaire pour vos besoins informatiques et technologiques",
  intro:
    "AFRIGÉRANCE accompagne les entreprises au Sénégal dans la gestion de leur informatique et l’intégration de solutions technologiques.",
  presentation: {
    title: "Qui sommes-nous ?",
    paragraphs: [
      "AFRIGÉRANCE est une entreprise sénégalaise spécialisée dans l’infogérance et l’intégration de solutions technologiques. Elle accompagne les organisations qui souhaitent disposer d’outils numériques fiables, sécurisés et adaptés à leur activité.",
      "Notre démarche commence par l’écoute de votre contexte : équipements, utilisateurs, contraintes et priorités. Nous définissons ensuite avec vous un périmètre d’intervention clair.",
    ],
  },
  slogan: {
    eyebrow: "Notre signature",
    text: `${site.tagline}.`,
    explanation:
      "De l’analyse du besoin au suivi, nous aidons chaque client à définir une réponse adaptée à son activité, à son environnement et à ses priorités.",
  },
  poles: {
    title: "Nos deux pôles",
    linkLabel: "Voir les prestations",
  },
  method: {
    title: "Notre démarche",
    intro: "Un accompagnement en cinq étapes, du premier échange au suivi convenu.",
    steps: [
      {
        title: "Échange initial",
        text: "Nous faisons le point sur votre activité, vos utilisateurs, votre environnement et vos priorités.",
      },
      {
        title: "Qualification",
        text: "Nous rassemblons les informations utiles, identifions les contraintes et évaluons le besoin éventuel d’une visite ou d’un audit.",
      },
      {
        title: "Proposition",
        text: "Nous vous présentons le périmètre, les options, les hypothèses retenues, les exclusions et les prochaines étapes.",
      },
      {
        title: "Planification et réalisation",
        text: "Nous coordonnons les accès et l’intervention, en limitant les interruptions lorsque c’est possible.",
      },
      {
        title: "Vérification et suivi",
        text: "Nous vérifions le résultat avec vous, transmettons les éléments utiles à l’exploitation et assurons le suivi convenu.",
      },
    ],
  },
} as const;

export const contactPage = {
  metaTitle: "Contact",
  metaDescription:
    "Contactez AFRIGÉRANCE pour une question sur l’infogérance ou l’intégration de solutions technologiques au Sénégal.",
  eyebrow: "Contact",
  title: "Contactez-nous",
  intro:
    "Une question sur nos services ou un besoin à exprimer ? Écrivez-nous : nous vous recontacterons par le moyen que vous indiquez.",
  details: {
    title: "Nos coordonnées",
    /** Affiché lorsqu'aucune coordonnée n'est encore confirmée dans site.ts. */
    empty: "Pour nous écrire, utilisez le formulaire de contact.",
    phoneLabel: "Téléphone",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    whatsappAction: "Écrire sur WhatsApp",
    newTab: "s’ouvre dans un nouvel onglet",
    addressLabel: "Adresse",
    hoursLabel: "Horaires",
  },
  quote: {
    title: "Un projet précis ?",
    text: "Pour une demande de devis, le formulaire dédié vous guide étape par étape.",
    cta: { label: "Demander un devis", href: routes.quote },
  },
} as const;

export const quotePage = {
  metaTitle: "Demander un devis",
  metaDescription:
    "Décrivez votre besoin en infogérance ou en intégration de solutions technologiques : AFRIGÉRANCE étudie votre demande avant tout chiffrage.",
  eyebrow: "Demander un devis",
  title: "Décrivez votre besoin",
  intro:
    "Quelques questions pour comprendre votre besoin. Aucun tarif n’est calculé en ligne : votre demande est étudiée avant tout chiffrage.",
  aside: {
    title: "Bon à savoir",
    items: [
      "Vous pouvez revenir aux étapes précédentes sans perdre vos réponses.",
      "Des précisions ou un échange peuvent être nécessaires avant de chiffrer.",
      "Ne transmettez jamais de mot de passe ni de donnée sensible.",
    ],
    contactText: "Une simple question ?",
    contactCta: { label: "Nous contacter", href: routes.contact },
  },
} as const;

/** Appel à l'action de fin de page (cahier des charges : « Parlons de votre projet »). */
export const closingCta = {
  title: "Parlons de votre projet",
  text: "Décrivez votre besoin : nous étudierons avec vous la réponse adaptée à votre contexte.",
  primaryCta: { label: "Demander un devis", href: routes.quote },
  secondaryCta: { label: "Nous contacter", href: routes.contact },
} as const;
