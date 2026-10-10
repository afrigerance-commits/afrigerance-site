import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { QuranArabicOnly } from "@/components/islamic/quran-language-selector";
import { ArabicText } from "@/components/islamic/arabic-text";
import { MemorizationPanel } from "@/components/quran/memorization-panel";
import { QuranDownloadPanel } from "@/components/quran/audio-downloads";
import { ReaderFocus } from "@/components/islamic/reader-focus";
import { Separator } from "@/components/ui/separator";
import { getChapters, getChapterMeta, getChapterVerses } from "@/lib/quran/data";
import { QuranJuzMarker } from "@/components/islamic/quran-juz-marker";
import { QuranPositionRail } from "@/components/islamic/quran-position-rail";
import { verseReadingLocation } from "@/lib/quran/reading-location";
import { partitionAt } from "@/lib/quran/partitions";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { ReadingProgress } from "@/components/content/reading-progress";
import { QuranAudioProvider, QuranAudioToolbar, QuranMiniPlayer } from "@/components/islamic/quran-audio-player";
import { QuranVerseRow } from "@/components/islamic/quran-verse-row";
import { QuranReadingTools, QuranVerseContent } from "@/components/islamic/quran-reading-tools";
import { SourateSwitcher } from "@/components/islamic/sourate-switcher";
import { ReadingPositionTracker } from "@/components/islamic/reading-resume";

export function generateStaticParams() {
  return getChapters().map((c) => ({ numero: String(c.number) }));
}

export async function generateMetadata({ params }: PageProps<"/coran/[numero]">): Promise<Metadata> {
  const { numero } = await params;
  const chapter = getChapterMeta(Number(numero));
  if (!chapter) return {};
  return {
    title: `Sourate ${chapter.nameFrench} (${chapter.nameTransliteration})`,
    description: `Sourate ${chapter.number}, ${chapter.nameFrench} — ${chapter.versesCount} versets, texte arabe et traduction française.`,
    alternates: { canonical: `/coran/${chapter.number}` },
  };
}

