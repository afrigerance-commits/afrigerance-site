import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPartitions, type PartitionType } from "@/lib/quran/partitions";
import { getChapterMeta, getChapterVerses } from "@/lib/quran/data";
import { QuranAudioProvider, QuranAudioToolbar, QuranMiniPlayer } from "@/components/islamic/quran-audio-player";
import { QuranReadingTools, QuranVerseContent } from "@/components/islamic/quran-reading-tools";
import { QuranVerseRow } from "@/components/islamic/quran-verse-row";
import { QuranJuzMarker } from "@/components/islamic/quran-juz-marker";
import { QuranPositionRail } from "@/components/islamic/quran-position-rail";
import { verseReadingLocation } from "@/lib/quran/reading-location";
import { MemorizationPanel } from "@/components/quran/memorization-panel";
import { QuranDownloadPanel } from "@/components/quran/audio-downloads";
import { ReaderFocus } from "@/components/islamic/reader-focus";

export function generateStaticParams() {
  return (["juz", "hizb"] as const).flatMap(type => getPartitions(type).map(p => ({ type, numero: String(p.number) })));
}
function resolve(type: string, numero: string) {
  if (type !== "juz" && type !== "hizb") return null;
  return getPartitions(type).find(p => p.number === Number(numero)) ?? null;
}
export async function generateMetadata({ params }: { params: Promise<{ type: string; numero: string }> }): Promise<Metadata> {
  const { type, numero } = await params;
  const p = resolve(type, numero);
  return p ? { title: `${type === "juz" ? "Juz" : "Hizb"} ${p.number} — Lecture du Coran`, alternates: { canonical: `/coran/lecture/${type}/${p.number}` } } : {};
}
export default async function PortionPage({ params }: { params: Promise<{ type: string; numero: string }> }) {
  const { type, numero } = await params;
  const p = resolve(type, numero);
  if (!p) notFound();
  const parts = [];
  let position = 0;
  for (let chapter = p.start.chapter; chapter <= p.end.chapter; chapter++) {
    const verses = getChapterVerses(chapter).filter(v => v.globalNumber! >= p.first && v.globalNumber! <= p.last).map(v => ({ ...v, position: ++position }));
    parts.push({ chapter, meta: getChapterMeta(chapter)!, verses });
  }
  const audio = parts.flatMap(part => part.verses.map(v => ({ number: v.position, globalNumber: v.globalNumber!, sourceChapter: part.chapter, sourceVerse: v.number })));
  const locations = parts.flatMap(part => part.verses.map(v => verseReadingLocation(part.chapter, v.number)));
  const label = type === "juz" ? "Juz" : "Hizb";
  const total = getPartitions(type as PartitionType).length;
  return <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6"><ReaderFocus>
    <Link href="/coran" className="reader-secondary text-sm text-muted underline">Choisir une autre portion</Link>
    <h1 className="mt-5 font-display text-3xl font-semibold text-primary">{label} {p.number}</h1>
    <p className="mt-3 text-base text-muted">{p.start.chapter}:{p.start.verse} — {p.end.chapter}:{p.end.verse} · {p.count} versets</p>
    <QuranAudioProvider chapter={p.start.chapter} verses={audio}>
      <QuranAudioToolbar chapter={p.start.chapter} />
      <MemorizationPanel />
      <QuranDownloadPanel chapter={p.start.chapter} />
      <p className="mt-4 text-sm text-muted">Cliquez sur le texte d’un verset pour écouter à partir de celui-ci. La récitation poursuit la portion, y compris au changement de sourate, puis s’arrête à sa fin.</p>
      <QuranPositionRail locations={locations}>
      {parts.map(part => <section key={part.chapter} className="mt-8">
        <h2 className="mb-4 font-display text-xl text-primary"><Link href={`/coran/${part.chapter}`}>{part.chapter}. {part.meta.nameFrench}</Link></h2>
        <QuranReadingTools chapter={part.chapter}><div className="mushaf-sheet mt-5 rounded-3xl border border-gold-600/25 px-2 py-2 sm:px-4">{part.verses.map(v => <div key={v.number}>
          {(locations[v.position - 1].startsJuz || v.position === 1) && <QuranJuzMarker number={locations[v.position - 1].juz} kind={locations[v.position - 1].startsJuz ? "start" : "continued"} />}
          <QuranVerseRow verseNumber={v.position}><QuranVerseContent chapter={part.chapter} number={v.number} audioNumber={v.position} arabic={v.arabic} french={v.french} /></QuranVerseRow>
          {locations[v.position - 1].endsJuz && <QuranJuzMarker number={locations[v.position - 1].juz} kind="end" />}
          </div>)}</div></QuranReadingTools>
      </section>)}
      </QuranPositionRail>
      <QuranMiniPlayer />
    </QuranAudioProvider>
    <p className="reader-secondary mt-8 text-sm leading-7 text-muted">Texte arabe et traduction : Tanzil, édition uthmani Hafs et Muhammad Hamidullah. Découpage : <a href="https://tanzil.net/docs/Quran_Metadata" className="underline">métadonnées Tanzil</a> (CC BY). Les signes d’arrêt proviennent du texte original ; aucune pause n’est ajoutée. Le mode tajwîd affiche une édition annotée distincte.</p>
    <nav aria-label="Portions précédente et suivante" className="reader-secondary mt-6 flex justify-between gap-4 border-t border-border pt-5">
      {p.number > 1 ? <Link href={`/coran/lecture/${type}/${p.number - 1}`}>{label} {p.number - 1}</Link> : <span />}
      {p.number < total && <Link href={`/coran/lecture/${type}/${p.number + 1}`}>{label} {p.number + 1}</Link>}
    </nav>
  </ReaderFocus></div>;
}
