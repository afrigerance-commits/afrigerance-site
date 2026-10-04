/**
 * Questions fréquentes, reprises du cahier des charges (§ 7).
 * Seules les réponses confirmées sont publiées : gratuité du devis, zones d'intervention,
 * maintenance récurrente et assistance 24 h/24 restent à valider par AFRIGÉRANCE avant d'être ajoutées.
 */
import { routes } from "./site";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  /** Lien facultatif sous la réponse. */
  link?: { label: string; href: string };
};

export type FaqGroup = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "demandes",
    title: "Vos demandes",
    items: [
      {
        id: "devis",
        question: "Comment demander un devis ?",
        answer:
          "Choisissez le ou les pôles concernés, répondez à quelques questions et décrivez votre besoin dans le formulaire de demande de devis. Des précisions ou un échange peuvent être nécessaires avant tout chiffrage : aucun tarif n’est calculé en ligne.",
        link: { label: "Demander un devis", href: routes.quote },
      },
      {
        id: "renseignements",
        question: "Quels renseignements préparer ?",
        answer:
          "Le site ou les locaux concernés et la ville d’intervention, le nombre approximatif d’utilisateurs ou d’équipements, la situation actuelle et le résultat souhaité, vos contraintes de calendrier et vos coordonnées. Ne transmettez jamais de mot de passe ni de donnée sensible.",
      },
      {
        id: "apres-envoi",
        question: "Que se passe-t-il après l’envoi de ma demande ?",
        answer:
          "Votre demande est enregistrée et une référence s’affiche à l’écran. Notre équipe prend connaissance des éléments et vous contacte selon les modalités que vous avez indiquées.",
      },
      {
        id: "rendez-vous",
        question: "Comment prendre rendez-vous ?",
        answer:
          "Indiquez le motif, le mode de rencontre souhaité et vos disponibilités dans le formulaire de rendez-vous. Il s’agit d’une demande : AFRIGÉRANCE vous contacte pour confirmer le créneau ou vous proposer une autre disponibilité.",
        link: { label: "Prendre rendez-vous", href: routes.appointment },
      },
    ],
  },
  {
    id: "interventions",
    title: "Nos interventions",
    items: [
      {
        id: "deroulement",
        question: "Comment se déroule une intervention ?",
        answer:
          "En cinq étapes : un échange initial sur votre activité et vos priorités, la qualification du besoin, une proposition détaillée (périmètre, options, exclusions), la planification et la réalisation, puis la vérification avec vous et le suivi convenu.",
        link: { label: "Découvrir notre démarche", href: `${routes.about}#demarche` },
      },
      {
        id: "existant",
        question: "Pouvez-vous intervenir sur une installation existante ?",
        answer:
          "Oui, après diagnostic, et sous réserve des informations, des accès et des équipements nécessaires. Précisez-le dans votre demande : la question vous est posée dans le formulaire de devis.",
      },
      {
        id: "delai",
        question: "Quel est le délai d’intervention ?",
        answer:
          "Il dépend de votre besoin, des équipements concernés et de la localisation du site. Il est défini avec vous lors de l’étude de votre demande.",
      },
    ],
  },
  {
    id: "donnees",
    title: "Vos données",
    items: [
      {
        id: "donnees",
        question: "Comment mes données sont-elles utilisées ?",
        answer:
          "Les informations transmises par les formulaires servent uniquement au traitement de votre demande. Elles sont enregistrées dans un espace protégé, accessible aux seules personnes habilitées d’AFRIGÉRANCE.",
        link: { label: "Données personnelles", href: routes.privacy },
      },
    ],
  },
];

export const allFaqItems = faqGroups.flatMap((group) => group.items);

/** Questions reprises sur l'accueil (cahier des charges : devis, déroulement, rendez-vous). */
export const homeFaqIds = ["devis", "deroulement", "existant", "rendez-vous"];

export function faqItems(ids: string[]): FaqItem[] {
  return ids
    .map((id) => allFaqItems.find((item) => item.id === id))
    .filter((item): item is FaqItem => item !== undefined);
}
