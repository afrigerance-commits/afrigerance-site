/**
 * Sections de la page d'accueil (le bandeau est dans site.ts, les logos dans partners.ts).
 * Rédigé à partir du cahier des charges (§ 2.2, § 4.1, § 4.3, § 6) : aucun chiffre, résultat ni engagement.
 */
import { routes } from "./site";

export const homePoles = {
  eyebrow: "Nos expertises",
  titleLead: "Deux pôles complémentaires,",
  titleAccent: "une démarche commune.",
  intro:
    "La gestion de votre informatique au quotidien et l’équipement technique de vos locaux. Chaque prestation est définie avec vous, selon votre activité, vos équipements et vos priorités.",
  linkLabel: "Découvrir ce pôle",
  allLabel: "Voir toutes les prestations",
  allHref: routes.services,
} as const;

/** Méthode en cinq étapes (cahier des charges § 4.3), reprise sur l'accueil et la page À propos. */
export const method = {
  eyebrow: "Notre démarche",
  titleLead: "Du premier échange",
  titleAccent: "au suivi convenu.",
  intro:
    "Un accompagnement en cinq étapes, qui commence par l’écoute de votre contexte et aboutit à un périmètre d’intervention clair, défini avec vous.",
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
  cta: { label: "Démarrer par un échange", href: routes.appointment },
} as const;

/** Publics visés (cahier des charges § 2.2 et § 6) : à qui s'adressent les services, sans référence client. */
export const audiences = {
  eyebrow: "Pour qui ?",
  titleLead: "Des structures",
  titleAccent: "aux profils variés.",
  intro:
    "Nos services s’adressent aux organisations qui veulent des outils numériques fiables, sécurisés et adaptés à leur activité. Chaque contexte est étudié avec ses propres contraintes.",
  items: [
    {
      id: "pme",
      title: "PME et PMI",
      text: "Support, gestion du parc, sécurité et évolution des équipements, selon votre activité.",
    },
    {
      id: "education",
      title: "Écoles et universités",
      text: "Salles, postes, réseau et accès, en tenant compte des périodes d’activité de l’établissement.",
    },
    {
      id: "administrations",
      title: "Administrations",
      text: "Un périmètre cadré, une documentation claire et des accès maîtrisés, selon votre organisation.",
    },
    {
      id: "commerces",
      title: "Commerces et services",
      text: "Postes, réseau, accès et surveillance, étudiés selon vos locaux et vos horaires.",
    },
    {
      id: "btp",
      title: "BTP et sites professionnels",
      text: "Couverture, alimentation, environnement et conditions d’accès pris en compte dès l’étude.",
    },
    {
      id: "particuliers",
      title: "Résidences et particuliers",
      text: "Réseau, assistance et sécurité électronique, selon les prestations retenues.",
    },
  ],
} as const;

export const homeFaq = {
  eyebrow: "Questions fréquentes",
  titleLead: "Avant de nous",
  titleAccent: "solliciter.",
  allLabel: "Toutes les questions",
  allHref: routes.faq,
} as const;
