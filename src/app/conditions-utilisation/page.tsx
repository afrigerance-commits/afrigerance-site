import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Conditions d’utilisation",
  description: "Les règles d’utilisation de la plateforme.",
  alternates: { canonical: "/conditions-utilisation" },
};

export default function ConditionsUtilisationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Informations légales" title="Conditions d’utilisation" />
      <Reveal className="mb-8 flex justify-center">
        <Badge variant="warning">Ébauche — à faire valider par un professionnel du droit avant mise en ligne</Badge>
      </Reveal>
      <Reveal className="flex flex-col gap-6 text-sm text-foreground/90">
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Objet de la plateforme</h2>
          <p>
            La plateforme met à disposition des contenus éducatifs relatifs aux sciences islamiques. Elle ne délivre
            pas de fatwas personnalisées et ne se substitue pas à une consultation directe d’un savant habilité pour
            toute question individuelle.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Statut des contenus</h2>
          <p>
            Chaque contenu affiche son statut éditorial. Un contenu marqué comme démonstration, brouillon ou en
            cours de vérification ne doit pas être considéré comme une position religieuse validée par la
            plateforme.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Comptes utilisateurs</h2>
          <p>
            La création d’un compte est facultative et réservée aux fonctionnalités personnelles (progression,
            favoris). Les utilisateurs s’engagent à fournir des informations exactes et à ne pas détourner le compte
            à des fins contraires à l’objet de la plateforme.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Propriété intellectuelle</h2>
          <p>
            Les textes originaux de la plateforme sont protégés. Les œuvres tierces (livres, vidéos) restent la
            propriété de leurs auteurs et éditeurs respectifs ; leur statut de droits est précisé sur chaque fiche.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
