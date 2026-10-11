import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock, AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SourceReferenceList } from "@/components/islamic/source-reference";
import { LessonReview } from "@/components/learning/lesson-review";
import { Badge } from "@/components/ui/badge";
import { siraEvents, getSiraEvent, SIRA_PATH, siraLessonSlugs } from "@/lib/data/sira";

export function generateStaticParams() {
  return siraEvents.filter(event => event.statut === "publie").map(event => ({ slug: event.slug }));
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
  const index = siraEvents.findIndex(chapter => chapter.slug === slug);
  const previous = siraEvents[index - 1];
  const next = siraEvents[index + 1];
  const lesson = event.lesson;
  return <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
    <Link href="/sira" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-primary"><ArrowLeft className="size-4" aria-hidden="true" /> Tous les chapitres de la Sîra</Link>
    <Reveal className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2"><Badge variant="outline">{event.periode}</Badge><span className="text-xs font-semibold text-accent-text">Chapitre {index + 1} / {siraEvents.length}</span></div>
      <h1 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">{event.titre}</h1>
      <p className="text-sm text-muted">{event.dateApproximative}</p>
      <p className="inline-flex items-center gap-2 text-sm text-muted"><Clock className="size-4" aria-hidden="true" />{lesson.minutes} min avec les exercices</p>
      <p className="max-w-3xl text-lg leading-8 text-foreground/90">{lesson.objectif}</p>
    </Reveal>
    <nav aria-label="Sommaire du chapitre" className="my-8 rounded-2xl border border-accent/30 bg-surface p-5 sm:p-6">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold"><BookOpen className="size-4 text-accent-text" aria-hidden="true" /> Dans ce chapitre</p>
      <ol className="space-y-1">{lesson.sections.map((section, sectionIndex) => <li key={section.titre}><a href={`#section-${sectionIndex + 1}`} className="block min-h-11 py-2 text-sm leading-7 text-primary hover:underline">{String(sectionIndex + 1).padStart(2, "0")} · {section.titre}</a></li>)}</ol>
      <div className="mt-3 flex flex-wrap gap-x-5 border-t border-border pt-3 text-sm text-primary"><a href="#retenir" className="min-h-11 py-2 hover:underline">À retenir</a><a href="#exercice" className="min-h-11 py-2 hover:underline">Exercice</a><a href="#sources" className="min-h-11 py-2 hover:underline">Sources</a><a href="#review-title" className="min-h-11 py-2 hover:underline">Quiz corrigé</a></div>
    </nav>
    <p className="mb-8 text-xs font-medium uppercase tracking-widest text-accent-text">Rédaction originale · récits reformulés · commentaires identifiés</p>
    <div className="mx-auto max-w-3xl space-y-12">{lesson.sections.map((section, sectionIndex) => <section key={section.titre} id={`section-${sectionIndex + 1}`} className="scroll-mt-28">
      <h2 className="mb-5 font-display text-2xl font-semibold sm:text-3xl">{section.titre}</h2>
      <div className="space-y-5">{section.paragraphes.map(paragraph => <p key={paragraph} className="text-base leading-8 text-foreground/90 sm:text-lg sm:leading-9">{paragraph}</p>)}</div>
    </section>)}</div>
    <aside className="mt-12 rounded-2xl border border-accent/40 bg-accent/5 p-5 sm:p-6" aria-labelledby="vigilance-title">
      <h2 id="vigilance-title" className="flex items-center gap-2 font-semibold"><AlertTriangle className="size-4 shrink-0 text-accent-text" aria-hidden="true" /> Portée des sources et points à approfondir</h2>
      <p className="mt-3 text-sm leading-7 text-muted">{event.vigilance}</p>
    </aside>
    <section id="retenir" className="mt-10 scroll-mt-28 rounded-2xl border border-border bg-surface p-5 sm:p-7"><h2 className="font-display text-2xl">À retenir</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-7">{lesson.retenir.map(point => <li key={point}>{point}</li>)}</ul></section>
    <section id="exercice" className="mt-10 scroll-mt-28"><h2 className="font-display text-2xl">Exercice de lecture</h2><p className="mt-4 text-base leading-8">{lesson.exercice}</p><details className="mt-4 rounded-xl border border-border bg-surface p-4"><summary className="cursor-pointer py-2 font-medium text-primary">Afficher une proposition de correction</summary><p className="mt-3 text-base leading-8">{lesson.correction}</p></details></section>
    <section id="sources" className="mt-12 scroll-mt-28 border-t border-border pt-8"><h2 className="mb-4 font-display text-2xl">Références consultables</h2><p className="mb-5 text-sm leading-7 text-muted">Références contrôlées pour cette rédaction le 11 octobre 2026. Les synthèses ne sont pas des citations intégrales. Une vérification documentaire ne constitue pas une validation par un comité savant.</p><SourceReferenceList sources={event.sources} /></section>
    <LessonReview key={slug} path={SIRA_PATH} lesson={slug} allowed={siraLessonSlugs} questions={lesson.questions} />
    <nav aria-label="Chapitres du parcours" className="mt-12 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
      {previous ? <Link href={`/sira/${previous.slug}`} className="flex min-h-16 items-start gap-3 rounded-xl border border-border p-4 text-sm text-primary hover:border-accent"><ArrowLeft className="mt-1 size-4 shrink-0" aria-hidden="true" /><span><span className="block text-xs text-muted">Chapitre précédent</span><span className="mt-1 block font-medium">{previous.titre}</span></span></Link> : <span />}
      {next ? <Link href={`/sira/${next.slug}`} className="flex min-h-16 items-start justify-between gap-3 rounded-xl border border-accent/30 bg-surface p-4 text-sm text-primary hover:border-accent"><span><span className="block text-xs text-muted">Chapitre suivant</span><span className="mt-1 block font-medium">{next.titre}</span></span><ArrowRight className="mt-1 size-4 shrink-0" aria-hidden="true" /></Link> : <Link href="/sira" className="flex min-h-16 items-center gap-2 rounded-xl border border-accent/30 bg-surface p-4 text-sm font-medium text-primary">Revoir le parcours <ArrowRight className="size-4" aria-hidden="true" /></Link>}
    </nav>
  </article>;
}
