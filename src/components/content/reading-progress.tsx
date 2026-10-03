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
    />
  );
}
