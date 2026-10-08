import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { EditorialStatusBadge, DemoBadge } from "@/components/islamic/reliability-badge";
import { SourceReferenceList } from "@/components/islamic/source-reference";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { siraEvents, getSiraEvent } from "@/lib/data/sira";

export function generateStaticParams() {
  return siraEvents.filter((e) => e.statut === "publie").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sira/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = getSiraEvent(slug);
  if (!event) return {};
  return { title: event.titre, description: event.presentation, alternates: { canonical: `/sira/${slug}` } };
}

export default async function SiraEventPage({ params }: PageProps<"/sira/[slug]">) {
  const { slug } = await params;
  const event = getSiraEvent(slug);
  if (!event) notFound();
  const next = event.evenementSuivantSlug ? getSiraEvent(event.evenementSuivantSlug) : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/sira" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Sîra prophétique
      </Link>

      <Reveal className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{event.periode}</Badge>
          <EditorialStatusBadge status={event.statut} />
          {event.demonstration && <DemoBadge />}
        </div>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{event.titre}</h1>
        <p className="text-sm text-muted">{event.dateApproximative}</p>
        {event.localisation && (
          <p className="inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4" /> {event.localisation}
          </p>
        )}
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-col gap-6">
        <p className="text-xs font-medium uppercase tracking-widest text-accent-text">Synthèse originale — pas une citation littérale</p><p className="text-lg leading-8 text-foreground/90">{event.presentation}</p>
        <p className="text-foreground/90">{event.contexte}</p>
      </Reveal>

      {event.recits.length > 0 && (
        <section className="mt-10 flex flex-col gap-4">
          <h2 className="font-display text-lg font-semibold">Commentaire pédagogique</h2>
          {event.recits.map((recit, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4"
            >
              <p className="text-sm text-foreground/90">{recit.texte}</p>
              {recit.statutAuthenticite !== "etabli" && (
                <span className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {recit.statutAuthenticite === "discute" ? "Authenticité discutée selon les sources" : "Détails à vérifier"}
                </span>
              )}
            </div>
          ))}
        </section>
      )}

      <Separator className="my-12" />

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold">Sources</h2>
        <SourceReferenceList sources={event.sources} />
      </section>

      {next && (
        <div className="mt-14 flex items-center justify-end border-t border-border pt-6">
          <Link href={`/sira/${next.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            Événement suivant : {next.titre} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
