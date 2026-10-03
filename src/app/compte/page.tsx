import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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

  const [{ data: profile }, { data: progressRows }, { data: bookmarkRows }] = await Promise.all([
    supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle(),
    supabase.from("progress").select("completed").eq("user_id", user.id),
    supabase.from("bookmarks").select("content_type, content_id").eq("user_id", user.id),
  ]);

  const completedCount = progressRows?.filter((p) => p.completed).length ?? 0;
  const totalTracked = progressRows?.length ?? 0;
  const progressPercent = totalTracked > 0 ? Math.round((completedCount / totalTracked) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Mon espace" title={`Bonjour, ${profile?.display_name ?? user.email}`} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold">Progression</h2>
          <p className="mt-1 text-sm text-muted">
            {completedCount} leçon{completedCount > 1 ? "s" : ""} terminée{completedCount > 1 ? "s" : ""} sur{" "}
            {totalTracked} suivie{totalTracked > 1 ? "s" : ""}.
          </p>
          <Progress value={progressPercent} className="mt-4" />
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold">Favoris</h2>
          <p className="mt-1 text-sm text-muted">{bookmarkRows?.length ?? 0} élément(s) enregistré(s).</p>
        </Card>
      </div>

      <form action={signOut} className="mt-10">
        <Button type="submit" variant="outline">
          <LogOut className="h-4 w-4" /> Se déconnecter
        </Button>
      </form>
    </div>
  );
}
