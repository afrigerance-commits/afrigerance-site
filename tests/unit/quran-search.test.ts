// @vitest-environment node
import { expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { searchQuran } from "@/lib/quran/search";
import { getVerse } from "@/lib/quran/data";
it("retrouve une référence exacte sans reconstituer le texte", () => {
  const r = searchQuran("2:255");
  expect(r.total).toBe(1);
  expect(r.results[0].arabic).toBe(getVerse(2,255)?.arabic);
  expect(r.results[0].french).toBe(getVerse(2,255)?.french);
  expect(searchQuran("2:999").total).toBe(0);
});
it("cherche dans les deux langues et pagine sans doublons", () => {
  expect(searchQuran("miséricorde").total).toBeGreaterThan(0);
  expect(searchQuran("الرحمن").results.some(v => v.chapter === 1)).toBe(true);
  const first = searchQuran("Allah",1), second = searchQuran("Allah",2);
  expect(first.results).toHaveLength(20);
  expect(second.results).toHaveLength(20);
  const keys = new Set(first.results.map(v => `${v.chapter}:${v.number}`));
  expect(second.results.every(v => !keys.has(`${v.chapter}:${v.number}`))).toBe(true);
  expect(searchQuran("a").results).toHaveLength(0);
});
