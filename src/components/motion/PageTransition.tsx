import { ViewTransition, type ReactNode } from "react";

/**
 * Transition entre les pages (fondu et léger glissement, voir globals.css « .page »).
 * À placer dans chaque page, pas dans un layout : un layout persiste entre les navigations.
 * Sans prise en charge du navigateur, la page s'affiche simplement.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
