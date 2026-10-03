import type { SiraEvent } from "@/lib/types/content";

/**
 * Contenu de démonstration couvrant quelques grandes périodes de la Sîra.
 * Les faits présentés se limitent à des éléments largement établis et
 * consensuels ; les récits dont l'authenticité varie selon les sources sont
 * explicitement signalés. Statut éditorial : en cours de vérification.
 */
export const siraEvents: SiraEvent[] = [
  {
    slug: "arabie-avant-islam",
    periode: "L'Arabie avant l'Islam",
    titre: "L'Arabie avant l'Islam (al-Jâhiliyya)",
    dateApproximative: "Avant 610 apr. J.-C.",
    presentation:
      "La péninsule Arabique avant la Révélation était organisée en tribus, avec La Mecque comme carrefour commercial et religieux autour de la Ka'ba.",
    contexte:
      "Cette période, appelée al-Jâhiliyya, précède la mission prophétique. La Mecque abritait la Ka'ba, lieu de pèlerinage pour différentes tribus arabes, dans un contexte religieux marqué par le polythéisme, aux côtés de communautés juives et chrétiennes présentes dans la péninsule.",
    localisation: "Péninsule Arabique, principalement La Mecque et Médine (alors Yathrib).",
    recits: [],
    sources: [
      {
        id: "src-jahiliyya-1",
        type: "recit_historique",
        titre: "Ar-Rahîq Al-Makhtûm (Le Nectar cacheté)",
        auteur: "Safî ar-Rahmân Al-Mubârakfûrî",
        aVerifier: true,
      },
    ],
    statut: "en_cours_de_verification",
    demonstration: true,
    evenementSuivantSlug: "naissance-prophete",
  },
  {
    slug: "naissance-prophete",
    periode: "La naissance et la jeunesse",
    titre: "La naissance du Prophète ﷺ",
    dateApproximative: "Vers 570 apr. J.-C.",
    presentation:
      "Le Prophète Muhammad ﷺ naît à La Mecque, dans la tribu de Quraych, l'année traditionnellement associée à « l'année de l'éléphant ».",
    contexte:
      "Son père 'Abdullah meurt avant sa naissance ; sa mère Âmina bint Wahb décède alors qu'il est encore enfant. Il est élevé successivement par sa nourrice Halîma puis par son grand-père 'Abd al-Muttalib, et après le décès de celui-ci, par son oncle Abû Tâlib.",
    localisation: "La Mecque",
    recits: [
      {
        texte:
          "L'année de la naissance du Prophète ﷺ est traditionnellement associée à l'expédition de l'éléphant contre La Mecque, mentionnée dans la sourate Al-Fîl.",
        statutAuthenticite: "etabli",
      },
    ],
    sources: [
      {
        id: "src-naissance-1",
        type: "coran",
        titre: "Le Coran",
        sourate: "Al-Fîl (105)",
        verset: "1-5",
      },
      {
        id: "src-naissance-2",
        type: "recit_historique",
        titre: "Ar-Rahîq Al-Makhtûm (Le Nectar cacheté)",
        auteur: "Safî ar-Rahmân Al-Mubârakfûrî",
        aVerifier: true,
      },
    ],
    statut: "en_cours_de_verification",
    demonstration: true,
    evenementSuivantSlug: "debut-revelation",
  },
  {
    slug: "debut-revelation",
    periode: "Le début de la Révélation",
    titre: "La première révélation à la grotte de Hirâ'",
    dateApproximative: "Vers 610 apr. J.-C.",
    presentation:
      "À l'âge de quarante ans, alors qu'il se retirait régulièrement dans la grotte de Hirâ' près de La Mecque, le Prophète ﷺ reçoit la première révélation.",
    contexte:
      "Les premiers versets révélés sont, selon la tradition la plus connue, ceux du début de la sourate Al-'Alaq. Cet événement marque le commencement de la mission prophétique et de la révélation coranique, qui s'échelonnera sur environ vingt-trois ans.",
    localisation: "Grotte de Hirâ', montagne proche de La Mecque",
    recits: [
      {
        texte:
          "Le récit détaillé de la rencontre avec l'ange Jibrîl (Gabriel) et les premiers mots révélés est rapporté dans les recueils de hadith authentiques ; la présente page en attend la citation précise avant publication définitive.",
        statutAuthenticite: "a_verifier",
      },
    ],
    sources: [
      {
        id: "src-revelation-1",
        type: "hadith",
        titre: "Récit du début de la révélation",
        aVerifier: true,
      },
    ],
    statut: "references_a_completer",
    demonstration: true,
    evenementSuivantSlug: "hegire",
  },
  {
    slug: "hegire",
    periode: "L'Hégire",
    titre: "L'Hégire : la migration vers Médine",
    dateApproximative: "622 apr. J.-C.",
    presentation:
      "Face à la persécution des musulmans à La Mecque, le Prophète ﷺ et ses compagnons émigrent vers Yathrib, qui prendra le nom de Médine (Madînat an-Nabî).",
    contexte:
      "Cet événement est si central qu'il marque le point de départ du calendrier musulman (hégirien). Il ouvre la période médinoise, durant laquelle se structure la première communauté musulmane.",
    localisation: "De La Mecque à Médine",
    recits: [],
    sources: [
      {
        id: "src-hegire-1",
        type: "recit_historique",
        titre: "Ar-Rahîq Al-Makhtûm (Le Nectar cacheté)",
        auteur: "Safî ar-Rahmân Al-Mubârakfûrî",
        aVerifier: true,
      },
    ],
    statut: "en_cours_de_verification",
    demonstration: true,
    evenementSuivantSlug: "conquete-mecque",
  },
  {
    slug: "conquete-mecque",
    periode: "La conquête de La Mecque",
    titre: "La conquête pacifique de La Mecque",
    dateApproximative: "630 apr. J.-C. (8 H)",
    presentation:
      "Huit ans après l'Hégire, le Prophète ﷺ entre à La Mecque à la tête d'une importante troupe de musulmans, sans combat majeur, et proclame une amnistie générale.",
    contexte:
      "Cet événement met fin à l'hostilité entre La Mecque et la communauté musulmane de Médine et s'accompagne, selon la tradition, du bris des idoles entourant la Ka'ba.",
    localisation: "La Mecque",
    recits: [],
    sources: [
      {
        id: "src-conquete-1",
        type: "recit_historique",
        titre: "Ar-Rahîq Al-Makhtûm (Le Nectar cacheté)",
        auteur: "Safî ar-Rahmân Al-Mubârakfûrî",
        aVerifier: true,
      },
    ],
    statut: "en_cours_de_verification",
    demonstration: true,
    evenementSuivantSlug: "pelerinage-adieu",
  },
  {
    slug: "pelerinage-adieu",
    periode: "Les derniers jours",
    titre: "Le pèlerinage d'adieu",
    dateApproximative: "632 apr. J.-C. (10 H)",
    presentation:
      "Le Prophète ﷺ accomplit son unique et dernier pèlerinage, à l'occasion duquel il prononce un sermon resté célèbre, peu de temps avant son rappel à Allah.",
    contexte:
      "Ce pèlerinage, dit « pèlerinage d'adieu » (hajjat al-wadâ'), est une référence majeure pour les rites du hajj tels qu'ils sont transmis dans la tradition musulmane.",
    localisation: "La Mecque et ses environs",
    recits: [
      {
        texte:
          "Le contenu précis du sermon d'adieu est rapporté par plusieurs chaînes de transmission ; sa citation complète et référencée sera ajoutée après vérification des éditions de hadith utilisées.",
        statutAuthenticite: "a_verifier",
      },
    ],
    sources: [
      {
        id: "src-pelerinage-1",
        type: "hadith",
        titre: "Sermon du pèlerinage d'adieu",
        aVerifier: true,
      },
    ],
    statut: "references_a_completer",
    demonstration: true,
  },
];

export function getSiraEvent(slug: string) {
  return siraEvents.find((event) => event.slug === slug);
}
