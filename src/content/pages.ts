/**
 * Textes des pages intérieures (Services, fiches des pôles, À propos, Contact, Devis,
 * Rendez-vous, FAQ, pages légales). Rédigés à partir du cahier des charges : aucune date,
 * équipe, certification, référence, tarif, délai ou statistique tant qu'ils ne sont pas confirmés.
 */
import { routes, site } from "./site";

export const servicesPage = {
  metaTitle: "Nos services",
  metaDescription:
    "Infogérance et intégration de solutions technologiques au Sénégal : gestion du parc, support, cybersécurité, téléphonie IP, câblage réseau, vidéosurveillance, contrôle d’accès, pointage et sécurité incendie.",
  eyebrow: "Nos services",
  titleLead: "Deux pôles pour votre informatique",
  titleAccent: "et vos locaux.",
  intro:
    "AFRIGÉRANCE intervient sur deux pôles complémentaires. Chaque prestation est définie avec vous selon votre activité, vos équipements et vos priorités.",
  poleLabel: "Pôle",
  prestationsLabel: "Prestations",
  detailCta: "Découvrir ce pôle",
  quoteCta: "Demander un devis",
  prepare: {
    eyebrow: "Avant de nous écrire",
    titleLead: "Préparer",
    titleAccent: "votre demande.",
    intro: "Pour étudier votre besoin, quelques informations nous sont utiles :",
    items: [
      "le site ou les locaux concernés et la ville d’intervention ;",
      "le nombre approximatif d’utilisateurs ou d’équipements ;",
      "la situation actuelle et le résultat souhaité ;",
      "vos contraintes de calendrier ;",
      "vos coordonnées pour vous recontacter.",
    ],
    warning:
      "Ne transmettez jamais de mot de passe, de code d’accès ni de donnée sensible dans une demande.",
    primaryCta: { label: "Demander un devis", href: routes.quote },
    secondaryCta: { label: "Prendre rendez-vous", href: routes.appointment },
  },
} as const;

/** Fiches détaillées des deux pôles (structure du cahier des charges § 5). */
export const poleDetailPage = {
  crumbServices: "Services",
  objectivesEyebrow: "Ce que vous recherchez",
  objectivesTitle: (pole: string) => `Ce que le pôle ${pole} vous apporte`,
  prestationsEyebrow: "Ce que nous prenons en charge",
  prestationsTitleLead: "Les prestations",
  prestationsTitleAccent: "du pôle.",
  methodEyebrow: "Notre façon d’intervenir",
  notesTitle: "Bon à savoir",
  infoTitle: "Informations utiles à votre demande",
  infoItems: [
    "le site concerné et la ville d’intervention ;",
    "le nombre d’utilisateurs ou d’équipements ;",
    "la situation actuelle et le résultat souhaité ;",
    "vos contraintes de calendrier ;",
    "vos coordonnées.",
  ],
  warning: "Ne transmettez jamais de mot de passe ni de donnée sensible.",
  ctaEyebrow: "Un besoin dans ce domaine ?",
  ctaTitle: "Parlons de votre besoin.",
  ctaText: "Le formulaire de devis s’ouvre avec ce pôle déjà sélectionné. Vous pourrez préciser chaque prestation.",
  ctaPrimary: "Parler de votre besoin",
  ctaSecondary: { label: "Prendre rendez-vous", href: routes.appointment },
  otherPoleLabel: "Découvrir l’autre pôle",
  faqTitle: "Questions fréquentes",
  faqIds: ["existant", "delai", "renseignements"],
} as const;

