import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";

import { QuranPartitionExplorer } from "@/components/islamic/quran-partition-explorer";
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
      <Reveal className="relative mx-auto mb-12 max-w-4xl overflow-hidden rounded-[1.75rem] border border-gold-500/50 bg-emerald-900 shadow-xl">
        <Image src="/images/mirath/coran_etude.webp" alt="Illustration d’un livre ouvert aux pages vierges dans une bibliothèque" width={1536} height={1024} sizes="(min-width:1024px) 900px, 90vw" className="aspect-[2.5] w-full object-cover object-center sm:aspect-[3.5]" priority />
      </Reveal>
      <nav aria-label="Mes outils coraniques" className="mb-8 flex flex-wrap gap-3">{[{ href: "/mon-suivi", label: "Objectifs et khatm" }, { href: "/coran/recherche", label: "Rechercher un verset" }, { href: "/mes-notes", label: "Mes notes" }, { href: "/hors-ligne", label: "Mes téléchargements" }].map(item => <Link key={item.href} href={item.href} className="min-h-11 rounded-full border border-accent/35 bg-surface px-5 py-3 text-sm font-semibold text-primary">{item.label}</Link>)}</nav>
      <QuranPartitionExplorer><ChapterExplorer chapters={chapters} /></QuranPartitionExplorer>
    </div>
  );
}
