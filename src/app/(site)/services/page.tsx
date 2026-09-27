import type { Metadata } from "next";
import { AlertIcon, ArrowUpRightIcon, CheckCircleIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/button";
import { servicesPage } from "@/content/pages";
import { servicePoles } from "@/content/services";

export const metadata: Metadata = {
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
};

export default function ServicesPage() {
  const prepare = servicesPage.prepare;
  return (
    <>
      <PageHeader eyebrow={servicesPage.eyebrow} title={servicesPage.title} intro={servicesPage.intro}>
        <nav aria-label={servicesPage.jumpLabel} className="mt-8 sm:mt-10">
          <ul className="flex flex-wrap gap-3">
            {servicePoles.map((pole) => (
              <li key={pole.id}>
                <a
                  href={`#${pole.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/70 px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-white"
                >
                  {pole.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {servicePoles.map((pole, index) => (
        <section
          key={pole.id}
          id={pole.id}
          aria-labelledby={`${pole.id}-title`}
          className={`scroll-mt-4 ${index % 2 === 1 ? "bg-surface" : "bg-white"}`}
        >
          <div className="site-container grid gap-x-16 gap-y-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:py-24">
            <div className="lg:col-start-1 lg:row-start-1">
              <p className="text-brand-dark text-sm font-semibold tracking-wide uppercase">
                {servicesPage.poleLabel} {index + 1}
              </p>
              <h2
                id={`${pole.id}-title`}
                className="text-ink mt-3 max-w-[12em] text-[clamp(2rem,1.3rem+2.4vw,3rem)] leading-[1.1] font-bold tracking-[-0.03em]"
              >
                {pole.title}
              </h2>
              <p className="text-muted mt-5 max-w-[30em] text-lg leading-relaxed sm:text-xl">{pole.summary}</p>
            </div>

            <ul
              aria-label={`${servicesPage.prestationsLabel} ${pole.title}`}
              className="divide-line border-line divide-y border-y lg:col-start-2 lg:row-span-2 lg:row-start-1"
            >
              {pole.prestations.map((prestation) => (
                <li key={prestation.id} className="py-6 sm:py-7">
                  <h3 className="text-ink text-xl font-bold tracking-[-0.01em] sm:text-[1.375rem]">
                    {prestation.title}
                  </h3>
                  <p className="text-muted mt-2 text-base leading-relaxed sm:text-lg">{prestation.description}</p>
                </li>
              ))}
            </ul>

            <div className="lg:col-start-1 lg:row-start-2">
              <ButtonLink href={pole.quoteHref} size="lg" className="w-full sm:w-auto">
                {servicesPage.quoteCta}
                <span className="sr-only"> : {pole.title}</span>
                <ArrowUpRightIcon className="size-5" />
              </ButtonLink>
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="prepare-title" className="border-line border-t bg-white">
        <div className="site-container grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-24">
          <div>
            <h2
              id="prepare-title"
              className="text-ink text-[clamp(1.875rem,1.4rem+1.6vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.03em]"
            >
              {prepare.title}
            </h2>
            <p className="text-muted mt-4 text-lg leading-relaxed sm:text-xl">{prepare.intro}</p>
          </div>
          <div>
            <ul className="space-y-3">
              {prepare.items.map((item) => (
                <li key={item} className="text-ink flex items-start gap-3 text-lg">
                  <CheckCircleIcon className="text-brand mt-1 size-5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-ink bg-surface mt-6 flex items-start gap-3 rounded-md p-4 leading-relaxed">
              <AlertIcon className="text-brand mt-0.5 size-5 shrink-0" />
              <span>{prepare.warning}</span>
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={prepare.primaryCta.href} size="lg">
                {prepare.primaryCta.label}
                <ArrowUpRightIcon className="size-5" />
              </ButtonLink>
              <ButtonLink href={prepare.secondaryCta.href} variant="secondary" size="lg">
                {prepare.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
