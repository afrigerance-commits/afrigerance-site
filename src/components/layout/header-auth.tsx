import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

/** Server component : détermine l’état de connexion sans rendre tout le Header serveur. */
export async function HeaderAuth() {
  if (!isSupabaseConfigured) {
    return (
      <Button variant="ghost" size="icon" asChild aria-label="Connexion">
        <Link href="/connexion">
          <User />
        </Link>
      </Button>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Button variant="ghost" size="icon" asChild aria-label="Connexion">
        <Link href="/connexion">
          <User />
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" asChild aria-label="Mon espace">
      <Link href="/compte">
        <User className="text-primary" />
      </Link>
    </Button>
  );
}
