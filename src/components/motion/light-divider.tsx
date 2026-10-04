"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Signature de motion design du site : un point de lumière traverse une
 * ligne fine une seule fois, lorsqu'elle entre dans le viewport — la
 * connaissance qui se transmet d'une section à l'autre. Utilisé avec
 * parcimonie (pas à chaque séparation de section) pour rester une
 * ponctuation, pas un effet répété. Statique sous `prefers-reduced-motion`.
 */
export function LightDivider({ className, tone = "default" }: { className?: string; tone?: "default" | "inverse" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn("relative mx-auto h-px w-full max-w-xs", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent to-transparent",
          tone === "inverse" ? "via-ivory-50/25" : "via-border",
        )}
      />
      {!shouldReduceMotion && (
        <motion.span
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold-500 shadow-[0_0_14px_4px_rgba(198,166,103,0.65)]"
          initial={{ left: "0%", opacity: 0 }}
          whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </div>
  );
}
