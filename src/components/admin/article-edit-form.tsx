"use client";

import { useActionState } from "react";
import { updateArticle, deleteArticle, type ArticleFormState } from "@/lib/actions/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { editorialStatuses, editorialStatusLabels } from "@/lib/site-config";
import type { Database } from "@/lib/supabase/database.types";

const initialState: ArticleFormState = {};

type ArticleRow = Database["public"]["Tables"]["articles"]["Row"];

export function ArticleEditForm({ article }: { article: ArticleRow }) {
  const boundUpdate = updateArticle.bind(null, article.id);
  const [state, formAction, pending] = useActionState(boundUpdate, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="titre">Titre</Label>
        <Input id="titre" name="titre" defaultValue={article.titre} required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="resume">Résumé</Label>
        <Textarea id="resume" name="resume" rows={2} defaultValue={article.resume ?? ""} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contenu_html">Contenu (HTML simple)</Label>
        <Textarea id="contenu_html" name="contenu_html" rows={12} defaultValue={article.contenu_html} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="statut">Statut éditorial</Label>
        <select
          id="statut"
          name="statut"
          defaultValue={article.statut}
          className="h-11 w-full max-w-xs rounded-lg border border-border bg-surface px-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {editorialStatuses.map((status) => (
            <option key={status} value={status}>
              {editorialStatusLabels[status]}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted">
          Passer à « Approuvé » ou « Publié » nécessite un compte administrateur ou responsable scientifique.
        </p>
      </div>
      <label className="flex items-start gap-3 text-sm text-foreground">
        <input type="checkbox" name="review_confirmed" value="yes" className="mt-1" />
        Je confirme avoir relu le contenu religieux, les masâ’il et chaque référence citée. Cette confirmation est exigée pour « Approuvé » et « Publié ».
      </label>
      <p className="text-xs text-muted">« Approuvé » conserve l’article hors du site public. « Publié » le rend visible sur le blog, l’accueil, la recherche, le sitemap et le flux RSS.</p>
      {state.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      <div className="flex items-center gap-3">
        <Button type="submit" variant="accent" disabled={pending}>
          {pending ? "Enregistrement…" : "Enregistrer"}
        </Button>
        <Button type="button" variant="outline" onClick={() => deleteArticle(article.id)}>
          Supprimer
        </Button>
      </div>
    </form>
  );
}
