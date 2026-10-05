"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
/** Le même DOM côté serveur et client, y compris sous reduced-motion. */
export function LightDivider({ className, tone = "default" }: { className?: string; tone?: "default" | "inverse" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { element.classList.add("light-divider-visible"); observer.disconnect(); }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={cn("light-divider relative mx-auto h-px w-full max-w-xs overflow-hidden", className)} aria-hidden="true">
    <div className={cn("absolute inset-0 bg-gradient-to-r from-transparent to-transparent", tone === "inverse" ? "via-ivory-50/25" : "via-border")} />
    <span className="light-divider-beam absolute inset-0"><span className="absolute right-0 h-px w-8 bg-gold-500" /></span>
  </div>;
}
