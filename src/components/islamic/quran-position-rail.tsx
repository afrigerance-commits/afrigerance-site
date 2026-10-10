"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { readingIndexAt, type VerseReadingLocation } from "@/lib/quran/reading-location";

/** Tracks the visible verse, independently of audio and of the page footer. */
export function QuranPositionRail({ locations, children }: { locations: VerseReadingLocation[]; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const elements = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-quran-position]") ?? []);
    if (!elements.length) return;
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // Below sticky controls, without basing progress on the rest of the page.
        const line = Math.max(160, Math.min(window.innerHeight * 0.35, window.innerHeight - 100));
        const next = readingIndexAt(elements.map(element => element.getBoundingClientRect().top), line);
        setIndex(current => current === next ? current : next);
      });
    };
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (root.current) resize?.observe(root.current);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      resize?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [locations]);
  const current = locations[Math.min(index, locations.length - 1)];
  if (!current) return <>{children}</>;
  const fraction = current.juzPosition / current.juzCount;
  const percent = Math.round(fraction * 100);
  const description = `Sourate ${current.chapter}, verset ${current.verse}. Juz ${current.juz} sur 30 : position ${current.juzPosition} sur ${current.juzCount} versets (${percent} %).`;
  return <div ref={root} className="quran-position-layout mt-5 grid grid-cols-[minmax(0,1fr)_2rem] items-start gap-1 sm:grid-cols-[minmax(0,1fr)_2.5rem] sm:gap-3">
    <div className="min-w-0">{children}</div>
    <aside className="quran-position-rail sticky top-40 flex flex-col items-center gap-3 pt-4 text-center" aria-label="Repère de lecture" title={description}>
      <span className="text-[9px] font-semibold uppercase tracking-wide text-muted">Juz <span className="block text-sm text-accent-text">{current.juz}</span></span>
      <div role="progressbar" aria-label="Position dans le Juz courant" aria-valuemin={1} aria-valuemax={current.juzCount} aria-valuenow={current.juzPosition} aria-valuetext={description} className="relative h-[clamp(6rem,26vh,16rem)] w-1 overflow-hidden rounded-full bg-accent/15">
        <div className="absolute inset-x-0 top-0 origin-top rounded-full bg-gradient-to-b from-accent to-primary motion-safe:transition-[height] motion-safe:duration-200" style={{ height: `${fraction * 100}%` }} />
      </div>
      <span className="text-[10px] tabular-nums text-muted" aria-hidden="true">{percent}%</span>
      <span className="sr-only">{description} La bande indique une position dans le texte, pas une lecture validée.</span>
    </aside>
  </div>;
}
