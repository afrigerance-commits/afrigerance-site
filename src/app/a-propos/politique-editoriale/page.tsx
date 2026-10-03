import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { editorialStatusLabels, editorialStatuses } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique éditoriale et documentaire",
  description: "Comment la plateforme vérifie, qualifie et publie ses contenus religieux et éditoriaux.",
  alternates: { canonical: "/a-propos/politique-editoriale" },
};

export default function PolitiqueEditorialePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Politique éditoriale" title="Comment nous traitons les contenus" />
      <Reveal className="flex flex-col gap-6 text-foreground/90">
        <p>
          Cette plateforme distingue systématiquement six types de contenu : le texte coranique, le hadith avec
          référence et évaluation documentée, l'avis juridique attribué, le récit historique sourcé, l'explication
          pédagogique et le contenu éditorial personnel.
        </p>
        <p>
          Une citation, une chaîne de transmission, un numéro de hadith, une parole de savant ou un jugement
          d'authenticité ne sont jamais inventés. Lorsqu'une information ne peut pas être vérifiée au moment de la
          rédaction, elle porte la mention explicite « Référence à vérifier ».
        </p>
        <h2 className="font-display text-xl font-semibold">Statuts éditoriaux</h2>
        <p>Chaque contenu progresse à travers les statuts suivants avant, le cas échéant, sa publication :</p>
        <ol className="flex flex-col gap-2 text-sm">
          {editorialStatuses.map((status, i) => (
            <li key={status} className="flex gap-3">
              <span className="font-mono text-muted">{i + 1}.</span>
              <span>{editorialStatusLabels[status]}</span>
            </li>
          ))}
        </ol>
        <h2 className="font-display text-xl font-semibold">Rôle de l'intelligence artificielle</h2>
        <p>
          L'intelligence artificielle peut aider à organiser, reformuler et préparer des textes. Elle ne s'attribue
          jamais un rôle de mufti, ne certifie seule aucune narration et n'invente aucune preuve religieuse. La
          publication d'un contenu religieux nécessite toujours une validation explicite par un responsable humain
          habilité.
        </p>
      </Reveal>
    </div>
  );
}
