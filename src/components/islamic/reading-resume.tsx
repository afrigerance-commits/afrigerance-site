"use client";
import { getPersonalItem, setPersonalItem } from "@/lib/account/storage";

import { useEffect, useState } from "react";
import { readingDestination } from "@/lib/quran/reading-destination";
import { chapterName } from "@/lib/quran/chapter-name";
import Link from "next/link";
import { ArrowUpRight, Bookmark } from "lucide-react";
import { readingPositionKey } from "@/lib/quran/reading-position";
import type { QuranChapterMeta } from "@/lib/quran/data";

export function ReadingResume({ chapters }: { chapters: QuranChapterMeta[] }) {
  const [destination, setDestination] = useState<ReturnType<typeof readingDestination>>(null);
  useEffect(() => {
    let cancelled = false;
    const load = () => { if (cancelled) return; try { setDestination(readingDestination(getPersonalItem(readingPositionKey), chapters)); } catch { setDestination(null); } };
    queueMicrotask(load); window.addEventListener("storage",load); window.addEventListener("mirath-account-storage",load);
    return () => { cancelled = true; window.removeEventListener("storage",load); window.removeEventListener("mirath-account-storage",load); };
  }, [chapters]);
  if (!destination) return null;
  const position = destination.position;
  const chapter = chapters.find((c) => c.number === position.chapter)!;
  return <Link href={destination.href} className="resume-panel atelier-resume my-6 flex flex-wrap items-center gap-4 rounded-2xl border border-accent/35 bg-surface px-5 py-4 transition-colors hover:border-primary"><Bookmark className="size-5 text-primary" /><div className="flex-1"><span className="block text-[10px] font-semibold uppercase tracking-widest text-accent-text">Reprendre ma lecture</span><span className="mt-1 block text-sm font-medium">{destination.label ?? `${chapterName(chapter)} · verset ${position.verse}`}</span></div><span className="hidden text-xs text-muted sm:block">Enregistré sur cet appareil</span><ArrowUpRight className="size-4 text-primary" /></Link>;
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
      try { setPersonalItem(readingPositionKey, JSON.stringify({ chapter, verse })); } catch { /* Storage optional. */ }
    }, { rootMargin: "-20% 0px -50% 0px", threshold: 0 });
    const observe=()=>{document.querySelectorAll(`[id^="verset-"]`).forEach(element=>observer.observe(element));};
    observe();
    const mutation=new MutationObserver(observe);
    const sheet=document.querySelector(".mushaf-sheet");if(sheet)mutation.observe(sheet,{childList:true});
    return () => {observer.disconnect();mutation.disconnect();};
  }, [chapter, verseCount]);
  return null;
}
