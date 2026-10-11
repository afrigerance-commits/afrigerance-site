"use client";

import { useState } from "react";
import { BookCard } from "@/components/content/book-card";
import { getBookAccess } from "@/lib/book-access";
import type { Book } from "@/lib/types/content";

const normalize = (value: string) => value.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("fr");

export function BookCatalog({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [access, setAccess] = useState("");
  const disciplines = [...new Set(books.map(book => book.discipline))].sort();
  const results = books.filter(book => (!discipline || book.discipline === discipline) && (!access || getBookAccess(book).mode === access) && normalize(`${book.titreOriginal} ${book.titreFrancais} ${book.auteur} ${book.discipline}`).includes(normalize(query.trim())));
  return <section className="mt-10" aria-label="Catalogue des ouvrages">
    <div className="grid gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-3">
      <label className="text-sm font-medium">Rechercher un ouvrage<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Titre, auteur, thème…" className="mt-2 min-h-11 w-full rounded-xl border border-border bg-background px-3" /></label>
      <label className="text-sm font-medium">Discipline<select value={discipline} onChange={event => setDiscipline(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-border bg-background px-3"><option value="">Toutes les disciplines</option>{disciplines.map(value => <option key={value}>{value}</option>)}</select></label>
      <label className="text-sm font-medium">Accès<select value={access} onChange={event => setAccess(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-border bg-background px-3"><option value="">Tous les ouvrages</option><option value="read">Lecture intégrale ici</option><option value="external">Consultation externe</option><option value="notice">Notices documentaires</option></select></label>
    </div>
    <p role="status" className="my-5 text-sm text-muted">{results.length} ouvrage{results.length > 1 ? "s" : ""}</p>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map(book => <BookCard key={book.slug} book={book} />)}</div>
    {!results.length && <div className="rounded-2xl border border-border p-8 text-center"><p>Aucun ouvrage ne correspond à ces critères.</p><button type="button" onClick={() => { setQuery(""); setDiscipline(""); setAccess(""); }} className="mt-4 min-h-11 rounded-xl bg-primary px-5 text-primary-foreground">Réinitialiser les filtres</button></div>}
  </section>;
}
