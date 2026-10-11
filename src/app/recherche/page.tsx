import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { relevance } from "@/lib/search/match";
import { hadithSearchIndex, type SearchResult } from "@/lib/search/hadith-index";
import { invocationTopics } from "@/lib/data/invocation-topics";
import { chapterName } from "@/lib/quran/chapter-name";
import { getPublishedVideos } from "@/lib/data/published-videos";
import { getPublishedArticles } from "@/lib/data/published-articles";
import { getLibraryBooks } from "@/lib/books/catalog";
import { scholars } from "@/lib/data/scholars";
import { siraEvents } from "@/lib/data/sira";
import { fiqhCourses } from "@/lib/data/fiqh";
import { disciplines } from "@/lib/site-config";
import { getChapters } from "@/lib/quran/data";
import { hadithCollections, getBooks } from "@/lib/hadith/data";
import { invocationCollection, debtInvocations, debtHadiths } from "@/lib/data/invocations";

export const metadata: Metadata = {
  title: "Recherche",
  robots: { index: false },
};

async function buildIndex(): Promise<SearchResult[]> {
  const [articles, videos, books] = await Promise.all([getPublishedArticles(), getPublishedVideos(), getLibraryBooks()]);
  return [
    ...videos.map((v) => ({ titre: v.titre, description: v.description, href: `/videos#video-${v.slug}`, type: "Vidéo" })),
    ...disciplines.map((d) => ({ titre: d.name, description: d.description, href: `/explorer-le-savoir/${d.slug}`, type: "Discipline" })),
    ...articles.filter((a) => a.statut === "publie").map((a) => ({ titre: a.titre, description: a.resume, href: `/blog/${a.slug}`, type: "Article" })),
    ...books.map((b) => ({ titre: b.titreFrancais, description: b.presentation, href: `/bibliotheque/${b.slug}`, type: "Livre" })),
    ...scholars.filter((s) => s.statut === "publie").map((s) => ({ titre: s.transcriptionFrancaise, description: s.presentation, href: `/compagnons/${s.slug}`, type: "Figure" })),
    ...siraEvents.filter((e) => e.statut === "publie").map((e) => ({ titre: e.titre, description: e.presentation, href: `/sira/${e.slug}`, type: "Sîra" })),
    ...fiqhCourses.filter((c) => c.statut === "publie").map((c) => ({ titre: c.titre, description: c.description, href: `/fiqh/malikite/${c.slug}`, type: "Cours" })),
    ...getChapters().map((c) => ({
      titre: `Sourate ${chapterName(c)} · ${c.nameFrench}`,
      description: `${c.nameTransliteration} — ${c.versesCount} versets, ${c.revelation === "Mecca" ? "mecquoise" : "médinoise"}.`,
      href: `/coran/${c.number}`,
      type: "Coran",
    })),
    { titre: invocationCollection.title, description: invocationCollection.description, href: `/invocations/${invocationCollection.slug}`, type: "Invocations" },
    ...debtInvocations.map((item) => ({ titre: item.title, description: `${item.translation} — ${item.reference}`, href: `/invocations/${invocationCollection.slug}#invocations`, type: "Invocation" })),
    ...debtHadiths.map((item) => ({ titre: item.title, description: `${item.translation} — ${item.reference}`, href: `/invocations/${invocationCollection.slug}#hadiths`, type: "Hadith thématique" })),
    ...hadithSearchIndex(),
    ...invocationTopics.flatMap(topic => [{ titre: topic.title, description: topic.description, href: `/invocations/${topic.slug}`, type: "Invocations" }, ...topic.items.map(item => ({ titre: item.title, description: `${item.translation.slice(0,260)} — ${item.reference}`, href: `/invocations/${topic.slug}`, type: "Invocation", searchText: `${topic.title} ${item.title} ${item.arabic} ${item.translation} ${item.context} ${item.reference}` }))]),
    { titre: "Horaires de prière", description: "Ville, horaires des cinq prières et réglages de l’adhan.", href: "/#horaires-prieres", type: "Outil", searchText: "horaires heures prière Fajr Sobh Dhuhr Asr Maghrib Isha Adhan" },
    ...hadithCollections.flatMap((collection) =>
      getBooks(collection.slug).map((book) => ({
        titre: book.titreFrancais,
        description: `${collection.nom} — ${book.count} hadith${book.count > 1 ? "s" : ""}.`,
        href: `/hadith/${collection.slug}/${book.number}`,
        type: "Livre de hadith",
        collection: collection.slug,
      })),
    ),
  ];
}

