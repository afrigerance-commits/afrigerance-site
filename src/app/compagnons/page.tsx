import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ScholarCard } from "@/components/content/scholar-card";
import { scholars } from "@/lib/data/scholars";

export const metadata: Metadata = {
  title: "Compagnons et grandes figures",
  description: "Une encyclopédie des compagnons, compagnonnes, tâbi’ûn, imams et savants de l’Islam.",
  alternates: { canonical: "/compagnons" },
};

export default function CompagnonsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col gap-4 text-center">
        <span className="mx-auto text-sm font-medium text-accent">Compagnons et grandes figures</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Une encyclopédie vivante</h1>
        <p className="mx-auto max-w-2xl text-muted">
          Compagnons, compagnonnes, tâbi’ûn, imams et savants qui ont transmis et préservé le savoir islamique.
        </p>
      </Reveal>
      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {scholars.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <ScholarCard scholar={s} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
