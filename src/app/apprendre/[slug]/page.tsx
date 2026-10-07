import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock3 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PathProgress } from "@/components/learning/path-progress";
import { learningPaths, getLearningPath } from "@/lib/data/learning-paths";

export function generateStaticParams() { return learningPaths.map(path => ({ slug: path.slug })); }
export async function generateMetadata({ params }: PageProps<"/apprendre/[slug]">): Promise<Metadata> {
  const { slug } = await params; const path = getLearningPath(slug);
  return path ? { title: path.titre, description: path.description, alternates: { canonical: `/apprendre/${slug}` } } : {};
}
export default async function LearningPathPage({ params }: PageProps<"/apprendre/[slug]">) {
  const { slug } = await params; const path = getLearningPath(slug); if (!path) notFound();
  return <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
    <Link href="/apprendre" className="editorial-link inline-block py-3 text-sm text-primary">Tous les parcours</Link>
    <Reveal className="mt-5 rounded-3xl border border-accent/30 bg-accent/5 p-6 sm:p-10"><p className="eyebrow">Parcours guidé · Débutant</p><h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{path.titre}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{path.description}</p><p className="mt-5 flex items-center gap-2 text-sm font-medium text-primary"><Clock3 className="size-4" aria-hidden="true" />{path.lessons.reduce((total, lesson) => total + lesson.minutes,0)} min environ · {path.lessons.length} leçons · exercices corrigés</p><h2 className="mt-7 font-semibold">À la fin de ce parcours</h2><ul className="mt-3 space-y-3">{path.objectifs.map(label => <li key={label} className="flex gap-3 text-base leading-7"><Check className="mt-1 size-5 shrink-0 text-accent-text" aria-hidden="true" />{label}</li>)}</ul></Reveal>
    <PathProgress slug={slug} lessons={path.lessons.map(({ slug, titre, minutes, objectif }) => ({ slug, titre, minutes, objectif }))} />
  </div>;
}
