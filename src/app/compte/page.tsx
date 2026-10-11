import { LearningDashboard } from "@/components/learning/learning-dashboard";
import { ReaderSyncPanel } from "@/components/account/reader-sync";
import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Mon espace", robots: { index: false } };

export default async function ComptePage() {
  if (!isSupabaseConfigured) redirect("/");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion?redirect=/compte");

  const [{ data: profile }, { data: bookmarkRows }] = await Promise.all([
    supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle(),
    supabase.from("bookmarks").select("content_type, content_id").eq("user_id", user.id),
  ]);


  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Mon espace" title={`Bonjour, ${profile?.display_name ?? user.email}`} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold">Favoris éditoriaux</h2>
          <p className="mt-1 text-sm text-muted">{bookmarkRows?.length ?? 0} élément(s) enregistré(s).</p>
        </Card>
      </div>

      <p className="mt-6 text-sm leading-7 text-muted">Vos lectures sans compte et vos données de compte sont séparées. Utilisez la synchronisation pour retrouver vos progrès entre appareils.</p>
      <ReaderSyncPanel/>
      <LearningDashboard/>
      <nav className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-primary"><Link href="/mon-suivi" className="underline">Mon suivi de lecture</Link><Link href="/mes-notes" className="underline">Mes notes personnelles</Link><Link href="/hors-ligne" className="underline">Mes téléchargements</Link></nav>
      <form action={signOut} className="mt-10">
        <Button type="submit" variant="outline">
          <LogOut className="h-4 w-4" /> Se déconnecter
        </Button>
      </form>
    </div>
  );
}
