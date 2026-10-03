import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { SignupForm } from "@/components/forms/signup-form";

export const metadata: Metadata = { title: "Créer un compte", robots: { index: false } };

export default function InscriptionPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Mon espace" title="Créer un compte" description="Facultatif : un compte permet de sauvegarder votre progression et vos favoris." />
      <SignupForm />
      <p className="mt-6 text-center text-sm text-muted">
        Déjà inscrit ?{" "}
        <Link href="/connexion" className="font-medium text-primary hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
