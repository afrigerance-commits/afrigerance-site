"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { reciters, defaultReciterId, getAyahAudioUrl } from "@/lib/quran/reciters";

interface VerseAudioRef {
  number: number;
  globalNumber: number;
}

interface QuranAudioState {
  verses: VerseAudioRef[];
  reciterId: string;
  setReciterId: (id: string) => void;
  playingVerse: number | null;
  stop: () => void;
  playVerse: (verseNumber: number, continueSequence?: boolean) => void;
}

const QuranAudioContext = createContext<QuranAudioState | null>(null);

/**
 * Lecture audio verset par verset. Les fichiers mp3 sont chargés directement
 * par le navigateur du visiteur depuis cdn.islamic.network (API Al Quran
 * Cloud) — aucun fichier n'est stocké ni proxé par ce site, voir
 * docs/CONTENT_SOURCES.md. Un seul élément <audio> est partagé par toute la
 * page via ce contexte, pour permettre la lecture continue d'une sourate.
 *
 * L'état "quel verset/débit est en cours" vit dans des refs (currentVerseRef,
 * currentBitrateRef), pas dans le state React : les évènements natifs
 * `ended`/`error` de l'élément <audio> et le rejet de la promesse `play()`
 * peuvent se déclencher dans un ordre non déterministe, et lire l'état React
 * depuis leur gestionnaire (fermeture figée au moment du dernier rendu)
 * provoquait une course — la lecture s'arrêtait silencieusement au premier
 * verset manquant chez certains récitateurs au lieu de passer au suivant.
 */
export function QuranAudioProvider({ verses, children }: { verses: VerseAudioRef[]; children: ReactNode }) {
  const [reciterId, setReciterId] = useState(defaultReciterId);
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reciterIdRef = useRef(reciterId);
  const versesRef = useRef(verses);
  const sequentialRef = useRef(false);
  const currentVerseRef = useRef<number | null>(null);
  const currentBitrateRef = useRef<64 | 128>(128);
  const failureHandledRef = useRef(false);

  useEffect(() => {
    reciterIdRef.current = reciterId;
  }, [reciterId]);

  useEffect(() => {
    versesRef.current = verses;
  }, [verses]);

  const attemptPlayRef = useRef<(verseNumber: number, bitrate: 64 | 128, continueSequence: boolean) => void>(
    () => {},
  );

  const advance = useCallback((fromVerse: number) => {
    if (!sequentialRef.current) {
      setPlayingVerse(null);
      return;
    }
    const list = versesRef.current;
    const idx = list.findIndex((v) => v.number === fromVerse);
    const next = list[idx + 1];
    if (next) {
      attemptPlayRef.current(next.number, 128, true);
    } else {
      sequentialRef.current = false;
      setPlayingVerse(null);
    }
  }, []);

  const handleFailure = useCallback(() => {
    if (failureHandledRef.current) return;
    failureHandledRef.current = true;
    const verseNumber = currentVerseRef.current;
    if (verseNumber == null) {
      setPlayingVerse(null);
      return;
    }
    if (currentBitrateRef.current === 128) {
      attemptPlayRef.current(verseNumber, 64, sequentialRef.current);
    } else {
      advance(verseNumber);
    }
  }, [advance]);

  const attemptPlay = useCallback(
    (verseNumber: number, bitrate: 64 | 128, continueSequence: boolean) => {
      const audio = audioRef.current;
      const verse = versesRef.current.find((v) => v.number === verseNumber);
      if (!audio || !verse) {
        setPlayingVerse(null);
        return;
      }
      sequentialRef.current = continueSequence;
      currentVerseRef.current = verseNumber;
      currentBitrateRef.current = bitrate;
      failureHandledRef.current = false;
      setPlayingVerse(verseNumber);
      audio.src = getAyahAudioUrl(verse.globalNumber, reciterIdRef.current, bitrate);
      audio.play().catch(() => {
        // Le gestionnaire natif `error` traite déjà la plupart des échecs ;
        // ce filet de sécurité couvre les navigateurs qui rejettent la
        // promesse sans émettre l'évènement `error` (ex. flux interrompu).
        handleFailure();
      });
    },
    [handleFailure],
  );

  useEffect(() => {
    attemptPlayRef.current = attemptPlay;
  }, [attemptPlay]);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      const verseNumber = currentVerseRef.current;
      if (verseNumber != null) advance(verseNumber);
    };
    const handleError = () => handleFailure();

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [advance, handleFailure]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    sequentialRef.current = false;
    currentVerseRef.current = null;
    setPlayingVerse(null);
  }, []);

  const playVerse = useCallback(
    (verseNumber: number, continueSequence = false) => attemptPlay(verseNumber, 128, continueSequence),
    [attemptPlay],
  );

  return (
    <QuranAudioContext.Provider value={{ verses, reciterId, setReciterId, playingVerse, stop, playVerse }}>
      {children}
    </QuranAudioContext.Provider>
  );
}

export function useQuranAudioContext() {
  const ctx = useContext(QuranAudioContext);
  if (!ctx) throw new Error("useQuranAudioContext doit être utilisé à l'intérieur de <QuranAudioProvider>.");
  return ctx;
}

export function QuranAudioToolbar() {
  const player = useQuranAudioContext();

  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-3 rounded-lg border border-border bg-surface px-4 py-3">
      <Select value={player.reciterId} onValueChange={player.setReciterId}>
        <SelectTrigger className="w-auto min-w-[14rem]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {reciters.map((r) => (
            <SelectItem key={r.id} value={r.id}>
              {r.nom}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {player.playingVerse === null ? (
        <Button size="sm" onClick={() => player.playVerse(player.verses[0]?.number ?? 1, true)}>
          <Play className="h-4 w-4" /> Écouter la sourate
        </Button>
      ) : (
        <Button size="sm" variant="outline" onClick={player.stop}>
          <Square className="h-4 w-4" /> Arrêter (verset {player.playingVerse})
        </Button>
      )}
    </div>
  );
}

export function VersePlayButton({ verseNumber }: { verseNumber: number }) {
  const player = useQuranAudioContext();
  const isPlaying = player.playingVerse === verseNumber;
  return (
    <button
      type="button"
      onClick={() => (isPlaying ? player.stop() : player.playVerse(verseNumber))}
      aria-label={isPlaying ? `Mettre en pause le verset ${verseNumber}` : `Écouter le verset ${verseNumber}`}
      className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-px" />}
    </button>
  );
}
