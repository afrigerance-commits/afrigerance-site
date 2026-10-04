import type { ReactNode } from "react";
import { uiText } from "@/content/site";
import { MotionRoot } from "./motion/MotionRoot";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Structure commune des pages publiques : lien d'évitement, en-tête, contenu, pied de page. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#contenu"
        className="bg-brand sr-only z-50 rounded-full px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {uiText.skipLink}
      </a>
      <SiteHeader />
      <main id="contenu" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
      <MotionRoot />
    </>
  );
}