export default async function RecherchePage({
  searchParams,
}: PageProps<"/recherche">) {
  const params = await searchParams;
  const first = (v: string | string[] | undefined) => Array.isArray(v) ? v[0] : v;
  const query = (first(params.q) ?? "").trim().slice(0,120);
  const collection = first(params.collection) ?? "";
  const selected = hadithCollections.some(c=>c.slug === collection) ? collection : "";
  const matches = query.length >= 2 ? (await buildIndex()).map(r=>({result:r,score:relevance(query,r.searchText ?? `${r.titre} ${r.description}`,r.titre)})).filter(r=>r.score > 0 && (!selected || r.result.collection === selected)).sort((a,b)=>b.score-a.score || a.result.href.localeCompare(b.result.href)) : [];
  const deduplicated = [...new Map(matches.map(r=>[r.result.href,r.result])).values()];
  const rawPage = Number(first(params.page));
  const page = Math.min(Math.max(1,Number.isInteger(rawPage) ? rawPage : 1),Math.max(1,Math.ceil(deduplicated.length/20)));
  const results = deduplicated.slice((page-1)*20,page*20);
  const pageHref = (n: number) => `/recherche?q=${encodeURIComponent(query)}${selected ? `&collection=${selected}` : ""}&page=${n}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Recherche" title="Rechercher sur la plateforme" />
      <form action="/recherche" className="mb-12 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <Input className="min-w-0 flex-1" aria-label="Votre recherche" name="q" defaultValue={query} maxLength={120} minLength={2} required placeholder="Fajr, Mouwatta, Al-Baqarah, dettes…" />
        <select name="collection" defaultValue={selected} aria-label="Filtrer par recueil" className="min-h-11 rounded-xl border border-border bg-surface px-3"><option value="">Toute la plateforme</option>{hadithCollections.map(c=><option key={c.slug} value={c.slug}>{c.nom}</option>)}</select>
        <Button type="submit">
          <SearchIcon className="h-4 w-4" /> Rechercher
        </Button>
      </form>

      <p className="mb-5 text-sm leading-7 text-muted">Recherche dans les textes arabes et français des recueils disponibles, leurs titres et les autres rubriques. Variantes reconnues : Fajr, Sobh, aube ou aurore ; Mouwatta ou Muwatta. Les résultats renvoient aux textes existants, sans réponse religieuse générée. Cette recherche nécessite Internet.</p>
      {!query && <div className="mb-6 flex flex-wrap gap-2">{["Fajr", "Fajr Mouwatta", "dettes", "Al-Baqarah"].map(q=><Link className="min-h-11 rounded-full border border-accent/30 px-4 py-3 text-sm" href={`/recherche?q=${encodeURIComponent(q)}`} key={q}>{q}</Link>)}</div>}
      {query && (
        <p className="mb-6 text-sm text-muted">
          {deduplicated.length} résultat{deduplicated.length > 1 ? "s" : ""} pour « {query} »
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

      {deduplicated.length > 20 && <nav aria-label="Pages de résultats" className="mt-7 flex justify-between gap-3">{page > 1 ? <Link href={pageHref(page-1)}>Précédente</Link> : <span />}<span>{page} / {Math.ceil(deduplicated.length/20)}</span>{page*20 < deduplicated.length && <Link href={pageHref(page+1)}>Suivante</Link>}</nav>}
      {query && results.length === 0 && (
        <p className="text-sm text-muted">Aucun résultat. Essayez un autre mot-clé, ou explorez les disciplines.</p>
      )}
    </div>
  );
}
