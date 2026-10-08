import { describe, it, expect } from "vitest";
import { getPartitions, partitionAt } from "@/lib/quran/partitions";
import { loadSectionRecitation } from "@/lib/quran/reciters";

describe("Tanzil Quran partitions", () => {
  for (const type of ["juz", "hizb"] as const) {
    it(`covers all 6236 verses exactly once in ${type}`, () => {
      const parts = getPartitions(type);
      expect(parts).toHaveLength(type === "juz" ? 30 : 60);
      expect(parts[0].first).toBe(1);
      expect(parts.at(-1)!.last).toBe(6236);
      expect(parts.reduce((n,p) => n+p.count,0)).toBe(6236);
      parts.slice(1).forEach((p,i) => expect(p.first).toBe(parts[i].last+1));
    });
  }
  it("retains boundary verses at juz 2 and juz 30", () => {
    expect(getPartitions("juz")[1].start).toEqual({ chapter: 2, verse: 142 });
    expect(getPartitions("juz")[29].start).toEqual({ chapter: 78, verse: 1 });
    expect(partitionAt(2,141,"juz").number).toBe(1);
    expect(partitionAt(2,142,"juz").number).toBe(2);
  });
  it("maps cross-surah audio without repeating the previous surah's verse number", async () => {
    const audio = await loadSectionRecitation("everyayah.ghamdi",[
      {number:1,globalNumber:7,sourceChapter:1,sourceVerse:7},
      {number:2,globalNumber:8,sourceChapter:2,sourceVerse:1},
    ]);
    expect(audio.get(1)![0]).toContain("001007.mp3");
    expect(audio.get(2)![0]).toContain("002001.mp3");
  });
  it("rejects an inconsistent global verse rather than loading the wrong recording", async () => {
    await expect(loadSectionRecitation("everyayah.ghamdi",[{number:1,globalNumber:7,sourceChapter:2,sourceVerse:1}])).rejects.toThrow("incohérent");
  });
});
