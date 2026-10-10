import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ensureProfile } from "@/lib/auth/profile";
import { siteConfig } from "@/lib/site-config";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");
  let destination = "/connexion?erreur=lien_confirmation";
  if (isSupabaseConfigured && code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user && data.session) {
      destination = await ensureProfile(supabase, data.user) ? "/compte" : "/connexion?erreur=profil";
    }
  }
  const response = NextResponse.redirect(new URL(destination, siteConfig.url));
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
