import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/ClosingCta";
import { ArrowRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { aboutPage } from "@/content/pages";
import { servicePoles } from "@/content/services";

export const metadata: Metadata = {
  title: aboutPage.metaTitle,
  description: aboutPage.metaDescription,
};

const h2Class =
  "text-ink text-[clamp(1.875rem,1.4rem+1.6vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.03em]";

export default function AboutPage() {
  const { presentation, slogan, poles, method } = aboutPage;
  return (
    <>
      <PageHeader eyebrow={aboutPage.eyebrow} title={aboutPage.title} intro={aboutPage.intro} />

      <section aria-labelledby="presentation-title" className="bg-white">
        <div className="site-container grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-24">
          <h2 id="presentation-title" className={h2Class}>
            {presentation.title}
          </h2>
          <div className="space-y-5">
            {presentation.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted text-lg leading-relaxed sm:text-xl">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="slogan-title" className="bg-surface">
        <div className="site-container py-16 sm:py-20 lg:py-24">
          <p className="text-brand-dark text-sm font-semibold tracking-wide uppercase">{slogan.eyebrow}</p>
          <h2
            id="slogan-title"
            className="text-ink mt-4 max-w-[14em] text-[clamp(2.25rem,1.3rem+3.6vw,4.25rem)] leading-[1.04] font-extrabold tracking-[-0.035em]"
          >
            {slogan.text}
          </h2>
          <p className="text-muted mt-6 max-w-[34em] text-lg leading-relaxed sm:text-xl">
            {slogan.explanation}
          </p>
        </div>
      </section>

      <section aria-labelledby="poles-title" className="bg-white">
        <div className="site-container py-16 sm:py-20 lg:py-24">
          <h2 id="poles-title" className={h2Class}>
            {poles.title}
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {servicePoles.map((pole) => (
              <li key={pole.id} className="border-line flex flex-col rounded-lg border p-6 sm:p-8">
                <h3 className="text-ink text-2xl font-bold tracking-[-0.02em] sm:text-[1.75rem]">
                  {pole.title}
                </h3>
                <p className="text-muted mt-3 flex-1 text-lg leading-relaxed">{pole.description}</p>
                <Link
                  href={pole.href}
                  className="text-brand hover:text-brand-dark mt-6 inline-flex items-center gap-2 self-start rounded-sm font-semibold"
                >
                  {poles.linkLabel}
                  <span className="sr-only"> : {pole.title}</span>
                  <ArrowRightIcon className="size-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="method-title" className="bg-surface">
        <div className="site-container py-16 sm:py-20 lg:py-24">
          <h2 id="method-title" className={h2Class}>
            {method.title}
          </h2>
          <p className="text-muted mt-4 max-w-[34em] text-lg leading-relaxed sm:text-xl">{method.intro}</p>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {method.steps.map((step, index) => (
              <li key={step.title} className="rounded-lg bg-white p-6">
                <span
                  aria-hidden="true"
                  className="bg-brand flex size-10 items-center justify-center rounded-full text-base font-bold text-white"
                >
                  {index + 1}
                </span>
                <h3 className="text-ink mt-4 text-xl font-bold">{step.title}</h3>
                <p className="text-muted mt-2 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
