"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { offlineCatalog } from "@/lib/quran/offline-audio";
import { memorizationNext, validMemorization, type MemorizationSettings } from "@/lib/quran/memorization";
import { AUDIO_FOCUS_EVENT } from "./sourced-audio";
import { ExternalLink, Headphones, LoaderCircle, Pause, Play, Repeat, Repeat1, SkipBack, SkipForward, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reciters, defaultReciterId, frenchAudioEdition, type VerseAudioRef } from "@/lib/quran/reciters";

interface QuranAudioState {
  memorization: MemorizationSettings | null;
  configureMemorization: (settings: MemorizationSettings | null) => void;
  section: boolean;
  verses: VerseAudioRef[];
  reciterId: string;
  chooseReciter: (id: string) => void;
  playingVerse: number | null;
  playingSurah: boolean;
  paused: boolean;
  loading: boolean;
  error: string | null;
  translationEnabled: boolean;
  phase: "arabic" | "french";
  chooseTranslation: (enabled: boolean) => void;
  repeatMode: "off" | "verse" | "surah";
  chooseRepeatMode: (mode: "off" | "verse" | "surah") => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  playVerse: (verseNumber: number, continueSequence?: boolean) => void;
  playSurah: () => void;
}

const QuranAudioContext = createContext<QuranAudioState | null>(null);
type Session = { chapter: number; verses: VerseAudioRef[] };
type AudioPhase = "arabic" | "french";
const SessionSetup = createContext<((session: Session) => void) | null>(null);

