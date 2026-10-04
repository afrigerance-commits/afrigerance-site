import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ShieldAlert } from "lucide-react";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PoleIcon, PrestationIcon } from "@/components/ui/service-icons";
import { servicesPage } from "@/content/pages";
import { servicePoles } from "@/content/services";

export const metadata: Metadata = {
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const prepare = servicesPage.prepare;
  return (
    <PageTransition>
      <PageHero
        eyebrow={servicesPage.eyebrow}
        titleLead={servicesPage.titleLead}
        titleAccent={servicesPage.titleAccent}
        intro={servicesPage.intro}
        crumbs={[{ label: servicesPage.eyebrow }]}
      >
        <ul className="flex flex-wrap gap-3">
          {servicePoles.map((pole) => (
            <li key={pole.id}>
              <a
                href={`#${pole.id}`}
                className="text-brand-dark inline-flex min-h-11 items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 text-[0.9375rem] font-medium transition-colors hover:bg-brand-soft"
              >
                <span className="bg-brand flex size-8 items-center justify-center rounded-full text-white">
                  <PoleIcon id={pole.id} className="size-4" />
                </span>
                {pole.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {servicePoles.map((pole, poleIndex) => (
        <section
          key={pole.id}
          id={pole.id}
          aria-labelledby={`${pole.id}-title`}
          className={`scroll-mt-28 py-24 sm:py-28 lg:py-32 ${poleIndex % 2 === 0 ? "bg-white" : "bg-surface"}`}
        >
          <div className="site-container grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p data-reveal="" className="eyebrow text-brand-dark inline-flex items-center gap-3">
                <span aria-hidden="true" className="font-display text-ink/15 text-5xl leading-none tracking-normal">
                  {pole.index}
                </span>
                {servicesPage.poleLabel}
              </p>
              <h2
                id={`${pole.id}-title`}
                data-reveal=""
                style={{ "--i": 1 } as CSSProperties}
                className="text-display text-ink mt-5 text-[clamp(2.25rem,1.4rem+3vw,3.75rem)]"
              >
                {pole.title}
              </h2>
              <p data-reveal="" style={{ "--i": 2 } as CSSProperties} className="text-muted mt-6 max-w-[34em] text-lg leading-relaxed sm:text-xl">
                {pole.summary}
              </p>
              <div data-reveal="" style={{ "--i": 3 } as CSSProperties} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink href={pole.href} size="lg" arrow magnetic>
                  {servicesPage.detailCta}
                </ButtonLink>
                <TextLink href={pole.quoteHref} className="justify-center sm:ml-2">
                  {servicesPage.quoteCta}
                </TextLink>
              </div>
            </div>

            <div>
              <h3 className="sr-only">
                {servicesPage.prestationsLabel} : {pole.title}
              </h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {pole.prestations.map((prestation, index) => (
                  <li
                    key={prestation.id}
                    data-reveal=""
                    data-spotlight=""
                    style={{ "--i": index % 2 } as CSSProperties}
                    className="spotlight group rounded-3xl bg-white p-7 ring-1 ring-ink/[0.07] transition-[translate,box-shadow] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgb(34_89_140/0.5)]"
                  >
                    <span className="bg-surface text-brand flex size-12 items-center justify-center rounded-2xl transition-[background-color,color,rotate] duration-500 ease-out-expo group-hover:bg-brand group-hover:text-white group-hover:-rotate-6">
                      <PrestationIcon id={prestation.id} className="size-6" />
                    </span>
                    <h4 className="text-ink mt-5 text-xl font-semibold tracking-[-0.015em]">{prestation.title}</h4>
                    <p className="text-muted mt-2.5 leading-relaxed">{prestation.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="prepare-title" className="bg-white py-24 sm:py-28 lg:py-32">
        <div className="site-container">
          <div className="bg-surface grid gap-12 overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <SectionHeading
              id="prepare-title"
              eyebrow={prepare.eyebrow}
              titleLead={prepare.titleLead}
              titleAccent={prepare.titleAccent}
            >
              <div data-reveal="" style={{ "--i": 3 } as CSSProperties} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={prepare.primaryCta.href} size="lg" arrow magnetic>
                  {prepare.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={prepare.secondaryCta.href} size="lg" variant="secondary">
                  {prepare.secondaryCta.label}
                </ButtonLink>
              </div>
            </SectionHeading>
            <div>
              <p data-reveal="" className="text-ink text-lg font-medium">
                {prepare.intro}
              </p>
              <ol className="mt-6 space-y-3">
                {prepare.items.map((item, index) => (
                  <li key={item} data-reveal="" style={{ "--i": index } as CSSProperties} className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink/[0.06]">
                    <span className="text-brand font-mono text-sm leading-7">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-ink leading-7">{item}</span>
                  </li>
                ))}
              </ol>
              <p data-reveal="" className="bg-warning-bg text-warning mt-6 flex items-start gap-3 rounded-2xl p-4 font-medium">
                <ShieldAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                {prepare.warning}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
