import Link from "next/link";
import { hero } from "@/content/site";
import { ArrowUpRightIcon } from "./icons";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-hero relative isolate overflow-hidden text-white"
    >
      {/* Formes circulaires décoratives de la maquette */}
      <div
        aria-hidden="true"
        className="bg-hero-circle pointer-events-none absolute -top-40 -right-36 -z-10 size-[20rem] rounded-full sm:-top-44 sm:-right-40 sm:size-[26rem] lg:-top-40 lg:-right-44 lg:size-[29rem]"
      />
      <div
        aria-hidden="true"
        className="bg-hero-circle-alt pointer-events-none absolute -bottom-32 -left-44 -z-10 size-[18rem] rounded-full sm:-bottom-28 sm:-left-52 sm:size-[24rem]"
      />

      <div className="site-container pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <p className="border-hero-border inline-flex items-center gap-3 rounded-full border px-5 py-2 text-[0.9375rem] leading-6 sm:gap-4 sm:px-6 sm:text-[1.0625rem]">
          <span aria-hidden="true" className="bg-hero-dot size-3 shrink-0 rounded-full" />
          {hero.badge}
        </p>

        <h1
          id="hero-title"
          className="mt-8 max-w-[7.2em] text-[clamp(2.625rem,1.2rem+7.6vw,6rem)] leading-[0.98] font-extrabold tracking-[-0.035em] sm:mt-10"
        >
          {hero.titleLead} <span className="text-hero-accent">{hero.titleAccent}</span>
        </h1>

        <p className="text-hero-text mt-6 max-w-[18em] text-[clamp(1.25rem,0.95rem+1.3vw,1.875rem)] leading-[1.35] sm:mt-8">
          {hero.description}
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-6">
          <Link
            href={hero.primaryCta.href}
            className="bg-brand hover:bg-brand-dark inline-flex h-14 items-center justify-center gap-3.5 rounded-md px-8 text-lg font-semibold text-white transition-colors focus-visible:outline-white sm:h-[4.125rem] sm:px-10 sm:text-[1.375rem]"
          >
            {hero.primaryCta.label}
            <ArrowUpRightIcon className="size-5 sm:size-6" />
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="inline-flex h-14 items-center justify-center rounded-md border-[1.5px] border-white/90 px-8 text-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-white sm:h-[4.125rem] sm:px-16 sm:text-[1.3125rem]"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
