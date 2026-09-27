"use client";

import { useEffect, useRef } from "react";
import type { SubmissionMeta } from "@/lib/requests/types";

function newKey(): string {
  const cryptoApi = globalThis.crypto;
  if (typeof cryptoApi.randomUUID === "function") return cryptoApi.randomUUID();
  // Repli pour les pages servies sans HTTPS (randomUUID y est indisponible).
  const bytes = cryptoApi.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Métadonnées d'envoi d'un formulaire :
 * - une clé unique, réutilisée si le même formulaire est renvoyé (le serveur n'enregistre qu'une fois) ;
 * - le temps passé sur le formulaire (les envois instantanés sont refusés comme automatiques).
 */
export function useSubmissionMeta() {
  const startedAt = useRef(0);
  const key = useRef("");

  useEffect(() => {
    startedAt.current = performance.now();
  }, []);

  return {
    meta(): SubmissionMeta {
      if (!key.current) key.current = newKey();
      return {
        idempotencyKey: key.current,
        elapsedMs: Math.round(performance.now() - startedAt.current),
      };
    },
    /** Nouveau formulaire vierge : nouvelle clé et nouveau chronomètre. */
    renew() {
      key.current = "";
      startedAt.current = performance.now();
    },
  };
}
