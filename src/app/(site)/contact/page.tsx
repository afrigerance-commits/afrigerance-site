import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ContactDetailsList } from "@/components/ContactDetailsList";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHero } from "@/components/PageHero";
import { ButtonArrow } from "@/components/ui/button";
import { contactPage } from "@/content/pages";
import { hasContactDetails, routes } from "@/content/site";

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  alternates: { canonical: routes.contact },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow={contactPage.eyebrow}
        titleLead={contactPage.titleLead}
        titleAccent={contactPage.titleAccent}
        intro={contactPage.intro}
        crumbs={[{ label: contactPage.eyebrow }]}
        overlap
      />

      <section className="bg-surface pb-24 sm:pb-28 lg:pb-32">
        <div className="site-container grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
          <div className="relative z-10 -mt-16 rounded-[2rem] bg-white p-6 shadow-[0_40px_100px_-50px_rgb(17_19_23/0.55)] ring-1 ring-ink/[0.06] sm:-mt-20 sm:p-10 lg:-mt-28 lg:p-12">
            <ContactForm />
          </div>

          <aside className="space-y-6 lg:pt-12">
            {hasContactDetails() ? (
              <div data-reveal="" className="rounded-[2rem] bg-white p-7 ring-1 ring-ink/[0.06] sm:p-8">
                <h2 className="text-display text-ink text-2xl">{contactPage.details.title}</h2>
                <div className="mt-6">
                  <ContactDetailsList />
                </div>
              </div>
            ) : null}
            <div>
              <h2 data-reveal="" className="eyebrow text-muted">
                {contactPage.shortcuts.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {contactPage.shortcuts.items.map((item, index) => (
                  <li key={item.href} data-reveal="" style={{ "--i": index } as CSSProperties}>
                    <Link
                      href={item.href}
                      data-spotlight=""
                      className="spotlight group/button flex items-center justify-between gap-6 rounded-3xl bg-white p-6 ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-700 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-36px_rgb(34_89_140/0.55)]"
                    >
                      <span>
                        <span className="text-ink block text-lg font-semibold tracking-[-0.01em]">{item.title}</span>
                        <span className="text-muted mt-1 block leading-relaxed">{item.text}</span>
                      </span>
                      <span className="bg-surface text-ink group-hover/button:bg-brand flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 group-hover/button:text-white">
                        <ButtonArrow className="size-4 [&>svg]:size-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}
