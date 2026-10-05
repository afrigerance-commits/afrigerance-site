import { describe, expect, it } from "vitest";
import { parseTajweed } from "@/lib/quran/tajweed";

describe("annotations de tajwîd", () => {
  it("conserve chaque caractère du texte source dans son ordre", () => {
    const result = parseTajweed("بِسْمِ [h:9421[ٱ]للَّهِ [n[الرَّحْمَـٰنِ]");
    expect(result?.map((segment) => segment.text).join("")).toBe("بِسْمِ ٱللَّهِ الرَّحْمَـٰنِ");
    expect(result?.filter((segment) => segment.rule).map((segment) => segment.rule)).toEqual(["h", "n"]);
  });

  it("refuse les balises non reconnues afin de laisser le texte habituel intact", () => {
    expect(parseTajweed("[z:9421[ٱ]")).toBeNull();
    expect(parseTajweed("[h:9421[ٱ")).toBeNull();
  });
});
