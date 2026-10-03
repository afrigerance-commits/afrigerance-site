import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { CourseCard } from "@/components/content/course-card";
import { Badge } from "@/components/ui/badge";
import { fiqhCourses } from "@/lib/data/fiqh";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Académie de fiqh malikite",
  description: "Un parcours structuré pour apprendre le fiqh selon l'école malikite, du niveau débutant au niveau avancé.",
  alternates: { canonical: "/fiqh/malikite" },
};

const niveaux = [
  {
    key: "debutant" as const,
    titre: "Niveau débutant",
    items: ["Introduction au madhhab malikite", "La purification", "Les ablutions", "Le ghusl", "Le tayammum", "La prière", "Le jeûne", "La zakât", "Le pèlerinage"],
  },
  {
    key: "intermediaire" as const,
    titre: "Niveau intermédiaire",
    items: ["Conditions et piliers des actes cultuels", "Règles détaillées de la prière", "Situations particulières", "Les transactions", "Éthique des échanges", "Règles familiales"],
  },
  {
    key: "avance" as const,
    titre: "Niveau avancé",
    items: ["Structure prête — contenus en attente de validation scientifique avant publication"],
  },
];

export default function AcademieFiqhMalikitePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col gap-4 text-center">
        <span className="mx-auto text-sm font-medium text-accent">Académie de fiqh malikite</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Apprendre le fiqh, étape par étape</h1>
        <p className="mx-auto max-w-2xl text-muted">{siteConfig.madhhab.note}</p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {niveaux.map((niveau, i) => (
          <Reveal key={niveau.key} delay={i * 0.08} className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold">{niveau.titre}</h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
              {niveau.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-accent">—</span> {item}
                </li>
              ))}
            </ul>
            {niveau.key === "avance" && (
              <Badge variant="muted" className="mt-4">
                Structure sans contenu publié
              </Badge>
            )}
          </Reveal>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="mb-6 font-display text-2xl font-semibold">Cours disponibles</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {fiqhCourses.map((course, i) => (
            <Reveal key={course.slug} delay={i * 0.05}>
              <CourseCard course={course} href={`/fiqh/malikite/${course.slug}`} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
