"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Bookmark, BookmarkCheck, Minus, Plus } from "lucide-react";
import { VersePlayButton } from "@/components/islamic/quran-audio-player";

interface ReadingState {
  bookmarked: number | null;
  setBookmark: (verse: number) => void;
  showFrench: boolean;
  fontSize: number;
}

const ReadingContext = createContext<ReadingState | null>(null);

export function QuranReadingTools({ chapter, children }: { chapter: number; children: ReactNode }) {
  const [bookmarked, setBookmarked] = useState<number | null>(null);
  const [showFrench, setShowFrench] = useState(true);
  const [fontSize, setFontSize] = useState(32);

  useEffect(() => {
    let cancelled = false;
    try {
      const saved = Number(localStorage.getItem(`mirath:quran:bookmark:${chapter}`));
      const french = localStorage.getItem("mirath:quran:french") !== "false";
      const size = Number(localStorage.getItem("mirath:quran:font-size"));
      queueMicrotask(() => {
        if (cancelled) return;
        setBookmarked(Number.isInteger(saved) && saved > 0 ? saved : null);
        setShowFrench(french);
        if (size >= 26 && size <= 46) setFontSize(size);
      });
    } catch { /* La lecture fonctionne aussi sans stockage local. */ }
    return () => { cancelled = true; };
  }, [chapter]);

  function setBookmark(verse: number) {
    const value = bookmarked === verse ? null : verse;
    setBookmarked(value);
    try {
      if (value) localStorage.setItem(`mirath:quran:bookmark:${chapter}`, String(value));
      else localStorage.removeItem(`mirath:quran:bookmark:${chapter}`);
    } catch { /* Stockage désactivé. */ }
  }

  function changeFont(amount: number) {
    const size = Math.max(26, Math.min(46, fontSize + amount));
    setFontSize(size);
    try { localStorage.setItem("mirath:quran:font-size", String(size)); } catch { /* Stockage désactivé. */ }
  }

  function toggleFrench() {
    setShowFrench((current) => {
      try { localStorage.setItem("mirath:quran:french", String(!current)); } catch { /* Stockage désactivé. */ }
      return !current;
    });
  }

  return <ReadingContext.Provider value={{ bookmarked, setBookmark, showFrench, fontSize }}>
    <div className="mt-8 flex flex-wrap items-center gap-2 rounded-2xl border border-gold-600/25 bg-[#f8f4e9] p-3 text-sm dark:bg-emerald-900/15 sm:p-4" aria-label="Options de lecture">
      <span className="mr-auto font-semibold text-emerald-950 dark:text-ivory-50">Ma lecture</span>
      {bookmarked && <a href={`#verset-${bookmarked}`} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-emerald-800 underline underline-offset-4 hover:bg-emerald-900/10 dark:text-gold-500"><BookmarkCheck className="size-4" /> Reprendre au verset {bookmarked}</a>}
      <button type="button" aria-pressed={showFrench} onClick={toggleFrench} className="rounded-lg border border-border bg-white/70 px-3 py-1.5 font-medium hover:border-emerald-700 dark:bg-white/5">Traduction {showFrench ? "visible" : "masquée"}</button>
      <div className="flex items-center rounded-lg border border-border bg-white/70 dark:bg-white/5" aria-label="Taille du texte arabe">
        <button type="button" aria-label="Réduire le texte arabe" disabled={fontSize <= 26} onClick={() => changeFont(-4)} className="p-2 disabled:opacity-40"><Minus className="size-4" /></button>
        <span className="px-1 text-xs" aria-hidden="true">Aa</span>
        <button type="button" aria-label="Agrandir le texte arabe" disabled={fontSize >= 46} onClick={() => changeFont(4)} className="p-2 disabled:opacity-40"><Plus className="size-4" /></button>
      </div>
    </div>
    {children}
  </ReadingContext.Provider>;
}

export function QuranVerseContent({ chapter, number, arabic, french }: { chapter: number; number: number; arabic: string; french: string }) {
  const reading = useContext(ReadingContext);
  if (!reading) throw new Error("QuranVerseContent doit être dans QuranReadingTools.");
  const saved = reading.bookmarked === number;
  return <div id={`verset-${number}`} className="scroll-mt-64 py-5 sm:py-7">
    <div className="mb-4 flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold-600/35 bg-emerald-900 text-xs font-semibold text-gold-500" aria-label={`Verset ${number}`}>{number}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-gold-600/35 to-transparent" aria-hidden="true" />
      <button type="button" aria-label={saved ? `Retirer le signet du verset ${number}` : `Marquer le verset ${number}`} aria-pressed={saved} onClick={() => reading.setBookmark(number)} className="rounded-full p-2 text-emerald-800 hover:bg-gold-600/10 focus-visible:outline-2 focus-visible:outline-gold-600 dark:text-gold-500">
        {saved ? <BookmarkCheck className="size-5" /> : <Bookmark className="size-5" />}
      </button>
    </div>
    <div className="flex items-start gap-2 sm:gap-5">
      <p lang="ar" dir="rtl" className="quran-quote min-w-0 flex-1 text-right text-emerald-950 dark:text-ivory-50" style={{ fontSize: reading.fontSize }}>{arabic}</p>
      <VersePlayButton verseNumber={number} />
    </div>
    {reading.showFrench && <p lang="fr" className="mt-5 max-w-[68ch] border-l-2 border-gold-600/35 pl-4 text-[15px] leading-7 text-foreground/85 sm:ml-3">{french}</p>}
    <a href={`/coran/${chapter}#verset-${number}`} className="sr-only">Lien vers le verset {number}</a>
  </div>;
}
