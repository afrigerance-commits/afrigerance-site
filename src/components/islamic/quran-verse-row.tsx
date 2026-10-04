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
        "scroll-mt-56 flex flex-col gap-3 rounded-2xl border border-transparent border-b-border px-3 pb-8 transition-colors duration-300 sm:px-6",
        isPlaying && "border-gold-600/50 bg-[#f5f0e6] shadow-sm ring-1 ring-gold-600/25 dark:bg-emerald-900/20",
      )}
    >
      {children}
    </div>
  );
}

export { VersePlayButton };
