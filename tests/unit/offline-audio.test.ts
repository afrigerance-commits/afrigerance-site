import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { allowedAudioUrl, AUDIO_CACHE, downloadAudioPack, offlineCatalog, readAudioPacks, removeAudioPack } from "@/lib/quran/offline-audio";
const url = "https://everyayah.com/data/Ghamadi_40kbps/001001.mp3";
vi.mock("@/lib/quran/reciters", async original => ({ ...await original<Record<string, unknown>>(), loadRecitation: vi.fn(async () => new Map([[1,[url]]])), loadSectionRecitation: vi.fn(), loadFrenchRecitation: vi.fn() }));
import { loadRecitation } from "@/lib/quran/reciters";
const refs = [{ number: 1, globalNumber: 1 }];
let stores: Map<string, Map<string, Response>>;
beforeEach(() => {
  localStorage.clear(); stores = new Map();
  vi.stubGlobal("caches", { open: async (name: string) => {
    if (!stores.has(name)) stores.set(name,new Map());
    const store = stores.get(name)!;
    return { put: async (k: string,r: Response) => { store.set(k,r.clone()); }, match: async (k: string) => store.get(k)?.clone(), delete: async (k: string) => store.delete(k) };
  } });
  vi.stubGlobal("fetch", vi.fn(async () => new Response("audio-file", { headers: { "content-type": "audio/mpeg" } })));
  vi.mocked(loadRecitation).mockResolvedValue(new Map([[1,[url]]]));
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); localStorage.clear(); });
it("downloads explicit recordings, persists verified catalogs, and removes files", async () => {
  const progress = vi.fn();
  const pack = await downloadAudioPack(1,"everyayah.ghamdi",refs,false,new AbortController().signal,progress);
  expect(pack.complete).toBe(true); expect(pack.bytes).toBe(10);
  expect(readAudioPacks()[0].urls).toEqual([url]);
  expect(progress).toHaveBeenCalledWith(1,1);
  vi.mocked(loadRecitation).mockRejectedValueOnce(new Error("offline"));
  expect((await offlineCatalog(1,"everyayah.ghamdi",refs)).get(1)).toEqual([url]);
  await removeAudioPack(pack.id);
  expect(readAudioPacks()).toHaveLength(0);
  expect(stores.get(AUDIO_CACHE)?.has(url)).toBe(false);
});
it("rejects a non-audio response without claiming a complete download", async () => {
  vi.mocked(fetch).mockResolvedValueOnce(new Response("<html>error</html>", { headers: { "content-type": "text/html" } }));
  await expect(downloadAudioPack(1,"everyayah.ghamdi",refs,false,new AbortController().signal,vi.fn())).rejects.toThrow("audio valide");
  expect(readAudioPacks()[0].complete).toBe(false);
  expect(stores.get(AUDIO_CACHE)?.size).toBe(0);
});
it("cancels a download before storing files", async () => {
  const abort = new AbortController(); abort.abort();
  await expect(downloadAudioPack(1,"everyayah.ghamdi",refs,false,abort.signal,vi.fn())).rejects.toThrow();
  expect(stores.get(AUDIO_CACHE)?.size).toBe(0);
});
it("restricts audio cache requests to the known recording paths", () => {
  expect(allowedAudioUrl(url)).toBe(true);
  expect(allowedAudioUrl("https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3")).toBe(true);
  expect(allowedAudioUrl("https://evil.test/file.mp3")).toBe(false);
  expect(allowedAudioUrl(url+"?tracking=1")).toBe(false);
});
