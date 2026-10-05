"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, BookOpen, ScrollText, CirclePlay } from "lucide-react";
import { QuickSearch } from "@/components/layout/quick-search";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { disciplines, siteConfig } from "@/lib/site-config";

export function Header({ authSlot }: { authSlot?: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0; setScrolled(window.scrollY > 24);
        const range = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${range > 0 ? Math.min(1, window.scrollY / range) : 0})`;
      });
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));
  const featuredIcons = [null, BookOpen, ScrollText, CirclePlay];
  const secondaryActive = siteConfig.nav.secondary.some((item) => isActive(item.href));

  return (
    <header className={cn("sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md transition-[background-color,box-shadow] duration-300", scrolled && "nav-scrolled")}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-2 px-4 sm:h-20 sm:gap-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {siteConfig.nav.primary.map((item, i) => {
            const Icon = featuredIcons[i];
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-sm font-semibold transition-colors duration-200",
                  "text-foreground/75 hover:bg-surface-muted hover:text-primary",
                  isActive(item.href) && "border-accent bg-emerald-900 text-ivory-50 shadow-md dark:bg-gold-500 dark:text-ink-950",
                )}
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                {item.label}
              </Link>
            );
          })}
          <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface-muted hover:text-foreground",
                      secondaryActive && "text-primary",
                    )}
                  >
                    Plus
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-[min(75vh,600px)] w-[min(90vw,560px)] overflow-y-auto p-3">
                  <p className="px-2.5 pb-2 text-xs font-semibold uppercase tracking-widest text-muted">Autres rubriques</p>
                  <div className="grid grid-cols-2 gap-1 border-b border-border pb-3">
                    {siteConfig.nav.secondary.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="rounded-md px-2.5 py-2 text-sm font-medium">{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <p className="px-2.5 pb-2 pt-4 text-xs font-semibold uppercase tracking-widest text-muted">Disciplines</p>
                  <div className="grid grid-cols-2 gap-1">
                  {disciplines.map((d) => (
                    <DropdownMenuItem key={d.slug} asChild>
                      <Link href={`/explorer-le-savoir/${d.slug}`} className="flex flex-col items-start gap-0.5 rounded-md p-2.5">
                        <span className="text-sm font-medium">{d.name}</span>
                        <span className="text-xs text-muted">{d.description}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  </div>
                </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-1.5">
          <QuickSearch />
          <ThemeToggle />
          {authSlot}
          <Button variant="accent" size="sm" asChild className="ml-1 hidden sm:inline-flex">
            <Link href="/apprendre">Apprendre</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-display text-3xl">Explorer MIRÂTH</SheetTitle>
              </SheetHeader>
              <nav className="min-h-0 flex-1 overflow-y-auto pr-1" aria-label="Navigation mobile">
                <div className="flex flex-col gap-2">
                {siteConfig.nav.primary.map((item, i) => {
                  const Icon = featuredIcons[i];
                  return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                        i === 0 ? "text-foreground/80" : "border border-accent/40 bg-surface-muted text-primary",
                        isActive(item.href) && "bg-emerald-900 text-ivory-50 dark:bg-gold-500 dark:text-ink-950",
                      )}
                    >
                      {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                      {item.label}
                    </Link>
                  </SheetClose>
                  );
                })}
                </div>
                <p className="mt-7 mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted">Explorer aussi</p>
                <div className="flex flex-col gap-1">
                  {siteConfig.nav.secondary.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link href={item.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface-muted">{item.label}</Link>
                    </SheetClose>
                  ))}
                </div>
                <details className="mt-4 rounded-xl border border-border p-3">
                  <summary className="cursor-pointer text-sm font-semibold">Toutes les disciplines</summary>
                  <div className="mt-2 flex flex-col gap-1">
                    {disciplines.map((d) => (
                      <SheetClose asChild key={d.slug}>
                        <Link href={`/explorer-le-savoir/${d.slug}`} className="rounded-lg px-2 py-2 text-sm text-muted hover:bg-surface-muted">{d.name}</Link>
                      </SheetClose>
                    ))}
                  </div>
                </details>
              </nav>
              <div className="pt-4">
                <SheetClose asChild>
                  <Button variant="accent" className="w-full" asChild>
                    <Link href="/apprendre">Commencer à apprendre</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div ref={progress} className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
