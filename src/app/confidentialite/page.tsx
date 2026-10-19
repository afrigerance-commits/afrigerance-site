import { AnalyticsPreferences } from "@/components/analytics/visitor-analytics";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment la plateforme traite les données personnelles de ses visiteurs et membres.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Informations légales" title="Politique de confidentialité" />
      <Reveal className="mb-8 flex justify-center">
        <Badge variant="warning">Ébauche — à faire valider par un professionnel du droit avant mise en ligne</Badge>
      </Reveal>
      <Reveal className="flex flex-col gap-6 text-sm text-foreground/90">
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Données collectées</h2>
          <p>
            La navigation sur le site peut générer des données techniques courantes (pages consultées, type
            d’appareil). La création d’un compte collecte une adresse e-mail et, le cas échéant, un nom d’affichage.
            L’inscription à la newsletter n’intervient qu’après consentement explicite et peut être retirée à tout
            moment.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Utilisation des données</h2>
          <p>
            Les données sont utilisées pour fournir les fonctionnalités du compte (progression, favoris), répondre
            aux messages envoyés via le formulaire de contact, et, avec consentement, informer des nouvelles
            publications.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Statistiques facultatives</h2>
          <p>Après votre accord, MIRÂTH mesure les pages publiques consultées, les visites, le type d’appareil et la provenance générale. Un identifiant aléatoire renouvelé chaque jour estime les visiteurs ; il n’est pas lié au compte. Aucun texte recherché, note personnelle, adresse IP ou contenu de formulaire n’est enregistré dans ce suivi. Les données sont conservées 90 jours et accessibles uniquement à l’administrateur. Les refus et les signaux Do Not Track / Global Privacy Control sont respectés. Les statistiques excluent donc une partie des visites et ne représentent pas un décompte exact des personnes. L’hébergeur peut conserver ses propres journaux techniques, indépendamment de ce dispositif.</p>
          <AnalyticsPreferences />
        </section>
        <section id="recherche-vocale" className="scroll-mt-24">
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Recherche vocale facultative</h2>
          <p>Le micro s’active seulement lorsque vous appuyez sur le bouton de dictée, puis après l’autorisation de votre navigateur. La reconnaissance est fournie par votre navigateur ou son service, qui peut transmettre la voix à ses propres serveurs selon l’appareil et ses réglages. MIRÂTH n’enregistre ni n’envoie de fichier audio à son serveur. La dictée s’arrête à la fin de la phrase, après vingt secondes, lorsque vous annulez, quittez la page ou masquez l’application. Le texte reconnu est modifiable ; aucune recherche n’est lancée automatiquement.</p>
          <p>Le texte n’est transmis à MIRÂTH que lorsque vous lancez la recherche. Il figure alors dans l’URL et peut apparaître dans l’historique du navigateur et les journaux techniques de l’hébergeur. La recherche vocale n’est pas une conversation avec un assistant religieux et ne génère aucune attribution. Si votre navigateur ou WebView ne prend pas en charge la dictée, la saisie et la dictée du clavier restent disponibles selon votre appareil.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Vos droits</h2>
          <p>
            Vous pouvez demander l’accès, la rectification ou la suppression de vos données en nous contactant. Le
            détail précis des droits applicables dépend de la juridiction et sera précisé après revue juridique.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Hébergement et sécurité</h2>
          <p>
            Les données sont hébergées via les services d’infrastructure utilisés par la plateforme (voir la
            documentation technique pour le détail des sous-traitants actuels).
          </p>
        </section>
      </Reveal>
    </div>
  );
}
