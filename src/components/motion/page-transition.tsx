"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
/** Opacité uniquement : un parent transformé casserait le positionnement du mini-lecteur fixe. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <div key={pathname} className="page-arrival">{children}</div>;
}
