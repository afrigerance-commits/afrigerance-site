import type { Metadata } from "next";
import { EditorialEmpty } from "@/components/content/editorial-empty";
import { Reveal } from "@/components/motion/reveal";
import { ArticleCard } from "@/components/content/article-card";
import { getPublishedArticles } from "@/lib/data/published-articles";

export const metadata: Metadata = {
  title: "Blog",
  description: "Réflexions, rappels, histoire islamique et actualités de la plateforme.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default async function BlogPage() {
  const publicArticles = await getPublishedArticles();
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col gap-4 text-center">
        <span className="mx-auto text-sm font-medium text-accent-text">Blog éditorial</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Réflexions et rappels</h1>
        <p className="mx-auto max-w-2xl text-muted">
          Des articles pensés pour la lecture longue, chacun accompagné de ses références lorsqu’il en comporte.
        </p>
      </Reveal>
      {publicArticles.length === 0 && (
        <EditorialEmpty title="Les prochaines lectures se préparent." description="Les articles documentés attendent leur validation éditoriale. En attendant, découvrez les textes et les fiches bibliographiques déjà accessibles." />
      )}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publicArticles.map((article, i) => (
          <Reveal key={article.slug} delay={i * 0.05}>
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
