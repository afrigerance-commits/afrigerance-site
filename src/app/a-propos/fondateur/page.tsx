import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// La biographie reste hors ligne jusqu’à réception d’un texte validé.
export default function FondateurPage() { redirect("/a-propos"); }
