import Image from "next/image";
import { partners, partnersSection } from "@/content/partners";

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
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:mt-10 sm:gap-x-14 lg:gap-x-16">
          {partners.map((partner) => {
            const logo = (
              <span className="relative block h-14 w-32 sm:h-16 sm:w-40">
                <Image src={partner.logo} alt={partner.name} fill sizes="160px" className="object-contain" />
              </span>
            );
            return (
              <li key={partner.name}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md transition-opacity hover:opacity-80"
                  >
                    {logo}
                    <span className="sr-only">{partnersSection.newTab}</span>
                  </a>
                ) : (
                  logo
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
