import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ArabicText } from "@/components/islamic/arabic-text";
import { EditorialStatusBadge, DemoBadge } from "@/components/islamic/reliability-badge";
import { SourceReferenceList } from "@/components/islamic/source-reference";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { scholars, getScholar } from "@/lib/data/scholars";

const categorieLabel = {
  compagnon: "Compagnon",
  compagnonne: "Compagnonne",
  tabiun: "Tâbi’î",
  imam: "Imam",
  savant: "Savant",
} as const;

export function generateStaticParams() {
  return scholars.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/compagnons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const scholar = getScholar(slug);
  if (!scholar) return {};
  return {
    title: scholar.transcriptionFrancaise,
    description: scholar.presentation,
    alternates: { canonical: `/compagnons/${slug}` },
  };
}

export default async function ScholarPage({ params }: PageProps<"/compagnons/[slug]">) {
  const { slug } = await params;
  const scholar = getScholar(slug);
  if (!scholar) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/compagnons" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Compagnons et grandes figures
      </Link>

      <Reveal className="flex flex-col items-center gap-4 text-center">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="text-2xl">{scholar.transcriptionFrancaise.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="outline">{categorieLabel[scholar.categorie]}</Badge>
          <EditorialStatusBadge status={scholar.statut} />
          {scholar.demonstration && <DemoBadge />}
        </div>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{scholar.transcriptionFrancaise}</h1>
        <ArabicText className="text-2xl text-gold-600 dark:text-gold-500">{scholar.nomArabe}</ArabicText>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <p className="text-lg text-foreground/90">{scholar.presentation}</p>
      </Reveal>

      <section className="mt-12">
        <h2 className="mb-4 font-display text-lg font-semibold">Chronologie</h2>
        <ol className="flex flex-col gap-3 border-l border-border pl-6">
          {scholar.chronologie.map((item, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[1.65rem] top-1 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
              <p className="text-sm font-medium">{item.date}</p>
              <p className="text-sm text-muted">{item.evenement}</p>
            </li>
          ))}
        </ol>
      </section>

      <Separator className="my-12" />

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold">Sources</h2>
        <SourceReferenceList sources={scholar.sources} />
      </section>
    </div>
  );
}
