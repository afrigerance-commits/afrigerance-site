import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/Logo";
import { adminText } from "@/content/admin";
import { getCurrentAdmin } from "@/lib/server/auth";

export const metadata: Metadata = {
  title: adminText.login.title,
};

export default async function LoginPage({ searchParams }: PageProps<"/admin/connexion">) {
  if (await getCurrentAdmin()) redirect("/admin/demandes");
  const { deconnexion } = await searchParams;
  const text = adminText.login;

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm sm:p-10">
        <Logo width={180} className="h-12" />
        <h1 className="text-ink mt-8 text-3xl font-bold tracking-[-0.02em]">{text.title}</h1>
        <p className="text-muted mt-2">{text.intro}</p>
        <LoginForm notice={deconnexion ? text.loggedOut : undefined} />
      </div>
    </main>
  );
}
