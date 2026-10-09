import { afterEach, expect, it, vi } from "vitest";
import { loadFrenchRecitation } from "@/lib/quran/reciters";

const response = (chapter: number, offset: number, count: number) => ({
  status: "OK", data: { number: chapter, edition: { identifier: "fr.leclerc" },
    ayahs: Array.from({ length: count }, (_, i) => ({ number: offset + i + 1, numberInSurah: i + 1,
      audio: `https://cdn.islamic.network/quran/audio/128/fr.leclerc/${offset + i + 1}.mp3` })) },
});
afterEach(() => vi.unstubAllGlobals());
it("selects the correct global French ayah across a section boundary", async () => {
  vi.stubGlobal("fetch", vi.fn(async (url: string) => ({ ok: true, json: async () => url.includes("/surah/1/") ? response(1, 0, 7) : response(2, 7, 286) })));
  const result = await loadFrenchRecitation(1, [{ number: 1, globalNumber: 7, sourceChapter: 1, sourceVerse: 7 }, { number: 2, globalNumber: 8, sourceChapter: 2, sourceVerse: 1 }]);
  expect(result.get(1)?.[0]).toMatch(/\/fr.leclerc\/7.mp3$/);
  expect(result.get(2)?.[0]).toMatch(/\/fr.leclerc\/8.mp3$/);
});
it("refuses wrong edition, shifted numbering, and a file belonging to another ayah", async () => {
  const verses = [{ number: 1, globalNumber: 1 }];
  for (const kind of ["edition", "number", "url"]) {
    const data = response(1, 0, 7);
    if (kind === "edition") data.data.edition.identifier = "ar.alafasy";
    if (kind === "number") data.data.ayahs[0].number = 2;
    if (kind === "url") data.data.ayahs[0].audio = "https://cdn.islamic.network/quran/audio/128/fr.leclerc/2.mp3";
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => data })));
    await expect(loadFrenchRecitation(1, verses)).rejects.toThrow();
  }
});
