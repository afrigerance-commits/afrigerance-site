import type { Metadata } from "next";
import { adminText } from "@/content/admin";

export const metadata: Metadata = {
  title: adminText.metaTitle,
  robots: { index: false, follow: false },
};

/** Espace administrateur : fond neutre, pas d'en-tête ni de pied de page publics. */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="bg-surface flex flex-1 flex-col">{children}</div>;
}
