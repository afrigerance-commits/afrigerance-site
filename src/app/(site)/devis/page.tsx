import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { quoteForm } from "@/content/forms";
import { PageHeader } from "@/components/PageHeader";
import { quotePage } from "@/content/pages";
import { isPoleId } from "@/content/services";

export const metadata: Metadata = {
  title: quotePage.metaTitle,
  description: quotePage.metaDescription,
};

/** /devis?pole=infogerance ou /devis?pole=integration présélectionne le pôle. */
export default async function QuotePage({ searchParams }: PageProps<"/devis">) {
  const { pole } = await searchParams;
  const initialPoles = typeof pole === "string" && isPoleId(pole) ? [pole] : [];
  const aside = quotePage.aside;

  return (
    <>
      <PageHeader eyebrow={quotePage.eyebrow} title={quotePage.title} intro={quotePage.intro} />
      <div className="site-container grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:py-20 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-label={quoteForm.title} className="max-w-3xl">
          <QuoteForm key={initialPoles.join(",")} initialPoles={initialPoles} />
        </section>
        <aside aria-labelledby="devis-aside-title" className="lg:pt-2">
          <div className="bg-surface rounded-lg p-6">
            <h2 id="devis-aside-title" className="text-ink text-lg font-bold">
              {aside.title}
            </h2>
            <ul className="text-ink mt-4 list-disc space-y-3 pl-5 leading-relaxed">
              {aside.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-ink border-line mt-6 border-t pt-5">
              {aside.contactText}{" "}
              <Link
                href={aside.contactCta.href}
                className="text-brand-dark hover:text-ink rounded-sm font-semibold underline underline-offset-2"
              >
                {aside.contactCta.label}
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
