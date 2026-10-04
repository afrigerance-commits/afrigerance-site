import type { Metadata } from "next";
import { LegalContent } from "@/components/LegalContent";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHero } from "@/components/PageHero";
import { privacyPage } from "@/content/pages";

/* Non indexée tant que le responsable de traitement et la durée de conservation ne sont pas fixés. */
export const metadata: Metadata = {
  title: privacyPage.metaTitle,
  description: privacyPage.metaDescription,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow={privacyPage.eyebrow}
        titleLead={privacyPage.titleLead}
        titleAccent={privacyPage.titleAccent}
        intro={privacyPage.intro}
        crumbs={[{ label: privacyPage.metaTitle }]}
      />
      <LegalContent sections={privacyPage.sections} contactCta={privacyPage.contactCta} warning={privacyPage.warning} />
    </PageTransition>
  );
}
