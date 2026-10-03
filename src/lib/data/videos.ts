import type { Video } from "@/lib/types/content";

/**
 * Aucune vraie vidéo YouTube du fondateur n’existe encore sur cette instance
 * de démonstration : plutôt que de fabriquer un faux lien, chaque fiche a un
 * youtubeId vide et s’affiche comme emplacement "à configurer" (voir
 * VideoCard). Un administrateur ajoute le vrai lien depuis /admin/videos.
 */
export const videos: Video[] = [
  {
    slug: "exemple-cours-purification",
    titre: "[Exemple] Cours vidéo : la purification en Islam",
    description: "Emplacement de démonstration — à relier à une vraie vidéo YouTube depuis l’administration.",
    categorie: "Fiqh malikite",
    youtubeId: "",
    demonstration: true,
  },
  {
    slug: "exemple-sira-hegire",
    titre: "[Exemple] La Sîra racontée : l’Hégire",
    description: "Emplacement de démonstration — à relier à une vraie vidéo YouTube depuis l’administration.",
    categorie: "Sîra",
    youtubeId: "",
    demonstration: true,
  },
  {
    slug: "exemple-rappel-vendredi",
    titre: "[Exemple] Rappel du vendredi",
    description: "Emplacement de démonstration — à relier à une vraie vidéo YouTube depuis l’administration.",
    categorie: "Rappels",
    youtubeId: "",
    demonstration: true,
  },
];

export function getVideo(slug: string) {
  return videos.find((v) => v.slug === slug);
}
