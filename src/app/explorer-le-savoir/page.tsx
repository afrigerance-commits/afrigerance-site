import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { DisciplineCard } from "@/components/content/discipline-card";
import { disciplines } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Explorer le savoir",
  description: "Les douze sciences islamiques enseignées sur la plateforme, organisées par thème et par niveau.",
  alternates: { canonical: "/explorer-le-savoir" },
};

export default function ExplorerLeSavoirPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="mx-auto mb-14 flex max-w-2xl flex-col gap-4 text-center">
        <span className="mx-auto text-sm font-medium text-accent">Explorer le savoir</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Les sciences islamiques</h1>
        <p className="text-muted">
          Chaque discipline possède sa propre collection de ressources : cours, articles, livres et vidéos, classés
          par thème, niveau et format.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {disciplines.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.04}>
            <DisciplineCard discipline={d} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
