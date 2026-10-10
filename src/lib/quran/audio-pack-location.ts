import { getPartitions } from "./partitions";
import { verseReference } from "./reading-plan";
import chapters from "../../../data/quran/chapters-meta.json";
export function audioPackLocation(pack: { chapter: number; first: number; last: number }) {
  if (Number.isInteger(pack.first) && pack.first >= 1 && Number.isInteger(pack.last) && pack.last <= 6236 && pack.last >= pack.first) {
    for (const type of ["juz", "hizb"] as const) {
      const part = getPartitions(type).find(p => p.first === pack.first && p.last === pack.last);
      if (part) return { label: `${type === "juz" ? "Juz" : "Hizb"} ${part.number}`, href: `/coran/lecture/${type}/${part.number}` };
    }
    const start = verseReference(pack.first);
    return { label: `${chapters[start.chapter - 1].nameFrench} · depuis le verset ${start.verse}`, href: `/coran/${start.chapter}#verset-${start.verse}` };
  }
  const chapter = chapters.find(c => c.number === pack.chapter) ?? chapters[0];
  return { label: chapter.nameFrench, href: `/coran/${chapter.number}` };
}
