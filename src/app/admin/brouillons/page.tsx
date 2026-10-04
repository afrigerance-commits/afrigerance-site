import type { Metadata } from "next";
import Link from "next/link";
import { editorialDrafts } from "@/lib/data/editorial-drafts";

export const metadata: Metadata = { title: "Brouillons documentaires", robots: { index: false, follow: false } };

export default function EditorialDraftsPage() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="font-display text-2xl font-semibold">Brouillons documentaires</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Articles fondés sur les ouvrages du corpus privé. Leur présence ici ne vaut ni approbation religieuse
          ni autorisation de publication. Les pages PDF originales ne sont pas distribuées par le site.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Pour confirmer un article : ouvrez-le, préparez sa validation dans l’éditeur, relisez et corrigez le texte et ses sources,
          puis choisissez « Approuvé » ou « Publié ». La publication exige un compte administrateur ou responsable scientifique.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {editorialDrafts.map((draft) => (
          <Link
            key={draft.slug}
            href={`/admin/brouillons/${draft.slug}`}
            className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-accent-text">{draft.categorie}</span>
            <h2 className="mt-2 font-display text-lg font-semibold">{draft.titre}</h2>
            <p className="mt-2 text-sm text-muted">{draft.resume}</p>
            <span className="mt-4 block text-xs text-muted">En cours de vérification · {draft.tempsLectureMinutes} min</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
