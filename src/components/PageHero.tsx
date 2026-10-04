import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { routes, uiText } from "@/content/site";
import { SplitWords, wordCount } from "./motion/SplitWords";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow: string;
  titleLead: string;
  titleAccent?: string;
  intro?: string;
  /** Fil d'Ariane (l'accueil est ajouté automatiquement). */
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Élément décoratif à droite (grands écrans). */
  aside?: ReactNode;
  /** Laisse de la place en bas pour un formulaire qui chevauche le bandeau. */
  overlap?: boolean;
};

/**
 * Bandeau des pages intérieures : même matière que l'accueil (dégradé, quadrillage, grain),
 * titre découpé en mots, fil d'Ariane. Le haut laisse la place à l'en-tête flottant.
 */
export function PageHero({ eyebrow, titleLead, titleAccent, intro, crumbs = [], children, aside, overlap }: PageHeroProps) {
  const lead = wordCount(titleLead);
  return (
    <section aria-labelledby="page-title" className="bg-hero grain on-dark relative isolate overflow-hidden text-white">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 -z-10" />
      <div
        className={`site-container grid gap-12 pt-32 sm:pt-40 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:pt-44 ${
          overlap ? "pb-28 sm:pb-32 lg:pb-40" : "pb-16 sm:pb-20 lg:pb-24"
        }`}
      >
        <div>
          <nav aria-label={uiText.breadcrumbLabel} className="load-fade" style={{ "--i": 0 } as CSSProperties}>
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs tracking-[0.08em] text-white uppercase">
              <li>
                <Link href={routes.home} className="rounded-sm underline-offset-4 hover:underline">
                  {uiText.home}
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-white/60">/</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="rounded-sm underline-offset-4 hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-semibold">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow text-white load-rise mt-10 inline-flex items-center gap-3" style={{ "--i": 1 } as CSSProperties}>
            <span aria-hidden="true" className="bg-white/60 h-px w-8" />
            {eyebrow}
          </p>
          <h1 id="page-title" className="text-display mt-5 max-w-[15ch] text-[clamp(2.75rem,1.4rem+5vw,6rem)]" style={{ "--split-delay": "260ms" } as CSSProperties}>
            <SplitWords text={titleLead} />
            {titleAccent ? (
              <>
                {" "}
                <span className="accent-serif text-brand-soft">
                  <SplitWords text={titleAccent} start={lead} />
                </span>
              </>
            ) : null}
          </h1>
          {intro ? (
            <p className="load-rise text-white mt-7 max-w-[38em] text-[clamp(1.0625rem,0.95rem+0.5vw,1.3125rem)] leading-relaxed" style={{ "--i": 4 } as CSSProperties}>
              {intro}
            </p>
          ) : null}
          {children ? (
            <div className="load-rise mt-9" style={{ "--i": 5 } as CSSProperties}>
              {children}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="load-fade hidden lg:block" style={{ "--i": 3 } as CSSProperties}>
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
