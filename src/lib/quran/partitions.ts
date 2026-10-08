import boundaries from "../../../data/quran/partitions.json";
import chapters from "../../../data/quran/chapters-meta.json";

export type PartitionType = "juz" | "hizb";
export function globalVerse(chapter: number, verse: number) {
  return chapters.filter(c => c.number < chapter).reduce((sum, c) => sum + c.versesCount, 0) + verse;
}
export function getPartitions(type: PartitionType) {
  return boundaries[type].map((start, index, all) => {
    const next = all[index + 1];
    const first = globalVerse(start.chapter, start.verse);
    const last = next ? globalVerse(next.chapter, next.verse) - 1 : 6236;
    const endChapter = chapters.find(c => globalVerse(c.number, c.versesCount) >= last)!;
    return { number: index + 1, start, first, last, count: last - first + 1, end: { chapter: endChapter.number, verse: last - globalVerse(endChapter.number, 1) + 1 } };
  });
}
export function partitionAt(chapter: number, verse: number, type: PartitionType) {
  const number = globalVerse(chapter, verse);
  return getPartitions(type).find(p => p.first <= number && p.last >= number)!;
}
