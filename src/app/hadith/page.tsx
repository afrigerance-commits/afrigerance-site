import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArabicText } from "@/components/islamic/arabic-text";
import { SavedHadiths } from "@/components/islamic/hadith-actions";
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
      <Reveal className="mx-auto mb-12 max-w-4xl overflow-hidden rounded-[1.75rem] border border-gold-500/40 bg-emerald-900 shadow-xl">
        <Image
          src="/images/mirath/hadith_etude.webp"
          alt="Illustration de livres sans titres sur une table d’étude."
          width={1536}
          height={1024}
          sizes="(min-width:1024px) 900px, 90vw"
          className="aspect-[2.7] w-full object-cover sm:aspect-[3.6]"
          priority
        />
      </Reveal>
      <SavedHadiths />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {hadithCollections.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06}>
            <Link href={`/hadith/${c.slug}`} className="group block h-full">
              <Card className="relative flex h-full flex-col overflow-hidden border-gold-500/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-xl">
                <div className="h-1 w-full bg-gradient-to-r from-emerald-900 via-gold-500 to-emerald-900" aria-hidden="true" />
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
