import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "À propos",
  description: "La mission, la vision et les principes éditoriaux de la plateforme.",
  alternates: { canonical: "/a-propos" },
};

const principes = [
  {
    titre: "Rigueur documentaire",
    texte:
      "Chaque contenu religieux distingue le texte coranique, le hadith référencé, l'avis juridique attribué, le récit historique sourcé et l'explication pédagogique.",
  },
  {
    titre: "Validation humaine",
    texte:
      "Aucun contenu religieux n'est publié sans validation explicite d'un responsable humain habilité. La plateforme ne délivre pas de fatwas personnalisées.",
  },
  {
    titre: "Référentiel assumé",
    texte: siteConfig.madhhab.note,
  },
  {
    titre: "Transparence",
    texte:
      "Lorsqu'une information ne peut pas encore être vérifiée, elle est signalée explicitement comme « Référence à vérifier » plutôt que présentée comme certaine.",
  },
];

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="À propos"
        title={`La mission de ${siteConfig.name}`}
        description={siteConfig.description}
      />
      <Reveal className="mx-auto max-w-2xl text-center text-lg italic text-foreground/90">
        « Un espace où la connaissance se transmet avec rigueur, où chaque enseignement est accompagné de ses
        références et où le savoir devient accessible à tous. »
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {principes.map((p, i) => (
          <Reveal key={p.titre} delay={i * 0.05}>
            <Card className="h-full p-6">
              <h2 className="font-display text-lg font-semibold">{p.titre}</h2>
              <p className="mt-2 text-sm text-muted">{p.texte}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-16 flex flex-wrap justify-center gap-4 text-sm">
        <Link href="/a-propos/fondateur" className="text-primary hover:underline">
          Le fondateur
        </Link>
        <Link href="/a-propos/referentiel-malikite" className="text-primary hover:underline">
          Notre référentiel malikite
        </Link>
        <Link href="/a-propos/politique-editoriale" className="text-primary hover:underline">
          Politique éditoriale et documentaire
        </Link>
        <Link href="/contact" className="text-primary hover:underline">
          Contact
        </Link>
      </Reveal>
    </div>
  );
}
