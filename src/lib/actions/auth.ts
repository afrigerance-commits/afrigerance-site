"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { siteConfig } from "@/lib/site-config";
import { ensureProfile } from "@/lib/auth/profile";
import { safeAuthRedirect } from "@/lib/auth/redirect";

export interface AuthFormState {
  error?: string;
  message?: string;
}

export async function signIn(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase n’est pas encore configuré sur cette instance." };
  }
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = safeAuthRedirect(String(formData.get("redirect") ?? "/compte"));
  if (!email || !password) return { error: "Renseignez votre e-mail et votre mot de passe." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.code === "email_not_confirmed") return { error: "Confirmez votre adresse e-mail grâce au lien reçu avant de vous connecter. Vérifiez aussi vos courriers indésirables." };
    return { error: "Identifiants incorrects. Vérifiez votre e-mail et votre mot de passe." };
  }
  if (!data.user || !data.session) return { error: "La connexion n’a pas pu être établie. Réessayez." };
  if (!await ensureProfile(supabase, data.user)) {
    return { error: "Connexion établie, mais votre espace personnel n’a pas pu être initialisé. Réessayez dans quelques instants." };
  }
  redirect(redirectTo);
}

export async function signUp(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase n’est pas encore configuré sur cette instance." };
  }
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Renseignez une adresse e-mail valide." };
  if (!displayName || displayName.length > 100) return { error: "Renseignez un nom affiché de 1 à 100 caractères." };

  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName }, emailRedirectTo: `${siteConfig.url}/auth/callback` },
  });
  if (error) {
    return { error: "Impossible de créer le compte. L’adresse est peut-être déjà utilisée." };
  }
  if (!data.session) {
    return { message: "Si cette adresse peut être inscrite, un e-mail de confirmation vous est envoyé. Ouvrez son lien pour activer votre compte, puis connectez-vous. Vérifiez aussi vos courriers indésirables. Si vous avez déjà un compte, connectez-vous directement." };
  }
  if (!data.user || !await ensureProfile(supabase, data.user)) {
    return { error: "Votre compte est créé, mais votre espace personnel n’a pas pu être initialisé. Essayez de vous connecter." };
  }
  redirect("/compte");
}

export async function signOut() {
  if (!isSupabaseConfigured) return;
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function resendConfirmation(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!isSupabaseConfigured) return { error: "L’inscription est momentanément indisponible." };
  const email = String(formData.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Renseignez votre adresse e-mail pour recevoir un nouveau lien." };
  const supabase = await createClient();
  const { error } = await supabase.auth.resend({ type: "signup", email, options: { emailRedirectTo: `${siteConfig.url}/auth/callback` } });
  if (error) return { error: "Le lien n’a pas pu être envoyé. Patientez avant de réessayer ; si le problème persiste, contactez-nous." };
  return { message: "Si cette adresse attend une confirmation, un nouveau lien vous est envoyé. Vérifiez votre messagerie et vos courriers indésirables." };
}
