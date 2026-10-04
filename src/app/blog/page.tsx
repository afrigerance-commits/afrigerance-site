import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ArticleCard } from "@/components/content/article-card";
import { articles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Blog",
  description: "Réflexions, rappels, histoire islamique et actualités de la plateforme.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogPage() {
  const publicArticles = articles.filter((article) => article.statut === "publie");
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
        <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-border bg-surface p-8 text-center">
          <h2 className="font-display text-xl font-semibold">Articles en cours de validation</h2>
          <p className="mt-3 text-sm text-muted">Nos premières lectures documentées sont en préparation. En attendant, explorez les textes et les fiches bibliographiques déjà disponibles.</p>
          <div className="mt-5 flex justify-center gap-5 text-sm font-medium text-primary">
            <Link href="/coran">Lire le Coran</Link>
            <Link href="/bibliotheque">Bibliothèque</Link>
          </div>
        </div>
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
