"use client";

import { useSyncExternalStore } from "react";

const key = "mirath:quran:display";
const event = "mirath-quran-display";
const defaults = { tafsir: false, notes: false, continuous: false };
let memory = "";
type Options = typeof defaults;
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(event, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(event, callback); };
}
function snapshot() {
  try { return localStorage.getItem(key) ?? ""; } catch { return memory; }
}
export function useQuranDisplay() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  let options = defaults;
  try {
    const saved = JSON.parse(raw);
    options = { tafsir: saved?.tafsir === true, notes: saved?.notes === true, continuous: saved?.continuous === true };
  } catch { /* Defaults keep the reader uncluttered. */ }
  return { ...options, toggle: (name: keyof Options) => {
    memory = JSON.stringify({ ...options, [name]: !options[name] });
    try { localStorage.setItem(key, memory); } catch { /* Session-only options still work without storage. */ }
    window.dispatchEvent(new Event(event));
  } };
}

export function QuranDisplayOptions() {
  const display = useQuranDisplay();
  return <div className="flex w-full flex-wrap gap-2 border-t border-gold-600/20 pt-3" role="group" aria-label="Affichage du lecteur">
    {([['continuous', 'Lecture en un bloc'], ['tafsir', 'Afficher le tafsir'], ['notes', 'Afficher mes notes']] as const).map(([name, label]) =>
      <button key={name} type="button" aria-pressed={display[name]} onClick={() => display.toggle(name)} className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-medium ${display[name] ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-white/70 dark:bg-white/5'}`}>{label}</button>)}
  </div>;
}
