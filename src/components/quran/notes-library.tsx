"use client";
import Link from "next/link";
import { useDeviceStore } from "@/lib/hooks/use-device-store";
import { notesKey, parseVerseNotes, type VerseNotes } from "@/lib/quran/notes";
import { Button } from "@/components/ui/button";
export function NotesLibrary() {
  const store = useDeviceStore<VerseNotes>(notesKey, {}, parseVerseNotes);
  const notes = Object.entries(store.value).sort(([,a],[,b]) => b.updated.localeCompare(a.updated));
  function exportNotes() { const url = URL.createObjectURL(new Blob([JSON.stringify(store.value, null, 2)], { type: "application/json" })); const a = document.createElement("a"); a.href = url; a.download = "MIRATH-notes-personnelles.json"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
  return <section className="mt-8"><Button onClick={exportNotes} disabled={!notes.length} variant="outline">Exporter mes notes</Button><p className="mt-3 text-sm text-muted">Gardez une copie avant de désinstaller l’application ou d’effacer les données du navigateur.</p>{store.error && <p role="alert">{store.error}</p>}{store.ready && !notes.length && <p className="mt-8 text-muted">Aucune note. Ouvrez « Ma note personnelle » sous un verset pour commencer.</p>}<ul className="mt-6 grid gap-4 sm:grid-cols-2">{notes.map(([key,n]) => <li key={key} className="rounded-2xl border border-border bg-surface p-5"><Link href={`/coran/${n.chapter}#verset-${n.verse}`} className="font-semibold text-primary underline">Sourate {n.chapter} · verset {n.verse}</Link><p className="mt-4 whitespace-pre-wrap break-words text-base leading-7">{n.text}</p><Button variant="ghost" className="mt-4" onClick={() => { if (window.confirm(`Supprimer la note sur ${key} ?`)) { const next = { ...store.value }; delete next[key]; store.save(next); } }}>Supprimer</Button></li>)}</ul></section>;
}
