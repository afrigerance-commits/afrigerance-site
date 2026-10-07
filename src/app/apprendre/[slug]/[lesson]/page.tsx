import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonReview } from "@/components/learning/lesson-review";
import { learningPaths, getLearningPath } from "@/lib/data/learning-paths";
import { debtHadiths } from "@/lib/data/invocations";
import { getChapterVerses } from "@/lib/quran/data";

export function generateStaticParams() { return learningPaths.flatMap(path => path.lessons.map(lesson => ({ slug: path.slug, lesson: lesson.slug }))); }
export async function generateMetadata({ params }: PageProps<"/apprendre/[slug]/[lesson]">): Promise<Metadata> {
  const { slug, lesson: id } = await params; const lesson = getLearningPath(slug)?.lessons.find(item => item.slug === id);
  return lesson ? { title: lesson.titre, description: lesson.objectif, alternates: { canonical: `/apprendre/${slug}/${id}` } } : {};
}
export default async function LessonPage({ params }: PageProps<"/apprendre/[slug]/[lesson]">) {
  const { slug, lesson: id } = await params;
  const path = getLearningPath(slug); const lesson = path?.lessons.find(item => item.slug === id);
  if (!path || !lesson) notFound();
  const index = path.lessons.indexOf(lesson); const next = path.lessons[index + 1]; const previous = path.lessons[index - 1];
  const verses = lesson.quranVerses ? getChapterVerses(lesson.quranVerses.chapter).filter(verse => lesson.quranVerses!.verses.includes(verse.number)) : [];
  const hadiths = (lesson.hadithIds || []).map(id => debtHadiths.find(item => item.id === id)).filter(item => !!item);
  return <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
    <nav aria-label="Fil d’Ariane" className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-primary"><Link href="/apprendre" className="editorial-link py-2">Apprendre</Link><span aria-hidden="true" className="py-2 text-muted">/</span><Link href={`/apprendre/${slug}`} className="editorial-link py-2">{path.titre}</Link></nav>
    <header className="mt-6 border-b border-accent/30 pb-7"><p className="eyebrow">Leçon {index + 1} sur {path.lessons.length} · {lesson.minutes} min</p><h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{lesson.titre}</h1><p className="mt-5 text-lg leading-8 text-muted">{lesson.objectif}</p></header>
    {verses.length > 0 && <section aria-labelledby="text-title" className="mt-8 rounded-3xl border border-accent/30 bg-surface p-5 sm:p-8"><h2 id="text-title" className="font-display text-2xl">Texte coranique · Al-Fâtiha</h2><p className="mt-2 text-sm leading-6 text-muted">Édition Hafs diffusée par Tanzil · traduction du sens : Muhammad Hamidullah</p><div className="mt-5 divide-y divide-border">{verses.map(verse => <div key={verse.number} className="py-5"><p className="text-xs text-accent-text">Coran 1:{verse.number}</p><p lang="ar" dir="rtl" className="quran-quote mt-3 text-right text-3xl text-primary sm:text-4xl">{verse.arabic}</p><p className="mt-4 text-base leading-8">{verse.french}</p></div>)}</div></section>}
    {hadiths.map(hadith => <section key={hadith.id} className="mt-8 rounded-3xl border border-accent/30 bg-surface p-5 sm:p-8"><h2 className="font-display text-2xl">{hadith.reference}</h2><p className="mt-2 text-sm text-accent-text">{hadith.authenticity}</p><p className="mt-3 text-sm text-muted">Parole prophétique{hadith.note ? " · passage cité" : ""}</p><p lang="ar" dir="rtl" className="mt-4 text-right font-arabic text-3xl leading-[2] text-primary">{hadith.arabic}</p><p className="mt-5 text-xs font-semibold uppercase tracking-wider text-accent-text">Traduction du sens · MIRÂTH</p><p className="mt-2 text-base leading-8">{hadith.translation}</p>{hadith.note && <p className="mt-4 text-sm leading-7 text-muted">{hadith.note}</p>}<a href={hadith.sourceUrl} target="_blank" rel="noopener noreferrer" className="editorial-link mt-4 inline-block py-3 text-sm font-semibold text-primary">Consulter le texte à sa source</a></section>)}
    <article className="mt-10"><p className="eyebrow">Accompagnement pédagogique · MIRÂTH</p>{lesson.sections.map(section => <section key={section.titre} className="mt-7"><h2 className="font-display text-2xl sm:text-3xl">{section.titre}</h2>{section.paragraphes.map(paragraph => <p key={paragraph} className="mt-4 max-w-[70ch] text-base leading-8 text-foreground/90">{paragraph}</p>)}</section>)}</article>
    <section className="mt-8 rounded-2xl border-l-4 border-accent bg-accent/10 p-5 sm:p-7"><h2 className="font-display text-2xl">À retenir</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7">{lesson.retenir.map(point => <li key={point}>{point}</li>)}</ul></section>
    <section className="mt-8"><h2 className="font-display text-2xl">À vous de réfléchir</h2><p className="mt-3 text-base leading-8">{lesson.exercice}</p><details className="mt-4 rounded-xl border border-border bg-surface p-4"><summary className="min-h-11 cursor-pointer py-2 font-semibold text-primary">Voir la proposition de correction</summary><p className="mt-3 text-base leading-8">{lesson.correction}</p></details></section>
    <LessonReview path={slug} lesson={id} allowed={path.lessons.map(item => item.slug)} questions={lesson.questions} next={next ? { href: `/apprendre/${slug}/${next.slug}`, titre: next.titre } : undefined} />
    <section className="mt-8 border-t border-border pt-6"><h2 className="font-display text-2xl">Sources et prolongements</h2><ul className="mt-4 space-y-2">{lesson.ressources.map(resource => <li key={resource.href}>{resource.href.startsWith("/") ? <Link href={resource.href} className="editorial-link inline-block py-2 text-sm text-primary">{resource.label}</Link> : <a href={resource.href} target="_blank" rel="noopener noreferrer" className="editorial-link inline-block py-2 text-sm text-primary">{resource.label}</a>}</li>)}</ul></section>
    <nav aria-label="Navigation entre les leçons" className="mt-7 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-sm font-semibold text-primary">{previous ? <Link href={`/apprendre/${slug}/${previous.slug}`} className="editorial-link py-3">Leçon précédente</Link> : <span />}<Link href={`/apprendre/${slug}`} className="editorial-link py-3">Bilan du parcours</Link></nav>
  </div>;
}
