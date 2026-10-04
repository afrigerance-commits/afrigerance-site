import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { AudienceGrid } from "@/components/home/AudienceGrid";
import { HomeHero } from "@/components/home/HomeHero";
import { MethodTimeline } from "@/components/home/MethodTimeline";
import { PoleShowcase } from "@/components/home/PoleShowcase";
import { PageTransition } from "@/components/motion/PageTransition";
import { Partners } from "@/components/Partners";
import { TextLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems, homeFaqIds } from "@/content/faq";
import { homeFaq } from "@/content/home";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} — Infogérance et intégration de solutions technologiques au Sénégal`,
  },
  description:
    "AFRIGÉRANCE accompagne les entreprises, établissements et particuliers au Sénégal : gestion du parc informatique, support, cybersécurité, câblage réseau, vidéosurveillance, contrôle d’accès et sécurité incendie.",
  alternates: { canonical: "/" },
};

/** Données structurées de l'organisation : nom, description et signature, sans adresse ni avis non confirmés. */
function organizationData() {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    ...(base ? { url: base.origin, logo: new URL("/icon.png", base).toString() } : {}),
  };
}

export default function HomePage() {
  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData()).replace(/</g, "\\u003c") }}
      />
      <HomeHero />
      <Partners />
      <PoleShowcase />
      <MethodTimeline />
      <AudienceGrid />
      <section aria-labelledby="home-faq-title" className="bg-surface py-24 sm:py-28 lg:py-36">
        <div className="site-container grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="home-faq-title"
              eyebrow={homeFaq.eyebrow}
              titleLead={homeFaq.titleLead}
              titleAccent={homeFaq.titleAccent}
            />
            <div data-reveal="" className="mt-8">
              <TextLink href={homeFaq.allHref}>{homeFaq.allLabel}</TextLink>
            </div>
          </div>
          <FaqList items={faqItems(homeFaqIds)} />
        </div>
      </section>
    </PageTransition>
  );
}
