import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

/**
 * En-tête des pages intérieures : même bandeau bleu que l'accueil, en plus compact.
 * Le texte reste dans la partie sombre du dégradé pour garder un contraste suffisant.
 */
export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <section
      aria-labelledby="page-title"
      className="bg-hero relative isolate overflow-hidden text-white"
    >
      <div
        aria-hidden="true"
        className="bg-hero-circle pointer-events-none absolute -top-36 -right-40 -z-10 size-[18rem] rounded-full sm:-top-44 sm:-right-36 sm:size-[24rem] lg:-top-48 lg:-right-40"
      />
      <div
        aria-hidden="true"
        className="bg-hero-circle-alt pointer-events-none absolute -bottom-40 -left-48 -z-10 size-[16rem] rounded-full sm:-bottom-44 sm:-left-56 sm:size-[20rem]"
      />

      <div className="site-container pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        <p className="border-hero-border inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[0.9375rem] leading-6 sm:px-5">
          <span aria-hidden="true" className="bg-hero-dot size-2.5 shrink-0 rounded-full" />
          {eyebrow}
        </p>
        <h1
          id="page-title"
          className="mt-6 max-w-[16em] text-[clamp(2.25rem,1.3rem+3.6vw,4.25rem)] leading-[1.04] font-extrabold tracking-[-0.035em] sm:mt-8"
        >
          {title}
        </h1>
        {intro ? (
          <p className="text-hero-text mt-5 max-w-[36em] text-[clamp(1.125rem,1rem+0.55vw,1.375rem)] leading-relaxed sm:mt-6 sm:max-w-[min(36em,62%)]">
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
