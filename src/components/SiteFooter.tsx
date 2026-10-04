import Link from "next/link";
import type { CSSProperties } from "react";
import { footer, uiText } from "@/content/site";
import { Logo } from "./Logo";
import { ButtonLink, TextLink } from "./ui/button";

/**
 * Pied de page en deux temps : un appel final sur fond sombre (« Parlons de votre projet »),
 * puis les liens sur fond clair, où le logo d'origine reste lisible.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <section aria-labelledby="footer-cta-title" className="bg-night grain on-dark relative isolate overflow-hidden text-white">
        <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -bottom-56 -z-10 size-[38rem] rounded-full bg-brand/30 blur-[120px]"
        />
        <div className="site-container py-20 sm:py-24 lg:py-32">
          <p className="eyebrow text-sky-soft" data-reveal="">
            {footer.eyebrow}
          </p>
          <h2
            id="footer-cta-title"
            data-reveal=""
            style={{ "--i": 1 } as CSSProperties}
            className="text-display mt-6 max-w-[12ch] text-[clamp(2.75rem,1.2rem+6.4vw,7rem)]"
          >
            {footer.titleLead} <span className="accent-serif text-sky">{footer.titleAccent}</span>
          </h2>
          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <p data-reveal="" style={{ "--i": 2 } as CSSProperties} className="text-sky-soft max-w-[34em] text-lg leading-relaxed sm:text-xl">
              {footer.text}
            </p>
            <div data-reveal="" style={{ "--i": 3 } as CSSProperties} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href={footer.primaryCta.href} size="lg" arrow magnetic>
                {footer.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={footer.secondaryCta.href} size="lg" variant="onDark">
                {footer.secondaryCta.label}
              </ButtonLink>
              <TextLink href={footer.tertiaryCta.href} tone="light" className="justify-center sm:ml-2">
                {footer.tertiaryCta.label}
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="site-container grid gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <Logo width={210} className="h-14 sm:h-16" />
            <p className="text-muted mt-5 max-w-[22em] leading-relaxed">{footer.about}</p>
          </div>
          <nav aria-label={uiText.footerNavLabel} className="grid gap-10 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="eyebrow text-muted">{column.title}</h2>
                <ul className="mt-4 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-ink hover:text-brand inline-flex min-h-11 items-center rounded-sm py-1 font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="border-line border-t">
          <div className="site-container text-muted flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p>{footer.copyright(year)}</p>
            <nav aria-label={uiText.legalNavLabel}>
              <ul className="flex flex-wrap gap-x-6 gap-y-1">
                {footer.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-ink inline-flex min-h-11 items-center rounded-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
