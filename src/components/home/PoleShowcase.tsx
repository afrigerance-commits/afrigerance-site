import Link from "next/link";
import type { CSSProperties } from "react";
import { homePoles } from "@/content/home";
import { servicePoles } from "@/content/services";
import { ButtonArrow, TextLink } from "../ui/button";
import { SectionHeading } from "../ui/SectionHeading";
import { PoleIcon, PrestationIcon } from "../ui/service-icons";

/** Les deux pôles en grandes cartes : numéro, titre, prestations et lien vers la fiche détaillée. */
export function PoleShowcase() {
  return (
    <section aria-labelledby="poles-title" className="bg-surface relative overflow-hidden py-24 sm:py-28 lg:py-36">
      <div aria-hidden="true" className="grid-lines-light pointer-events-none absolute inset-0" />
      <div className="site-container relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="poles-title"
            eyebrow={homePoles.eyebrow}
            titleLead={homePoles.titleLead}
            titleAccent={homePoles.titleAccent}
            intro={homePoles.intro}
          />
          <div data-reveal="" style={{ "--i": 3 } as CSSProperties} className="shrink-0">
            <TextLink href={homePoles.allHref}>{homePoles.allLabel}</TextLink>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          {servicePoles.map((pole, index) => (
            <li key={pole.id} data-reveal="scale" style={{ "--i": index } as CSSProperties}>
              <article
                data-spotlight=""
                className="spotlight group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_30px_80px_-50px_rgb(4_11_36/0.45)] ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-700 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_40px_90px_-45px_rgb(0_80_204/0.45)] sm:p-10 lg:p-12"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="bg-ink relative flex size-16 items-center justify-center rounded-2xl text-white shadow-[0_18px_40px_-16px_rgb(11_16_56/0.7)] transition-transform duration-700 ease-out-expo group-hover:-rotate-6 group-hover:scale-105">
                    <PoleIcon id={pole.id} className="size-7" />
                    <span aria-hidden="true" className="bg-brand absolute -right-1 -bottom-1 size-4 rounded-full ring-4 ring-white" />
                  </span>
                  <span aria-hidden="true" className="text-display text-ink/[0.07] text-[6rem] leading-none sm:text-[7.5rem]">
                    {pole.index}
                  </span>
                </div>

                <h3 className="text-display text-ink mt-8 text-[clamp(2rem,1.3rem+2.4vw,3.25rem)]">
                  <Link href={pole.href} className="rounded-sm after:absolute after:inset-0 after:rounded-[2rem] after:content-['']">
                    {pole.title}
                  </Link>
                </h3>
                <p className="text-muted mt-5 max-w-[34em] text-lg leading-relaxed">{pole.summary}</p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {pole.prestations.map((prestation) => (
                    <li
                      key={prestation.id}
                      className="bg-surface text-ink inline-flex items-center gap-2 rounded-full py-2 pr-4 pl-3 text-sm font-medium"
                    >
                      <PrestationIcon id={prestation.id} className="text-brand size-4" />
                      {prestation.title}
                    </li>
                  ))}
                </ul>

                <span className="text-brand-dark relative mt-auto inline-flex items-center gap-2 pt-10 font-semibold">
                  {homePoles.linkLabel}
                  <span className="group/button inline-flex">
                    <ButtonArrow className="size-4 [&>svg]:size-4 group-hover:[&>svg:first-child]:translate-x-full group-hover:[&>svg:first-child]:-translate-y-full group-hover:[&>svg:last-child]:translate-x-0 group-hover:[&>svg:last-child]:translate-y-0" />
                  </span>
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