export const aboutPage = {
  metaTitle: "À propos",
  metaDescription:
    "AFRIGÉRANCE, entreprise sénégalaise d’infogérance et d’intégration de solutions technologiques : notre approche et notre démarche.",
  eyebrow: "À propos",
  titleLead: "Un partenaire pour vos besoins",
  titleAccent: "informatiques et technologiques.",
  intro:
    "AFRIGÉRANCE accompagne des structures aux profils variés dans le choix, le déploiement et le suivi de solutions informatiques et technologiques.",
  heroCta: { label: "Prendre rendez-vous", href: routes.appointment },
  presentation: {
    eyebrow: "Qui sommes-nous ?",
    titleLead: "Une entreprise sénégalaise,",
    titleAccent: "à l’écoute de votre contexte.",
    paragraphs: [
      "AFRIGÉRANCE est une entreprise sénégalaise spécialisée dans l’infogérance et l’intégration de solutions technologiques. Elle accompagne les organisations qui souhaitent disposer d’outils numériques fiables, sécurisés et adaptés à leur activité.",
      "Notre démarche commence par l’écoute de votre contexte : équipements, utilisateurs, contraintes et priorités. Nous définissons ensuite avec vous un périmètre d’intervention clair.",
    ],
  },
  signature: {
    eyebrow: "Notre signature",
    text: `${site.tagline}.`,
    lead: "Votre système,",
    accent: "notre responsabilité.",
    explanation:
      "De l’analyse du besoin au suivi, nous aidons chaque client à définir une réponse adaptée à son activité, à son environnement et à ses priorités.",
  },
  approach: {
    eyebrow: "Notre approche",
    titleLead: "Ce qui guide",
    titleAccent: "notre accompagnement.",
    items: [
      { title: "Proximité", text: "Un échange direct pour comprendre votre activité, vos utilisateurs et vos contraintes sur le terrain." },
      { title: "Clarté", text: "Des explications simples, des termes techniques traduits et un périmètre défini noir sur blanc." },
      { title: "Conseil adapté", text: "Une réponse construite à partir de votre contexte et de vos priorités, pas une solution toute faite." },
      { title: "Accompagnement opérationnel", text: "De l’étude à la mise en service, puis le suivi convenu avec vous." },
    ],
  },
  poles: {
    eyebrow: "Nos expertises",
    titleLead: "Deux pôles",
    titleAccent: "complémentaires.",
    linkLabel: "Découvrir ce pôle",
  },
} as const;

export const contactPage = {
  metaTitle: "Contact",
  metaDescription:
    "Contactez AFRIGÉRANCE pour une question sur l’infogérance ou l’intégration de solutions technologiques au Sénégal.",
  eyebrow: "Contact",
  titleLead: "Écrivez-nous,",
  titleAccent: "nous vous répondons.",
  intro:
    "Une question sur nos services ou un besoin à exprimer ? Envoyez-nous un message : nous vous recontacterons par le moyen que vous indiquez.",
  details: {
    title: "Nos coordonnées",
    phoneLabel: "Téléphone",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    whatsappAction: "Écrire sur WhatsApp",
    newTab: "s’ouvre dans un nouvel onglet",
    addressLabel: "Adresse",
    hoursLabel: "Horaires",
  },
  shortcuts: {
    title: "Une demande précise ?",
    items: [
      {
        title: "Demander un devis",
        text: "Un formulaire guidé, étape par étape, pour décrire votre besoin.",
        href: routes.quote,
      },
      {
        title: "Prendre rendez-vous",
        text: "Indiquez vos disponibilités : nous confirmons le créneau avec vous.",
        href: routes.appointment,
      },
      {
        title: "Questions fréquentes",
        text: "Devis, déroulement d’une intervention, données personnelles.",
        href: routes.faq,
      },
    ],
  },
} as const;

export const quotePage = {
  metaTitle: "Demander un devis",
  metaDescription:
    "Décrivez votre besoin en infogérance ou en intégration de solutions technologiques : AFRIGÉRANCE étudie votre demande avant tout chiffrage.",
  eyebrow: "Demander un devis",
  titleLead: "Décrivez",
  titleAccent: "votre besoin.",
  intro:
    "Quelques questions pour comprendre votre besoin. Aucun tarif n’est calculé en ligne : votre demande est étudiée avant tout chiffrage.",
  aside: {
    title: "Bon à savoir",
    items: [
      "Vous pouvez revenir aux étapes précédentes sans perdre vos réponses.",
      "Des précisions ou un échange peuvent être nécessaires avant de chiffrer.",
      "Ne transmettez jamais de mot de passe ni de donnée sensible.",
    ],
    contactText: "Plutôt un échange de vive voix ?",
    contactCta: { label: "Prendre rendez-vous", href: routes.appointment },
  },
} as const;

export const appointmentPage = {
  metaTitle: "Prendre rendez-vous",
  metaDescription:
    "Demandez un rendez-vous avec AFRIGÉRANCE : par téléphone, en visioconférence ou sur site. Le créneau vous est confirmé par notre équipe.",
  eyebrow: "Prendre rendez-vous",
  titleLead: "Échangeons",
  titleAccent: "de vive voix.",
  intro:
    "Indiquez le motif de votre demande et vos disponibilités. Il s’agit d’une demande de rendez-vous : AFRIGÉRANCE vous contacte pour confirmer le créneau ou vous proposer une autre disponibilité.",
  aside: {
    title: "Comment ça se passe ?",
    steps: [
      "Vous indiquez le motif, le mode de rencontre et deux créneaux qui vous conviennent.",
      "Votre demande est enregistrée et une référence s’affiche.",
      "AFRIGÉRANCE vous contacte pour confirmer le créneau ou en proposer un autre.",
    ],
    quoteText: "Votre besoin est déjà précis ?",
    quoteCta: { label: "Demander un devis", href: routes.quote },
  },
} as const;

