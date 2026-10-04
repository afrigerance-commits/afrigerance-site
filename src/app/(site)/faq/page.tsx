import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { FaqList } from "@/components/FaqList";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui/button";
import { allFaqItems, faqGroups } from "@/content/faq";
import { faqPage } from "@/content/pages";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: faqPage.metaTitle,
  description: faqPage.metaDescription,
  alternates: { canonical: routes.faq },
};

/** Données structurées FAQPage : uniquement les questions et réponses publiées. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow={faqPage.eyebrow}
        titleLead={faqPage.titleLead}
        titleAccent={faqPage.titleAccent}
        intro={faqPage.intro}
        crumbs={[{ label: faqPage.eyebrow }]}
      >
        <ButtonLink href={faqPage.contactCta.href} size="lg" variant="onDark" arrow>
          {faqPage.contactCta.label}
        </ButtonLink>
      </PageHero>

      <div className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="site-container space-y-20 lg:space-y-24">
          {faqGroups.map((group, index) => (
            <section
              key={group.id}
              aria-labelledby={`faq-${group.id}`}
              className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20"
            >
              <div className="lg:sticky lg:top-32 lg:self-start">
                <p data-reveal="" className="text-brand font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2
                  id={`faq-${group.id}`}
                  data-reveal=""
                  style={{ "--i": 1 } as CSSProperties}
                  className="text-display text-ink mt-3 text-[clamp(2rem,1.4rem+2vw,3rem)]"
                >
                  {group.title}
                </h2>
              </div>
              <FaqList items={group.items} />
            </section>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
