import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Le fondateur",
  description: "Présentation du fondateur de la plateforme et de sa vision.",
  alternates: { canonical: "/a-propos/fondateur" },
};

export default function FondateurPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Le fondateur" title="Une page à compléter" />
      <Reveal className="flex flex-col items-center gap-5 text-center">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-3xl">F</AvatarFallback>
        </Avatar>
        <Badge variant="muted">Contenu de démonstration — en attente de rédaction par le fondateur</Badge>
        <p className="max-w-xl text-muted">
          Cette page accueillera la biographie du fondateur, son parcours d’enseignement et sa vision pour la
          plateforme, rédigés et validés directement par lui. Aucun texte biographique n’a été inventé ici afin
          d’éviter toute fausse attribution.
        </p>
      </Reveal>
    </div>
  );
}
