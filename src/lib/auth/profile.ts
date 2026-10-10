import type { User } from "@supabase/supabase-js";
import type { createClient } from "@/lib/supabase/server";

/** Call only after Supabase returns an authenticated user/session. Preserve existing profiles. */
export async function ensureProfile(client: Awaited<ReturnType<typeof createClient>>, user: User) {
  const name = user.user_metadata?.display_name;
  const { error } = await client.from("profiles").upsert({
    id: user.id,
    display_name: typeof name === "string" && name.trim() ? name.trim().slice(0, 100) : user.email ?? "Membre",
  }, { onConflict: "id", ignoreDuplicates: true });
  return !error;
}
