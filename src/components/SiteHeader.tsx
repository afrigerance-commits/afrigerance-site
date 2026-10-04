"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { headerCta, headerSecondaryCta, mainNav, routes, site, uiText } from "@/content/site";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon } from "./icons";
import { ButtonArrow, buttonClasses } from "./ui/button";

function isActive(pathname: string, href: string) {
  if (href === routes.home) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * En-tête flottant : une barre blanche (le logo d'origine reste sur fond clair) posée sur les bandeaux.
 * Il se masque quand on descend et réapparaît dès qu'on remonte. Sur mobile, menu plein écran.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // État au défilement (rAF, écouteur passif).
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > lastY + 8 && y > 220) setHidden(true);
      else if (y < lastY - 8 || y < 120) setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Menu mobile ouvert : le reste de la page devient inerte, Échap ferme le menu.
  useEffect(() => {
    if (!open) return;
    const outside = [document.getElementById("contenu"), document.querySelector("footer")].filter(
      (element): element is HTMLElement => element !== null,
    );
    outside.forEach((element) => (element.inert = true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      outside.forEach((element) => (element.inert = false));
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      data-hidden={hidden && !open ? "true" : undefined}
      className="fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-out-expo data-[hidden=true]:-translate-y-[130%]"
    >
      {/* Menu mobile plein écran */}
      <div
        id={menuId}
        hidden={!open}
        className="bg-anthracite-band grain on-dark fixed inset-0 overflow-y-auto text-white lg:hidden"
      >
        <nav aria-label={uiText.mainNavLabel} className="site-container flex min-h-full flex-col pt-28 pb-10">
          <p className="eyebrow text-white load-fade">{uiText.menuTitle}</p>
          <ul className="mt-6 flex flex-col">
            {[{ label: uiText.home, href: routes.home }, ...mainNav].map((item, index) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="load-rise border-b border-white/10" style={{ "--i": index } as CSSProperties}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={close}
                    className={`group flex min-h-16 items-center justify-between rounded-sm py-3 font-display text-[2rem] font-semibold tracking-[-0.03em] transition-colors ${
                      active ? "text-brand-soft" : "text-white"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden="true" className="font-mono text-sm text-white/60">
                      0{index + 1}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="load-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--i": mainNav.length + 1 } as CSSProperties}>
            <Link
              href={headerCta.href}
              aria-current={isActive(pathname, headerCta.href) ? "page" : undefined}
              onClick={close}
              className={buttonClasses("primary", "lg", "w-full sm:w-auto")}
            >
              {headerCta.label}
              <ButtonArrow />
            </Link>
            <Link
              href={headerSecondaryCta.href}
              aria-current={isActive(pathname, headerSecondaryCta.href) ? "page" : undefined}
              onClick={close}
              className={buttonClasses("onDark", "lg", "w-full sm:w-auto")}
            >
              {headerSecondaryCta.label}
            </Link>
          </div>
          <p className="mt-auto pt-12 text-sm text-white/80">{site.tagline}.</p>
        </nav>
      </div>

      {/* Barre flottante */}
      <div className="site-container relative pt-3 sm:pt-4">
        <div
          className={`flex h-16 items-center justify-between gap-4 rounded-2xl bg-white pr-2 pl-3 ring-1 ring-ink/[0.07] transition-shadow duration-500 sm:h-[4.75rem] sm:pr-3 sm:pl-5 ${
            scrolled ? "shadow-[0_22px_60px_-28px_rgb(17_19_23/0.55)]" : "shadow-[0_14px_44px_-26px_rgb(17_19_23/0.5)]"
          }`}
        >
          <Logo width={200} eager className="h-10 sm:h-[3.25rem]" />

          <nav aria-label={uiText.mainNavLabel} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-300 ${
                        active ? "bg-surface text-ink" : "text-ink/75 hover:bg-surface/70 hover:text-ink"
                      }`}
                    >
                      {item.label}
                      {active ? <span aria-hidden="true" className="bg-brand absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={headerSecondaryCta.href}
              aria-current={isActive(pathname, headerSecondaryCta.href) ? "page" : undefined}
              className="hidden min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-semibold whitespace-nowrap text-ink transition-colors hover:bg-surface xl:inline-flex"
            >
              {headerSecondaryCta.label}
            </Link>
            <Link
              href={headerCta.href}
              aria-current={isActive(pathname, headerCta.href) ? "page" : undefined}
              data-magnetic=""
              className={buttonClasses("primary", "md", "min-h-11 !px-5 whitespace-nowrap max-sm:hidden")}
            >
              {headerCta.label}
              <ButtonArrow className="size-4 [&>svg]:size-4" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? uiText.closeMenu : uiText.openMenu}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-ink transition-colors hover:bg-line lg:hidden"
            >
              {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
