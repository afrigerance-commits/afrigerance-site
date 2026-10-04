import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArabicText } from "@/components/islamic/arabic-text";
import { hadithCollections } from "@/lib/hadith/data";

export const metadata: Metadata = {
  title: "Hadith",
  description: "Les recueils de hadith : Al-Muwatta' de l'imam Mâlik, Sahîh Al-Bukhârî et Sahîh Muslim, texte arabe et traduction française.",
  alternates: { canonical: "/hadith" },
};

export default function HadithPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Hadith"
        title="Les recueils de hadith"
        description="Texte arabe et traduction française, organisés par livre, avec le degré d'authenticité lorsqu'il est fourni par l'édition source."
        divider
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {hadithCollections.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06}>
            <Link href={`/hadith/${c.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col transition-all group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-md">
                <CardHeader>
                  <ArabicText className="text-xl text-gold-700 dark:text-gold-500">{c.nomArabe}</ArabicText>
                  <CardTitle>{c.nom}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4">
                  <p className="text-sm text-muted">{c.description}</p>
                  <p className="text-xs text-muted">{c.auteur}</p>
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
