import { describe, expect, it } from "vitest";
import { getPartitions } from "@/lib/quran/partitions";
import { initialPlan, parseReadingPlan, nextKhatmSession, goalVerseCount, localDate, verseReference, TOTAL_VERSES } from "@/lib/quran/reading-plan";
import { parseVerseNotes } from "@/lib/quran/notes";
import { validMemorization, memorizationNext } from "@/lib/quran/memorization";
import { normalizeSearch } from "@/lib/quran/reading-position";
describe("Lecture déclarée et khatm", () => {
  it("répartit exactement tous les versets, sans saut ni doublon", () => {
    let completed = 0;
    for (let days = 30; days > 0; days--) {
      const session = nextKhatmSession(completed,days)!;
      expect(session.first).toBe(completed+1);
      expect(session.count).toBe(session.last-session.first+1);
      completed = session.last;
    }
    expect(completed).toBe(TOTAL_VERSES);
    expect(nextKhatmSession(completed,30)).toBeNull();
  });
  it("replanifie le reste sans annuler le passé", () => {
    expect(nextKhatmSession(3000,20)).toMatchObject({ first: 3001, count: 162 });
    expect(nextKhatmSession(6230,30)).toMatchObject({ first: 6231, last: 6231 });
  });
  it("convertit toutes les limites globales en références exactes", () => {
    for (const p of getPartitions("juz")) { expect(verseReference(p.first)).toEqual(p.start); expect(verseReference(p.last)).toEqual(p.end); }
  });
  it("compte un Juz et un Hizb depuis leur vraie limite", () => {
    expect(goalVerseCount("juz",1,149)).toBe(getPartitions("juz")[1].count);
    expect(goalVerseCount("hizb",1,1)).toBe(getPartitions("hizb")[0].count);
    expect(goalVerseCount("versets",10,6235)).toBe(2);
  });
  it("rejette des plans malformés et conserve seulement des logs valides", () => {
    expect(parseReadingPlan('{"days":-1}')).toEqual(initialPlan);
    expect(parseReadingPlan(JSON.stringify({ ...initialPlan, logs: { "2026-10-10": 20, bad: 3, "2026-10-11": -2 } })).logs).toEqual({ "2026-10-10": 20 });
    expect(localDate(new Date(2026,9,10,23,50))).toBe("2026-10-10");
  });
});
describe("Notes et normalisation", () => {
  it("conserve une note valide et rejette les références et contenus invalides", () => {
    const note = { chapter: 1, verse: 7, text: "Mon observation", updated: "2026-10-10T12:00:00Z" };
    expect(parseVerseNotes(JSON.stringify({ "1:7": note, "1:8": { ...note, verse: 8 }, "2:1": { ...note }, "1:6": { ...note, verse: 6, text: "x".repeat(4001) } }))).toEqual({ "1:7": note });
    expect(parseVerseNotes("broken")).toEqual({});
  });
  it("ignore les accents et annotations arabes dans la recherche", () => {
    expect(normalizeSearch(" MISÉRICORDE ")).toBe("misericorde");
    expect(normalizeSearch("ٱلرَّحْمَٰنِۙ")).toBe("الرحمن");
  });
});
describe("Séquence de mémorisation", () => {
  const s = { from: 2, to: 3, repetitions: 3, delay: 5 };
  it("répète chaque verset puis s’arrête à la limite choisie", () => {
    expect(memorizationNext(s,2,1,[1,2,3,4])).toEqual({ verse: 2, completed: 1 });
    expect(memorizationNext(s,2,3,[1,2,3,4])).toEqual({ verse: 3, completed: 0 });
    expect(memorizationNext(s,3,3,[1,2,3,4])).toBeNull();
    expect(memorizationNext(s,4,1,[1,2,3,4])).toBeNull();
  });
  it("refuse les plages inversées et les répétitions arbitraires", () => {
    expect(validMemorization(s,[1,2,3])).toBe(true);
    expect(validMemorization({ ...s, to: 1 },[1,2,3])).toBe(false);
    expect(validMemorization({ ...s, repetitions: 0 },[1,2,3])).toBe(false);
    expect(validMemorization({ ...s, delay: 999 },[1,2,3])).toBe(false);
  });
});
