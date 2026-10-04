import type { Metadata } from "next";
import { FormAside } from "@/components/FormAside";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHero } from "@/components/PageHero";
import { quoteForm } from "@/content/forms";
import { quotePage } from "@/content/pages";
import { isPoleId } from "@/content/services";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: quotePage.metaTitle,
  description: quotePage.metaDescription,
  alternates: { canonical: routes.quote },
};

/** /devis?pole=infogerance ou /devis?pole=integration présélectionne le pôle. */
export default async function QuotePage({ searchParams }: PageProps<"/devis">) {
  const { pole } = await searchParams;
  const initialPoles = typeof pole === "string" && isPoleId(pole) ? [pole] : [];
  const aside = quotePage.aside;

  return (
    <PageTransition>
      <PageHero
        eyebrow={quotePage.eyebrow}
        titleLead={quotePage.titleLead}
        titleAccent={quotePage.titleAccent}
        intro={quotePage.intro}
        crumbs={[{ label: quotePage.eyebrow }]}
        overlap
      />
      <div className="bg-surface pb-24 sm:pb-28 lg:pb-32">
        <div className="site-container grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <section
            aria-label={quoteForm.title}
            className="relative z-10 -mt-16 rounded-[2rem] bg-white p-6 shadow-[0_40px_100px_-50px_rgb(4_11_36/0.55)] ring-1 ring-ink/[0.06] sm:-mt-20 sm:p-10 lg:-mt-28 lg:p-12"
          >
            <QuoteForm key={initialPoles.join(",")} initialPoles={initialPoles} />
          </section>
          <FormAside
            id="devis-aside-title"
            title={aside.title}
            items={aside.items}
            linkText={aside.contactText}
            link={aside.contactCta}
          />
        </div>
      </div>
    </PageTransition>
  );
}
