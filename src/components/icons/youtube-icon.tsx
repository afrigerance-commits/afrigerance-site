import type { SVGProps } from "react";

/**
 * Pictogramme générique "lecture vidéo" utilisé pour les liens YouTube.
 * lucide-react n’inclut plus d’icônes de marques : ce glyphe simple évite
 * toute dépendance supplémentaire pour un seul usage.
 */
export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" />
    </svg>
  );
}
