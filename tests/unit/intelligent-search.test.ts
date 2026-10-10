// @vitest-environment node
import { expect,it,vi } from "vitest";
vi.mock("server-only",()=>({}));
import { relevance } from "@/lib/search/match";
import { hadithSearchIndex } from "@/lib/search/hadith-index";
import { getHadithsForBook } from "@/lib/hadith/data";
import { chapterName } from "@/lib/quran/chapter-name";
it("finds Fajr in the Muwatta prayer times by its existing French meaning",()=>{
  const found=hadithSearchIndex().filter(r=>r.collection === "muwatta" && relevance("Fajr Mouwatta",r.searchText!,r.titre)>0);
  const dawn=found.find(r=>r.href === "/hadith/muwatta/1#hadith-3");
  expect(dawn).toBeDefined();
  expect(dawn!.description).toContain("aurore");
  expect(getHadithsForBook("muwatta",1).find(h=>h.numero===3)?.francais.startsWith(dawn!.description.slice(0,-1))).toBe(true);
});
it("uses exact pagination and anchors from the existing edition",()=>{
  const indexed=hadithSearchIndex().filter(r=>r.href.startsWith("/hadith/muwatta/1"));
  const book=getHadithsForBook("muwatta",1);
  expect(indexed[20].href).toBe(`/hadith/muwatta/1?page=2#hadith-${book[20].numero}`);
  expect(new Set(hadithSearchIndex().map(r=>r.href)).size).toBe(hadithSearchIndex().length);
});
it("matches spelling variants and all terms without matching unrelated words",()=>{
  expect(relevance("Fajr", "la prière de l’aurore")).toBeGreaterThan(0);
  expect(relevance("Sobh", "صلاة الفجر")).toBeGreaterThan(0);
  expect(relevance("Fajr Mouwatta", "Al-Muwatta : prière de l’aube")).toBeGreaterThan(0);
  expect(relevance("Fajr dettes", "prière de l’aurore")).toBe(0);
  expect(relevance("asr", "désastre")).toBe(0);
  expect(relevance("Al Baqarah", "Al-Baqara")).toBeGreaterThan(0);
  expect(relevance("a", "Allah")).toBe(0);
  expect(chapterName({number:2,nameTransliteration:"Al-Baqara"})).toBe("Al-Baqarah");
});
