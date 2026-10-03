import Image from "next/image";
import { partners, partnersSection, type Partner } from "@/content/partners";

const tileClass = "relative block h-24 w-36 rounded-lg border p-4 sm:h-28 sm:w-44 sm:p-5";

function Logo({ partner }: { partner: Partner }) {
  return (
    <span className="relative block size-full">
      <Image src={partner.logo} alt={partner.name} fill sizes="(min-width: 40rem) 136px, 112px" className="object-contain" />
    </span>
  );
}

/** Logos des organisations qui ont fait confiance à AFRIGÉRANCE. Masquée tant qu'aucun logo n'est renseigné. */
export function Partners() {
  if (partners.length === 0) return null;

  return (
    <section aria-labelledby="partners-title" className="border-line bg-surface border-t">
      <div className="site-container py-12 sm:py-14 lg:py-16">
        <h2
          id="partners-title"
          className="text-muted text-center text-sm font-semibold tracking-[0.12em] uppercase sm:text-base"
        >
          {partnersSection.title}
        </h2>
        <ul className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-10 sm:gap-6">
          {partners.map((partner) => {
            const tone = partner.darkBackground ? "border-ink bg-ink" : "border-line bg-white";
            return (
              <li key={partner.name}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${tileClass} ${tone} hover:border-brand transition-colors`}
                  >
                    <Logo partner={partner} />
                    <span className="sr-only">{partnersSection.newTab}</span>
                  </a>
                ) : (
                  <span className={`${tileClass} ${tone}`}>
                    <Logo partner={partner} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
