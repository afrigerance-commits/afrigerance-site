import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { hero } from "@/content/site";
import { SplitWords, wordCount } from "../motion/SplitWords";
import { ButtonLink, TextLink } from "../ui/button";
import { PoleIcon } from "../ui/service-icons";

/* Position de Dakar sur public/accueil/afrique.svg (générée avec la carte). */
const DAKAR = { x: 1.49, y: 31.9 };

const chipPositions = [
  { left: "50%", top: "17%", depth: 26, delay: "0s", pole: "infogerance" },
  { left: "57%", top: "63%", depth: 38, delay: "-3.5s", pole: "integration" },
] as const;

/**
 * Bandeau d'accueil : titre découpé en mots, carte de l'Afrique en points avec le Sénégal en signal,
 * étiquettes des deux pôles en profondeur (elles suivent le pointeur, voir MotionRoot).
 */
export function HomeHero() {
  const leadWords = wordCount(hero.titleLead);
  return (
    <section
      aria-labelledby="hero-title"
      data-parallax=""
      className="bg-hero grain on-dark relative isolate overflow-hidden text-white"
    >
      <div aria-hidden="true" data-depth="-6" className="grid-lines pointer-events-none absolute -inset-10 -z-10" />
      {hero.image ? (
        <div aria-hidden="true" className="hero-image pointer-events-none absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]">
          <Image src={hero.image.src} alt="" fill sizes="(min-width: 64rem) 62vw, 100vw" loading="eager" className="object-cover" />
        </div>
      ) : null}

      {/* Carte en fond sur mobile et tablette */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-16 -z-10 w-[min(36rem,110vw)] opacity-20 [mask-image:linear-gradient(to_top,#000_35%,transparent_85%)] lg:hidden">
        <Image src="/accueil/afrique.svg" alt="" width={710} height={737} className="h-auto w-full" />
      </div>

      <div className="site-container grid items-center gap-12 pt-32 pb-20 sm:pt-40 sm:pb-24 lg:min-h-[min(max(100svh,48rem),62rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8 lg:pt-36 lg:pb-24">
        <div className="scroll-recede relative">
          <p
            className="load-rise text-brand-dark inline-flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-3 text-[0.9375rem] font-medium shadow-[0_12px_30px_-18px_rgb(17_19_23/0.5)]"
            style={{ "--i": 0 } as CSSProperties}
          >
            <span aria-hidden="true" className="relative flex size-2.5">
              <span className="animate-beacon bg-brand absolute inset-0 rounded-full" />
              <span className="bg-brand relative size-2.5 rounded-full" />
            </span>
            {hero.badge}
          </p>

          <h1 id="hero-title" className="text-display mt-8 text-[clamp(2.875rem,1rem+6.4vw,6.25rem)] sm:mt-10">
            <span className="block">
              <SplitWords text={hero.titleLead} />
            </span>{" "}
            <span className="accent-serif text-brand-soft block">
              <SplitWords text={hero.titleAccent} start={leadWords} />
            </span>
          </h1>

          <p
            className="load-rise text-white mt-7 max-w-[34em] text-[clamp(1.0625rem,0.95rem+0.5vw,1.3125rem)] leading-relaxed sm:mt-9"
            style={{ "--i": 4 } as CSSProperties}
          >
            {hero.description}
          </p>

          <div
            className="load-rise mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ "--i": 5 } as CSSProperties}
          >
            <ButtonLink href={hero.primaryCta.href} size="lg" variant="light" arrow magnetic>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="onDark">
              {hero.secondaryCta.label}
            </ButtonLink>
            <TextLink href={hero.tertiaryCta.href} tone="light" className="justify-center sm:ml-1">
              {hero.tertiaryCta.label}
            </TextLink>
          </div>
        </div>

        {/* Carte de l'Afrique : signal depuis Dakar vers les deux pôles */}
        <div className="load-fade relative hidden lg:block" style={{ "--i": 2 } as CSSProperties}>
          <div className="relative mx-auto aspect-[710/737] w-full max-w-[38rem]">
            <div data-depth="10" className="absolute inset-0">
              <Image src="/accueil/afrique.svg" alt="" width={710} height={737} loading="eager" className="h-full w-full" />
            </div>

            <svg
              aria-hidden="true"
              data-depth="16"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              {[
                `M${DAKAR.x} ${DAKAR.y} C 18 6, 36 6, 52 20`,
                `M${DAKAR.x} ${DAKAR.y} C 16 62, 38 74, 58 66`,
              ].map((d, index) => (
                <g key={d}>
                  <path
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke="rgb(255 255 255 / 0.6)"
                    strokeWidth={1.25}
                    vectorEffect="non-scaling-stroke"
                    className="hero-route"
                    style={{ "--i": index } as CSSProperties}
                  />
                  <path
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="hero-flow"
                    style={{ "--i": index } as CSSProperties}
                  />
                </g>
              ))}
            </svg>

            {/* Balise de Dakar */}
            <div
              aria-hidden="true"
              data-depth="16"
              className="absolute size-0"
              style={{ left: `${DAKAR.x}%`, top: `${DAKAR.y}%` }}
            >
              {[0, 1, 2].map((ring) => (
                <span
                  key={ring}
                  className="animate-beacon absolute -top-8 -left-8 size-16 rounded-full border border-white/70"
                  style={{ animationDelay: `${ring * 0.9}s` }}
                />
              ))}
              <span className="absolute -top-2 -left-2 size-4 rounded-full bg-white shadow-[0_0_24px_6px_rgb(255_255_255/0.6)]" />
              <span className="text-brand-dark absolute top-5 left-3 rounded-full bg-white px-3 py-1 font-mono text-xs font-medium whitespace-nowrap shadow-[0_10px_24px_-14px_rgb(17_19_23/0.5)]">
                {hero.mapLabel}
              </span>
            </div>

            {/* Étiquettes des deux pôles */}
            {hero.chips.map((chip, index) => {
              const position = chipPositions[index];
              return (
                <div
                  key={chip.href}
                  data-depth={position.depth}
                  className="absolute"
                  style={{ left: position.left, top: position.top }}
                >
                  <Link
                    href={chip.href}
                    className="animate-float group text-ink flex items-center gap-3 rounded-2xl bg-white py-3 pr-5 pl-3 shadow-[0_24px_50px_-24px_rgb(17_19_23/0.55)] transition-colors hover:bg-brand-soft"
                    style={{ animationDelay: position.delay }}
                  >
                    <span className="bg-brand flex size-11 items-center justify-center rounded-xl">
                      <PoleIcon id={position.pole} className="size-5 text-white" />
                    </span>
                    <span>
                      <span className="block font-semibold">{chip.label}</span>
                      <span className="text-muted block text-sm">{chip.detail}</span>
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="load-fade absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex" style={{ "--i": 7 } as CSSProperties}>
        <span className="eyebrow text-[0.6875rem] text-white">{hero.scrollHint}</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/25">
          <span className="hero-scroll-line absolute inset-x-0 top-0 h-1/2 bg-white/70" />
        </span>
      </div>
    </section>
  );
}
