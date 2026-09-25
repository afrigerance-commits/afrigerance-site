"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { headerCta, mainNav, routes } from "@/content/site";
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "./icons";

function isActive(pathname: string, href: string) {
  if (href === routes.home) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="flex items-center gap-3 lg:gap-10">
      <nav aria-label="Navigation principale" className="hidden lg:block">
        <ul className="flex items-center gap-8">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-sm text-[0.9375rem] font-medium transition-colors hover:text-brand ${
                    active ? "text-brand" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Link
        href={headerCta.href}
        className="hidden h-11 items-center gap-2.5 rounded-md bg-brand px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-brand-dark sm:inline-flex"
      >
        {headerCta.label}
        <ArrowUpRightIcon className="size-4" />
      </Link>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-ink/5 lg:hidden"
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <div
        ref={panelRef}
        id={menuId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-line bg-white shadow-lg shadow-ink/10 lg:hidden"
      >
        <nav aria-label="Navigation principale" className="site-container py-4">
          <ul className="flex flex-col">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={close}
                    className={`flex min-h-12 items-center rounded-md px-3 text-lg font-medium transition-colors hover:bg-ink/5 ${
                      active ? "text-brand" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={headerCta.href}
            onClick={close}
            className="mt-3 flex h-12 items-center justify-center gap-2.5 rounded-md bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark sm:hidden"
          >
            {headerCta.label}
            <ArrowUpRightIcon className="size-4" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
