import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { Logo } from "@/components/Logo";
import { PendingButton } from "@/components/admin/ui";
import { adminText } from "@/content/admin";
import { routes, site } from "@/content/site";
import { requireAdmin } from "@/lib/server/auth";

/** Pages protégées : toute visite sans session valide est redirigée vers la connexion. */
export default async function ProtectedAdminLayout({ children }: LayoutProps<"/admin">) {
  const admin = await requireAdmin();
  return (
    <>
      <header className="border-line border-b bg-white">
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            <Logo width={150} className="h-10" href="/admin/demandes" label={`${site.name}, ${adminText.areaName}`} />
            <span className="text-muted hidden border-l border-line pl-4 text-sm font-semibold sm:inline">
              {adminText.areaName}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="text-muted">
              {adminText.signedInAs} <span className="text-ink font-medium">{admin.email}</span>
            </span>
            <Link href={routes.home} className="text-brand-dark rounded-sm font-semibold underline underline-offset-2">
              {adminText.backToSite}
            </Link>
            <form action={logoutAction}>
              <PendingButton variant="secondary" pendingLabel={adminText.logout} className="min-h-10 px-4 text-sm">
                {adminText.logout}
              </PendingButton>
            </form>
          </div>
        </div>
      </header>
      <main id="contenu" className="site-container flex-1 py-8 sm:py-10">
        {children}
      </main>
    </>
  );
}
