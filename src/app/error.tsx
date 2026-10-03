"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-4 text-center">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Une erreur est survenue</h1>
      <p className="text-muted">
        Quelque chose s’est mal passé de notre côté. Vous pouvez réessayer ou revenir à l’accueil.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="accent" onClick={() => reset()}>
          <RotateCcw className="h-4 w-4" /> Réessayer
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
    </div>
  );
}
