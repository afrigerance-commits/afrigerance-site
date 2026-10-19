import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";

import { QuranPartitionExplorer } from "@/components/islamic/quran-partition-explorer";
import { QuranLanguageSelector } from "@/components/islamic/quran-language-selector";
import { ChapterExplorer } from "@/components/islamic/chapter-explorer";
import { getChapters } from "@/lib/quran/data";

export const metadata: Metadata = {
  title: "Le Coran",
  description:
    "Le texte intégral du Coran : calligraphie uthmani (Hafs) et traduction française de Muhammad Hamidullah, sourate par sourate.",
  alternates: { canonical: "/coran" },
};

export default function CoranPage() {
  const chapters = getChapters();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Coran et Tafsîr"
        title="Le Coran"
        description="Texte uthmani (lecture de Hafs) et traduction française de Muhammad Hamidullah, les deux diffusés par le projet Tanzil."
        divider
      />

      <nav aria-label="Mes outils coraniques" className="mb-8 flex flex-wrap gap-3"><Link href="/coran/lecture/page/1" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Ouvrir le mushaf</Link>{[{ href: "/mon-suivi", label: "Objectifs et khatm" }, { href: "/coran/recherche", label: "Rechercher un verset" }, { href: "/mes-notes", label: "Mes notes" }, { href: "/hors-ligne", label: "Mes téléchargements" }].map(item => <Link key={item.href} href={item.href} className="min-h-11 rounded-full border border-accent/35 bg-surface px-5 py-3 text-sm font-semibold text-primary">{item.label}</Link>)}</nav>
      <details className="atelier-preferences mb-8"><summary>Personnaliser ma lecture · langue d’affichage</summary><div className="pt-4"><QuranLanguageSelector /></div></details>
      <QuranPartitionExplorer><ChapterExplorer chapters={chapters} /></QuranPartitionExplorer>
    </div>
  );
}
