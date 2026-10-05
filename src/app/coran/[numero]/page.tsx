import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ArabicText } from "@/components/islamic/arabic-text";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getChapters, getChapterMeta, getChapterVerses } from "@/lib/quran/data";
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
  const chapters = getChapters();
  const prev = number > 1 ? getChapterMeta(number - 1) : undefined;
  const next = number < 114 ? getChapterMeta(number + 1) : undefined;

  const isBismillahImplicit = number !== 1 && number !== 9;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
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
      <Link href="/coran" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Le Coran
      </Link>

      <Reveal className="relative isolate flex flex-col items-center gap-4 overflow-hidden rounded-[2rem] border border-gold-600/25 bg-[#f5f0e6] px-5 py-12 text-center shadow-sm dark:bg-emerald-900/15 sm:py-16">
        <span aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 -z-10 size-80 -translate-x-1/2 rounded-full bg-gold-500/15 blur-3xl" />
        <Badge variant="outline">
          Sourate {chapter.number} · {chapter.revelation === "Mecca" ? "Mecquoise" : "Médinoise"} ·{" "}
          {chapter.versesCount} versets
        </Badge>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-emerald-950 dark:text-ivory-50 sm:text-5xl">{chapter.nameFrench}</h1>
        <ArabicText as="p" variant="quran" className="text-3xl text-gold-700 dark:text-gold-500">
          {chapter.nameArabic}
        </ArabicText>
        <SourateSwitcher chapters={chapters} current={chapter.number} />
      </Reveal>

      {isBismillahImplicit && (
        <Reveal delay={0.05} className="mt-8 text-center">
          <ArabicText as="p" variant="quran" className="quran-quote text-xl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </ArabicText>
        </Reveal>
      )}

      <QuranAudioProvider chapter={number} verses={verses.map((v) => ({ number: v.number, globalNumber: v.globalNumber! }))}>
        <ReadingPositionTracker chapter={number} verseCount={verses.length} />
        <QuranAudioToolbar chapter={number} />
        <QuranReadingTools chapter={number}>
        <div className="mt-5 flex flex-col gap-1 rounded-[1.5rem] border border-gold-600/20 bg-[#fffcf5] px-2 py-2 shadow-sm dark:bg-emerald-950/20 sm:px-4">
          {verses.map((v, i) => (
            <Reveal key={v.number} delay={Math.min(i * 0.015, 0.3)}>
              <QuranVerseRow verseNumber={v.number}>
                <QuranVerseContent chapter={number} number={v.number} arabic={v.arabic} french={v.french} />
              </QuranVerseRow>
            </Reveal>
          ))}
        </div>
        </QuranReadingTools>
        <QuranMiniPlayer />
      </QuranAudioProvider>

      <Separator className="my-10" />
      <p className="text-center text-xs text-muted">
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
      <p className="mt-3 text-center text-xs leading-relaxed text-muted">Les signes de pause du texte arabe initial sont conservés. Le mode tajwîd utilise séparément l’édition annotée d’Al Quran Cloud : désactivez-le pour retrouver la graphie habituelle. Le texte arabe d’Ibn Kathîr et l’explication française Al-Mukhtasar s’affichent sur cette page ; ce sont deux ouvrages différents.</p>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm">
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
    </div>
  );
}
