import type { LearningPath } from "@/lib/types/content";

/** Parcours composés uniquement de pages accessibles et de sources affichées. */
export const learningPaths: LearningPath[] = [
  {
    slug: "lire-le-coran",
    titre: "Découvrir le lecteur du Coran",
    description: "Explorer les sourates, leur texte arabe, la traduction et le lecteur audio.",
    niveauRequis: "aucun",
    etapes: [
      { titre: "Choisir une sourate", lienHref: "/coran" },
      { titre: "Lire Al-Fâtiha", lienHref: "/coran/1" },
      { titre: "Poursuivre avec Al-Baqara", lienHref: "/coran/2" },
    ],
  },
  {
    slug: "explorer-les-recueils-de-hadith",
    titre: "Explorer les recueils de hadith",
    description: "Découvrir l'organisation des trois recueils accessibles et leurs livres thématiques.",
    niveauRequis: "aucun",
    etapes: [
      { titre: "Voir les recueils", lienHref: "/hadith" },
      { titre: "Parcourir Al-Muwatta'", lienHref: "/hadith/muwatta" },
      { titre: "Parcourir Sahîh Al-Bukhârî", lienHref: "/hadith/boukhari" },
    ],
  },
  {
    slug: "decouvrir-la-bibliotheque",
    titre: "Découvrir la bibliothèque MIRÂTH",
    description: "Identifier les ouvrages du corpus, leurs éditions connues et leur statut de droits.",
    niveauRequis: "aucun",
    etapes: [
      { titre: "Parcourir la bibliothèque", lienHref: "/bibliotheque" },
      { titre: "Lire la notice d'Al-Akhdarî", lienHref: "/bibliotheque/mukhtasar-al-akhdari" },
      { titre: "Lire la notice du Nectar cacheté", lienHref: "/bibliotheque/ar-rahiq-al-makhtum" },
    ],
  },
];

export function getLearningPath(slug: string) {
  return learningPaths.find((path) => path.slug === slug);
}
