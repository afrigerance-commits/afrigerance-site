"use server";

import { redirect } from "next/navigation";
import { isRequestStatus } from "@/lib/requests/types";
import { LOGIN_PATH, login, logout, requireAdmin, type LoginResult } from "@/lib/server/auth";
import { isUuid } from "@/lib/server/db";
import { resendRequestNotification, updateRequestStatus } from "@/lib/server/requests";

/**
 * Actions de l'espace administrateur.
 * Chaque action (sauf la connexion) vérifie elle-même la session : une action serveur
 * peut être appelée directement, sans passer par la page qui l'affiche.
 */

export type LoginState = { error?: Exclude<LoginResult, "ok">; email?: string };

export async function loginAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const result = await login(email, String(formData.get("password") ?? ""));
  if (result === "ok") redirect("/admin/demandes");
  return { error: result, email };
}

export async function logoutAction(): Promise<void> {
  await logout();
  redirect(`${LOGIN_PATH}?deconnexion=1`);
}

export async function updateStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = formData.get("status");
  if (!isUuid(id) || !isRequestStatus(status)) redirect("/admin/demandes");
  await updateRequestStatus(id, status);
  redirect(`/admin/demandes/${id}`);
}

export async function resendNotificationAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!isUuid(id)) redirect("/admin/demandes");
  const outcome = await resendRequestNotification(id);
  const flash = {
    sent: "envoyee",
    failed: "echec",
    busy: "en-cours",
    already_sent: "deja-envoyee",
    not_found: "echec",
  }[outcome];
  redirect(`/admin/demandes/${id}?notification=${flash}`);
}
