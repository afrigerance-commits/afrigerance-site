import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { EditorialStatusBadge, DemoBadge } from "@/components/islamic/reliability-badge";
import { SourceReferenceList } from "@/components/islamic/source-reference";
import { ShareButtons } from "@/components/content/share-buttons";
import { ReadingProgress } from "@/components/content/reading-progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { articles, getArticle } from "@/lib/data/articles";
import { withHeadingIds } from "@/lib/content-html";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.titre,
    description: article.resume,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: article.titre, description: article.resume },
  };
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { html, headings } = withHeadingIds(article.contenuHtml);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.titre,
          description: article.resume,
          articleSection: article.categorie,
          author: { "@type": "Person", name: article.auteur },
          datePublished: article.datePublication,
          dateModified: article.derniereMiseAJour ?? article.datePublication,
          publisher: { "@type": "Organization", name: siteConfig.name },
          mainEntityOfPage: `${siteConfig.url}/blog/${article.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Blog", item: `${siteConfig.url}/blog` },
            { "@type": "ListItem", position: 2, name: article.titre, item: `${siteConfig.url}/blog/${article.slug}` },
          ],
        }}
      />
      <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Blog
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_220px]">
        <article>
          <Reveal className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{article.categorie}</Badge>
              <EditorialStatusBadge status={article.statut} />
              {article.demonstration && <DemoBadge />}
            </div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">{article.titre}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span>{article.auteur}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {article.tempsLectureMinutes} min de lecture
              </span>
            </div>
            <ShareButtons title={article.titre} />
          </Reveal>

          <Reveal
            delay={0.1}
            as="div"
            className="prose-content mt-10 flex flex-col gap-4 text-foreground/90 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_p]:leading-relaxed"
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Reveal>

          {article.sources && article.sources.length > 0 && (
            <>
              <Separator className="my-12" />
              <section>
                <h2 className="mb-4 font-display text-lg font-semibold">Références</h2>
                <SourceReferenceList sources={article.sources} />
              </section>
            </>
          )}
        </article>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-3 border-l border-border pl-5 text-sm">
              <span className="font-medium text-foreground">Sommaire</span>
              <nav className="flex flex-col gap-2">
                {headings.map((h) => (
                  <a key={h.id} href={`#${h.id}`} className="text-muted transition-colors hover:text-primary">
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
