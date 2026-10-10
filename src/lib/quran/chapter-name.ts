export function chapterName(chapter: { number: number; nameTransliteration: string }) {
  return chapter.number === 2 ? "Al-Baqarah" : chapter.nameTransliteration;
}
