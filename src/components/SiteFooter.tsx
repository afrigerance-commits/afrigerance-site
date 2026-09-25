import Link from "next/link";
import { footerNav } from "@/content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="site-container flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo width={180} className="h-12 sm:h-[3.75rem]" />
        <nav aria-label="Liens du pied de page">
          <ul className="flex flex-wrap items-center gap-x-9 gap-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-sm text-[0.9375rem] font-medium text-ink transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
