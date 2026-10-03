import type { Metadata } from "next";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { grantRole, revokeRole } from "@/lib/actions/roles";
import { userRoles } from "@/lib/site-config";
import type { UserRoleDb } from "@/lib/supabase/database.types";

export const metadata: Metadata = { title: "Utilisateurs", robots: { index: false } };

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: myRoles } = await supabase.from("user_roles").select("role").eq("user_id", user?.id ?? "");
  const isAdmin = myRoles?.some((r) => r.role === "administrateur") ?? false;

  const [{ data: profiles }, { data: allRoles }] = await Promise.all([
    supabase.from("profiles").select("id, display_name"),
    supabase.from("user_roles").select("user_id, role"),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Utilisateurs et rôles</h1>
      <p className="text-sm text-muted">
        Un même utilisateur peut cumuler plusieurs rôles. Seul un administrateur peut attribuer ou retirer un rôle.
      </p>

      <div className="flex flex-col gap-3">
        {profiles?.map((profile) => {
          const roles = (allRoles?.filter((r) => r.user_id === profile.id).map((r) => r.role) ?? []) as UserRoleDb[];
          return (
            <div key={profile.id} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-medium">{profile.display_name}</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {roles.length === 0 && <Badge variant="muted">Membre (aucun rôle particulier)</Badge>}
                  {roles.map((role) => (
                    <Badge key={role} variant="outline" className="gap-1">
                      {role}
                      {isAdmin && (
                        <form action={revokeRole.bind(null, profile.id, role)}>
                          <button type="submit" aria-label={`Retirer le rôle ${role}`}>
                            <X className="h-3 w-3" />
                          </button>
                        </form>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
              {isAdmin && (
                <form action={async (formData: FormData) => {
                  "use server";
                  const role = String(formData.get("role")) as UserRoleDb;
                  await grantRole(profile.id, role);
                }} className="mt-3 flex items-center gap-2">
                  <select
                    name="role"
                    className="h-9 rounded-lg border border-border bg-surface px-3 text-xs"
                    defaultValue="membre"
                  >
                    {userRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <Button type="submit" size="sm" variant="outline">
                    Attribuer
                  </Button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
