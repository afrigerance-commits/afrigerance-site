import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { hadithCollections, getCollection, getBooks } from "@/lib/hadith/data";

export function generateStaticParams() {
  return hadithCollections.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/hadith/[collection]">): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: collection.nom,
    description: collection.description,
    alternates: { canonical: `/hadith/${slug}` },
  };
}

export default async function HadithCollectionPage({ params }: PageProps<"/hadith/[collection]">) {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const books = getBooks(slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/hadith" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Hadith
      </Link>
      <PageHeader eyebrow={collection.auteur} title={collection.nom} description={collection.description} />

      <ol className="flex flex-col gap-2">
        {books.map((book, i) => (
          <Reveal key={book.number} delay={Math.min(i * 0.02, 0.4)}>
            <Link
              href={`/hadith/${slug}/${book.number}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4 text-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-sm"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-muted font-display text-xs">
                  {book.number}
                </span>
                <span className="font-medium">{book.titreFrancais}</span>
              </span>
              <span className="text-xs text-muted">{book.count} hadith{book.count > 1 ? "s" : ""}</span>
            </Link>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
