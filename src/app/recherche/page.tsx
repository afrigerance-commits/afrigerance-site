import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/data/articles";
import { books } from "@/lib/data/books";
import { scholars } from "@/lib/data/scholars";
import { siraEvents } from "@/lib/data/sira";
import { fiqhCourses } from "@/lib/data/fiqh";
import { disciplines } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Recherche",
  robots: { index: false },
};

interface SearchResult {
  titre: string;
  description: string;
  href: string;
  type: string;
}

function buildIndex(): SearchResult[] {
  return [
    ...disciplines.map((d) => ({ titre: d.name, description: d.description, href: `/explorer-le-savoir/${d.slug}`, type: "Discipline" })),
    ...articles.map((a) => ({ titre: a.titre, description: a.resume, href: `/blog/${a.slug}`, type: "Article" })),
    ...books.map((b) => ({ titre: b.titreFrancais, description: b.presentation, href: `/bibliotheque/${b.slug}`, type: "Livre" })),
    ...scholars.map((s) => ({ titre: s.transcriptionFrancaise, description: s.presentation, href: `/compagnons/${s.slug}`, type: "Figure" })),
    ...siraEvents.map((e) => ({ titre: e.titre, description: e.presentation, href: `/sira/${e.slug}`, type: "Sîra" })),
    ...fiqhCourses.map((c) => ({ titre: c.titre, description: c.description, href: `/fiqh/malikite/${c.slug}`, type: "Cours" })),
  ];
}

export default async function RecherchePage({
  searchParams,
}: PageProps<"/recherche">) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
  const normalized = query.toLowerCase();

  const results = query
    ? buildIndex().filter(
        (r) => r.titre.toLowerCase().includes(normalized) || r.description.toLowerCase().includes(normalized),
      )
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Recherche" title="Rechercher sur la plateforme" />
      <form action="/recherche" className="mb-12 flex items-center gap-2">
        <Input name="q" defaultValue={query} placeholder="Rechercher un cours, un livre, un article…" />
        <Button type="submit">
          <SearchIcon className="h-4 w-4" /> Rechercher
        </Button>
      </form>

      {query && (
        <p className="mb-6 text-sm text-muted">
          {results.length} résultat{results.length > 1 ? "s" : ""} pour « {query} »
        </p>
      )}

      <ul className="flex flex-col gap-4">
        {results.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:border-accent">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{r.type}</Badge>
                <span className="font-medium">{r.titre}</span>
              </div>
              <p className="text-sm text-muted">{r.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      {query && results.length === 0 && (
        <p className="text-sm text-muted">Aucun résultat. Essayez un autre mot-clé, ou explorez les disciplines.</p>
      )}
    </div>
  );
}
