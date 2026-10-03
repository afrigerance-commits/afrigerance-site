import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { learningPaths } from "@/lib/data/learning-paths";

export const metadata: Metadata = {
  title: "Apprendre",
  description: "Des parcours d'apprentissage guidés, accessibles sans création de compte.",
  alternates: { canonical: "/apprendre" },
};

export default function ApprendrePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col gap-4 text-center">
        <span className="mx-auto text-sm font-medium text-accent">Parcours d'apprentissage</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Commencer à apprendre</h1>
        <p className="mx-auto max-w-2xl text-muted">
          Aucune création de compte n'est nécessaire pour commencer un parcours. La connexion devient utile pour
          sauvegarder votre progression, vos favoris et reprendre votre lecture.
        </p>
      </Reveal>
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {learningPaths.map((path, i) => (
          <Reveal key={path.slug} delay={i * 0.05}>
            <Link href={`/apprendre/${path.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col gap-3 p-6 transition-all group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-md">
                <h2 className="font-display text-xl font-semibold">{path.titre}</h2>
                <p className="text-sm text-muted">{path.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary">
                  {path.etapes.length} étapes
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
