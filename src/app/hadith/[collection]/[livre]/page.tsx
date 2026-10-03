import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <ReadingProgress />
      <Link href={`/hadith/${slug}`} className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> {collection.nom}
      </Link>

      <h1 className="font-display text-3xl font-semibold sm:text-4xl">{book.titreFrancais}</h1>
      <p className="mt-2 text-sm text-muted">
        {collection.nom} · {allHadiths.length} hadith{allHadiths.length > 1 ? "s" : ""}
        {pageCount > 1 ? ` · page ${currentPage}/${pageCount}` : ""}
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {hadiths.map((h, i) => (
          <Reveal key={h.numero} delay={Math.min(i * 0.02, 0.3)}>
            <article className="flex flex-col gap-3 border-b border-border pb-8 last:border-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">N° {h.numero}</Badge>
                {h.grade && (
                  <Badge variant={h.grade.toLowerCase().includes("sahih") ? "success" : "warning"}>
                    {h.grade}
                    {h.gradePar ? ` — ${h.gradePar}` : ""}
                  </Badge>
                )}
              </div>
              <ArabicText as="p" className="text-lg leading-loose">
                {h.arabe}
              </ArabicText>
              {h.francais && <p className="text-foreground/90">{h.francais}</p>}
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
