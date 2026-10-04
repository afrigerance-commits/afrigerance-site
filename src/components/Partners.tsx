import Image from "next/image";
import type { CSSProperties } from "react";
import { partners, partnersSection, type Partner } from "@/content/partners";

function LogoTile({ partner, decorative }: { partner: Partner; decorative?: boolean }) {
  const tone = partner.darkBackground ? "bg-anthracite ring-anthracite" : "bg-white ring-ink/[0.07]";
  const logo = (
    <span className="relative block size-full">
      <Image
        src={partner.logo}
        alt={decorative ? "" : partner.name}
        fill
        sizes="(min-width: 40rem) 152px, 120px"
        loading="eager"
        className="object-contain"
      />
    </span>
  );
  const tile = `relative flex h-24 w-40 shrink-0 items-center rounded-2xl p-4 ring-1 transition-[translate,box-shadow] duration-500 ease-out-expo sm:h-28 sm:w-48 sm:p-5 ${tone}`;
  if (partner.url && !decorative) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${tile} hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgb(17_19_23/0.4)]`}
      >
        {logo}
        <span className="sr-only">{partnersSection.newTab}</span>
      </a>
    );
  }
  return <span className={tile}>{logo}</span>;
}

/**
 * « Ils nous font confiance » : défilé continu des logos fournis par AFRIGÉRANCE,
 * en pause au survol ; grille fixe si l'utilisateur a demandé de réduire les animations.
 * Masquée tant qu'aucun logo n'est renseigné.
 */
export function Partners() {
  if (partners.length === 0) return null;

  return (
    <section aria-labelledby="partners-title" className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="site-container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <h2 id="partners-title" data-reveal="" className="eyebrow text-muted inline-flex items-center gap-3">
          <span aria-hidden="true" className="bg-brand/50 h-px w-8" />
          {partnersSection.title}
        </h2>
      </div>
      <div
        data-reveal="fade"
        style={{ "--marquee-duration": `${partners.length * 4.5}s` } as CSSProperties}
        className="marquee mt-8 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] sm:mt-10"
      >
        <div className="marquee-track flex w-max gap-4 sm:gap-6">
          <ul className="flex gap-4 sm:gap-6">
            {partners.map((partner) => (
              <li key={partner.name}>
                <LogoTile partner={partner} />
              </li>
            ))}
          </ul>
          <ul aria-hidden="true" className="marquee-clone flex gap-4 sm:gap-6">
            {partners.map((partner) => (
              <li key={partner.name}>
                <LogoTile partner={partner} decorative />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
