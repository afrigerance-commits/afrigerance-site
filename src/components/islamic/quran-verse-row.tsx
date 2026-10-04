"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useQuranAudioContext, VersePlayButton } from "@/components/islamic/quran-audio-player";

/**
 * Enveloppe un verset pour le mettre en exergue et le faire suivre
 * automatiquement par le défilement pendant la lecture audio — manuelle
 * (un seul verset) ou continue (la sourate entière).
 */
export function QuranVerseRow({ verseNumber, children }: { verseNumber: number; children: ReactNode }) {
  const player = useQuranAudioContext();
  const isPlaying = player.playingVerse === verseNumber;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isPlaying]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 rounded-lg border-b border-border px-3 pb-8 transition-colors duration-300 last:border-0",
        isPlaying && "border-transparent bg-accent/10 ring-1 ring-accent/40",
      )}
    >
      {children}
    </div>
  );
}

export { VersePlayButton };
