"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ExternalLink, Headphones, LoaderCircle, Pause, Play, SkipBack, SkipForward, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reciters, defaultReciterId, loadRecitation, type VerseAudioRef } from "@/lib/quran/reciters";

interface QuranAudioState {
  verses: VerseAudioRef[];
  reciterId: string;
  chooseReciter: (id: string) => void;
  playingVerse: number | null;
  playingSurah: boolean;
  paused: boolean;
  loading: boolean;
  error: string | null;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  playVerse: (verseNumber: number, continueSequence?: boolean) => void;
  playSurah: () => void;
}

const QuranAudioContext = createContext<QuranAudioState | null>(null);

export function QuranAudioProvider({ chapter, verses, children }: { chapter: number; verses: VerseAudioRef[]; children: ReactNode }) {
  const [reciterId, setReciterId] = useState(defaultReciterId);
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [playingSurah, setPlayingSurah] = useState(false);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const catalogRef = useRef<Map<number, string[]> | null>(null);
  const catalogCacheRef = useRef(new Map<string, Promise<Map<number, string[]>>>());
  const requestRef = useRef(0);
  const reciterRef = useRef(reciterId);
  const currentVerseRef = useRef<number | null>(null);
  const urlIndexRef = useRef(0);
  const sequenceRef = useRef(false);
  const surahRef = useRef(false);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<(verse: number, urlIndex?: number) => void>(() => {});
  const failureRef = useRef<() => void>(() => {});

  const clearWatchdog = useCallback(() => {
    if (watchdogRef.current) clearTimeout(watchdogRef.current);
    watchdogRef.current = null;
  }, []);

  const stop = useCallback(() => {
    requestRef.current++;
    clearWatchdog();
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.removeAttribute("src"); audio.load(); }
    currentVerseRef.current = null;
    surahRef.current = false;
    sequenceRef.current = false;
    setPlayingVerse(null);
    setPlayingSurah(false);
    setPaused(false);
    setLoading(false);
  }, [clearWatchdog]);

  const start = useCallback((verseNumber: number, urlIndex = 0) => {
    const urls = catalogRef.current?.get(verseNumber);
    const audio = audioRef.current;
    if (!urls?.[urlIndex] || !audio) {
      stop();
      setError("Ce verset n’est pas disponible pour ce récitateur.");
      return;
    }
    clearWatchdog();
    currentVerseRef.current = verseNumber;
    urlIndexRef.current = urlIndex;
    setPlayingVerse(verseNumber);
    setPaused(false);
    setLoading(true);
    const url = urls[urlIndex];
    audio.src = url;
    audio.play().catch(() => {
      if (audio.src === url && currentVerseRef.current === verseNumber) failureRef.current();
    });
    watchdogRef.current = setTimeout(() => {
      if (audio.src === url && audio.paused) failureRef.current();
    }, 12000);
  }, [clearWatchdog, stop]);

  const handleFailure = useCallback(() => {
    const verse = currentVerseRef.current;
    if (verse === null) return;
    clearWatchdog();
    const nextIndex = urlIndexRef.current + 1;
    if (catalogRef.current?.get(verse)?.[nextIndex]) startRef.current(verse, nextIndex);
    else {
      stop();
      setError(`La récitation du verset ${verse} n’a pas pu être chargée. Réessayez ou choisissez un autre récitateur.`);
    }
  }, [clearWatchdog, stop]);
  useEffect(() => {
    startRef.current = start;
    failureRef.current = handleFailure;
  }, [start, handleFailure]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;
    const onPlaying = () => { clearWatchdog(); setLoading(false); };
    const onEnded = () => {
      clearWatchdog();
      if (surahRef.current) { stop(); return; }
      const index = verses.findIndex((verse) => verse.number === currentVerseRef.current);
      if (sequenceRef.current && verses[index + 1]) startRef.current(verses[index + 1].number);
      else stop();
    };
    const onError = () => {
      if (surahRef.current) { stop(); setError("La récitation intégrale est momentanément indisponible."); }
      else failureRef.current();
    };
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      clearWatchdog();
      audio.pause();
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [clearWatchdog, stop, verses]);

  const chooseReciter = useCallback((id: string) => {
    if (!reciters.some((reciter) => reciter.id === id)) return;
    stop();
    reciterRef.current = id;
    catalogRef.current = null;
    setReciterId(id);
    setError(null);
  }, [stop]);

  const playVerse = useCallback(async (verseNumber: number, continueSequence = false) => {
    if (reciterRef.current === "tvquran.hady-toure" || !verses.some((verse) => verse.number === verseNumber)) return;
    stop();
    setError(null);
    setLoading(true);
    const request = requestRef.current;
    const id = reciterRef.current;
    const key = `${chapter}/${id}`;
    let pending = catalogCacheRef.current.get(key);
    if (!pending) {
      pending = loadRecitation(chapter, id, verses);
      catalogCacheRef.current.set(key, pending);
    }
    try {
      const catalog = await pending;
      if (request !== requestRef.current) return;
      catalogRef.current = catalog;
      sequenceRef.current = continueSequence;
      startRef.current(verseNumber);
    } catch (cause) {
      catalogCacheRef.current.delete(key);
      if (request !== requestRef.current) return;
      setLoading(false);
      setError(cause instanceof Error ? cause.message : "La source audio est indisponible.");
    }
  }, [chapter, stop, verses]);

  const playSurah = useCallback(() => {
    if (reciterRef.current !== "tvquran.hady-toure" || !Number.isInteger(chapter) || chapter < 1 || chapter > 114) return;
    stop();
    const audio = audioRef.current;
    if (!audio) return;
    setError(null);
    surahRef.current = true;
    setPlayingSurah(true);
    setLoading(true);
    audio.src = `https://download.tvquran.com/download/recitations/355/280/${String(chapter).padStart(3, "0")}.mp3`;
    audio.play().catch(() => {
      if (surahRef.current) { stop(); setError("Impossible de démarrer cette récitation. Réessayez."); }
    });
  }, [chapter, stop]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    clearWatchdog();
    setPaused(true);
    setLoading(false);
  }, [clearWatchdog]);
  const resume = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || (currentVerseRef.current === null && !surahRef.current)) return;
    setPaused(false);
    setLoading(true);
    audio.play().catch(() => failureRef.current());
  }, []);

  return <QuranAudioContext.Provider value={{ verses, reciterId, chooseReciter, playingVerse, playingSurah, paused, loading, error, stop, pause, resume, playVerse, playSurah }}>
    {children}
  </QuranAudioContext.Provider>;
}

