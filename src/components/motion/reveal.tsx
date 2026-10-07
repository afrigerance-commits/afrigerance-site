"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/** Contenu toujours visible : le mouvement accompagne la lecture sans écran vide. */
export function Reveal({ children, delay = 0, className, as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    if (element.getBoundingClientRect().top <= window.innerHeight) return;
    const observer = new IntersectionObserver(entries => { if (entries.some(e=>e.isIntersecting)) { element.classList.add("reveal-arrived"); observer.disconnect(); } }, { rootMargin: "0px 0px 120px 0px" });
    observer.observe(element);
    return ()=>observer.disconnect();
  }, []);
  const Tag = as;
  return <Tag ref={(el: HTMLElement | null)=>{ref.current=el}} className={className} style={{ "--reveal-delay": `${Math.min(delay,.25)}s` } as CSSProperties}>{children}</Tag>;
}
