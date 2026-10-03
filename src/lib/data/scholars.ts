import type { Scholar } from "@/lib/types/content";

/** Encyclopédie de démonstration — fiches à valider avant publication définitive. */
export const scholars: Scholar[] = [
  {
    slug: "abu-bakr-as-siddiq",
    nomArabe: "أبو بكر الصديق",
    transcriptionFrancaise: "Abû Bakr As-Siddîq",
    categorie: "compagnon",
    presentation:
      "Compagnon le plus proche du Prophète ﷺ, connu pour avoir immédiatement cru en lui lors du récit du voyage nocturne (al-isrâ' wal-mi'râj), ce qui lui valut le surnom d'As-Siddîq (« le véridique »). Il devient le premier calife après la mort du Prophète ﷺ.",
    chronologie: [
      { date: "Avant l'Islam", evenement: "Marchand respecté à La Mecque, proche du Prophète ﷺ." },
      { date: "Vers 632 apr. J.-C.", evenement: "Élu premier calife de la communauté musulmane." },
      { date: "Vers 634 apr. J.-C.", evenement: "Fin de son califat, à préciser après vérification des sources." },
    ],
    sources: [
      {
        id: "src-abubakr-1",
        type: "recit_historique",
        titre: "Al-Bidâya wa An-Nihâya",
        auteur: "Ibn Kathîr",
        aVerifier: true,
      },
    ],
    statut: "en_cours_de_verification",
    demonstration: true,
  },
  {
    slug: "aicha-bint-abi-bakr",
    nomArabe: "عائشة بنت أبي بكر",
    transcriptionFrancaise: "'Â'icha bint Abî Bakr",
    categorie: "compagnonne",
    presentation:
      "Épouse du Prophète ﷺ et fille d'Abû Bakr, elle est connue pour avoir transmis un très grand nombre de hadiths et pour sa connaissance approfondie de la jurisprudence islamique, consultée par de nombreux compagnons après la mort du Prophète ﷺ.",
    chronologie: [
      { date: "À préciser", evenement: "Mariage avec le Prophète ﷺ — dates à vérifier auprès de sources biographiques fiables." },
      { date: "Après 632 apr. J.-C.", evenement: "Référence majeure pour la transmission du hadith et du fiqh." },
    ],
    sources: [
      {
        id: "src-aicha-1",
        type: "recit_historique",
        titre: "Référence biographique à compléter",
        aVerifier: true,
      },
    ],
    statut: "references_a_completer",
    demonstration: true,
  },
  {
    slug: "imam-malik-ibn-anas",
    nomArabe: "مالك بن أنس",
    transcriptionFrancaise: "L'imam Mâlik ibn Anas",
    categorie: "imam",
    presentation:
      "Savant de Médine et fondateur éponyme de l'école malikite, auteur du Muwatta', l'un des plus anciens recueils de hadith et de droit islamique organisés par thème.",
    chronologie: [
      { date: "Médine", evenement: "Formation auprès des savants de Médine et transmission du savoir prophétique." },
      { date: "À préciser", evenement: "Rédaction et transmission du Muwatta' — dates précises à vérifier." },
    ],
    sources: [
      {
        id: "src-malik-1",
        type: "recit_historique",
        titre: "Référence biographique à compléter",
        aVerifier: true,
      },
    ],
    statut: "references_a_completer",
    demonstration: true,
  },
];

export function getScholar(slug: string) {
  return scholars.find((s) => s.slug === slug);
}
