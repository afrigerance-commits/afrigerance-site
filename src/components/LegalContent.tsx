import type { CSSProperties, ReactNode } from "react";
import { TextLink } from "./ui/button";

type LegalSection = { title: string; text: string };

/** Corps des pages légales : sections numérotées, lien de contact, avertissement facultatif. */
export function LegalContent({
  sections,
  contactCta,
  warning,
}: {
  sections: readonly LegalSection[];
  contactCta: { label: string; href: string };
  warning?: ReactNode;
}) {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="site-container grid gap-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
        <div aria-hidden="true" className="hidden lg:block" />
        <div className="max-w-[46rem]">
          <ol className="border-line border-t">
            {sections.map((section, index) => (
              <li
                key={section.title}
                data-reveal=""
                style={{ "--i": index } as CSSProperties}
                className="border-line grid gap-3 border-b py-8 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="text-brand font-mono text-sm sm:pt-1.5">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-display text-ink text-2xl sm:text-[1.75rem]">{section.title}</h2>
                  <p className="text-muted mt-3 text-[1.0625rem] leading-relaxed">{section.text}</p>
                </div>
              </li>
            ))}
          </ol>
          {warning ? (
            <p data-reveal="" className="bg-warning-bg text-warning mt-8 rounded-2xl p-5 font-medium">
              {warning}
            </p>
          ) : null}
          <div data-reveal="" className="mt-8">
            <TextLink href={contactCta.href}>{contactCta.label}</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
