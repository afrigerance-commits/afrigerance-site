import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey, isSupabaseConfigured } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/database.types";

/** Client Supabase pour les composants client. Lève une erreur explicite si Supabase n’est pas configuré. */
export function createClient() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase n’est pas configuré : définissez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY (voir .env.example).",
    );
  }
  return createBrowserClient<Database>(supabaseUrl!, supabaseAnonKey!);
}
