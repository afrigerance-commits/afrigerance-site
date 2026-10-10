"use client";
import { useState } from "react";
import { useDeviceStore } from "@/lib/hooks/use-device-store";
import { notesKey, parseVerseNotes, type VerseNotes } from "@/lib/quran/notes";
import { Button } from "@/components/ui/button";
function Editor({ chapter, verse }: { chapter: number; verse: number }) {
  const store = useDeviceStore<VerseNotes>(notesKey, {}, parseVerseNotes);
  if (!store.ready) return <p role="status" className="text-sm">Chargement de votre note…</p>;
  return <NoteForm chapter={chapter} verse={verse} store={store} />;
}
function NoteForm({ chapter, verse, store }: { chapter: number; verse: number; store: ReturnType<typeof useDeviceStore<VerseNotes>> }) {
  const key = `${chapter}:${verse}`;
  const [text, setText] = useState(store.value[key]?.text ?? "");
  const [message, setMessage] = useState("");
  return <form className="mt-3 space-y-3" onSubmit={e => { e.preventDefault(); const notes = { ...store.value }; if (text.trim()) notes[key] = { chapter, verse, text: text.trim(), updated: new Date().toISOString() }; else delete notes[key]; if (store.save(notes)) setMessage(text.trim() ? "Note enregistrée sur cet appareil." : "Note supprimée."); }}><label className="block text-sm" htmlFor={`note-${key}`}>Ma note personnelle sur {key}</label><textarea id={`note-${key}`} maxLength={4000} rows={4} value={text} onChange={e => { setText(e.target.value); setMessage(""); }} className="w-full resize-y rounded-xl border border-border bg-background p-3 text-base leading-7" /><p className="text-xs text-muted">Vos réflexions personnelles, distinctes du verset et de son tafsîr. Elles restent sur cet appareil.</p><Button type="submit" variant="outline">Enregistrer la note</Button>{message && <p role="status" className="text-sm text-primary">{message}</p>}{store.error && <p role="alert" className="text-sm text-red-700">{store.error}</p>}</form>;
}
export function VerseNoteEditor({ chapter, verse }: { chapter: number; verse: number }) {
  const [open, setOpen] = useState(false);
  return <details className="mt-3 rounded-xl border border-border/60 px-3 py-1" onToggle={e => setOpen(e.currentTarget.open)}><summary className="min-h-11 cursor-pointer py-3 text-sm font-medium text-primary">Ma note personnelle</summary>{open && <Editor chapter={chapter} verse={verse} />}</details>;
}
