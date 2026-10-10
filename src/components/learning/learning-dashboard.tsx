"use client";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { learningPaths } from "@/lib/data/learning-paths";
import { parseLearningProgress, readLearningSnapshot, subscribeLearning } from "@/lib/learning-progress";
function LearningCard({ path }: { path: typeof learningPaths[number] }) {
  const raw = useSyncExternalStore(subscribeLearning, () => readLearningSnapshot(path.slug), () => null);
  const done = parseLearningProgress(raw, path.lessons.map(l => l.slug));
  const next = path.lessons.find(l => !done.includes(l.slug));
  return <div className="rounded-2xl border border-border bg-surface p-5"><h3 className="font-display text-xl"><Link href={`/apprendre/${path.slug}`} className="hover:underline">{path.titre}</Link></h3><p className="mt-3 text-sm text-muted">{done.length} / {path.lessons.length} leçons validées après les quiz</p><progress aria-label={`Progression : ${path.titre}`} max={path.lessons.length} value={done.length} className="mt-3 h-2 w-full accent-[var(--primary)]" /><Link href={next ? `/apprendre/${path.slug}/${next.slug}` : `/apprendre/${path.slug}`} className="mt-4 block min-h-11 py-2 text-sm font-semibold text-primary underline">{next ? `Continuer : ${next.titre}` : "Revoir le parcours terminé"}</Link></div>;
}
export function LearningDashboard() { return <section className="mt-10"><h2 className="font-display text-3xl">Mes apprentissages</h2><p className="mt-3 text-sm text-muted">Retrouvez les parcours documentés et reprenez la prochaine leçon. Progression conservée sur cet appareil.</p><div className="mt-5 grid gap-4 lg:grid-cols-3">{learningPaths.map(path => <LearningCard key={path.slug} path={path} />)}</div></section>; }
