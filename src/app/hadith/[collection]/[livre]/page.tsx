import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, ScrollText } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ArabicText } from "@/components/islamic/arabic-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCollection, getBooks, getHadithsForBook } from "@/lib/hadith/data";
import { ReadingProgress } from "@/components/content/reading-progress";

const PAGE_SIZE = 20;

export async function generateMetadata({ params }: PageProps<"/hadith/[collection]/[livre]">): Promise<Metadata> {
  const { collection: slug, livre } = await params;
  const collection = getCollection(slug);
  const book = getBooks(slug).find((b) => b.number === Number(livre));
  if (!collection || !book) return {};
  return {
    title: `${book.titreFrancais} — ${collection.nom}`,
    alternates: { canonical: `/hadith/${slug}/${livre}` },
  };
}

export default async function HadithBookPage({
  params,
  searchParams,
}: PageProps<"/hadith/[collection]/[livre]">) {
  const { collection: slug, livre } = await params;
  const { page: pageParam } = await searchParams;
  const collection = getCollection(slug);
  const bookNumber = Number(livre);
  const book = getBooks(slug).find((b) => b.number === bookNumber);
  if (!collection || !book) notFound();

  const allHadiths = getHadithsForBook(slug, bookNumber);
  const pageCount = Math.max(1, Math.ceil(allHadiths.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(pageParam) || 1), pageCount);
  const hadiths = allHadiths.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const pageHref = (p: number) => `/hadith/${slug}/${livre}${p > 1 ? `?page=${p}` : ""}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <ReadingProgress />
      <Link href={`/hadith/${slug}`} className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> {collection.nom}
      </Link>

      <div className="relative overflow-hidden rounded-[1.75rem] border border-gold-500/50 bg-emerald-900 px-6 py-9 text-ivory-50 shadow-xl sm:px-10">
        <div className="pointer-events-none absolute inset-0 geo-pattern" aria-hidden="true" />
        <div className="relative"><ScrollText className="mb-5 h-7 w-7 text-gold-500" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold-500">{collection.nom}</p>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{book.titreFrancais}</h1>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted">
        {allHadiths.length} hadith{allHadiths.length > 1 ? "s" : ""}
        {pageCount > 1 ? ` · page ${currentPage}/${pageCount}` : ""}
      </p>

      <div className="mt-10 flex flex-col gap-7">
        {hadiths.map((h, i) => (
          <Reveal key={h.numero} delay={Math.min(i * 0.02, 0.3)}>
            <article id={`hadith-${h.numero}`} className="group relative overflow-hidden rounded-[1.5rem] border border-[#d7c7a6] bg-surface shadow-[0_16px_44px_-33px_rgba(9,28,43,.65)] transition-shadow duration-300 hover:shadow-[0_20px_55px_-30px_rgba(9,28,43,.5)] dark:border-gold-500/30">
              <div className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l border-t border-gold-500/60" aria-hidden="true" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 border-b border-r border-gold-500/60" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface-muted/60 px-6 py-4 sm:px-9">
                <Badge variant="outline">N° {h.numero}</Badge>
                {h.grade && (
                  <Badge variant={h.grade.toLowerCase().includes("sahih") ? "success" : "warning"}>
                    {h.grade}
                    {h.gradePar ? ` — ${h.gradePar}` : ""}
                  </Badge>
                )}
                <span className="ml-auto text-xs text-muted">{collection.nom} · {book.titreFrancais}</span>
              </div>
              <div className="px-6 py-7 sm:px-10 sm:py-9">
                <ArabicText as="p" className="text-xl leading-[2.35] text-foreground sm:text-2xl">{h.arabe}</ArabicText>
              </div>
              {h.francais && (
                <div className="border-t border-border bg-background/50 px-6 py-6 sm:px-10">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-accent-text">Traduction française</p>
                  <p className="text-base leading-8 text-foreground/90">{h.francais}</p>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      {pageCount > 1 && (
        <nav className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6" aria-label="Pagination">
          <Button variant="outline" size="sm" disabled={currentPage <= 1} asChild={currentPage > 1}>
            {currentPage > 1 ? (
              <Link href={pageHref(currentPage - 1)}>
                <ChevronLeft className="h-4 w-4" /> Précédent
              </Link>
            ) : (
              <span>
                <ChevronLeft className="h-4 w-4" /> Précédent
              </span>
            )}
          </Button>
          <span className="text-sm text-muted">
            Page {currentPage} / {pageCount}
          </span>
          <Button variant="outline" size="sm" disabled={currentPage >= pageCount} asChild={currentPage < pageCount}>
            {currentPage < pageCount ? (
              <Link href={pageHref(currentPage + 1)}>
                Suivant <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span>
                Suivant <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </nav>
      )}
    </div>
  );
}
