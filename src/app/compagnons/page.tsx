import type { Metadata } from "next";
import { EditorialEmpty } from "@/components/content/editorial-empty";
import { Reveal } from "@/components/motion/reveal";
import { ScholarCard } from "@/components/content/scholar-card";
import { scholars } from "@/lib/data/scholars";

export const metadata: Metadata = {
  title: "Compagnons et grandes figures",
  description: "Huit portraits introductifs de compagnons et compagnonnes, avec récits authentiques et références précises.",
  alternates: { canonical: "/compagnons" },
};

export default function CompagnonsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col gap-4 text-center">
        <span className="mx-auto text-sm font-medium text-accent-text">Compagnons et grandes figures</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Compagnons et compagnonnes</h1>
        <p className="mx-auto max-w-2xl text-muted">
          Huit portraits pour commencer à partir de récits authentiques. Chaque notice est une synthèse originale et une invitation à lire les sources, pas une biographie exhaustive.
        </p>
      </Reveal>
      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {scholars.filter((s) => s.statut === "publie").map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <ScholarCard scholar={s} />
          </Reveal>
        ))}
      </div>
      {!scholars.some((s) => s.statut === "publie") && (
        <EditorialEmpty title="Des biographies documentées, en préparation." description="Chaque notice attend une vérification des ouvrages sources avant sa publication. En attendant, explorez les recueils et les ouvrages présentés dans la bibliothèque." />
      )}
    </div>
  );
}
