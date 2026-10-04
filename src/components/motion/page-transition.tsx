"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Transition entre deux pages, signature du site : un fondu léger accompagné
 * d'un bref halo de lumière doré qui traverse le haut de l'écran — la
 * connaissance qui s'ouvre sur une nouvelle page. `key={pathname}` force un
 * nouveau montage à chaque navigation, ce qui déclenche l'animation
 * d'entrée ; l'historique de Next.js App Router ne garantit pas que
 * l'ancienne page reste montée assez longtemps pour une sortie animée
 * complète, donc l'effet porte surtout sur l'arrivée — c'est délibéré plutôt
 * qu'un bug de timing.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname} className="relative">
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-40 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          initial={{ opacity: 0, scaleX: 0.3 }}
          animate={{ opacity: [0, 1, 0], scaleX: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