/** Remains mounted while the visitor navigates between pages. */
export function PersistentQuranAudio({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({ chapter: 1, verses: [] });
  const configure = useCallback((next: Session) => setSession(current => current.chapter === next.chapter && JSON.stringify(current.verses) === JSON.stringify(next.verses) ? current : next), []);
  return <SessionSetup.Provider value={configure}><QuranAudioEngine chapter={session.chapter} verses={session.verses}>{children}<PersistentMiniPlayer chapter={session.chapter} /></QuranAudioEngine></SessionSetup.Provider>;
}

export function QuranAudioProvider({ chapter, verses, children }: { chapter: number; verses: VerseAudioRef[]; children: ReactNode }) {
  const configure = useContext(SessionSetup);
  useEffect(() => { configure?.({ chapter, verses }); }, [configure, chapter, verses]);
  return configure ? children : <QuranAudioEngine chapter={chapter} verses={verses}>{children}</QuranAudioEngine>;
}

function PersistentMiniPlayer({ chapter }: { chapter: number }) {
  const player = useQuranAudioContext();
  if (player.playingVerse === null && !player.playingSurah && !player.error) return null;
  const active = reciters.find(r => r.id === player.reciterId)!;
  const verse = player.verses.find(v => v.number === player.playingVerse);
  const sourceChapter = verse?.sourceChapter ?? chapter;
  const sourceVerse = verse?.sourceVerse ?? player.playingVerse;
  return <aside aria-label="Mini-lecteur du Coran" className="quran-floating-player fixed left-4 z-40 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl border border-gold-500/40 bg-surface p-3 shadow-xl sm:left-6"><div className="min-w-0 max-w-48"><Link href={`/coran/${sourceChapter}${sourceVerse ? `#verset-${sourceVerse}` : ""}`} className="block truncate text-sm font-semibold text-primary">{player.phase === "french" ? frenchAudioEdition.name : active.nom}</Link><p aria-live="polite" className="text-xs text-muted">Sourate {sourceChapter}{sourceVerse ? ` · verset ${sourceVerse}` : ""}{player.paused ? " · en pause" : ""}</p>{player.error && <p role="alert" className="mt-1 text-xs text-red-700 dark:text-red-300">{player.error}</p>}</div>{(player.playingVerse !== null || player.playingSurah) && <button onClick={player.paused ? player.resume : player.pause} aria-label={player.paused ? "Reprendre la récitation" : "Mettre la récitation en pause"} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">{player.loading ? <LoaderCircle className="size-5 animate-spin" /> : player.paused ? <Play className="size-5" /> : <Pause className="size-5" />}</button>}<button onClick={player.stop} aria-label="Arrêter la récitation" className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"><Square className="size-4" /></button></aside>;
}

function QuranAudioEngine({ chapter, verses, children }: { chapter: number; verses: VerseAudioRef[]; children: ReactNode }) {
  const [memorization, setMemorization] = useState<MemorizationSettings | null>(null);
  const memorizationRef = useRef<MemorizationSettings | null>(null);
  const completedRepetitions = useRef(0);
  const silenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const silenceNext = useRef<number | null>(null);
  const section = verses.some(v => v.sourceChapter !== undefined);
  const [reciterId, setReciterId] = useState(defaultReciterId);
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [playingSurah, setPlayingSurah] = useState(false);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translationEnabled, setTranslationEnabled] = useState(false);
  const translationRef = useRef(false);
  const [phase, setPhase] = useState<AudioPhase>("arabic");
  const phaseRef = useRef<AudioPhase>("arabic");
  const frenchCatalogRef = useRef<Map<number, string[]> | null>(null);
  const frenchCacheRef = useRef(new Map<string, Promise<Map<number, string[]>>>());
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const saved = localStorage.getItem("mirath:quran:french-audio") === "true";
        translationRef.current = saved; setTranslationEnabled(saved);
      } catch { /* Optional device preferences. */ }
    });
    return () => { cancelled = true; };
  }, []);
  const [repeatMode, setRepeatMode] = useState<"off" | "verse" | "surah">("off");
  const repeatModeRef = useRef<"off" | "verse" | "surah">("off");
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
  const startRef = useRef<(verse: number, urlIndex?: number, phase?: AudioPhase) => void>(() => {});
  const failureRef = useRef<() => void>(() => {});
  const preloadRef = useRef<HTMLAudioElement | null>(null);

  const clearWatchdog = useCallback(() => {
    if (watchdogRef.current) clearTimeout(watchdogRef.current);
    watchdogRef.current = null;
  }, []);

  const stop = useCallback(() => {
    requestRef.current++;
    if (silenceTimer.current) clearTimeout(silenceTimer.current);
    silenceTimer.current = null; silenceNext.current = null; completedRepetitions.current = 0;
    clearWatchdog();
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.removeAttribute("src"); audio.load(); }
    if (preloadRef.current) { preloadRef.current.removeAttribute("src"); preloadRef.current.load(); }
    currentVerseRef.current = null;
    surahRef.current = false;
    sequenceRef.current = false;
    setPlayingVerse(null);
    setPlayingSurah(false);
    setPaused(false);
    setLoading(false);
    phaseRef.current = "arabic"; setPhase("arabic");
    setError(null);
  }, [clearWatchdog]);

  const start = useCallback((verseNumber: number, urlIndex = 0, phase: AudioPhase = "arabic") => {
    const urls = (phase === "french" ? frenchCatalogRef : catalogRef).current?.get(verseNumber);
    const audio = audioRef.current;
    if (!urls?.[urlIndex] || !audio) {
      stop();
      setError(phase === "french" ? "La traduction audio de ce verset est indisponible. La lecture est arrêtée." : "Ce verset n’est pas disponible pour ce récitateur.");
      return;
    }
    clearWatchdog();
    phaseRef.current = phase; setPhase(phase);
    currentVerseRef.current = verseNumber;
    urlIndexRef.current = urlIndex;
    setPlayingVerse(verseNumber);
    setPaused(false);
    setLoading(true);
    const url = urls[urlIndex];
    audio.src = url;
    audio.play().catch((cause) => {
      if (audio.src !== url || currentVerseRef.current !== verseNumber || phaseRef.current !== phase) return;
      if (cause?.name === "NotAllowedError") {
        clearWatchdog(); setPaused(true); setLoading(false);
        setError("Votre navigateur a suspendu la lecture. Touchez Reprendre pour continuer.");
      } else failureRef.current();
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
    const phase = phaseRef.current;
    if ((phase === "french" ? frenchCatalogRef : catalogRef).current?.get(verse)?.[nextIndex]) startRef.current(verse, nextIndex, phase);
    else {
      stop();
      setError(phase === "french" ? `La traduction française du verset ${verse} n’a pas pu être chargée. La lecture est arrêtée ; réessayez ou désactivez la traduction audio.` : `La récitation du verset ${verse} n’a pas pu être chargée. Réessayez ou choisissez un autre récitateur.`);
    }
  }, [clearWatchdog, stop]);
  useEffect(() => {
    startRef.current = start;
    failureRef.current = handleFailure;
  }, [start, handleFailure]);

  useEffect(() => {
    const preload = new Audio();
    preload.preload = "auto";
    const audio = new Audio();
    audio.preload = "auto";
    preloadRef.current = preload;
    audioRef.current = audio;
    const onPlaying = () => {
      window.dispatchEvent(new CustomEvent(AUDIO_FOCUS_EVENT, { detail: audio }));
      clearWatchdog(); setLoading(false); setPaused(false); setError(null);
      const index = verses.findIndex(v => v.number === currentVerseRef.current);
      const current = currentVerseRef.current;
      const next = repeatModeRef.current === "verse" ? verses[index] : verses[index + 1] ?? (repeatModeRef.current === "surah" ? verses[0] : undefined);
      const url = phaseRef.current === "arabic" && translationRef.current && current !== null
        ? frenchCatalogRef.current?.get(current)?.[0]
        : next && (sequenceRef.current || repeatModeRef.current !== "off") ? catalogRef.current?.get(next.number)?.[0] : undefined;
      if (url) { preload.src = url; preload.load(); }
    };
    const onPause = () => { if (currentVerseRef.current !== null || surahRef.current) { setPaused(true); setLoading(false); clearWatchdog(); } };
    const onEnded = () => {
      clearWatchdog();
      if (surahRef.current) {
        if (repeatModeRef.current === "surah") {
          audio.currentTime = 0;
          audio.play().catch(() => { stop(); setError("La reprise de la sourate a échoué."); });
        } else stop();
        return;
      }
      const index = verses.findIndex((verse) => verse.number === currentVerseRef.current);
      if (phaseRef.current === "arabic" && translationRef.current && currentVerseRef.current !== null) {
        startRef.current(currentVerseRef.current, 0, "french");
        return;
      }
      if (memorizationRef.current && currentVerseRef.current !== null) {
        const settings = memorizationRef.current;
        const next = memorizationNext(settings, currentVerseRef.current, ++completedRepetitions.current, verses.map(v => v.number));
        if (!next) { stop(); return; }
        completedRepetitions.current = next.completed;
        silenceNext.current = next.verse;
        silenceTimer.current = setTimeout(() => { silenceTimer.current = null; silenceNext.current = null; startRef.current(next.verse); }, settings.delay * 1000);
        return;
      }
      if (repeatModeRef.current === "verse" && currentVerseRef.current !== null) startRef.current(currentVerseRef.current);
      else if ((sequenceRef.current || repeatModeRef.current === "surah") && verses[index + 1]) startRef.current(verses[index + 1].number);
      else if (repeatModeRef.current === "surah") startRef.current(verses[0].number);
      else stop();
    };
    const onError = () => {
      if (surahRef.current) { stop(); setError("La récitation intégrale est momentanément indisponible."); }
      else failureRef.current();
    };
    const onAudioFocus = (event: Event) => { if ((event as CustomEvent).detail !== audio) audio.pause(); };
    window.addEventListener(AUDIO_FOCUS_EVENT, onAudioFocus);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    audio.addEventListener("pause", onPause);
    return () => {
      clearWatchdog();
      if (silenceTimer.current) clearTimeout(silenceTimer.current);
      silenceNext.current = null; silenceTimer.current = null;
      audio.pause();
      window.removeEventListener(AUDIO_FOCUS_EVENT, onAudioFocus);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("pause", onPause);
      preload.removeAttribute("src"); preload.load();
      preloadRef.current = null;
      audioRef.current = null;
      currentVerseRef.current = null; surahRef.current = false; sequenceRef.current = false;
    };
  }, [clearWatchdog, stop, verses]);

  const configureMemorization = useCallback((settings: MemorizationSettings | null) => {
    if (settings && (reciterRef.current === "tvquran.hady-toure" || !validMemorization(settings, verses.map(v => v.number)))) return;
    stop();
    memorizationRef.current = settings; setMemorization(settings);
    repeatModeRef.current = "off"; setRepeatMode("off");
  }, [stop, verses]);

  const chooseReciter = useCallback((id: string) => {
    if (!reciters.some((reciter) => reciter.id === id && (!section || reciter.mode !== "surah"))) return;
    stop();
    memorizationRef.current = null; setMemorization(null);
    reciterRef.current = id;
    catalogRef.current = null;
    setReciterId(id);
    setError(null);
    if (id === "tvquran.hady-toure" && repeatModeRef.current === "verse") {
      repeatModeRef.current = "off";
      setRepeatMode("off");
    }
  }, [stop, section]);

  const chooseTranslation = useCallback((enabled: boolean) => {
    if (enabled && reciterRef.current === "tvquran.hady-toure") return;
    stop();
    translationRef.current = enabled; setTranslationEnabled(enabled);
    try { localStorage.setItem("mirath:quran:french-audio", String(enabled)); } catch { /* Optional preferences. */ }
  }, [stop]);

  const chooseRepeatMode = useCallback((mode: "off" | "verse" | "surah") => {
    if (mode === "verse" && reciterRef.current === "tvquran.hady-toure") return;
    if (memorizationRef.current) { stop(); memorizationRef.current = null; setMemorization(null); }
    const next = repeatModeRef.current === mode ? "off" : mode;
    repeatModeRef.current = next;
    setRepeatMode(next);
  }, [stop]);

  const playVerse = useCallback(async (verseNumber: number, continueSequence = false) => {
    if (reciterRef.current === "tvquran.hady-toure" || !verses.some((verse) => verse.number === verseNumber)) return;
    stop();
    setError(null);
    setLoading(true);
    const request = requestRef.current;
    const id = reciterRef.current;
    const key = `${chapter}/${id}/${verses[0].globalNumber}/${verses.at(-1)?.globalNumber}`;
    let pending = catalogCacheRef.current.get(key);
    if (!pending) {
      pending = offlineCatalog(chapter, id, verses);
      catalogCacheRef.current.set(key, pending);
    }
    try {
      const frenchKey = `${chapter}/${verses[0].globalNumber}/${verses.at(-1)?.globalNumber}`;
      let frenchPending: Promise<Map<number, string[]>> | undefined;
      if (translationRef.current) {
        frenchPending = frenchCacheRef.current.get(frenchKey);
        if (!frenchPending) {
          frenchPending = offlineCatalog(chapter, id, verses, true);
          frenchCacheRef.current.set(frenchKey, frenchPending);
        }
      }
      const [catalog, french] = await Promise.all([pending, frenchPending]);
      if (request !== requestRef.current) return;
      catalogRef.current = catalog;
      frenchCatalogRef.current = french ?? null;
      sequenceRef.current = continueSequence;
      startRef.current(verseNumber);
    } catch (cause) {
      catalogCacheRef.current.delete(key);
      frenchCacheRef.current.delete(`${chapter}/${verses[0].globalNumber}/${verses.at(-1)?.globalNumber}`);
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
    if (silenceTimer.current) { clearTimeout(silenceTimer.current); silenceTimer.current = null; }
    audioRef.current?.pause();
    clearWatchdog();
    setPaused(true);
    setLoading(false);
  }, [clearWatchdog]);
  const resume = useCallback(() => {
    if (silenceNext.current !== null) { const next = silenceNext.current; silenceNext.current = null; startRef.current(next); return; }
    const audio = audioRef.current;
    if (!audio || (currentVerseRef.current === null && !surahRef.current)) return;
    setPaused(false);
    setLoading(true);
    setError(null);
    audio.play().catch(() => {
      if (surahRef.current) { stop(); setError("Impossible de reprendre la sourate."); }
      else failureRef.current();
    });
  }, [stop]);

  // Synchronize the external audio element when the requested reading session changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { stop(); memorizationRef.current = null; setMemorization(null); catalogRef.current = null; }, [chapter, verses, stop]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const session = navigator.mediaSession;
    const actions: [MediaSessionAction, MediaSessionActionHandler][] = [
      ["play", resume], ["pause", pause], ["stop", stop],
      ["nexttrack", () => { const i = verses.findIndex(v => v.number === currentVerseRef.current); if (verses[i + 1]) void playVerse(verses[i + 1].number, true); }],
      ["previoustrack", () => { const i = verses.findIndex(v => v.number === currentVerseRef.current); if (verses[i - 1]) void playVerse(verses[i - 1].number, true); }],
      ["seekto", details => { const audio = audioRef.current; if (audio && Number.isFinite(details.seekTime) && Number.isFinite(audio.duration)) audio.currentTime = Math.max(0, Math.min(details.seekTime!, audio.duration)); }],
    ];
    for (const [action, handler] of actions) try { session.setActionHandler(action, handler); } catch { /* Browser support differs. */ }
    return () => { for (const [action] of actions) try { session.setActionHandler(action, null); } catch {} };
  }, [resume, pause, stop, playVerse, verses]);

  useEffect(() => {
    if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined") return;
    const active = reciters.find(r => r.id === reciterId)!;
    const verse = verses.find(v => v.number === playingVerse);
    navigator.mediaSession.metadata = new MediaMetadata({ title: `Coran · sourate ${verse?.sourceChapter ?? chapter}${playingVerse ? ` · verset ${verse?.sourceVerse ?? playingVerse}` : ""}`, artist: phase === "french" ? frenchAudioEdition.name : active.nom, album: "MIRÂTH", artwork: [{ src: "/icon-512.png", sizes: "512x512", type: "image/png" }] });
    navigator.mediaSession.playbackState = playingVerse === null && !playingSurah ? "none" : paused ? "paused" : "playing";
  }, [chapter, verses, reciterId, playingVerse, playingSurah, paused, phase]);

  return <QuranAudioContext.Provider value={{ memorization, configureMemorization, section, verses, translationEnabled, phase, chooseTranslation, reciterId, chooseReciter, playingVerse, playingSurah, paused, loading, error, repeatMode, chooseRepeatMode, stop, pause, resume, playVerse, playSurah }}>
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

  return <section aria-label="Lecteur audio du Coran" className="reader-secondary relative mt-5 overflow-hidden rounded-2xl border border-[#cabf9f] bg-[#f8f4e9]/95 shadow-[0_16px_45px_-25px_rgba(16,58,49,.35)] dark:border-gold-500/25 dark:bg-ink-950/95">
    <div className="px-4 py-3 sm:px-5">
      <details>
        <summary className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-semibold text-primary"><Headphones className="size-5 shrink-0" aria-hidden="true" /><span>Choisir un récitateur · {active.nom}</span></summary>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[.16em] text-emerald-900 dark:text-gold-500">Récitateur</p>
      <div className="flex gap-3 overflow-x-auto pb-3" role="group" aria-label="Choisir un récitateur">
        {reciters.filter(reciter => !player.section || reciter.mode !== "surah").map((reciter) => <button key={reciter.id} type="button" onClick={() => player.chooseReciter(reciter.id)} aria-pressed={player.reciterId === reciter.id}
          className={`flex min-w-32 max-w-32 flex-col items-center gap-2 rounded-xl border p-3 text-center text-xs font-medium transition-colors hover:border-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${player.reciterId === reciter.id ? "border-emerald-800 bg-emerald-900/10 text-emerald-950 dark:border-gold-500 dark:bg-gold-500/15 dark:text-ivory-50" : "border-border bg-white/65 text-muted dark:bg-white/5"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {reciter.portrait ? <img src={reciter.portrait} alt="" loading="lazy" className={`size-14 rounded-full object-cover ring-2 ${player.reciterId === reciter.id ? "ring-gold-500" : "ring-[#d8ccb2]"}`} /> : <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full bg-emerald-900 font-display text-lg text-gold-500 ring-2 ring-[#d8ccb2]">{reciter.nom.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span>}
          <span>{reciter.nom}</span>
          {reciter.mode === "surah" && <span className="text-xs text-muted">Sourate entière</span>}
        </button>)}
      </div>
      </details>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        {active.mode === "surah" ? (!player.playingSurah ? <Button onClick={player.playSurah} disabled={player.loading} className="bg-emerald-900 text-ivory-50 hover:bg-emerald-700"><Play className="size-4" /> Écouter Muhammad Hady Touré</Button> : <><Button variant="outline" onClick={player.paused ? player.resume : player.pause}>{player.paused ? <Play className="size-4" /> : <Pause className="size-4" />}{player.paused ? "Reprendre" : "Pause"}</Button><Button variant="ghost" onClick={player.stop}><Square className="size-4" /> Arrêter</Button></>) : player.playingVerse === null ? <Button onClick={() => player.playVerse(player.verses[0].number, true)} disabled={player.loading} className="bg-emerald-900 text-ivory-50 hover:bg-emerald-700">
          {player.loading ? <LoaderCircle className="size-4 animate-spin" /> : <Play className="size-4" />} {player.loading ? "Chargement…" : (player.section ? "Écouter la portion" : "Écouter la sourate")}
        </Button> : <>
          <Button variant="outline" size="icon" aria-label="Verset précédent" disabled={!previous} onClick={() => player.playVerse(previous.number, true)}><SkipBack className="size-4" /></Button>
          <Button variant="outline" size="icon" aria-label={player.paused ? "Reprendre" : "Mettre en pause"} onClick={player.paused ? player.resume : player.pause}>
            {player.paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </Button>
          <Button variant="outline" size="icon" aria-label="Verset suivant" disabled={!next} onClick={() => player.playVerse(next.number, true)}><SkipForward className="size-4" /></Button>
          <Button variant="ghost" size="sm" onClick={player.stop}><Square className="size-4" /> Arrêter</Button>
        </>}
        <span aria-live="polite" className="ml-auto text-xs font-medium text-emerald-900 dark:text-gold-500">
          {player.playingVerse !== null ? `${player.phase === "french" ? frenchAudioEdition.name : active.nom} · verset ${player.playingVerse}/${player.verses.length}${player.paused ? " · en pause" : ""}` : active.nom}
        </span>
      </div>
      <div className="mt-4 rounded-xl border border-gold-600/25 bg-surface p-4">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-semibold">
          <input type="checkbox" checked={player.translationEnabled && active.mode !== "surah"} disabled={active.mode === "surah"} onChange={event => player.chooseTranslation(event.target.checked)} className="size-5 accent-emerald-800" />
          Français après chaque verset · {frenchAudioEdition.name}
        </label>
        <p className="mt-1 text-sm leading-6 text-muted">{active.mode === "surah" ? "Choisissez un récitateur disponible verset par verset pour utiliser cette option." : "Récitation arabe, traduction du sens en français, puis verset suivant. Changer cette option arrête la lecture en cours."}</p>
        {player.translationEnabled && active.mode !== "surah" && <p aria-live="polite" className="mt-2 text-sm font-medium text-primary">{player.playingVerse === null ? "Alternance activée" : player.phase === "french" ? "Lecture française du sens" : "Récitation arabe"}</p>}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4" role="group" aria-label="Répétition audio">
        <span className="mr-1 text-xs font-semibold text-muted">Répétition</span>
        {active.mode !== "surah" && <button type="button" onClick={() => player.chooseRepeatMode("verse")} aria-pressed={player.repeatMode === "verse"}
          className={`inline-flex items-center gap-1.5 rounded-lg border min-h-11 px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-gold-500 ${player.repeatMode === "verse" ? "border-emerald-800 bg-emerald-900 text-white" : "border-border hover:border-emerald-800"}`}>
          <Repeat1 className="size-4" /> Répéter le verset
        </button>}
        <button type="button" onClick={() => player.chooseRepeatMode("surah")} aria-pressed={player.repeatMode === "surah"}
          className={`inline-flex items-center gap-1.5 rounded-lg border min-h-11 px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-gold-500 ${player.repeatMode === "surah" ? "border-emerald-800 bg-emerald-900 text-white" : "border-border hover:border-emerald-800"}`}>
          <Repeat className="size-4" /> {player.section ? "Boucler la portion" : "Boucler la sourate"}
        </button>
      </div>
      {player.error && <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">{player.error}</p>}
      {active.mode === "surah" && <p className="mt-3 text-xs leading-5 text-muted">Récitation Hafs de la sourate entière, diffusée par TVQuran. La lecture n’est pas synchronisée avec les versets affichés. <a href="https://www.tvquran.com/en/scholar/355/profile/mohammed-hady-toure" target="_blank" rel="noopener noreferrer" className="underline">Source et collection</a>.</p>}
      <details className="mt-3 border-t border-border pt-2 text-sm"><summary className="min-h-11 cursor-pointer py-3 font-medium text-primary">Sources audio et crédits</summary>
      <p className="mt-2 text-sm leading-6 text-muted">Traduction audio : <a href={frenchAudioEdition.source} target="_blank" rel="noopener noreferrer" className="underline">{frenchAudioEdition.name}</a>, d’après {frenchAudioEdition.translation}. Les mots peuvent varier légèrement par rapport à la version écrite affichée. Diffusion par Al Quran Cloud, édition {frenchAudioEdition.id}, selon <a href={frenchAudioEdition.terms} target="_blank" rel="noopener noreferrer" className="underline">ses conditions d’utilisation</a>.</p>
      {active.everyAyahFolder && <p className="mt-3 text-xs leading-5 text-muted">Lecture verset par verset depuis <a href={`https://everyayah.com/data/${active.everyAyahFolder}/`} target="_blank" rel="noopener noreferrer" className="underline">EveryAyah</a>. Concordance écoutée sur des échantillons des sourates 1, 2 et 112 ; le reste du catalogue n’a pas été contrôlé individuellement.</p>}
      <div className="mt-5 border-t border-border pt-4">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-900 dark:text-gold-500">Autres récitations · sources externes</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={chapter ? `https://www.mp3quran.net/ar/nourin_siddig/${chapter}` : "https://www.mp3quran.net/ar/nourin_siddig"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium hover:border-gold-600">Noreen Sidiq <span className="text-xs text-muted">ad-Dûrî</span> <ExternalLink className="size-3.5" /></a>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted">La lecture ad-Dûrî de Noreen diffère du texte Hafs affiché.</p>
      </div>
      <details className="mt-3 text-xs text-muted">
        <summary className="w-fit cursor-pointer hover:underline">Crédits des portraits</summary>
        <p className="mt-2 leading-relaxed">
          Photos : <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:%D0%9C%D0%B8%D1%88%D0%B0%D1%80%D0%B8_%D0%A0%D0%B0%D1%88%D0%B8%D0%B4.jpg">Alafasy</a> (quranic.ru, libre utilisation déclarée),{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Saud_Shuraim.png">Shuraim</a> et{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Sheikh_Sudais.png">Sudais</a> (Sazwanmisuari, CC0),{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Abdul_Basit_Abdul_Samad_at_Centenary_Celebration_Of_Darul_Uloom_Deoband_1980.jpg">Abdul Basit</a> (Prasar Bharati, GODL-India),{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Hussary.jpg">Husary</a> et{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Elminshwey.jpg">Minshawi</a> (domaine public selon Wikimedia Commons),{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Saad_al_Ghamdi.jpg">Saad Al-Ghamdi</a> (الشيخ هيثم الدخين, <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>, cadrage adapté),{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D8%B9%D9%84%D9%8A_%D8%AC%D8%A7%D8%A8%D8%B1.png">Ali Jaber</a> (Engalali9, CC0, cadrage adapté).{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Ali_al-Hudhayfi.jpg">Ali Al-Houdhayfi</a> (آيات, <a className="underline" href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">CC BY 3.0</a>, cadrage adapté).{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.tvquran.com/en/scholar/50/profile/abdullah-al-mattrod">Abdullah Matrood</a> et{" "}
          <a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.tvquran.com/en/scholar/355/profile/mohammed-hady-toure">Muhammad Hady Touré</a> : photos affichées depuis leurs fiches TVQuran.
        </p>
      </details>
      </details>
    </div>
  </section>;
}

/** Commandes compactes toujours accessibles pendant la lecture, sans masquer la page. */
export function QuranMiniPlayer() {
  const persistent = useContext(SessionSetup);
  const player = useQuranAudioContext();
  const active = reciters.find((reciter) => reciter.id === player.reciterId)!;
  if (persistent || (player.playingVerse === null && !player.playingSurah && !player.loading)) return null;

  return <aside aria-label="Mini-lecteur du Coran" className="quran-floating-player fixed left-3 right-3 z-40 flex max-w-sm items-center gap-2 rounded-2xl border border-gold-500/35 bg-emerald-950 px-3 py-2.5 text-ivory-50 shadow-[0_16px_42px_rgba(4,38,32,.3)] sm:left-5 sm:right-auto sm:min-w-72">
    {active.portrait ? <img src={active.portrait} alt="" className="size-10 shrink-0 rounded-full object-cover ring-1 ring-gold-500/60" />
      : <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-500/60 font-display text-sm text-gold-500">{active.nom.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span>}
    <div className="min-w-0 flex-1 leading-tight">
      <p className="truncate text-xs font-semibold">{active.nom}</p>
      <p aria-live="polite" className="mt-0.5 truncate text-[11px] text-ivory-50/70">{player.loading ? "Chargement…" : player.playingSurah ? "Sourate entière" : `Verset ${player.playingVerse}/${player.verses.length}`}{player.repeatMode === "surah" ? " · en boucle" : player.repeatMode === "verse" ? " · répété" : ""}</p>
    </div>
    <button type="button" onClick={player.paused ? player.resume : player.pause} disabled={player.loading} aria-label={player.paused ? "Reprendre la récitation" : "Mettre la récitation en pause"} className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-emerald-950 transition-colors hover:bg-gold-400 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-white">
      {player.loading ? <LoaderCircle className="size-4 animate-spin" /> : player.paused ? <Play className="size-4 fill-current" /> : <Pause className="size-4 fill-current" />}
    </button>
    <button type="button" onClick={player.stop} aria-label="Arrêter la récitation" className="flex size-8 shrink-0 items-center justify-center rounded-full text-ivory-50/70 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"><Square className="size-3.5" /></button>
  </aside>;
}

export function VersePlayButton({ verseNumber }: { verseNumber: number }) {
  const player = useQuranAudioContext();
  if (player.reciterId === "tvquran.hady-toure") return null;
  const selected = player.playingVerse === verseNumber;
  return <button type="button" onClick={() => selected ? (player.paused ? player.resume() : player.pause()) : player.playVerse(verseNumber, true)}
    aria-label={selected ? (player.paused ? `Reprendre le verset ${verseNumber}` : `Mettre en pause le verset ${verseNumber}`) : `Écouter le verset ${verseNumber}`}
    className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${selected ? "border-emerald-900 bg-emerald-900 text-white" : "border-border text-emerald-900 hover:border-emerald-900 hover:bg-emerald-900/10 dark:text-gold-500"}`}>
    {selected && !player.paused ? <Pause className="size-4" /> : <Play className="size-4" />}
  </button>;
}
