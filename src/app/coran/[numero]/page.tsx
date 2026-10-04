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
import { QuranAudioProvider, QuranAudioToolbar, VersePlayButton } from "@/components/islamic/quran-audio-player";

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
  const prev = number > 1 ? getChapterMeta(number - 1) : undefined;
  const next = number < 114 ? getChapterMeta(number + 1) : undefined;

  const isBismillahImplicit = number !== 1 && number !== 9;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
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

      <Reveal className="flex flex-col items-center gap-3 text-center">
        <Badge variant="outline">
          Sourate {chapter.number} · {chapter.revelation === "Mecca" ? "Mecquoise" : "Médinoise"} ·{" "}
          {chapter.versesCount} versets
        </Badge>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{chapter.nameFrench}</h1>
        <ArabicText as="p" variant="quran" className="text-2xl text-gold-700 dark:text-gold-500">
          {chapter.nameArabic}
        </ArabicText>
      </Reveal>

      {isBismillahImplicit && (
        <Reveal delay={0.05} className="mt-8 text-center">
          <ArabicText as="p" variant="quran" className="quran-quote text-xl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </ArabicText>
        </Reveal>
      )}

      <QuranAudioProvider verses={verses.map((v) => ({ number: v.number, globalNumber: v.globalNumber! }))}>
        <QuranAudioToolbar />

        <div className="mt-10 flex flex-col gap-8">
          {verses.map((v, i) => (
            <Reveal key={v.number} delay={Math.min(i * 0.015, 0.3)}>
              <div className="flex flex-col gap-3 border-b border-border pb-8 last:border-0">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    {v.number}
                  </span>
                  <ArabicText as="p" variant="quran" className="quran-quote flex-1 text-2xl">
                    {v.arabic}
                  </ArabicText>
                  <VersePlayButton verseNumber={v.number} />
                </div>
                <p className="pl-10 text-foreground/90">{v.french}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </QuranAudioProvider>

      <Separator className="my-10" />
      <p className="text-center text-xs text-muted">
        Texte arabe : édition du complexe Roi Fahd (lecture de Hafs). Traduction française : Muhammad Hamidullah.
        Les deux diffusés par le{" "}
        <a href="http://tanzil.net" target="_blank" rel="noopener noreferrer nofollow" className="underline">
          projet Tanzil
        </a>
        . Récitation audio fournie par l&apos;API ouverte{" "}
        <a href="https://alquran.cloud" target="_blank" rel="noopener noreferrer nofollow" className="underline">
          Al Quran Cloud
        </a>
        .
      </p>

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
