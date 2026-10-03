import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BookMarked,
  Video,
  GraduationCap,
  Library,
  Users,
  Settings,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { UserRoleDb } from "@/lib/supabase/database.types";

// L’administration dépend toujours d’une session utilisateur réelle : jamais
// générée statiquement, même si aucune donnée dynamique n’est détectée.
export const dynamic = "force-dynamic";

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/sources", label: "Sources", icon: Library },
  { href: "/admin/livres", label: "Livres", icon: BookMarked },
  { href: "/admin/videos", label: "Vidéos", icon: Video },
  { href: "/admin/cours", label: "Cours", icon: GraduationCap },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: Users },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
];

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  if (!isSupabaseConfigured) redirect("/");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion?redirect=/admin");

  const { data: roleRows } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
  const roles = (roleRows?.map((r) => r.role) ?? []) as UserRoleDb[];
  const isStaff = roles.some((r) =>
    ["administrateur", "redacteur", "verificateur", "responsable_scientifique"].includes(r),
  );
  if (!isStaff) redirect("/");

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
      <aside className="flex flex-col gap-1 lg:border-r lg:border-border lg:pr-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display text-lg font-semibold">Administration</span>
        </div>
        <nav className="flex flex-row flex-wrap gap-1 lg:flex-col" aria-label="Navigation administration">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-xs text-muted hover:text-primary"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Retour au site public
        </Link>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
