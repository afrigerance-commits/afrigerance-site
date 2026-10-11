import type { LearningLesson, SiraEvent, SourceReference } from "@/lib/types/content";

export interface SiraChapter extends SiraEvent {
  lesson: LearningLesson;
  vigilance: string;
}

const quranLinks: Record<string, string> = {
  "106:1-4": "https://quran.com/quraysh",
  "26:214-215": "https://quran.com/ash-shuara/214-215",
  "28:56": "https://quran.com/al-qasas/56",
  "3:123-127": "https://quran.com/ali-imran/123-127",
  "3:152-153": "https://quran.com/3/152",
};
export const quran = (chapter: number, verses: string): SourceReference => ({
  id: `coran-${chapter}-${verses}`, type: "coran", titre: "Le Coran",
  sourate: String(chapter), verset: verses, lienExterne: quranLinks[`${chapter}:${verses}`] ?? `https://quran.com/${chapter}/${verses}`,
  dateVerification: "2026-10-11",
});
export const hadith = (collection: "bukhari" | "muslim", number: string): SourceReference => ({
  id: `${collection}-${number}`, type: "hadith",
  titre: collection === "bukhari" ? "Sahîh al-Bukhârî" : "Sahîh Muslim",
  numeroHadith: number, lienExterne: `https://sunnah.com/${collection}:${number}`,
  gradeAuthenticite: `Sahîh — recueil ${collection === "bukhari" ? "d’al-Bukhârî" : "de Muslim"}`,
  dateVerification: "2026-10-11",
});
export function chapter(input: {
  slug: string; titre: string; periode: string; date: string; objectif: string;
  sections: LearningLesson["sections"]; retenir: string[]; sources: SourceReference[];
  vigilance: string; exercice: string; correction: string;
  questions: LearningLesson["questions"];
}): SiraChapter {
  const words = input.sections.flatMap(section => section.paragraphes).join(" ").split(/\s+/).length;
  return {
    slug: input.slug, titre: input.titre, periode: input.periode,
    dateApproximative: input.date, presentation: input.objectif,
    contexte: "Cours original MIRÂTH. Les récits sont reformulés en français ; les analyses pédagogiques sont identifiées séparément. Consultez les références pour les textes intégraux.",
    recits: [], sources: input.sources, statut: "publie", derniereMiseAJour: "2026-10-11",
    vigilance: input.vigilance,
    lesson: {
      slug: input.slug, titre: input.titre, objectif: input.objectif,
      minutes: Math.max(4, Math.ceil(words / 160) + 3), sections: input.sections,
      retenir: input.retenir, exercice: input.exercice, correction: input.correction,
      questions: input.questions,
      ressources: input.sources.map(source => ({ label: `${source.titre} ${source.numeroHadith ?? `${source.sourate}:${source.verset}`}`, href: source.lienExterne! })),
    },
  };
}

export function question(question: string, correct: string, alternatives: [string, string], explanation: string, answer = 0) {
  const options = [...alternatives];
  options.splice(answer, 0, correct);
  return { question, options, answer, explanation };
}
