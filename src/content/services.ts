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

export type ServicePole = {
  id: PoleId;
  title: string;
  /** Liste courte affichée sur l'accueil. */
  description: string;
  /** Phrase d'introduction du pôle sur la page Services. */
  summary: string;
  prestations: Prestation[];
  /** Section du pôle sur la page Services. */
  href: string;
  /** Formulaire de devis avec le pôle présélectionné. */
  quoteHref: string;
};

export const servicePoles: ServicePole[] = [
  {
    id: "infogerance",
    title: "Infogérance",
    description:
      "Gestion du parc, support, infrastructures, cybersécurité, téléphonie IP, sauvegardes et audit.",
    summary:
      "La gestion et le suivi de votre informatique au quotidien, pour disposer d’outils fiables, sécurisés et adaptés à votre activité.",
    href: `${routes.services}#infogerance`,
    quoteHref: `${routes.quote}?pole=infogerance`,
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
          "Installation ou évolution de vos serveurs et postes de travail : préparation, configuration, mise en service et documentation.",
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
          "Téléphonie passant par votre réseau informatique : étude du besoin, configuration des postes et suivi de leur fonctionnement.",
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
    title: "Intégration de solutions technologiques",
    description:
      "Câblage réseau Ethernet et fibre, installation de systèmes de vidéosurveillance, contrôle d’accès biométrique, systèmes de pointage et sécurité incendie.",
    summary:
      "L’étude, l’installation et la mise en service des équipements techniques de vos locaux : réseau, surveillance, accès et sécurité.",
    href: `${routes.services}#integration`,
    quoteHref: `${routes.quote}?pole=integration`,
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
  if (!pole) throw new Error(`Pôle inconnu : ${id}`);
  return pole;
}
