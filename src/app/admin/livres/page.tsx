import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { rightsStatusLabels } from "@/lib/data/books";

export const metadata: Metadata = { title: "Livres", robots: { index: false } };

export default async function AdminLivresPage() {
  const supabase = await createClient();
  const { data: books } = await supabase.from("books").select("id, titre_francais, auteur, droits").order("titre_francais");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Livres</h1>
      <p className="text-sm text-muted">
        Chaque fiche affiche un statut de droits. La gestion complète (ajout de fiche, upload de fichier,
        vérification des droits avec justification archivée dans <code className="rounded bg-surface-muted px-1">book_rights</code>)
        est prévue dans une prochaine itération de cette interface — voir docs/BILAN.md.
      </p>
      {books && books.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {books.map((b) => (
            <li key={b.id} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
              <span className="font-medium">{b.titre_francais}</span>
              <Badge variant="outline">{rightsStatusLabels[b.droits]}</Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">Aucun livre enregistré pour l’instant.</p>
      )}
    </div>
  );
}
