import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { notFoundPage } from "@/content/pages";
import { routes, uiText } from "@/content/site";

export const metadata: Metadata = {
  title: uiText.notFound.title,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <section aria-labelledby="page-title" className="bg-hero grain on-dark relative isolate overflow-hidden text-white">
        <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-24 -z-10 hidden w-[min(34rem,90vw)] opacity-25 lg:block">
          <Image src="/accueil/afrique.svg" alt="" width={710} height={737} className="h-auto w-full" />
        </div>
        <div className="site-container pt-36 pb-24 sm:pt-44 sm:pb-32 lg:pt-52 lg:pb-40">
          <p className="eyebrow text-white load-rise" style={{ "--i": 0 } as CSSProperties}>
            {uiText.notFound.eyebrow}
          </p>
          <h1 id="page-title" className="text-display load-rise mt-6 max-w-[12ch] text-[clamp(2.75rem,1.4rem+5vw,6rem)]" style={{ "--i": 1 } as CSSProperties}>
            {uiText.notFound.title}
          </h1>
          <p className="text-white load-rise mt-7 max-w-[34em] text-lg leading-relaxed sm:text-xl" style={{ "--i": 2 } as CSSProperties}>
            {uiText.notFound.text}
          </p>
          <div className="load-rise mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={{ "--i": 3 } as CSSProperties}>
            <ButtonLink href={routes.home} size="lg" variant="light" arrow>
              {uiText.backHome}
            </ButtonLink>
            {notFoundPage.links.slice(1).map((link) => (
              <TextLink key={link.href} href={link.href} tone="light" className="sm:ml-3">
                {link.label}
              </TextLink>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
