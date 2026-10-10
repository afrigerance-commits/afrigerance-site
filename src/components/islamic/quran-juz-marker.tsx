import Link from "next/link";

/** Editorial landmark outside the Quran text, using existing Tanzil boundaries. */
export function QuranJuzMarker({ number, kind }: { number: number; kind: "start" | "end" | "continued" }) {
  const label = kind === "end" ? "Fin du Juz" : kind === "continued" ? "Suite du Juz" : "Début du Juz";
  return <div className="quran-juz-marker my-4 flex items-center gap-3 px-2 sm:px-4">
    <span aria-hidden="true" className="h-px min-w-2 flex-1 bg-gradient-to-r from-transparent to-accent/45" />
    <Link href={`/coran/lecture/juz/${number}`} className="rounded-full border border-accent/35 bg-background px-4 py-2 text-xs font-semibold tracking-wide text-accent-text transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-accent">
      {label} {number} <span className="sr-only">— lire ce Juz</span>
    </Link>
    <span aria-hidden="true" className="h-px min-w-2 flex-1 bg-gradient-to-l from-transparent to-accent/45" />
  </div>;
}
