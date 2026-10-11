import { BookEditor } from "@/components/admin/book-editor";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { rightsStatusLabels } from "@/lib/data/books";

export const metadata: Metadata = { title: "Livres", robots: { index: false } };

export default async function AdminLivresPage() {
  const supabase = await createClient();
  const { data: books, error } = await supabase.from("books").select("id, titre_francais, auteur, droits").order("titre_francais");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Livres</h1>
      <p className="text-sm text-muted">
        Ajoutez un ouvrage ou modifiez une fiche. Les PDF sont privés jusqu’à validation des droits et publication. Les articles disposent aussi de leur éditeur dans la rubrique Articles.
      </p>
      {error && <p role="alert">La configuration des livres doit être activée en base avant d’utiliser le formulaire.</p>}
      <BookEditor/>
      {books && books.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {books.map((b) => (
            <li key={b.id} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
              <Link href={`/admin/livres/${b.id}`} className="min-h-11 py-2 font-medium text-primary underline">{b.titre_francais}</Link>
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
