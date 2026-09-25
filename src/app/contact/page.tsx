import type { Metadata } from "next";
import { ContactDetailsList } from "@/components/ContactDetailsList";
import { ContactForm } from "@/components/forms/ContactForm";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/button";
import { contactPage } from "@/content/pages";

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow={contactPage.eyebrow} title={contactPage.title} intro={contactPage.intro} />
      <div className="site-container grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:py-20">
        <div className="space-y-10">
          <section aria-labelledby="details-title">
            <h2
              id="details-title"
              className="text-ink text-[clamp(1.75rem,1.4rem+1.2vw,2.25rem)] leading-tight font-bold tracking-[-0.025em]"
            >
              {contactPage.details.title}
            </h2>
            <div className="mt-6">
              <ContactDetailsList />
            </div>
          </section>
          <section aria-labelledby="quote-cta-title" className="bg-surface rounded-lg p-6 sm:p-8">
            <h2 id="quote-cta-title" className="text-ink text-xl font-bold">
              {contactPage.quote.title}
            </h2>
            <p className="text-muted mt-2 leading-relaxed">{contactPage.quote.text}</p>
            <ButtonLink href={contactPage.quote.cta.href} className="mt-5">
              {contactPage.quote.cta.label}
              <ArrowUpRightIcon className="size-5" />
            </ButtonLink>
          </section>
        </div>
        <section aria-label={contactPage.metaTitle}>
          <ContactForm />
        </section>
      </div>
    </>
  );
}