export const faqPage = {
  metaTitle: "Questions fréquentes",
  metaDescription:
    "Demande de devis, rendez-vous, déroulement d’une intervention, données personnelles : les réponses aux questions fréquentes sur AFRIGÉRANCE.",
  eyebrow: "Questions fréquentes",
  titleLead: "Les réponses",
  titleAccent: "à vos questions.",
  intro: "Vous ne trouvez pas votre réponse ? Écrivez-nous : nous vous répondrons par le moyen que vous indiquez.",
  contactCta: { label: "Nous écrire", href: routes.contact },
} as const;

/**
 * Mentions légales : la page reste non indexée tant que les informations officielles
 * (dénomination exacte, forme, immatriculation, siège, responsable de publication) ne sont pas fournies.
 */
export const legalPage = {
  metaTitle: "Mentions légales",
  eyebrow: "Informations légales",
  titleLead: "Mentions",
  titleAccent: "légales.",
  intro:
    "Les mentions légales complètes seront publiées dès réception des informations officielles de l’entreprise.",
  sections: [
    {
      title: "Éditeur du site",
      text: "Le site est édité par AFRIGÉRANCE, entreprise sénégalaise d’infogérance et d’intégration de solutions technologiques. Sa dénomination exacte, sa forme juridique, son immatriculation, son siège et le nom du responsable de la publication seront précisés ici.",
    },
    {
      title: "Hébergement",
      text: "Le site est hébergé par Netlify, Inc. Les demandes envoyées par les formulaires sont enregistrées dans une base de données PostgreSQL, dont l’hébergeur sera précisé ici.",
    },
    {
      title: "Propriété intellectuelle",
      text: "Le logo, la marque et les contenus du site appartiennent à AFRIGÉRANCE. Les logos des organisations présentées dans la rubrique « Ils nous font confiance » restent la propriété de leurs titulaires respectifs.",
    },
    {
      title: "Contact",
      text: "Pour toute question relative au site, utilisez le formulaire de contact.",
    },
  ],
  contactCta: { label: "Formulaire de contact", href: routes.contact },
} as const;

/**
 * Données personnelles : description factuelle des traitements réellement réalisés par le site.
 * La durée de conservation et l'identité du responsable de traitement restent à fixer par AFRIGÉRANCE.
 */
export const privacyPage = {
  metaTitle: "Données personnelles",
  metaDescription: "Comment AFRIGÉRANCE traite les informations envoyées par les formulaires du site.",
  eyebrow: "Informations légales",
  titleLead: "Vos données",
  titleAccent: "personnelles.",
  intro:
    "Cette page décrit ce que le site fait des informations que vous transmettez. Elle sera complétée par AFRIGÉRANCE (responsable du traitement, durée de conservation).",
  sections: [
    {
      title: "Informations collectées",
      text: "Uniquement celles que vous saisissez dans les formulaires de devis, de rendez-vous et de contact : nom, organisation, moyen de contact, description de votre besoin et, pour un rendez-vous, vos disponibilités.",
    },
    {
      title: "Utilisation",
      text: "Ces informations servent uniquement au traitement de votre demande : étude, réponse et suivi.",
    },
    {
      title: "Accès et stockage",
      text: "Les demandes sont enregistrées dans une base de données protégée, accessible aux seules personnes habilitées d’AFRIGÉRANCE après identification. Une notification par email est envoyée à l’équipe via un prestataire d’envoi d’emails.",
    },
    {
      title: "Protection contre les abus",
      text: "Pour limiter les envois automatisés, le site conserve une empreinte chiffrée et non réversible de votre adresse IP, jamais l’adresse elle-même.",
    },
    {
      title: "Cookies",
      text: "Le site public ne dépose aucun cookie publicitaire ni de mesure d’audience. Un cookie technique est utilisé uniquement pour la connexion à l’espace d’administration réservé à l’équipe.",
    },
    {
      title: "Vos droits",
      text: "Vous pouvez demander l’accès, la rectification ou la suppression des informations vous concernant en écrivant à AFRIGÉRANCE via le formulaire de contact.",
    },
  ],
  warning: "Ne transmettez jamais de mot de passe, de code d’accès ni de donnée bancaire dans un formulaire.",
  contactCta: { label: "Formulaire de contact", href: routes.contact },
} as const;

export const notFoundPage = {
  links: [
    { label: "Accueil", href: routes.home },
    { label: "Nos services", href: routes.services },
    { label: "Demander un devis", href: routes.quote },
    { label: "Contact", href: routes.contact },
  ],
} as const;
