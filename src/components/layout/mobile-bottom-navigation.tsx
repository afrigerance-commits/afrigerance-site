"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import { BookOpen, CirclePlay, House, LayoutGrid, ScrollText } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigationGroups } from "@/lib/site-config";

const tabs = [
  { href: "/", label: "Accueil", icon: House },
  { href: "/coran", label: "Coran", icon: BookOpen },
  { href: "/hadith", label: "Hadiths", icon: ScrollText },
  { href: "/videos", label: "Vidéos", icon: CirclePlay },
] as const;
const noSubscription = () => () => {};

export function MobileBottomNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const native = useSyncExternalStore(noSubscription, () => Capacitor.isNativePlatform(), () => false);
  if (pathname.startsWith("/admin")) return null;
  const active = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const moreActive = !tabs.some(tab => active(tab.href));
  return <nav className="mobile-app-dock" data-native={native} aria-label="Navigation de l’application">
    <div className="mobile-app-dock-items">
      {tabs.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="mobile-app-tab" aria-current={active(href) ? "page" : undefined}>
        <span className="mobile-app-tab-icon"><Icon size={21} strokeWidth={active(href) ? 2.2 : 1.7} aria-hidden="true" /></span>
        <span>{label}</span>
      </Link>)}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild><button type="button" className="mobile-app-tab" data-active={moreActive || open} aria-label="Plus de rubriques">
          <span className="mobile-app-tab-icon"><LayoutGrid size={21} strokeWidth={1.7} aria-hidden="true" /></span><span>Plus</span>
        </button></SheetTrigger>
        <SheetContent className="mobile-navigation-sheet" aria-describedby="mobile-menu-description">
          <SheetHeader><SheetTitle>Explorer MIRÂTH</SheetTitle><p id="mobile-menu-description" className="text-sm text-muted">Tous vos espaces de lecture et d’apprentissage.</p></SheetHeader>
          <div className="min-h-0 overflow-y-auto overscroll-contain pr-1">
            {navigationGroups.map(group => <section key={group.label} className="mb-5">
              <h2 className="mb-2 text-sm font-semibold text-accent-text">{group.label}</h2>
              <div className="grid grid-cols-2 gap-2">{group.links.map(item => <SheetClose key={item.href} asChild><Link href={item.href} aria-current={active(item.href) ? "page" : undefined} className="flex min-h-12 items-center rounded-xl border border-border bg-background px-3 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-primary">{item.label}</Link></SheetClose>)}</div>
            </section>)}
            <div className="mb-2 flex flex-wrap gap-2 border-t border-border pt-4">
              <SheetClose asChild><Link href="/compte" className="min-h-11 rounded-xl border border-border px-4 py-3 text-sm font-semibold">Mon compte</Link></SheetClose>
              <SheetClose asChild><Link href="/hors-ligne" className="min-h-11 rounded-xl border border-border px-4 py-3 text-sm font-semibold">Lectures hors ligne</Link></SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </nav>;
}