export default async function SouratePage({ params }: PageProps<"/coran/[numero]">) {
  const { numero } = await params;
  const number = Number(numero);
  const chapter = getChapterMeta(number);
  if (!chapter) notFound();

  const verses = getChapterVerses(number);
  const locations = verses.map(v => verseReadingLocation(number, v.number));
  const chapters = getChapters();
  const prev = number > 1 ? getChapterMeta(number - 1) : undefined;
  const next = number < 114 ? getChapterMeta(number + 1) : undefined;

  const isBismillahImplicit = number !== 1 && number !== 9;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <ReaderFocus>
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Chapter",
          name: `Sourate ${chapter.nameFrench}`,
          position: chapter.number,
          isPartOf: { "@type": "Book", name: "Le Coran" },
          url: `${siteConfig.url}/coran/${chapter.number}`,
        }}
      />
      <Link href="/coran" className="reader-secondary mb-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Le Coran
      </Link>

      <Reveal className="flex flex-col gap-4 border-b border-accent/30 pb-6 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-wider text-accent-text">Sourate {chapter.number} · {chapter.revelation === "Mecca" ? "Mecquoise" : "Médinoise"} · {chapter.versesCount} versets</p><h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">{chapter.nameFrench}</h1><QuranArabicOnly><ArabicText as="p" variant="quran" className="mt-2 text-2xl text-accent-text">{chapter.nameArabic}</ArabicText></QuranArabicOnly></div>
        <div className="reader-secondary w-full sm:max-w-64"><SourateSwitcher chapters={chapters} current={chapter.number} /></div>
      </Reveal>

      {isBismillahImplicit && (
        <QuranArabicOnly><Reveal delay={0.05} className="mt-8 text-center">
          <ArabicText as="p" variant="quran" className="quran-quote text-xl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </ArabicText>
        </Reveal></QuranArabicOnly>
      )}

      <QuranAudioProvider chapter={number} verses={verses.map((v) => ({ number: v.number, globalNumber: v.globalNumber! }))}>
        <ReadingPositionTracker chapter={number} verseCount={verses.length} />
        <nav className="reader-secondary mt-5 flex flex-wrap gap-3 text-sm" aria-label="Portions de cette sourate"><Link className="mushaf-controls rounded-xl border border-gold-600/25 px-4 py-3" href={`/coran/lecture/juz/${partitionAt(number, 1, "juz").number}`}>Lire le juz {partitionAt(number, 1, "juz").number}</Link><Link className="mushaf-controls rounded-xl border border-gold-600/25 px-4 py-3" href={`/coran/lecture/hizb/${partitionAt(number, 1, "hizb").number}`}>Lire le hizb {partitionAt(number, 1, "hizb").number}</Link></nav>
        <details className="reader-settings reader-secondary mt-5 rounded-2xl border border-accent/30 bg-surface p-4"><summary className="min-h-11 cursor-pointer py-2 font-semibold text-primary">Réglages · audio, mémorisation et téléchargements</summary><QuranAudioToolbar chapter={number} /><MemorizationPanel /><QuranDownloadPanel chapter={number} /></details>
        <QuranReadingTools chapter={number}>
        <QuranPositionRail locations={locations}>
        <div className="mushaf-sheet mt-5 flex flex-col gap-1 rounded-[1.5rem] border border-gold-600/20 bg-[#fffcf5] px-2 py-2 shadow-sm dark:bg-emerald-950/20 sm:px-4">
          {verses.map((v, i) => (
            <Reveal key={v.number} delay={Math.min(i * 0.015, 0.3)}>
              {(locations[i].startsJuz || i === 0) && <QuranJuzMarker number={locations[i].juz} kind={locations[i].startsJuz ? "start" : "continued"} />}
              <QuranVerseRow verseNumber={v.number}>
                <QuranVerseContent chapter={number} number={v.number} arabic={v.arabic} french={v.french} />
              </QuranVerseRow>
              {locations[i].endsJuz && <QuranJuzMarker number={locations[i].juz} kind="end" />}
            </Reveal>
          ))}
        </div>
        </QuranPositionRail>
        </QuranReadingTools>
        <QuranMiniPlayer />
      </QuranAudioProvider>

      <Separator className="reader-secondary my-8" />
      <details className="reader-secondary rounded-xl border border-border p-4"><summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-primary">Éditions et sources du lecteur</summary>
      <p className="mt-3 text-sm leading-7 text-muted">
        Texte arabe : édition du complexe Roi Fahd (lecture de Hafs). Traduction française : Muhammad Hamidullah.
        Les deux diffusés par le{" "}
        <a href="http://tanzil.net" target="_blank" rel="noopener noreferrer nofollow" className="underline">
          projet Tanzil
        </a>
        . Récitations audio fournies par l&apos;API ouverte{" "}
        <a href="https://alquran.cloud" target="_blank" rel="noopener noreferrer nofollow" className="underline">
          Al Quran Cloud
        </a>
        {" "}et <a href="https://everyayah.com/recitations_ayat.html" target="_blank" rel="noopener noreferrer nofollow" className="underline">EveryAyah</a>.
      </p>
      <p className="mt-3 text-sm leading-7 text-muted">Les signes de pause du texte arabe initial sont conservés. Le mode tajwîd utilise séparément l’édition annotée d’Al Quran Cloud : désactivez-le pour retrouver la graphie habituelle. Le texte arabe d’Ibn Kathîr et l’explication française Al-Mukhtasar s’affichent sur cette page ; ce sont deux ouvrages différents.</p>

      </details>
      <div className="reader-secondary mt-8 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm">
        {prev ? (
          <Link href={`/coran/${prev.number}`} className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> {prev.nameFrench}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/coran/${next.number}`} className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
            {next.nameFrench} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      </ReaderFocus>
    </div>
  );
}
