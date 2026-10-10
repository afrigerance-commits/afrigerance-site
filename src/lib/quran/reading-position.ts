export const readingPositionKey = "mirath:quran:last-reading";
export interface ReadingPosition { chapter: number; verse: number }
export function parseReadingPosition(raw: string | null, chapters: readonly { number: number; versesCount: number }[]): ReadingPosition | null {
  try {
    const item: ReadingPosition = JSON.parse(raw ?? "null");
    const chapter = chapters.find((c) => c.number === item?.chapter);
    return chapter && Number.isInteger(item.verse) && item.verse >= 1 && item.verse <= chapter.versesCount ? { chapter: item.chapter, verse: item.verse } : null;
  } catch { return null; }
}
export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, "").replace(/[أإآٱ]/g, "ا").toLocaleLowerCase("fr").trim();
}
