import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="page-title" className="site-container py-16 sm:py-24 lg:py-28">
      <p className="text-brand text-sm font-semibold tracking-wide uppercase">Erreur 404</p>
      <h1
        id="page-title"
        className="text-ink mt-4 text-[clamp(2.25rem,1.5rem+2.8vw,3.75rem)] leading-[1.08] font-extrabold tracking-[-0.035em]"
      >
        Page introuvable
      </h1>
      <p className="text-muted mt-6 max-w-[34em] text-lg leading-relaxed sm:text-xl">
        La page demandée n’existe pas ou a été déplacée.
      </p>
      <Link
        href={routes.home}
        className="border-brand text-brand hover:bg-brand mt-10 inline-flex h-12 items-center rounded-md border-[1.5px] px-6 text-base font-semibold transition-colors hover:text-white"
      >
        Retour à l’accueil
      </Link>
    </section>
  );
}
