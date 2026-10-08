import type { Metadata } from "next";
import { RoutinePlanner } from "@/components/routine-planner";
export const metadata: Metadata = { title: "Ma routine", description: "Une routine personnelle adaptable pour lire, apprendre et prendre le temps d’invoquer.", alternates: { canonical: "/routine" } };
export default function RoutinePage() {
  return <div className="premium-container max-w-5xl py-14 sm:py-20"><p className="eyebrow">Un peu, chaque jour</p><h1 className="mt-4 font-display text-4xl sm:text-6xl">Ma routine</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted">Gardez une place pour le savoir dans votre journée. Choisissez votre temps disponible et avancez à votre rythme, autour de vos prières et de vos obligations.</p><RoutinePlanner /></div>;
}
