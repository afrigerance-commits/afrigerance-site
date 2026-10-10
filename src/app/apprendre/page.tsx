import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { LearningDashboard } from "@/components/learning/learning-dashboard";
export const metadata: Metadata = { title: "Apprendre", description: "Des parcours d’apprentissage guidés, accessibles sans création de compte.", alternates: { canonical: "/apprendre" } };
export default function ApprendrePage() {
  return <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><Reveal className="flex flex-col gap-4 text-center"><span className="mx-auto text-sm font-medium text-accent-text">Parcours d’apprentissage</span><h1 className="font-display text-4xl font-semibold sm:text-5xl">Commencer à apprendre</h1><p className="mx-auto max-w-2xl text-muted">Trois parcours documentés, neuf leçons et des exercices corrigés, accessibles sans compte. Reprenez votre prochaine leçon et retrouvez les validations enregistrées sur cet appareil.</p></Reveal><LearningDashboard /></div>;
}
