import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ensureProfile } from "@/lib/auth/profile";
import { siteConfig } from "@/lib/site-config";

/** SSR confirmation template: /auth/confirm?token_hash={{ .TokenHash }}&type=email */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const tokenHash = params.get("token_hash");
  const type = params.get("type");
  let destination = "/connexion?erreur=lien_confirmation";
  if (isSupabaseConfigured && tokenHash && (type === "email" || type === "signup")) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error && data.user && data.session) {
      destination = await ensureProfile(supabase, data.user) ? "/compte" : "/connexion?erreur=profil";
    }
  }
  const response = NextResponse.redirect(new URL(destination, siteConfig.url));
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
