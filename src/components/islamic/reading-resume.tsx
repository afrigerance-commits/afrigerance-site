"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bookmark } from "lucide-react";
import { parseReadingPosition, readingPositionKey, type ReadingPosition } from "@/lib/quran/reading-position";
import type { QuranChapterMeta } from "@/lib/quran/data";

export function ReadingResume({ chapters }: { chapters: QuranChapterMeta[] }) {
  const [position, setPosition] = useState<ReadingPosition | null>(null);
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => { if (cancelled) return; try { setPosition(parseReadingPosition(localStorage.getItem(readingPositionKey), chapters)); } catch { /* Private mode. */ } });
    return () => { cancelled = true; };
  }, [chapters]);
  if (!position) return null;
  const chapter = chapters.find((c) => c.number === position.chapter)!;
  return <Link href={`/coran/${position.chapter}#verset-${position.verse}`} className="resume-panel my-6 flex flex-wrap items-center gap-4 rounded-2xl border border-accent/35 bg-surface px-5 py-4 transition-colors hover:border-primary"><Bookmark className="size-5 text-primary" /><div className="flex-1"><span className="block text-[10px] font-semibold uppercase tracking-widest text-accent-text">Reprendre ma lecture</span><span className="mt-1 block text-sm font-medium">{chapter.nameFrench} · verset {position.verse}</span></div><span className="hidden text-xs text-muted sm:block">Enregistré sur cet appareil</span><ArrowUpRight className="size-4 text-primary" /></Link>;
}

export function ReadingPositionTracker({ chapter, verseCount }: { chapter: number; verseCount: number }) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[id^="verset-"]'));
    if (!elements.length || !("IntersectionObserver" in window)) return;
    const visible = new Map<number, number>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const verse = Number(entry.target.id.replace("verset-", ""));
        if (entry.isIntersecting) visible.set(verse, entry.boundingClientRect.top);
        else visible.delete(verse);
      }
      const verse = [...visible.keys()].sort((a,b) => a-b)[0];
      if (!Number.isInteger(verse) || verse < 1 || verse > verseCount) return;
      try { localStorage.setItem(readingPositionKey, JSON.stringify({ chapter, verse })); } catch { /* Storage optional. */ }
    }, { rootMargin: "-20% 0px -50% 0px", threshold: 0 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [chapter, verseCount]);
  return null;
}
