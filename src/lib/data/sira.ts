import { origins } from "./sira-course/origins";
import { mecca } from "./sira-course/mecca";
import { medina } from "./sira-course/medina";
import { laterMedina } from "./sira-course/later-medina";
import { finalYears } from "./sira-course/final-years";
import { complements } from "./sira-course/complements";
import type { SiraChapter } from "./sira-course/schema";

// Rédaction originale MIRÂTH : pas une adaptation exhaustive d’un ouvrage moderne.
// « publie » rend les routes disponibles dans le build local ; aucun déploiement implicite.
export const SIRA_PATH = "sira-prophetique";
const ordered: SiraChapter[] = [...origins, ...mecca, ...medina, ...laterMedina, ...finalYears];
for (const { before, event } of complements) {
  const index = ordered.findIndex(chapter => chapter.slug === before);
  if (index < 0) throw new Error(`Chapitre précédent absent : ${before}`);
  ordered.splice(index, 0, event);
}
export const siraEvents: SiraChapter[] = ordered.map((event, index, events) => ({
  ...event,
  evenementSuivantSlug: events[index + 1]?.slug,
}));
export const siraLessonSlugs = siraEvents.map(event => event.slug);
export function getSiraEvent(slug: string) {
  return siraEvents.find(event => event.slug === slug && event.statut === "publie");
}

export const siraQuestionCount = siraEvents.reduce((total, event) => total + event.lesson.questions.length, 0);
