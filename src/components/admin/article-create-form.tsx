"use client";

import { useActionState } from "react";
import { createArticle, type ArticleFormState } from "@/lib/actions/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initialState: ArticleFormState = {};

export function ArticleCreateForm() {
  const [state, formAction, pending] = useActionState(createArticle, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="titre">Titre</Label>
        <Input id="titre" name="titre" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="resume">Résumé</Label>
        <Textarea id="resume" name="resume" rows={2} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contenu_html">Contenu (HTML simple)</Label>
        <Textarea id="contenu_html" name="contenu_html" rows={10} placeholder="<p>…</p>" />
      </div>
      {state.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      <Button type="submit" variant="accent" className="w-fit" disabled={pending}>
        {pending ? "Création…" : "Créer le brouillon"}
      </Button>
    </form>
  );
}
