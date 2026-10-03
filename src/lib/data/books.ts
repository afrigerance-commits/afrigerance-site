import type { Book } from "@/lib/types/content";

/**
 * Fiches de démonstration. Aucun fichier n'est fourni ni aucun lien de
 * téléchargement fabriqué : seules des fiches bibliographiques et, le cas
 * échéant, des liens vers des sources externes réputées sont indiqués.
 */
export const books: Book[] = [
  {
    slug: "ar-risala-ibn-abi-zayd",
    titreOriginal: "الرسالة",
    titreFrancais: "Ar-Risâla (L'Épître)",
    auteur: "Ibn Abî Zayd Al-Qayrawânî",
    discipline: "Fiqh malikite",
    langue: "Arabe (traductions existantes à référencer)",
    presentation:
      "Abrégé classique de jurisprudence malikite, utilisé depuis des siècles comme texte d'introduction dans les écoles malikites, notamment en Afrique du Nord et de l'Ouest.",
    referencesBibliographiques: "Édition de référence à documenter par le vérificateur avant publication.",
    droits: "droits_non_verifies",
    demonstration: true,
  },
  {
    slug: "muwatta-imam-malik",
    titreOriginal: "الموطأ",
    titreFrancais: "Al-Muwatta'",
    auteur: "L'imam Mâlik ibn Anas",
    discipline: "Hadith / Fiqh malikite",
    langue: "Arabe (traductions existantes à référencer)",
    presentation:
      "L'un des plus anciens recueils organisant hadiths, avis des compagnons et jurisprudence par thème, fondateur pour l'école malikite.",
    referencesBibliographiques: "Édition de référence à documenter par le vérificateur avant publication.",
    droits: "droits_non_verifies",
    demonstration: true,
  },
  {
    slug: "mukhtasar-khalil",
    titreOriginal: "مختصر خليل",
    titreFrancais: "Mukhtasar Khalîl",
    auteur: "Khalîl ibn Ishâq Al-Jundî",
    discipline: "Fiqh malikite",
    langue: "Arabe",
    presentation:
      "Abrégé de référence du fiqh malikite, largement commenté dans la tradition malikite classique.",
    droits: "droits_non_verifies",
    demonstration: true,
  },
  {
    slug: "sahih-al-bukhari",
    titreOriginal: "صحيح البخاري",
    titreFrancais: "Sahîh Al-Bukhârî",
    auteur: "L'imam Al-Bukhârî",
    discipline: "Hadith",
    langue: "Arabe (traductions existantes à référencer)",
    presentation:
      "Recueil de hadiths considéré par la tradition sunnite comme l'un des plus rigoureux sur le plan de l'authentification des chaînes de transmission.",
    droits: "consultation_externe",
    lienConsultationExterne: "https://sunnah.com/bukhari",
    demonstration: true,
  },
  {
    slug: "sahih-muslim",
    titreOriginal: "صحيح مسلم",
    titreFrancais: "Sahîh Muslim",
    auteur: "L'imam Muslim ibn Al-Hajjâj",
    discipline: "Hadith",
    langue: "Arabe (traductions existantes à référencer)",
    presentation: "Second des deux recueils de hadiths les plus authentifiés selon la tradition sunnite (les deux Sahîh).",
    droits: "consultation_externe",
    lienConsultationExterne: "https://sunnah.com/muslim",
    demonstration: true,
  },
  {
    slug: "ar-rahiq-al-makhtum",
    titreOriginal: "الرحيق المختوم",
    titreFrancais: "Ar-Rahîq Al-Makhtûm (Le Nectar cacheté)",
    auteur: "Safî ar-Rahmân Al-Mubârakfûrî",
    discipline: "Sîra",
    langue: "Arabe (traductions existantes à référencer)",
    presentation:
      "Biographie du Prophète ﷺ largement diffusée, ayant reçu un prix lors d'un concours organisé par la Ligue islamique mondiale.",
    droits: "droits_non_verifies",
    demonstration: true,
  },
];

export function getBook(slug: string) {
  return books.find((b) => b.slug === slug);
}

export const rightsStatusLabels: Record<Book["droits"], string> = {
  librement_diffusable: "Fichier librement diffusable",
  diffusion_autorisee: "Diffusion autorisée",
  consultation_externe: "Consultation externe uniquement",
  droits_non_verifies: "Droits non vérifiés — pas de mise en téléchargement",
};
