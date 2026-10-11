import type { QuranAudioMode } from "../audio-mode";
import type { MemorizationSettings } from "../memorization";
import { validMemorization } from "../memorization";
import type { VerseAudioRef } from "../reciters";

export interface NativeTrack {
  id: string; urls: string[]; verse: number; globalNumber: number;
  chapter: number; sourceVerse: number; phase: "arabic" | "french";
  title: string; artist: string; reciterId: string; audioMode: QuranAudioMode;
  surah?: boolean; silenceMs?: number;
}
export function nativePlaylist(options: {
  chapter: number; verses: VerseAudioRef[]; start: number; sequence: boolean;
  mode: QuranAudioMode; repeat: "off" | "verse" | "surah";
  reciterId: string; artist: string; frenchArtist: string;
  arabic?: Map<number, string[]>; french?: Map<number, string[]>;
  memorization?: MemorizationSettings | null;
}): { tracks: NativeTrack[]; startIndex: number; repeat: boolean } {
  const o = options;
  const index = o.verses.findIndex(v => v.number === o.start);
  if (index < 0) throw new Error("Verset inconnu.");
  if (o.memorization && !validMemorization(o.memorization, o.verses.map(v => v.number))) throw new Error("Plage de mémorisation invalide.");
  const selected = o.memorization ? o.verses.filter(v => v.number >= o.start && v.number <= o.memorization!.to)
    : o.repeat === "verse" || (!o.sequence && o.repeat !== "surah") ? [o.verses[index]] : o.verses;
  const tracks: NativeTrack[] = [];
  for (const v of selected) {
    const repetitions = o.memorization?.repetitions ?? 1;
    for (let n = 0; n < repetitions; n++) {
      for (const phase of o.mode === "both" ? ["arabic", "french"] as const : [o.mode === "french" ? "french" : "arabic"] as const) {
        const urls = (phase === "french" ? o.french : o.arabic)?.get(v.number);
        if (!urls?.length) throw new Error(`Audio ${phase === "french" ? "français" : "arabe"} indisponible pour le verset ${v.number}.`);
        tracks.push({ id: `${v.globalNumber}:${phase}:${n}`, urls, verse: v.number, globalNumber: v.globalNumber,
          chapter: v.sourceChapter ?? o.chapter, sourceVerse: v.sourceVerse ?? v.number, phase,
          title: `Coran · sourate ${v.sourceChapter ?? o.chapter} · verset ${v.sourceVerse ?? v.number}`,
          artist: phase === "french" ? o.frenchArtist : o.artist, reciterId: o.reciterId, audioMode: o.mode });
      }
      if (o.memorization?.delay && (n < repetitions - 1 || v !== selected.at(-1))) {
        const previous = tracks.at(-1)!;
        tracks.push({ ...previous, id: `${previous.id}:silence`, urls: ["asset:///quran_pause.wav"], silenceMs: o.memorization.delay * 1000 });
      }
    }
  }
  return { tracks, startIndex: tracks.findIndex(t => t.verse === o.start), repeat: !o.memorization && o.repeat !== "off" };
}
