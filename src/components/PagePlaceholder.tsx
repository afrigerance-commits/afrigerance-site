import type { Metadata } from "next";
import Link from "next/link";
import { routes, uiText, type PlaceholderPage } from "@/content/site";

/** Métadonnées d'une page en préparation : titre propre, exclue de l'indexation. */
export function placeholderMetadata(page: PlaceholderPage): Metadata {
  return {
    title: page.title,
    description: page.intro,
    robots: { index: false, follow: true },
  };
}

/** Page provisoire : indique honnêtement que le contenu n'est pas encore disponible. */
export function PagePlaceholder({ page }: { page: PlaceholderPage }) {
  return (
    <section aria-labelledby="page-title" className="site-container py-16 sm:py-24 lg:py-28">
      <p className="border-line text-muted inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
        {uiText.placeholderBadge}
      </p>
      <h1
        id="page-title"
        className="text-ink mt-6 max-w-[16em] text-[clamp(2.25rem,1.5rem+2.8vw,3.75rem)] leading-[1.08] font-extrabold tracking-[-0.035em]"
      >
        {page.title}
      </h1>
      <p className="text-muted mt-6 max-w-[34em] text-lg leading-relaxed sm:text-xl">
        {page.intro}
      </p>
      <p className="text-ink mt-4 max-w-[34em] text-base leading-relaxed sm:text-lg">
        {page.status}
      </p>
      <Link
        href={routes.home}
        className="border-brand text-brand hover:bg-brand mt-10 inline-flex h-12 items-center rounded-md border-[1.5px] px-6 text-base font-semibold transition-colors hover:text-white"
      >
        {uiText.backHome}
      </Link>
    </section>
  );
}
