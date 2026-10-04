import { redirect } from "next/navigation";

/** /admin mène directement à la liste des demandes (la mise en page vérifie la connexion). */
export default function AdminHome() {
  redirect("/admin/demandes");
}
