"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]:not(.is-revealed)";

/**
 * Moteur de mouvement du site, sans dépendance et sans rendu :
 * - révélations au défilement des éléments [data-reveal] (un seul IntersectionObserver) ;
 * - halo sous le pointeur sur les éléments [data-spotlight] ;
 * - effet magnétique discret sur les boutons [data-magnetic] ;
 * - profondeur des calques [data-depth] dans un conteneur [data-parallax].
 * Rien ne s'active si l'utilisateur a demandé de réduire les animations.
 */
export function MotionRoot() {
  const pathname = usePathname();

  // Révélations : relancées à chaque changement de page.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const frame = requestAnimationFrame(() => {
      const viewport = window.innerHeight;
      for (const element of document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)) {
        const box = element.getBoundingClientRect();
        // Déjà visible au chargement : affiché tel quel, sans clignotement.
        if (box.top < viewport * 0.9 && box.bottom > 0) element.classList.add("is-revealed");
        else observer.observe(element);
      }
      document.documentElement.classList.add("motion-live");
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  // Interactions au pointeur (souris ou stylet uniquement).
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduce.matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    let magnet: HTMLElement | null = null;
    let parallax: HTMLElement | null = null;

    const release = () => {
      if (magnet) magnet.style.translate = "";
      magnet = null;
    };

    const apply = () => {
      frame = 0;
      const event = last;
      if (!event) return;
      const target = event.target instanceof Element ? event.target : null;

      const spot = target?.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const box = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${event.clientX - box.left}px`);
        spot.style.setProperty("--my", `${event.clientY - box.top}px`);
      }

      const nextMagnet = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (nextMagnet !== magnet) release();
      if (nextMagnet) {
        magnet = nextMagnet;
        const box = nextMagnet.getBoundingClientRect();
        const dx = (event.clientX - (box.left + box.width / 2)) / box.width;
        const dy = (event.clientY - (box.top + box.height / 2)) / box.height;
        nextMagnet.style.translate = `${(dx * 8).toFixed(2)}px ${(dy * 6).toFixed(2)}px`;
      }

      const nextParallax = target?.closest<HTMLElement>("[data-parallax]") ?? null;
      if (parallax && nextParallax !== parallax) {
        parallax.style.setProperty("--px", "0");
        parallax.style.setProperty("--py", "0");
      }
      parallax = nextParallax;
      if (nextParallax) {
        const box = nextParallax.getBoundingClientRect();
        const px = ((event.clientX - box.left) / box.width) * 2 - 1;
        const py = ((event.clientY - box.top) / box.height) * 2 - 1;
        nextParallax.style.setProperty("--px", px.toFixed(3));
        nextParallax.style.setProperty("--py", py.toFixed(3));
      }
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      release();
      if (parallax) {
        parallax.style.setProperty("--px", "0");
        parallax.style.setProperty("--py", "0");
        parallax = null;
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      release();
    };
  }, []);

  return null;
}
