import { globalVerse, partitionAt } from "@/lib/quran/partitions";

export function verseReadingLocation(chapter: number, verse: number) {
  const juz = partitionAt(chapter, verse, "juz");
  const global = globalVerse(chapter, verse);
  return {
    key: `${chapter}:${verse}`, chapter, verse,
    juz: juz.number, juzPosition: global - juz.first + 1, juzCount: juz.count,
    startsJuz: global === juz.first, endsJuz: global === juz.last,
  };
}
export type VerseReadingLocation = ReturnType<typeof verseReadingLocation>;

/** The last verse whose top has reached the reading line; long verses stay current. */
export function readingIndexAt(tops: number[], line: number) {
  let index = 0;
  for (let i = 0; i < tops.length; i++) {
    if (tops[i] > line) break;
    index = i;
  }
  return index;
}
