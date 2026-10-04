import { afterEach, describe, expect, it, vi } from "vitest";
import { extractYoutubeId } from "@/lib/youtube";
import { loadRecitation } from "@/lib/quran/reciters";

describe("liens YouTube", () => {
  it("accepte les formats de vidéo courants et rejette les autres hôtes", () => {
    const id = "dQw4w9WgXcQ";
    expect(extractYoutubeId(`https://www.youtube.com/watch?v=${id}&t=10`)).toBe(id);
    expect(extractYoutubeId(`https://youtu.be/${id}`)).toBe(id);
    expect(extractYoutubeId(`https://youtube.com/shorts/${id}`)).toBe(id);
    expect(extractYoutubeId(`https://youtube.com/live/${id}`)).toBe(id);
    expect(extractYoutubeId(id)).toBe(id);
    expect(extractYoutubeId(`https://youtube.com.evil.test/watch?v=${id}`)).toBeNull();
    expect(extractYoutubeId("https://www.youtube.com/@chaine")).toBeNull();
  });
});

describe("catalogue audio coranique", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("emploie les URL de l'édition avec le bon débit et la bonne ayah", async () => {
    const url = "https://cdn.islamic.network/quran/audio/64/ar.saoodshuraym/9.mp3";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: "OK", data: {
      number: 2, edition: { identifier: "ar.saoodshuraym" },
      ayahs: [{ number: 9, numberInSurah: 2, audio: url }],
    } }) }));
    const result = await loadRecitation(2, "ar.saoodshuraym", [{ number: 2, globalNumber: 9 }]);
    expect(result.get(2)).toEqual([url]);
  });

  it("refuse une numérotation décalée au lieu de jouer un mauvais verset", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: "OK", data: {
      number: 2, edition: { identifier: "ar.saoodshuraym" },
      ayahs: [{ number: 10, numberInSurah: 2, audio: "https://cdn.islamic.network/quran/audio/64/ar.saoodshuraym/10.mp3" }],
    } }) }));
    await expect(loadRecitation(2, "ar.saoodshuraym", [{ number: 2, globalNumber: 9 }])).rejects.toThrow("numérotation");
  });
});
