import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArabicText } from "@/components/islamic/arabic-text";
import { InvocationActions } from "@/components/islamic/invocation-actions";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { invocationTopics } from "@/lib/data/invocation-topics";

export const dynamicParams = false;
export function generateStaticParams() { return invocationTopics.map(topic => ({ theme: topic.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ theme: string }> }): Promise<Metadata> {
  const { theme } = await params;
  const topic = invocationTopics.find(item => item.slug === theme);
  return { title: `${topic?.title ?? "Invocations"} — Invocations`, description: topic?.description, alternates: { canonical: `/invocations/${theme}` } };
}

export default async function InvocationThemePage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const topic = invocationTopics.find(item => item.slug === theme);
  if (!topic) notFound();
  return <div className="premium-container py-12 sm:py-16">
    <Link href="/invocations" className="mb-7 inline-block text-sm font-semibold text-primary underline underline-offset-4">Toutes les invocations</Link>
    <PageHeader eyebrow={`${topic.items.length} fiches · sélection documentée`} title={topic.title} description={topic.description} divider />
    <nav aria-label="Choisir une invocation" className="mb-10 flex flex-wrap gap-2">{topic.items.map(item => <a key={item.id} href={`#${item.id}`} className="rounded-full border border-gold-500/30 bg-surface px-4 py-2 text-sm text-primary transition-colors hover:bg-surface-muted">{item.title}</a>)}</nav>
    <div className="grid gap-6">{topic.items.map((item, index) => <Reveal key={item.id} delay={Math.min(index * .035, .12)}>
      <article id={item.id} className="scroll-mt-28 overflow-hidden rounded-[1.6rem] border border-gold-500/35 bg-surface shadow-[var(--shadow-editorial)]">
        <div className="h-1 bg-gradient-to-r from-emerald-900 via-gold-500 to-emerald-900" aria-hidden="true" />
        <div className="grid lg:grid-cols-[.8fr_1.2fr]">
          <div className="min-w-0 border-b border-border bg-surface-muted/50 p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="eyebrow">Fiche {String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-3 font-display text-2xl leading-tight">{item.title}</h2>
            <p className="mt-5 text-sm font-semibold text-accent-text">Contexte rapporté</p><p className="mt-2 text-sm leading-7 text-muted">{item.context}</p>
            {item.repetition && <div className="mt-5 rounded-xl border border-gold-500/30 bg-background p-4"><p className="text-sm font-semibold">Répétition établie</p><p className="mt-2 text-sm leading-6">{item.repetition}</p></div>}
            <div className="mt-6"><InvocationActions title={item.title} arabic={item.arabic} translation={item.translation} reference={item.reference} /></div>
          </div>
          <div className="min-w-0 p-6 sm:p-8">
            <p className="mb-4 text-sm text-muted">{item.textKind}</p>
            <ArabicText as="p" className="whitespace-pre-line text-pretty text-right text-[1.75rem] leading-[2.15] sm:text-[2rem]">{item.arabic}</ArabicText>
            <div className="mt-6 border-l-2 border-gold-500 pl-5"><p className="mb-2 text-sm font-semibold text-accent-text">Traduction du sens</p><p className="leading-7">{item.translation}</p></div>
            {item.note && <p className="mt-5 rounded-xl bg-surface-muted p-4 text-sm leading-6 text-muted"><strong>Note éditoriale : </strong>{item.note}</p>}
            <div className="mt-6 border-t border-border pt-4 text-sm"><p className="font-semibold">{item.reference}</p><p className="mt-1 text-muted">{item.authenticity}</p><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-primary underline underline-offset-4">Consulter le texte source</a></div>
          </div>
        </div>
      </article>
    </Reveal>)}</div>
    <p className="mt-10 max-w-3xl text-sm leading-7 text-muted">Cette collection est une sélection. La traduction du sens et les notes sont éditoriales. Les enregistrements individuels seront ajoutés après vérification de leur correspondance exacte avec chaque formule. Les chapitres audio complets sont disponibles séparément dans <Link href="/invocations#livre-audio" className="text-primary underline">le livre audio</Link>.</p>
  </div>;
}
