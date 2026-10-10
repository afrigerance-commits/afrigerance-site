"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import { signIn, resendConfirmation, type AuthFormState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthFormState = {};

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/compte";
  const erreurConfig = searchParams.get("erreur") === "supabase_non_configure";
  const [state, formAction, pending] = useActionState(signIn, initialState);

  const [resendState, resendAction, resending] = useActionState(resendConfirmation, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="redirect" value={redirectTo} />
      {erreurConfig && (
        <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted">
          L’authentification n’est pas encore configurée sur cette instance (variables Supabase absentes).
        </p>
      )}
      {searchParams.get("erreur") === "lien_confirmation" && (
        <p role="alert" className="rounded-lg border border-border p-4 text-sm">Le lien de confirmation est expiré, déjà utilisé ou invalide. Essayez de vous connecter si votre adresse est déjà confirmée ; sinon, renseignez votre e-mail et demandez un nouveau lien ci-dessous.</p>
      )}
      {searchParams.get("erreur") === "profil" && <p role="alert" className="text-sm text-red-600">Votre e-mail est confirmé, mais votre espace n’a pas pu être initialisé. Réessayez de vous connecter.</p>}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      {state.error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      <Button type="submit" variant="accent" disabled={pending}>
        <LogIn className="h-4 w-4" /> {pending ? "Connexion…" : "Se connecter"}
      </Button>
      <Button type="submit" variant="outline" formAction={resendAction} formNoValidate disabled={pending || resending}>
        {resending ? "Envoi…" : "Renvoyer le lien de confirmation"}
      </Button>
      {resendState.error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{resendState.error}</p>}
      {resendState.message && <p role="status" className="rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm leading-relaxed">{resendState.message}</p>}
    </form>
  );
}
