"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export interface AuthFormState {
  error?: string;
}

export async function signIn(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase n’est pas encore configuré sur cette instance." };
  }
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "/compte");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "Identifiants incorrects. Vérifiez votre e-mail et votre mot de passe." };
  }
  // L'inscription peut précéder la confirmation par e-mail : à ce moment,
  // l'insertion du profil est refusée par RLS faute de session. Le créer
  // maintenant, une fois la session authentifiée, évite de bloquer le rôle admin.
  if (data.user) {
    const { data: profile, error: readError } = await supabase
      .from("profiles").select("id").eq("id", data.user.id).maybeSingle();
    if (readError) return { error: "Connexion établie, mais le profil est inaccessible. Vérifiez les politiques RLS Supabase." };
    if (!profile) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        display_name: String(data.user.user_metadata?.display_name ?? email),
      });
      if (profileError) return { error: "Connexion établie, mais le profil n'a pas pu être créé. Vérifiez les politiques RLS Supabase." };
    }
  }
  redirect(redirectTo);
}

export async function signUp(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase n’est pas encore configuré sur cette instance." };
  }
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "");

  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });
  if (error) {
    return { error: "Impossible de créer le compte. L’adresse est peut-être déjà utilisée." };
  }
  if (data.user) {
    await supabase.from("profiles").insert({ id: data.user.id, display_name: displayName || email });
  }
  redirect("/compte");
}

export async function signOut() {
  if (!isSupabaseConfigured) return;
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
