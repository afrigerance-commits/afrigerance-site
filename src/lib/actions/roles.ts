"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { UserRoleDb } from "@/lib/supabase/database.types";

export async function grantRole(userId: string, role: UserRoleDb) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  await supabase.from("user_roles").insert({ user_id: userId, role, granted_by: user?.id });
  revalidatePath("/admin/utilisateurs");
}

export async function revokeRole(userId: string, role: UserRoleDb) {
  const supabase = await createClient();
  await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role);
  revalidatePath("/admin/utilisateurs");
}
