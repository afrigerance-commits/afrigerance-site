"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Animation géométrique islamique originale pour le premier écran : une étoile
 * à huit branches (khatam) et ses polygones concentriques, construite en SVG/CSS.
 * Purement décorative (aria-hidden) ; la rotation continue est désactivée par
 * `prefers-reduced-motion` via la classe `motion-safe:animate-spin-slow`.
 */
export function HeroGeometry() {
  const shouldReduceMotion = useReducedMotion();

  const star8 = (r: number) =>
    Array.from({ length: 16 })
      .map((_, i) => {
        const angle = (Math.PI / 8) * i - Math.PI / 2;
        const radius = i % 2 === 0 ? r : r * 0.42;
        const x = 200 + radius * Math.cos(angle);
        const y = 200 + radius * Math.sin(angle);
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      <motion.svg
        viewBox="0 0 400 400"
        className="h-[140%] w-[140%] max-w-none opacity-80 sm:h-[110%] sm:w-[110%]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <radialGradient id="hero-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#C6A667" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C6A667" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill="url(#hero-glow)" />
        <g className={shouldReduceMotion ? "" : "motion-safe:animate-spin-slow"} style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="200" r="150" fill="none" stroke="#C6A667" strokeOpacity="0.25" strokeWidth="0.75" />
          <polygon points={star8(150)} fill="none" stroke="#C6A667" strokeOpacity="0.45" strokeWidth="1" />
        </g>
        <g
          className={shouldReduceMotion ? "" : "motion-safe:animate-spin-slow-reverse"}
          style={{ transformOrigin: "200px 200px" }}
        >
          <polygon points={star8(110)} fill="none" stroke="#F8F5EE" strokeOpacity="0.5" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="#C6A667" strokeOpacity="0.3" strokeWidth="0.5" />
        </g>
        <polygon points={star8(60)} fill="none" stroke="#C6A667" strokeOpacity="0.6" strokeWidth="1.25" />
      </motion.svg>
    </div>
  );
}
