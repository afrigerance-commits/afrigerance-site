import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ArabicText } from "@/components/islamic/arabic-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/content/book-card";
import { ArticleCard } from "@/components/content/article-card";
import { disciplines } from "@/lib/site-config";
import { books } from "@/lib/data/books";
import { articles } from "@/lib/data/articles";

const hubRoute: Record<string, string> = {
  "fiqh-malikite": "/fiqh/malikite",
  sira: "/sira",
  compagnons: "/compagnons",
  "grandes-figures": "/compagnons",
};

export function generateStaticParams() {
  return disciplines.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/explorer-le-savoir/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const discipline = disciplines.find((d) => d.slug === slug);
  if (!discipline) return {};
  return {
    title: discipline.name,
    description: discipline.description,
    alternates: { canonical: `/explorer-le-savoir/${slug}` },
  };
}

export default async function DisciplinePage({ params }: PageProps<"/explorer-le-savoir/[slug]">) {
  const { slug } = await params;
  const discipline = disciplines.find((d) => d.slug === slug);
  if (!discipline) notFound();

  const relatedBooks = books.filter((b) =>
    b.discipline.toLowerCase().includes(discipline.name.split(" ")[0].toLowerCase()),
  );
  const relatedArticles = articles.filter((a) =>
    a.categorie.toLowerCase().includes(discipline.name.split(" ")[0].toLowerCase()),
  );
  const hub = hubRoute[discipline.slug];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/explorer-le-savoir" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Explorer le savoir
      </Link>
      <Reveal className="flex flex-col gap-4">
        <ArabicText className="text-3xl text-gold-600 dark:text-gold-500">{discipline.nameArabic}</ArabicText>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">{discipline.name}</h1>
        <p className="max-w-2xl text-lg text-muted">{discipline.description}</p>
      </Reveal>

      {hub && (
        <Reveal delay={0.1} className="mt-8">
          <Button variant="accent" asChild>
            <Link href={hub}>
              Accéder à l’espace dédié <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      )}

      {!hub && (
        <Reveal delay={0.1} className="mt-8 rounded-xl border border-dashed border-border p-6">
          <Badge variant="muted">Contenu en préparation</Badge>
          <p className="mt-2 text-sm text-muted">
            Les cours dédiés à cette discipline sont en cours de rédaction et de vérification documentaire. Les
            ressources ci-dessous, lorsqu’elles existent, donnent un premier aperçu.
          </p>
        </Reveal>
      )}

      {relatedArticles.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-semibold">Articles liés</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {relatedBooks.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-semibold">Ouvrages liés</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {relatedBooks.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
