"use client";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Check, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { readLearningSnapshot, parseLearningProgress, subscribeLearning } from "@/lib/learning-progress";

export function PathProgress({ slug, lessons, baseHref }: { slug: string; baseHref?: string; lessons: { slug: string; titre: string; minutes: number; objectif: string }[] }) {
  const raw = useSyncExternalStore(subscribeLearning, () => readLearningSnapshot(slug), () => null);
  const completed = parseLearningProgress(raw, lessons.map(lesson => lesson.slug));
  const next = lessons.find(lesson => !completed.includes(lesson.slug));
  return <div className="mt-8">
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><h2 className="font-semibold">Votre progression</h2><span className="text-sm text-primary" role="status">{completed.length} / {lessons.length} leçons validées</span></div>
      <Progress value={completed.length / lessons.length * 100} aria-label="Progression du parcours" />
      <p className="mt-3 text-sm leading-6 text-muted">Les leçons validées après les exercices sont conservées sur cet appareil, sans compte.</p>
      {next && <Link href={`${baseHref ?? `/apprendre/${slug}`}/${next.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"><BookOpen className="size-4 shrink-0" aria-hidden="true" />{completed.length ? "Continuer" : "Commencer"} : {next.titre}</Link>}
    </div>
    <ol className="mt-6 space-y-4">{lessons.map((lesson, index) => <li key={lesson.slug}>
      <Link href={`${baseHref ?? `/apprendre/${slug}`}/${lesson.slug}`} className="gateway-card flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <span className={`flex size-11 shrink-0 items-center justify-center rounded-full border font-display text-xl ${completed.includes(lesson.slug) ? "border-primary bg-primary text-primary-foreground" : "border-accent/40 text-accent-text"}`}>{completed.includes(lesson.slug) ? <Check className="size-5" aria-hidden="true" /> : String(index + 1).padStart(2,"0")}</span>
        <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wider text-accent-text">Leçon {index + 1} · {lesson.minutes} min{completed.includes(lesson.slug) ? " · validée" : ""}</p><h3 className="mt-2 font-display text-2xl">{lesson.titre}</h3><p className="mt-2 text-base leading-7 text-muted">{lesson.objectif}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"><BookOpen className="size-4" aria-hidden="true" />{completed.includes(lesson.slug) ? "Relire la leçon" : "Lire la leçon"}</span></div>
      </Link>
    </li>)}</ol>
  </div>;
}
