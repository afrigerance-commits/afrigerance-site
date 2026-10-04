"use client";

import { useActionState } from "react";
import { importEditorialDraft, type ArticleFormState } from "@/lib/actions/articles";
import { Button } from "@/components/ui/button";

const initialState: ArticleFormState = {};

export function DraftImportForm({ slug }: { slug: string }) {
  const [state, action, pending] = useActionState(importEditorialDraft.bind(null, slug), initialState);
  return (
    <form action={action} className="mt-5">
      <Button type="submit" variant="accent" disabled={pending}>
        {pending ? "Préparation…" : "Préparer la validation dans l’éditeur"}
      </Button>
      {state.error && <p role="alert" className="mt-2 text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
