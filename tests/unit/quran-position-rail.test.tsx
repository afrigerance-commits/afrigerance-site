import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuranPositionRail } from "@/components/islamic/quran-position-rail";
import { QuranJuzMarker } from "@/components/islamic/quran-juz-marker";
import { readingIndexAt, verseReadingLocation } from "@/lib/quran/reading-location";
import { getPartitions } from "@/lib/quran/partitions";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Repères des Juz", () => {
  it("marque exactement les débuts et fins des 30 Juz sans modifier les limites", () => {
    for (const juz of getPartitions("juz")) {
      const start = verseReadingLocation(juz.start.chapter, juz.start.verse);
      const end = verseReadingLocation(juz.end.chapter, juz.end.verse);
      expect(start.startsJuz).toBe(true);
      expect(start.juzPosition).toBe(1);
      expect(end.endsJuz).toBe(true);
      expect(end.juzPosition).toBe(juz.count);
      expect(end.juz).toBe(juz.number);
    }
  });
  it("distingue le changement de sourate du changement de Juz", () => {
    expect(verseReadingLocation(2, 1)).toMatchObject({ juz: 1, juzPosition: 8, startsJuz: false });
    expect(verseReadingLocation(2, 141)).toMatchObject({ juz: 1, endsJuz: true });
    expect(verseReadingLocation(2, 142)).toMatchObject({ juz: 2, startsJuz: true });
  });
  it("ouvre la portion depuis le séparateur", () => {
    render(<QuranJuzMarker number={2} kind="start" />);
    expect(screen.getByRole("link", { name: /Début du Juz 2/ })).toHaveAttribute("href", "/coran/lecture/juz/2");
  });
});

describe("Bande de position", () => {
  for (const label of ["Juz", "Hizb", "Sourate", "Page"]) {
    it(`suit la portion ${label} sélectionnée et atteint sa fin même au changement de sourate`, () => {
      let frame: FrameRequestCallback | undefined;
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { frame=callback; return 1; });
      let secondVisible=false;
      vi.spyOn(HTMLElement.prototype,"getBoundingClientRect").mockImplementation(function(this:HTMLElement) {
        return {top:this.dataset.quranPosition === "2:1" ? (secondVisible?100:900) : -100} as DOMRect;
      });
      render(<QuranPositionRail scope={{label,number:1}} locations={[verseReadingLocation(1,7),verseReadingLocation(2,1)]}>
        <div data-quran-position="1:7">Premier</div><div data-quran-position="2:1">Dernier</div>
      </QuranPositionRail>);
      act(()=>frame?.(0));
      const rail=screen.getByRole("progressbar",{name:`Position dans ${label} 1`});
      expect(rail).toHaveAttribute("aria-valuemax","2");
      expect(rail).toHaveAttribute("aria-valuenow","1");
      secondVisible=true;
      act(()=>window.dispatchEvent(new Event("scroll")));
      act(()=>frame?.(0));
      expect(rail).toHaveAttribute("aria-valuenow","2");
      expect(rail).toHaveAttribute("aria-valuetext",expect.stringContaining("100 %"));
    });
  }
  it("maps a partially rendered DOM to the correct absolute verse position", () => {
    let frame: FrameRequestCallback | undefined;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => {frame=callback;return 1;});
    vi.spyOn(HTMLElement.prototype,"getBoundingClientRect").mockReturnValue({top:0} as DOMRect);
    render(<QuranPositionRail scope={{label:"Sourate",number:2}} locations={[1,2,3].map(v=>verseReadingLocation(2,v))}>
      <div data-quran-position="2:3">Verset restauré</div>
    </QuranPositionRail>);
    act(()=>frame?.(0));
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow","3");
  });
  it("garde le verset long courant, sélectionne les limites et la fin", () => {
    expect(readingIndexAt([100, 1000, 1200], 300)).toBe(0);
    expect(readingIndexAt([-100, 300, 800], 300)).toBe(1);
    expect(readingIndexAt([500, 800], 300)).toBe(0);
    expect(readingIndexAt([-900, -400], 300)).toBe(1);
  });
  it("suit le défilement manuel entre deux Juz et recalcule quand le texte change de taille", () => {
    let frame: FrameRequestCallback | undefined;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { frame = callback; return 1; });
    const tops = [100, 900];
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function(this: HTMLElement) {
      const index = this.dataset.quranPosition === "2:142" ? 1 : 0;
      return { top: tops[index] } as DOMRect;
    });
    render(<QuranPositionRail locations={[verseReadingLocation(2, 141), verseReadingLocation(2, 142)]}>
      <div data-quran-position="2:141">Verset 141</div><div data-quran-position="2:142">Verset 142</div>
    </QuranPositionRail>);
    act(() => frame?.(0));
    const rail = screen.getByRole("progressbar");
    expect(rail).toHaveAttribute("aria-valuetext", expect.stringContaining("Juz 1 sur 30"));
    expect(rail).toHaveAttribute("aria-valuenow", rail.getAttribute("aria-valuemax"));
    tops[0] = -500; tops[1] = 100;
    act(() => window.dispatchEvent(new Event("scroll")));
    act(() => frame?.(0));
    expect(rail).toHaveAttribute("aria-valuenow", "1");
    expect(rail).toHaveAttribute("aria-valuetext", expect.stringContaining("Juz 2 sur 30"));
    tops[0] = 100; tops[1] = 1000;
    act(() => window.dispatchEvent(new Event("resize")));
    act(() => frame?.(0));
    expect(rail).toHaveAttribute("aria-valuetext", expect.stringContaining("Juz 1 sur 30"));
  });
});
