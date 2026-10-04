"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
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
 */
export function QuranAudioProvider({ verses, children }: { verses: VerseAudioRef[]; children: ReactNode }) {
  const [reciterId, setReciterId] = useState(defaultReciterId);
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const sequentialRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    sequentialRef.current = false;
    setPlayingVerse(null);
  }, []);

  const playVerse = useCallback(
    (verseNumber: number, continueSequence = false) => {
      const audio = audioRef.current;
      const verse = verses.find((v) => v.number === verseNumber);
      if (!audio || !verse) return;
      sequentialRef.current = continueSequence;
      audio.src = getAyahAudioUrl(verse.globalNumber, reciterId);
      audio.play().catch(() => setPlayingVerse(null));
      setPlayingVerse(verseNumber);
    },
    [reciterId, verses],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      if (!sequentialRef.current || playingVerse === null) {
        setPlayingVerse(null);
        return;
      }
      const currentIndex = verses.findIndex((v) => v.number === playingVerse);
      const next = verses[currentIndex + 1];
      if (next) {
        playVerse(next.number, true);
      } else {
        sequentialRef.current = false;
        setPlayingVerse(null);
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [playingVerse, verses, playVerse]);

  return (
    <QuranAudioContext.Provider value={{ verses, reciterId, setReciterId, playingVerse, stop, playVerse }}>
      {children}
    </QuranAudioContext.Provider>
  );
}

function useQuranAudioContext() {
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
