"use client";
import { getPersonalItem, setPersonalItem, scopedKey } from "@/lib/account/storage";

import { useEffect, useState } from "react";
export function useDeviceStore<T>(key: string, initial: T, parse: (raw: string | null) => T) {
  const [value, setValue] = useState(initial);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      try { const saved = parse(getPersonalItem(key)); if (!cancelled) { setValue(saved); setReady(true); } }
      catch { if (!cancelled) { setReady(true); setError("Le stockage de cet appareil est indisponible."); } }
    };
    queueMicrotask(load);
    const changed = (event: StorageEvent) => { if (event.key === key || event.key === null) load(); };
    const local = (event: Event) => { if ((event as CustomEvent).detail === key || !(event as CustomEvent).detail) load(); };
    window.addEventListener("mirath-device-storage", local);
    window.addEventListener("mirath-account-storage", local);
    window.addEventListener("storage", changed);
    return () => { cancelled = true; window.removeEventListener("storage", changed); window.removeEventListener("mirath-device-storage", local); window.removeEventListener("mirath-account-storage", local); };
  }, [key, parse]);
  function save(next: T) {
    try { setPersonalItem(key, JSON.stringify(next)); setValue(next); setError(""); window.dispatchEvent(new CustomEvent("mirath-device-storage", { detail: key })); return true; }
    catch { setError("Enregistrement impossible. Libérez de l’espace ou autorisez le stockage."); return false; }
  }
  return { value, save, ready, error, scopeKey: scopedKey(key) };
}
