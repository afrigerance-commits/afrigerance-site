import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ArabicText } from "@/components/islamic/arabic-text";
import { Badge } from "@/components/ui/badge";
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
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((c, i) => (
          <Reveal key={c.number} delay={Math.min(i * 0.015, 0.4)}>
            <Link
              href={`/coran/${c.number}`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted font-display text-sm">
                  {c.number}
                </span>
                <div>
                  <p className="font-medium">{c.nameFrench}</p>
                  <p className="text-xs text-muted">
                    {c.nameTransliteration} · {c.versesCount} versets
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <ArabicText className="text-lg text-gold-700 dark:text-gold-500">{c.nameArabic}</ArabicText>
                <Badge variant="outline" className="text-[10px]">
                  {c.revelation === "Mecca" ? "Mecquoise" : "Médinoise"}
                </Badge>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
