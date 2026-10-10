import { reciters, loadFrenchRecitation, loadRecitation, loadSectionRecitation, type VerseAudioRef } from "./reciters";
export const AUDIO_CACHE = "mirath-quran-audio-v1";
export const CATALOG_CACHE = "mirath-quran-catalog-v1";
const PACKS_KEY = "mirath:quran:audio-packs:v1";
export interface AudioPack { id: string; chapter: number; reciter: string; first: number; last: number; total: number; urls: string[]; bytes: number; complete: boolean }
export function allowedAudioUrl(value: string) {
  try { const u = new URL(value); return u.protocol === "https:" && !u.username && !u.password && !u.port && !u.search && !u.hash && ((u.hostname === "everyayah.com" && /^\/data\/[\w-]+\/\d{6}\.mp3$/.test(u.pathname)) || (u.hostname === "cdn.islamic.network" && /^\/quran\/audio\/\d+\/[\w.-]+\/\d+\.mp3$/.test(u.pathname))); } catch { return false; }
}
function catalogKey(chapter: number, reciter: string, verses: VerseAudioRef[]) {
  return `${location.origin}/__mirath_audio/catalog/${chapter}/${encodeURIComponent(reciter)}/${verses.map(v => `${v.number}-${v.globalNumber}`).join("_")}`;
}
function validCatalog(entries: unknown, chapter: number, reciter: string, verses: VerseAudioRef[]): Map<number, string[]> | null {
  if (!Array.isArray(entries) || entries.length !== verses.length) return null;
  if (entries.some((entry,i) => !Array.isArray(entry) || entry[0] !== verses[i].number || !Array.isArray(entry[1]) || !entry[1].length || entry[1].some((url: unknown) => typeof url !== "string" || !allowedAudioUrl(url)))) return null;
  for (let i = 0; i < entries.length; i++) {
    const ref = verses[i];
    const folder = reciters.find(r => r.id === reciter)?.everyAyahFolder;
    const expected = folder ? `https://everyayah.com/data/${folder}/${String(ref.sourceChapter ?? chapter).padStart(3,"0")}${String(ref.sourceVerse ?? ref.number).padStart(3,"0")}.mp3` : null;
    if (entries[i][1].some((url: string) => expected ? url !== expected : !url.includes(`/${reciter}/`) || !url.endsWith(`/${ref.globalNumber}.mp3`))) return null;
  }
  return new Map(entries);
}
export async function offlineCatalog(chapter: number, reciter: string, verses: VerseAudioRef[], french = false) {
  const supported = typeof caches !== "undefined" && typeof location !== "undefined";
  const key = supported ? catalogKey(chapter, french ? "fr.leclerc" : reciter, verses) : "";
  const cached = async () => {
    if (!supported) return null;
    try { const response = await (await caches.open(CATALOG_CACHE)).match(key); return response ? validCatalog(await response.json(), chapter, french ? "fr.leclerc" : reciter, verses) : null; } catch { return null; }
  };
  if (supported && !navigator.onLine) { const found = await cached(); if (found) return found; }
  try {
    const result = await (french ? loadFrenchRecitation(chapter, verses) : verses.some(v => v.sourceChapter !== undefined) ? loadSectionRecitation(reciter, verses) : loadRecitation(chapter, reciter, verses));
    if (supported) { try { await (await caches.open(CATALOG_CACHE)).put(key, new Response(JSON.stringify(verses.map(v => [v.number, result.get(v.number)])), { headers: { "Content-Type": "application/json" } })); } catch { /* Online playback works without device storage. */ } }
    return result;
  } catch (cause) { const found = await cached(); if (found) return found; throw cause; }
}
export function readAudioPacks(): AudioPack[] {
  try { const p = JSON.parse(localStorage.getItem(PACKS_KEY) || "[]"); return Array.isArray(p) ? p.filter((item: AudioPack) => item && typeof item.id === "string" && Number.isInteger(item.chapter) && item.chapter >= 1 && item.chapter <= 114 && typeof item.reciter === "string" && Number.isFinite(item.bytes) && item.bytes >= 0 && Number.isInteger(item.total) && item.total > 0 && Array.isArray(item.urls) && item.urls.every(allowedAudioUrl) && typeof item.complete === "boolean") : []; } catch { return []; }
}
function writePack(pack: AudioPack) {
  const all = readAudioPacks().filter(p => p.id !== pack.id);
  localStorage.setItem(PACKS_KEY, JSON.stringify([...all, pack]));
  window.dispatchEvent(new Event("mirath-audio-downloads"));
}
export async function downloadAudioPack(chapter: number, reciter: string, verses: VerseAudioRef[], includeFrench: boolean, signal: AbortSignal, progress: (done: number, total: number) => void) {
  if (typeof caches === "undefined") throw new Error("Le stockage audio hors ligne n’est pas disponible sur cet appareil.");
  const arabic = await offlineCatalog(chapter, reciter, verses);
  const french = includeFrench ? await offlineCatalog(chapter, reciter, verses, true) : null;
  const urls = [...new Set([...arabic.values(), ...(french ? [...french.values()] : [])].map(u => u[0]))];
  if (!urls.length || urls.some(u => !allowedAudioUrl(u))) throw new Error("Cette source ne permet pas ce téléchargement.");
  const cache = await caches.open(AUDIO_CACHE);
  const pack: AudioPack = { id: `${chapter}:${reciter}:${verses[0].globalNumber}:${verses.at(-1)?.globalNumber}:${includeFrench}`, chapter, reciter, first: verses[0].globalNumber, last: verses.at(-1)!.globalNumber, total: urls.length, urls: [], bytes: 0, complete: false };
  const previous = readAudioPacks().find(p => p.id === pack.id);
  if (previous) { pack.urls = previous.urls.filter(url => urls.includes(url)); pack.bytes = previous.bytes; }
  writePack(pack);
  for (const url of urls) {
    signal.throwIfAborted();
    let response = await cache.match(url);
    if (!response) {
      // The CDN does not consistently enable browser CORS for personal downloads.
      const downloadUrl = new URL(url).hostname === "cdn.islamic.network" ? `/api/quran-audio?source=${encodeURIComponent(url)}` : url;
      response = await fetch(downloadUrl, { mode: "cors", credentials: "omit", signal });
      if (!response.ok || response.type === "opaque") throw new Error("La source audio refuse le téléchargement. Essayez un autre récitateur.");
      const blob = await response.clone().blob();
      if (!blob.size || blob.size > 30*1024*1024 || !/(audio|octet-stream)/i.test(response.headers.get("content-type") || "")) throw new Error("Le fichier reçu n’est pas un enregistrement audio valide.");
      response = new Response(blob, { headers: { "Content-Type": response.headers.get("content-type") || "audio/mpeg", "X-Mirath-Audio-Bytes": String(blob.size) } });
      await cache.put(url, response.clone());
    }
    const bytes = Number(response.headers.get("X-Mirath-Audio-Bytes")) || (await response.clone().blob()).size;
    if (!pack.urls.includes(url)) { pack.urls.push(url); pack.bytes += bytes; }
    writePack(pack);
    progress(pack.urls.length, urls.length);
  }
  pack.complete = true; writePack(pack);
  return pack;
}
export async function removeAudioPack(id: string) {
  const all = readAudioPacks();
  const target = all.find(p => p.id === id);
  const keep = all.filter(p => p.id !== id);
  const retained = new Set(keep.flatMap(p => p.urls));
  const cache = await caches.open(AUDIO_CACHE);
  for (const url of target?.urls ?? []) if (!retained.has(url)) await cache.delete(url);
  localStorage.setItem(PACKS_KEY, JSON.stringify(keep));
  window.dispatchEvent(new Event("mirath-audio-downloads"));
}
