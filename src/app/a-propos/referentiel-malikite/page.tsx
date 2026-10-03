import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Notre référentiel malikite",
  description: "Pourquoi et comment la plateforme adopte le madhhab malikite comme référentiel principal pour le fiqh.",
  alternates: { canonical: "/a-propos/referentiel-malikite" },
};

export default function ReferentielMalikitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Référentiel juridique" title="Pourquoi le madhhab malikite ?" />
      <Reveal className="flex flex-col gap-6 text-foreground/90">
        <p>
          La plateforme adopte le madhhab malikite comme référentiel principal pour l’enseignement du fiqh. Les
          parcours de jurisprudence sont structurés autour de l’école de l’imam Mâlik ibn Anas, largement répandue en
          Afrique du Nord et en Afrique de l’Ouest, régions auxquelles s’adresse en priorité cette plateforme.
        </p>
        <h2 className="font-display text-xl font-semibold">Un choix, non un jugement</h2>
        <p>
          Ce choix ne constitue en aucun cas un dénigrement des autres écoles juridiques sunnites, toutes reconnues
          dans la tradition islamique. Lorsque des divergences existent entre l’école malikite et une autre école sur
          un point précis, elles sont présentées avec les positions attribuées à chaque école et leurs sources
          respectives, dans un esprit de respect mutuel.
        </p>
        <h2 className="font-display text-xl font-semibold">Les limites de notre rôle</h2>
        <p>
          La plateforme organise, structure et rend accessible un enseignement du fiqh malikite. Elle ne se présente
          jamais comme une autorité religieuse autonome et ne délivre pas de fatwas personnalisées. La validation
          religieuse finale de tout contenu reste humaine, assurée par un responsable scientifique habilité avant
          publication.
        </p>
      </Reveal>
    </div>
  );
}
