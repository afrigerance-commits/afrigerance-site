"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Barre de progression de lecture, fixée en haut du viewport, qui suit le
 * défilement de la page (pas d'un conteneur interne) avec un léger lissage
 * ressort. N'apparaît pas et ne gêne rien sous `prefers-reduced-motion`
 * (la progression reste visible, seul le lissage du ressort est désactivé
 * par le navigateur lui-même via `scroll-behavior`).
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-accent"
      style={{ scaleX }}
      role="progressbar"
      aria-label="Progression de lecture"
    >
      {/* Pointe lumineuse en tête de la barre : la connaissance qui avance avec la lecture. */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold-500 shadow-[0_0_10px_3px_rgba(198,166,103,0.65)]"
      />
    </motion.div>
  );
}
