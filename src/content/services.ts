/**
 * Les deux pôles de services d'AFRIGÉRANCE et leurs prestations.
 * Utilisé par l'accueil, la page Services, la page À propos et le formulaire de devis.
 * Toute précision (périmètre, délai, disponibilité) doit être validée avant d'être ajoutée.
 */
import { routes } from "./site";

export const poleIds = ["infogerance", "integration"] as const;
export type PoleId = (typeof poleIds)[number];

export function isPoleId(value: unknown): value is PoleId {
  return typeof value === "string" && (poleIds as readonly string[]).includes(value);
}

export type Prestation = {
  id: string;
  title: string;
  description: string;
};

export type PoleObjective = {
  title: string;
  text: string;
};

export type ServicePole = {
  id: PoleId;
  /** Numéro affiché devant le pôle (01, 02). */
  index: string;
  title: string;
  /** Titre court (étiquettes, menus). */
  shortTitle: string;
  /** Titre du bandeau de la fiche détaillée : partie droite puis partie en italique. */
  heroLead: string;
  heroAccent: string;
  /** Liste courte affichée sur l'accueil. */
  description: string;
  /** Phrase d'introduction du pôle sur la page Services. */
  summary: string;
  prestations: Prestation[];
  /** Besoins auxquels répond le pôle (fiche détaillée). Aucun résultat chiffré ni engagement. */
  objectives: PoleObjective[];
  /** Précisions sur le périmètre, reprises du cahier des charges. */
  notes: string[];
  /** Fiche détaillée du pôle. */
  href: string;
  /** Formulaire de devis avec le pôle présélectionné. */
  quoteHref: string;
};

export const servicePoles: ServicePole[] = [
  {
    id: "infogerance",
    index: "01",
    title: "Infogérance",
    shortTitle: "Infogérance",
    heroLead: "Infogérance :",
    heroAccent: "votre informatique, suivie au quotidien.",
    description:
      "Gestion du parc, support, infrastructures, cybersécurité, téléphonie IP, sauvegardes et audit.",
    summary:
      "La gestion et le suivi de votre informatique au quotidien, pour disposer d’outils fiables, sécurisés et adaptés à votre activité.",
    href: routes.serviceInfogerance,
    quoteHref: `${routes.quote}?pole=infogerance`,
    objectives: [
      { title: "Des outils fiables", text: "Des postes, des serveurs et des logiciels suivis, pour que vos équipes travaillent sans interruption inutile." },
      { title: "Des données protégées", text: "Des accès maîtrisés, des sauvegardes vérifiées et des utilisateurs sensibilisés aux bons réflexes." },
      { title: "Une informatique lisible", text: "Un état des lieux clair de votre parc et des priorités définies avec vous, pour décider en connaissance de cause." },
      { title: "Des coûts maîtrisés", text: "Des recommandations pour améliorer la fiabilité de vos équipements et anticiper leurs évolutions." },
    ],
    notes: [
      "Le périmètre, la fréquence des interventions, les canaux et les horaires d’assistance sont définis avec vous lors du devis.",
      "Les objectifs de reprise après incident sont fixés avec vous, selon vos données et votre activité.",
    ],
    prestations: [
      {
        id: "parc",
        title: "Gestion du parc informatique",
        description:
          "Maintenance préventive et corrective, suivi des postes et des serveurs, inventaire et recommandations. Le périmètre et la fréquence sont définis selon votre parc.",
      },
      {
        id: "support",
        title: "Support aux utilisateurs",
        description:
          "Assistance à vos utilisateurs et résolution des incidents, selon les canaux et les horaires convenus avec vous.",
      },
      {
        id: "infrastructures",
        title: "Infrastructures",
        description:
          "Installation ou évolution de vos serveurs et postes de travail : préparation, configuration, mise en service et documentation.",
      },
      {
        id: "cybersecurite",
        title: "Cybersécurité",
        description:
          "Protection de vos postes, de vos accès et de vos données selon votre contexte, et sensibilisation de vos équipes aux bons réflexes.",
      },
      {
        id: "telephonie",
        title: "Téléphonie IP",
        description:
          "Téléphonie passant par votre réseau informatique : étude du besoin, configuration des postes et suivi de leur fonctionnement.",
      },
      {
        id: "sauvegardes",
        title: "Sauvegardes",
        description:
          "Stratégie de sauvegarde adaptée à vos données et vérification des restaurations. Les objectifs de reprise sont définis avec vous.",
      },
      {
        id: "audit",
        title: "Audit",
        description:
          "État des lieux de vos équipements, de vos usages et des difficultés rencontrées, avec des priorités et des recommandations pour gagner en fiabilité et maîtriser vos coûts.",
      },
    ],
  },
  {
    id: "integration",
    index: "02",
    title: "Intégration de solutions technologiques",
    shortTitle: "Intégration",
    heroLead: "Intégration de solutions",
    heroAccent: "technologiques.",
    description:
      "Câblage réseau Ethernet et fibre, installation de systèmes de vidéosurveillance, contrôle d’accès biométrique, systèmes de pointage et sécurité incendie.",
    summary:
      "L’étude, l’installation et la mise en service des équipements techniques de vos locaux : réseau, surveillance, accès et sécurité.",
    href: routes.serviceIntegration,
    quoteHref: `${routes.quote}?pole=integration`,
    objectives: [
      { title: "Un réseau solide", text: "Un câblage cuivre ou fibre étudié pour vos locaux, raccordé et testé liaison par liaison." },
      { title: "Des sites surveillés", text: "Des caméras implantées selon les zones à couvrir, avec un enregistrement et, si possible, un accès à distance." },
      { title: "Des accès maîtrisés", text: "Des zones et des profils d’accès définis avec vous, dans le respect des règles sur les données personnelles." },
      { title: "Des locaux mieux protégés", text: "Des équipements de pointage et de sécurité incendie adaptés à votre organisation et à votre site." },
    ],
    notes: [
      "Chaque projet commence par l’étude de votre site : zones, contraintes d’installation, équipements existants.",
      "Les interventions sur une installation existante se font après diagnostic, selon les informations, les accès et les équipements disponibles.",
    ],
    prestations: [
      {
        id: "cablage",
        title: "Câblage réseau Ethernet et fibre",
        description:
          "Étude de vos locaux, pose du câblage cuivre (Ethernet) ou en fibre optique, raccordement et tests des liaisons.",
      },
      {
        id: "videosurveillance",
        title: "Vidéosurveillance",
        description:
          "Étude du site, implantation des caméras, choix des équipements et de l’enregistreur, configuration et, si possible, accès à distance.",
      },
      {
        id: "controle-acces",
        title: "Contrôle d’accès biométrique",
        description:
          "Étude des zones et des profils d’accès, installation et paramétrage de lecteurs biométriques, en tenant compte des règles sur les données personnelles.",
      },
      {
        id: "pointage",
        title: "Systèmes de pointage",
        description:
          "Installation de pointeuses et paramétrage de la collecte des présences, selon votre organisation et les règles applicables.",
      },
      {
        id: "incendie",
        title: "Sécurité incendie",
        description:
          "Étude de vos locaux et installation d’équipements de sécurité incendie adaptés à votre site.",
      },
    ],
  },
];

export function getPole(id: PoleId): ServicePole {
  const pole = servicePoles.find((item) => item.id === id);
  if (!pole) throw new Error(`Pôle inconnu : ${id}`);
  return pole;
}
