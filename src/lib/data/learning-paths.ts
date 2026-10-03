import type { LearningPath } from "@/lib/types/content";

export const learningPaths: LearningPath[] = [
  {
    slug: "bases-de-son-din",
    titre: "Apprendre les bases de son dîn",
    description: "Un point de départ pour qui souhaite consolider les fondements de sa pratique.",
    niveauRequis: "aucun",
    etapes: [
      { titre: "Introduction au madhhab malikite", lienHref: "/fiqh/malikite/purification/introduction-madhhab-malikite" },
      { titre: "La purification (Ṭahâra)", lienHref: "/fiqh/malikite/purification" },
      { titre: "Découvrir la vie du Prophète ﷺ", lienHref: "/sira" },
    ],
    demonstration: true,
  },
  {
    slug: "comprendre-la-purification",
    titre: "Comprendre la purification",
    description: "Le parcours complet sur la ṭahâra : eau, ablutions, ghusl et tayammum.",
    niveauRequis: "aucun",
    etapes: [
      { titre: "L’eau et la purification", lienHref: "/fiqh/malikite/purification/leau-et-la-purification" },
      { titre: "Les ablutions (al-wudû')", lienHref: "/fiqh/malikite/purification/les-ablutions" },
      { titre: "Le tayammum", lienHref: "/fiqh/malikite/purification/le-tayammum" },
    ],
    demonstration: true,
  },
  {
    slug: "decouvrir-la-vie-du-prophete",
    titre: "Découvrir la vie du Prophète ﷺ",
    description: "Une traversée chronologique de la Sîra, des origines à La Mecque jusqu’au pèlerinage d’adieu.",
    niveauRequis: "aucun",
    etapes: [
      { titre: "L’Arabie avant l’Islam", lienHref: "/sira/arabie-avant-islam" },
      { titre: "La naissance du Prophète ﷺ", lienHref: "/sira/naissance-prophete" },
      { titre: "L’Hégire", lienHref: "/sira/hegire" },
      { titre: "La conquête de La Mecque", lienHref: "/sira/conquete-mecque" },
    ],
    demonstration: true,
  },
  {
    slug: "decouvrir-les-grandes-figures",
    titre: "Découvrir les grandes figures de l’Islam",
    description: "Une première rencontre avec quelques compagnons et savants majeurs.",
    niveauRequis: "aucun",
    etapes: [
      { titre: "Abû Bakr As-Siddîq", lienHref: "/compagnons/abu-bakr-as-siddiq" },
      { titre: "'Â’icha bint Abî Bakr", lienHref: "/compagnons/aicha-bint-abi-bakr" },
      { titre: "L’imam Mâlik ibn Anas", lienHref: "/compagnons/imam-malik-ibn-anas" },
    ],
    demonstration: true,
  },
];

export function getLearningPath(slug: string) {
  return learningPaths.find((p) => p.slug === slug);
}
