import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { MethodTimeline } from "@/components/home/MethodTimeline";
import { PoleShowcase } from "@/components/home/PoleShowcase";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPage } from "@/content/pages";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: aboutPage.metaTitle,
  description: aboutPage.metaDescription,
  alternates: { canonical: routes.about },
};

export default function AboutPage() {
  const { presentation, signature, approach } = aboutPage;
  return (
    <PageTransition>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        titleLead={aboutPage.titleLead}
        titleAccent={aboutPage.titleAccent}
        intro={aboutPage.intro}
        crumbs={[{ label: aboutPage.eyebrow }]}
      >
        <ButtonLink href={aboutPage.heroCta.href} size="lg" variant="onDark" arrow>
          {aboutPage.heroCta.label}
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="presentation-title" className="bg-white py-24 sm:py-28 lg:py-36">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="presentation-title"
            eyebrow={presentation.eyebrow}
            titleLead={presentation.titleLead}
            titleAccent={presentation.titleAccent}
          />
          <div className="space-y-6 lg:pt-14">
            {presentation.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                data-reveal=""
                style={{ "--i": index } as CSSProperties}
                className="text-muted text-lg leading-relaxed sm:text-xl"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <figure className="site-container mt-20 lg:mt-28">
          <div data-reveal="scale" className="bg-surface relative overflow-hidden rounded-[2rem] px-8 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
            <div aria-hidden="true" className="grid-lines-light pointer-events-none absolute inset-0" />
            <p className="eyebrow text-brand-dark relative">{signature.eyebrow}</p>
            <blockquote className="relative mt-6">
              <p className="text-display text-ink max-w-[14ch] text-[clamp(2.5rem,1.3rem+5vw,6rem)]">
                {signature.lead} <span className="accent-serif text-brand">{signature.accent}</span>
              </p>
            </blockquote>
            <figcaption className="text-muted relative mt-8 max-w-[36em] text-lg leading-relaxed sm:text-xl">
              {signature.explanation}
            </figcaption>
          </div>
        </figure>
      </section>

      <section aria-labelledby="approach-title" className="bg-white pb-24 sm:pb-28 lg:pb-36">
        <div className="site-container">
          <SectionHeading id="approach-title" eyebrow={approach.eyebrow} titleLead={approach.titleLead} titleAccent={approach.titleAccent} />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {approach.items.map((item, index) => (
              <li
                key={item.title}
                data-reveal=""
                data-spotlight=""
                style={{ "--i": index } as CSSProperties}
                className="spotlight rounded-3xl p-7 ring-1 ring-ink/[0.08]"
              >
                <span className="text-brand font-mono text-sm">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-display text-ink mt-12 text-2xl">{item.title}</h3>
                <p className="text-muted mt-3 leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MethodTimeline id="demarche" />
      <PoleShowcase />
    </PageTransition>
  );
}
