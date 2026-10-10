import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
vi.mock("@/components/islamic/quran-audio-player", () => ({ useQuranAudioContext: () => ({ reciterId:"ar.alafasy", section:false, playingVerse:null, playVerse:vi.fn() }), VersePlayButton: () => <button>Écouter</button> }));
vi.mock("@/components/islamic/quran-tafsir", () => ({ QuranTafsir: () => <div>Commentaire</div> }));
import { QuranReadingTools, QuranVerseContent } from "@/components/islamic/quran-reading-tools";
afterEach(() => { cleanup(); localStorage.clear(); });
it("hides the verse and its translation, reveals it on request and can hide it again", () => {
  render(<QuranReadingTools chapter={1}><QuranVerseContent chapter={1} number={1} arabic="Texte arabe test" french="Traduction test" /></QuranReadingTools>);
  expect(screen.getByText(/Texte arabe test/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{ name:"Masquer le texte" }));
  expect(screen.queryByText(/Texte arabe test/)).toBeNull();
  expect(screen.queryByText("Traduction test")).toBeNull();
  expect(screen.queryByText("Commentaire")).toBeNull();
  fireEvent.click(screen.getByRole("button",{ name:"Révéler le verset 1" }));
  expect(screen.getByText(/Texte arabe test/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{ name:"Masquer à nouveau ce verset" }));
  expect(screen.queryByText(/Texte arabe test/)).toBeNull();
});
