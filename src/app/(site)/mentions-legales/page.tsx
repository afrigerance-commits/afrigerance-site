import type { Metadata } from "next";
import { LegalContent } from "@/components/LegalContent";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHero } from "@/components/PageHero";
import { legalPage } from "@/content/pages";

/* Non indexée tant que les informations officielles de l'entreprise ne sont pas publiées. */
export const metadata: Metadata = {
  title: legalPage.metaTitle,
  robots: { index: false, follow: true },
};

export default function LegalPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow={legalPage.eyebrow}
        titleLead={legalPage.titleLead}
        titleAccent={legalPage.titleAccent}
        intro={legalPage.intro}
        crumbs={[{ label: legalPage.metaTitle }]}
      />
      <LegalContent sections={legalPage.sections} contactCta={legalPage.contactCta} />
    </PageTransition>
  );
}
