import { closingCta } from "@/content/pages";
import { ArrowUpRightIcon } from "./icons";
import { ButtonLink } from "./ui/button";

/** Appel à l'action de fin de page : devis et contact. */
export function ClosingCta() {
  return (
    <section aria-labelledby="closing-cta-title" className="border-line border-t bg-white">
      <div className="site-container flex flex-col gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="max-w-[34em]">
          <h2
            id="closing-cta-title"
            className="text-ink text-[clamp(1.875rem,1.4rem+1.6vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.03em]"
          >
            {closingCta.title}
          </h2>
          <p className="text-muted mt-4 text-lg leading-relaxed sm:text-xl">{closingCta.text}</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row lg:shrink-0">
          <ButtonLink href={closingCta.primaryCta.href} size="lg">
            {closingCta.primaryCta.label}
            <ArrowUpRightIcon className="size-5" />
          </ButtonLink>
          <ButtonLink href={closingCta.secondaryCta.href} variant="secondary" size="lg">
            {closingCta.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
