"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type TouchEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { bookSpreadNumbers, type QuranBookPage } from "@/lib/quran/book";
import { QuranAudioProvider, QuranAudioToolbar, QuranMiniPlayer, QuranAudioModeSelector, useQuranAudioContext } from "./quran-audio-player";
import { QuranReadingTools, QuranVerseContent } from "./quran-reading-tools";
import { QuranLanguageSelector, useQuranLanguage } from "./quran-language-selector";
import { QuranDisplayOptions } from "./quran-display-options";
import { QuranPageNavigation } from "./quran-page-navigation";
import { ReaderFocus } from "./reader-focus";

function subscribeWidth(callback: () => void) {
  const media = window.matchMedia("(min-width: 1024px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function isWide() { return window.matchMedia("(min-width: 1024px)").matches; }

export function QuranBookReader({ pages, current }: { pages: QuranBookPage[]; current: number }) {
  const audio = pages.flatMap(page => page.parts.flatMap(part => part.verses.map(verse => ({
    number: verse.position, globalNumber: verse.globalNumber, sourceChapter: part.chapter, sourceVerse: verse.number,
  }))));
  return <QuranAudioProvider chapter={pages[0].parts[0].chapter} verses={audio}>
    <Book pages={pages} current={current} />
    <QuranMiniPlayer />
  </QuranAudioProvider>;
}

function Book({ pages, current }: { pages: QuranBookPage[]; current: number }) {
  const [active, setActive] = useState(current);
  const wide = useSyncExternalStore(subscribeWidth, isWide, () => false);
  const language = useQuranLanguage();
  const player = useQuranAudioContext();
  const router = useRouter();
  const touch = useRef<{x:number;y:number}|null>(null);
  const book = useRef<HTMLDivElement>(null);
  const first = bookSpreadNumbers(active)[0];
  const page = pages.find(page => page.number === active)!;

  useEffect(() => {
    const page = pages.find(page => page.parts.some(part => part.verses.some(verse => verse.position === player.playingVerse)));
    if (!page) return;
    let cancelled = false;
    queueMicrotask(() => { if (!cancelled) setActive(page.number); });
    return () => { cancelled = true; };
  }, [pages, player.playingVerse]);

  useEffect(() => {
    if (player.playingVerse === null || document.visibilityState !== "visible") return;
    const part = pages.flatMap(page => page.parts).find(part => part.verses.some(verse => verse.position === player.playingVerse));
    const verse = part?.verses.find(verse => verse.position === player.playingVerse);
    if (!part || !verse) return;
    const frame = requestAnimationFrame(() => {
      book.current?.querySelector<HTMLElement>(`[data-quran-position="${part.chapter}:${verse.number}"]`)?.scrollIntoView({
        block:"center", behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pages, player.playingVerse]);

  function turn(direction: -1 | 1) {
    const next = wide ? first + direction * 2 : active + direction;
    if (next >= 1 && next <= 604) router.push(`/coran/lecture/page/${next}`);
  }
  function keyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); turn(1); }
    if (event.key === "ArrowRight") { event.preventDefault(); turn(-1); }
  }
  function touchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touch.current; touch.current = null;
    if (!start || !event.changedTouches[0] || window.getSelection()?.toString()) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 2) {
      event.preventDefault();
      // In an Arabic book, swipe right to turn towards the following page.
      turn(dx > 0 ? 1 : -1);
    }
  }

  return <div className="mx-auto max-w-7xl px-3 py-7 sm:px-6"><ReaderFocus>
    <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
      <div><Link href="/coran" className="reader-secondary text-sm text-muted underline">Le Coran</Link><p className="mt-4 text-xs font-semibold uppercase tracking-[.2em] text-accent-text">Le temps de lire</p><h1 className="mt-2 font-display text-3xl text-primary">Mon mushaf</h1></div>
      <p className="text-sm text-muted" aria-live="polite">{wide ? `Pages ${first}–${first+1}` : `Page ${active}`} <span className="text-accent-text">/ 604</span></p>
    </header>
    <details className="reader-settings reader-secondary mb-5 rounded-2xl border border-accent/25 bg-surface p-4">
      <summary className="min-h-11 cursor-pointer py-2 font-semibold text-primary">Ma lecture · langue, audio, tafsir et notes</summary>
      <div className="mt-3 space-y-4"><QuranLanguageSelector compact /><QuranAudioModeSelector /><QuranDisplayOptions book /><QuranAudioToolbar chapter={page.parts[0].chapter} startVerse={page.parts[0].verses[0].position} /></div>
    </details>
    <div className="quran-book-controls"><QuranPageNavigation current={active} spread={wide} book /></div>
    <p id="book-instructions" className="mb-4 text-center text-xs leading-6 text-muted">{wide ? "Lecture de droite à gauche. Feuilletez par double page ; les flèches du clavier fonctionnent lorsque le livre est sélectionné." : "Faites glisser horizontalement pour tourner la page, ou utilisez les boutons."} Touchez un verset pour l’écouter.</p>
    <div ref={book} key={current} className="quran-book" dir="rtl" role="group" aria-label="Livre du Coran" aria-describedby="book-instructions" tabIndex={0} onKeyDown={keyDown}
      onTouchStart={event => { touch.current = event.touches.length === 1 && !(event.target as HTMLElement).closest("input,textarea,select,details,a") ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null; }} onTouchEnd={touchEnd} onTouchCancel={() => {touch.current=null;}}>
      {pages.map(page => <article key={page.number} className={`quran-book-leaf ${page.number % 2 ? 'quran-book-right' : 'quran-book-left'}`} data-current={page.number === active} aria-label={`Page ${page.number}`}>
        <div className="quran-book-frame">
          <header dir="ltr" className="quran-book-running-head"><span>Juz {page.juz}</span><span>MIRÂTH</span><span>{page.parts[0].chapter}:{page.parts[0].verses[0].number}</span></header>
          <div className="quran-book-text" dir={language.value === "french" ? "ltr" : "rtl"}>
            {page.parts.map(part => <section key={part.chapter}>
              <h2 dir="ltr" className="quran-book-chapter"><Link href={`/coran/${part.chapter}`}>{part.title}</Link></h2>
              <QuranReadingTools chapter={part.chapter} controls={false} continuous>
                {part.verses.map(verse => <QuranVerseContent key={verse.number} chapter={part.chapter} number={verse.number} audioNumber={verse.position} arabic={verse.arabic} french={verse.french} />)}
              </QuranReadingTools>
            </section>)}
          </div>
          <footer className="quran-book-folio" aria-label={`Numéro de page ${page.number}`}>{page.number}</footer>
        </div>
      </article>)}
    </div>
    <div className="quran-book-controls"><QuranPageNavigation current={active} spread={wide} book /></div>
    <p className="reader-secondary mx-auto mt-5 max-w-2xl text-center text-xs leading-6 text-muted">Limites des 604 pages du mushaf de Médine, avec une typographie adaptée à votre écran. Les lignes imprimées ne sont pas reproduites. Texte arabe et traduction du sens : Tanzil, Hafs et Muhammad Hamidullah. <a href="https://tanzil.net/docs/Quran_Metadata" className="underline">Métadonnées Tanzil · CC BY</a>.</p>
  </ReaderFocus></div>;
}