export function useQuranAudioContext() {
  const context = useContext(QuranAudioContext);
  if (!context) throw new Error("Le lecteur doit être placé dans QuranAudioProvider.");
  return context;
}

export function QuranAudioToolbar({ chapter }: { chapter: number }) {
  const player = useQuranAudioContext();
  const active = reciters.find((reciter) => reciter.id === player.reciterId)!;
  const verseIndex = player.verses.findIndex((verse) => verse.number === player.playingVerse);
  const previous = player.verses[verseIndex - 1];
  const next = player.verses[verseIndex + 1];

  return <section aria-label="Lecteur audio du Coran" className="relative mt-10 overflow-hidden rounded-2xl border border-[#cabf9f] bg-[#f8f4e9]/95 shadow-[0_16px_45px_-25px_rgba(16,58,49,.35)] dark:border-gold-500/25 dark:bg-ink-950/95">
    <div className="border-b border-[#dfd3b9] bg-emerald-900 px-5 py-4 text-ivory-50 dark:border-gold-500/20 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-gold-500/20 text-gold-500"><Headphones className="size-5" /></span>
        <div><p className="font-display text-lg font-semibold">Écouter la sourate</p><p className="text-xs text-ivory-50/70">Choisissez une voix et lancez la récitation.</p></div>
      </div>
    </div>
    <div className="px-4 py-4 sm:px-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[.16em] text-emerald-900 dark:text-gold-500">Récitateur</p>
      <div className="flex gap-3 overflow-x-auto pb-3" role="group" aria-label="Choisir un récitateur">
        {reciters.map((reciter) => <button key={reciter.id} type="button" onClick={() => player.chooseReciter(reciter.id)} aria-pressed={player.reciterId === reciter.id}
          className={`flex min-w-32 max-w-32 flex-col items-center gap-2 rounded-xl border p-3 text-center text-xs font-medium transition-colors hover:border-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${player.reciterId === reciter.id ? "border-emerald-800 bg-emerald-900/10 text-emerald-950 dark:border-gold-500 dark:bg-gold-500/15 dark:text-ivory-50" : "border-border bg-white/65 text-muted dark:bg-white/5"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {reciter.portrait ? <img src={reciter.portrait} alt="" loading="lazy" className={`size-14 rounded-full object-cover ring-2 ${player.reciterId === reciter.id ? "ring-gold-500" : "ring-[#d8ccb2]"}`} /> : <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full bg-emerald-900 font-display text-lg text-gold-500 ring-2 ring-[#d8ccb2]">HT</span>}
          <span>{reciter.nom}</span>
          {reciter.mode === "surah" && <span className="text-[10px] text-muted">Sourate entière</span>}
        </button>)}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        {active.mode === "surah" ? (!player.playingSurah ? <Button onClick={player.playSurah} disabled={player.loading} className="bg-emerald-900 text-ivory-50 hover:bg-emerald-700"><Play className="size-4" /> Écouter Muhammad Hady Touré</Button> : <><Button variant="outline" onClick={player.paused ? player.resume : player.pause}>{player.paused ? <Play className="size-4" /> : <Pause className="size-4" />}{player.paused ? "Reprendre" : "Pause"}</Button><Button variant="ghost" onClick={player.stop}><Square className="size-4" /> Arrêter</Button></>) : player.playingVerse === null ? <Button onClick={() => player.playVerse(player.verses[0].number, true)} disabled={player.loading} className="bg-emerald-900 text-ivory-50 hover:bg-emerald-700">
          {player.loading ? <LoaderCircle className="size-4 animate-spin" /> : <Play className="size-4" />} {player.loading ? "Chargement…" : "Écouter la sourate"}
        </Button> : <>
          <Button variant="outline" size="icon" aria-label="Verset précédent" disabled={!previous} onClick={() => player.playVerse(previous.number, true)}><SkipBack className="size-4" /></Button>
          <Button variant="outline" size="icon" aria-label={player.paused ? "Reprendre" : "Mettre en pause"} onClick={player.paused ? player.resume : player.pause}>
            {player.paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </Button>
          <Button variant="outline" size="icon" aria-label="Verset suivant" disabled={!next} onClick={() => player.playVerse(next.number, true)}><SkipForward className="size-4" /></Button>
          <Button variant="ghost" size="sm" onClick={player.stop}><Square className="size-4" /> Arrêter</Button>
        </>}
        <span aria-live="polite" className="ml-auto text-xs font-medium text-emerald-900 dark:text-gold-500">
          {player.playingVerse !== null ? `${active.nom} · verset ${player.playingVerse}/${player.verses.length}${player.paused ? " · en pause" : ""}` : active.nom}
        </span>
      </div>
      {player.error && <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">{player.error}</p>}
      {active.mode === "surah" && <p className="mt-3 text-xs leading-5 text-muted">Récitation Hafs de la sourate entière, diffusée par TVQuran. La lecture n’est pas synchronisée avec les versets affichés. <a href="https://www.tvquran.com/en/scholar/355/profile/mohammed-hady-toure" target="_blank" rel="noopener noreferrer" className="underline">Source et collection</a>.</p>}
      <div className="mt-5 border-t border-border pt-4">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-900 dark:text-gold-500">Autre lecture · sourate entière</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={chapter ? `https://www.mp3quran.net/ar/nourin_siddig/${chapter}` : "https://www.mp3quran.net/ar/nourin_siddig"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium hover:border-gold-600">Noreen Sidiq <span className="text-xs text-muted">ad-Dûrî</span> <ExternalLink className="size-3.5" /></a>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted">La lecture ad-Dûrî de Noreen s’ouvre sur sa source et diffère du texte Hafs affiché ici.</p>
      </div>
      <details className="mt-3 text-xs text-muted">
        <summary className="w-fit cursor-pointer hover:underline">Crédits des portraits</summary>
        <p className="mt-2 leading-relaxed">
          Photos : <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:%D0%9C%D0%B8%D1%88%D0%B0%D1%80%D0%B8_%D0%A0%D0%B0%D1%88%D0%B8%D0%B4.jpg">Alafasy</a> (quranic.ru, libre utilisation déclarée),{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Saud_Shuraim.png">Shuraim</a> et{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Sheikh_Sudais.png">Sudais</a> (Sazwanmisuari, CC0),{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Abdul_Basit_Abdul_Samad_at_Centenary_Celebration_Of_Darul_Uloom_Deoband_1980.jpg">Abdul Basit</a> (Prasar Bharati, GODL-India),{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Hussary.jpg">Husary</a> et{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Elminshwey.jpg">Minshawi</a> (domaine public selon Wikimedia Commons).
        </p>
      </details>
    </div>
  </section>;
}

export function VersePlayButton({ verseNumber }: { verseNumber: number }) {
  const player = useQuranAudioContext();
  if (player.reciterId === "tvquran.hady-toure") return null;
  const selected = player.playingVerse === verseNumber;
  return <button type="button" onClick={() => selected ? (player.paused ? player.resume() : player.pause()) : player.playVerse(verseNumber)}
    aria-label={selected ? (player.paused ? `Reprendre le verset ${verseNumber}` : `Mettre en pause le verset ${verseNumber}`) : `Écouter le verset ${verseNumber}`}
    className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${selected ? "border-emerald-900 bg-emerald-900 text-white" : "border-border text-emerald-900 hover:border-emerald-900 hover:bg-emerald-900/10 dark:text-gold-500"}`}>
    {selected && !player.paused ? <Pause className="size-4" /> : <Play className="size-4" />}
  </button>;
}
