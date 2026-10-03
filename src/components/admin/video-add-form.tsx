"use client";

import { useActionState } from "react";
import { addVideo, type VideoFormState } from "@/lib/actions/videos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initialState: VideoFormState = {};

export function VideoAddForm() {
  const [state, formAction, pending] = useActionState(addVideo, initialState);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4 rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="titre">Titre</Label>
        <Input id="titre" name="titre" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lien">Lien ou identifiant YouTube</Label>
        <Input id="lien" name="lien" placeholder="https://www.youtube.com/watch?v=…" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={2} />
      </div>
      {state.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      <Button type="submit" variant="accent" className="w-fit" disabled={pending}>
        {pending ? "Ajout…" : "Ajouter la vidéo"}
      </Button>
    </form>
  );
}
