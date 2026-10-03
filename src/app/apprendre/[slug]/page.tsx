import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Circle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Progress } from "@/components/ui/progress";
import { learningPaths, getLearningPath } from "@/lib/data/learning-paths";

export function generateStaticParams() {
  return learningPaths.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/apprendre/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const path = getLearningPath(slug);
  if (!path) return {};
  return { title: path.titre, description: path.description, alternates: { canonical: `/apprendre/${slug}` } };
}

export default async function LearningPathPage({ params }: PageProps<"/apprendre/[slug]">) {
  const { slug } = await params;
  const path = getLearningPath(slug);
  if (!path) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/apprendre" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Parcours d’apprentissage
      </Link>

      <Reveal className="flex flex-col gap-4">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{path.titre}</h1>
        <p className="text-lg text-muted">{path.description}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 rounded-xl border border-border bg-surface p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">Progression</span>
          <span className="text-muted">Connectez-vous pour la sauvegarder</span>
        </div>
        <Progress value={0} />
      </Reveal>

      <ol className="mt-10 flex flex-col gap-3">
        {path.etapes.map((etape, i) => (
          <Reveal key={etape.lienHref} delay={0.05 * i}>
            <Link
              href={etape.lienHref}
              className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-sm"
            >
              <span className="flex items-center gap-3">
                <Circle className="h-4 w-4 text-muted" />
                <span className="text-sm font-medium">{etape.titre}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
