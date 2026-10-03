import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Target, Clock3, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ArabicText } from "@/components/islamic/arabic-text";
import { EditorialStatusBadge, DemoBadge } from "@/components/islamic/reliability-badge";
import { SourceReferenceList } from "@/components/islamic/source-reference";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fiqhCourses, getFiqhCourse, getFiqhLesson } from "@/lib/data/fiqh";

const niveauLabel = { debutant: "Débutant", intermediaire: "Intermédiaire", avance: "Avancé" } as const;

export function generateStaticParams() {
  return fiqhCourses.flatMap((c) => c.lessons.map((l) => ({ course: c.slug, lesson: l.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/fiqh/malikite/[course]/[lesson]">): Promise<Metadata> {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const lesson = getFiqhLesson(courseSlug, lessonSlug);
  if (!lesson) return {};
  return {
    title: lesson.titre,
    description: lesson.objectifPedagogique,
    alternates: { canonical: `/fiqh/malikite/${courseSlug}/${lessonSlug}` },
  };
}

export default async function FiqhLessonPage({ params }: PageProps<"/fiqh/malikite/[course]/[lesson]">) {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const course = getFiqhCourse(courseSlug);
  const lesson = getFiqhLesson(courseSlug, lessonSlug);
  if (!course || !lesson) notFound();

  const lessonIndex = course.lessons.findIndex((l) => l.slug === lesson.slug);
  const nextLesson = lesson.lessonSuivanteSlug
    ? course.lessons.find((l) => l.slug === lesson.lessonSuivanteSlug)
    : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href={`/fiqh/malikite/${course.slug}`}
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> {course.titre}
      </Link>

      <Reveal className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">
            Leçon {lessonIndex + 1} / {course.lessons.length}
          </Badge>
          <EditorialStatusBadge status={lesson.statut} />
          {lesson.demonstration && <DemoBadge />}
        </div>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{lesson.titre}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Target className="h-4 w-4" /> {niveauLabel[lesson.niveau]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4" /> {lesson.dureeIndicative}
          </span>
        </div>
        <p className="rounded-lg bg-surface-muted p-4 text-sm text-foreground/90">
          <strong className="font-medium">Objectif : </strong>
          {lesson.objectifPedagogique}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="prose-content mt-10 flex flex-col gap-6">
        <p className="text-foreground/90">{lesson.introduction}</p>

        {lesson.texteArabe && (
          <div className="rounded-xl border border-gold-500/30 bg-surface p-6">
            <ArabicText as="p" variant="quran" className="quran-quote text-xl leading-loose">
              {lesson.texteArabe}
            </ArabicText>
            {lesson.traductionFrancaise && (
              <p className="mt-4 border-t border-border pt-4 text-sm italic text-muted">{lesson.traductionFrancaise}</p>
            )}
          </div>
        )}

        <p className="text-foreground/90">{lesson.explication}</p>

        {lesson.notePedagogique && (
          <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted">
            <strong className="font-medium text-foreground">Note pédagogique : </strong>
            {lesson.notePedagogique}
          </p>
        )}
      </Reveal>

      <Reveal delay={0.15} className="mt-10 rounded-xl bg-emerald-900 p-6 text-ivory-50">
        <h2 className="mb-3 font-display text-lg font-semibold">Points à retenir</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {lesson.pointsARetenir.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> {point}
            </li>
          ))}
        </ul>
      </Reveal>

      <Separator className="my-12" />

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold">Références</h2>
        <SourceReferenceList sources={lesson.sources} />
      </section>

      <div className="mt-14 flex items-center justify-between border-t border-border pt-6">
        {nextLesson ? (
          <Link
            href={`/fiqh/malikite/${course.slug}/${nextLesson.slug}`}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Leçon suivante : {nextLesson.titre} <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href={`/fiqh/malikite/${course.slug}`}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Retour au sommaire du cours <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
