import type { CSSProperties } from "react";
import { method } from "@/content/home";
import { ButtonLink } from "../ui/button";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * Démarche en cinq étapes (cahier des charges § 4.3) : titre fixe à gauche,
 * étapes qui se révèlent au défilement le long d'une ligne qui se trace.
 */
export function MethodTimeline({ id = "demarche" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-anthracite-band grain on-dark relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-36">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 -z-10 size-[36rem] rounded-full bg-brand/25 blur-[120px]"
      />
      <div className="site-container grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id={`${id}-title`}
            eyebrow={method.eyebrow}
            titleLead={method.titleLead}
            titleAccent={method.titleAccent}
            intro={method.intro}
            tone="dark"
          />
          <div data-reveal="" style={{ "--i": 3 } as CSSProperties} className="mt-10">
            <ButtonLink href={method.cta.href} variant="onDark" size="lg" arrow>
              {method.cta.label}
            </ButtonLink>
          </div>
        </div>

        <ol className="relative">
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[1.375rem] w-px bg-white/10 sm:left-[1.875rem]" />
          <span
            aria-hidden="true"
            data-reveal="line"
            className="from-brand-soft via-brand absolute top-3 bottom-3 left-[1.375rem] w-px origin-top bg-gradient-to-b to-transparent [&.is-revealed]:duration-[2.4s]! sm:left-[1.875rem]"
          />
          {method.steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal=""
              style={{ "--i": index } as CSSProperties}
              className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-5 pb-12 last:pb-0 sm:grid-cols-[3.75rem_minmax(0,1fr)] sm:gap-8 sm:pb-16"
            >
              <span className="bg-anthracite relative flex size-11 items-center justify-center rounded-full font-mono text-sm text-brand-soft ring-1 ring-white/20 sm:size-[3.75rem] sm:text-base">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5 sm:pt-3">
                <h3 className="text-display text-[clamp(1.5rem,1.2rem+1.1vw,2.25rem)] text-white">{step.title}</h3>
                <p className="text-white mt-3 max-w-[32em] text-lg leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
