import { describe, expect, it } from "vitest";
import { normalizeSearch, parseReadingPosition } from "@/lib/quran/reading-position";
const chapters = [{ number:1, versesCount:7 },{ number:2, versesCount:286 }];
describe("Reprise de lecture locale", () => {
  it("accepte uniquement un verset existant et un numéro entier", () => {
    expect(parseReadingPosition('{"chapter":2,"verse":286}',chapters)).toEqual({chapter:2,verse:286});
    for (const item of [{chapter:1,verse:8},{chapter:2,verse:0},{chapter:3,verse:1},{chapter:1,verse:1.5},{chapter:"1",verse:1}]) expect(parseReadingPosition(JSON.stringify(item),chapters)).toBeNull();
  });
  it("tolère un stockage absent ou corrompu", () => {
    for (const raw of [null,"null","oops","[]","{}","42"]) expect(parseReadingPosition(raw,chapters)).toBeNull();
  });
});
describe("Recherche française et arabe", () => {
  it("ignore les accents, la casse et les signes de vocalisation", () => {
    expect(normalizeSearch("  Médinoise  ")).toBe("medinoise");
    expect(normalizeSearch("الْفَاتِحَة")).toBe(normalizeSearch("الفاتحة"));
  });
});
