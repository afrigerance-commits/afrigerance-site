import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
vi.mock("@/components/islamic/quran-audio-player", () => ({ useQuranAudioContext: () => ({ reciterId:"ar.alafasy", section:false, playingVerse:null, playVerse:vi.fn() }), QuranAudioModeSelector: () => <span>Audio</span>, VersePlayButton: () => <button>Écouter</button> }));
vi.mock("@/components/islamic/quran-tafsir", () => ({ QuranTafsir: () => <div>Tafsir chargé sur demande</div> }));
vi.mock("@/components/quran/verse-note", () => ({ VerseNoteEditor: () => <textarea aria-label="Ma note" defaultValue="Note existante" /> }));
import { QuranReadingTools, QuranVerseContent } from "@/components/islamic/quran-reading-tools";
import { QuranDisplayOptions } from "@/components/islamic/quran-display-options";
afterEach(() => { cleanup(); localStorage.clear(); });
const reader = () => <QuranReadingTools chapter={1}><QuranVerseContent chapter={1} number={1} arabic="عَرَبِيّ ۖ" french="Sens en français" /></QuranReadingTools>;

it("keeps tafsir and notes absent until requested, including in French mode, and remembers options", async () => {
  const view = render(reader());
  fireEvent.click(screen.getByText("Ma lecture · langue, taille et affichage"));
  expect(screen.queryByText("Tafsir chargé sur demande")).toBeNull();
  expect(screen.queryByRole("textbox")).toBeNull();
  fireEvent.click(screen.getByRole("button", {name:"Français seulement"}));
  fireEvent.click(screen.getByRole("button", {name:"Afficher le tafsir"}));
  fireEvent.click(screen.getByRole("button", {name:"Afficher mes notes"}));
  expect(screen.getByText("Tafsir chargé sur demande")).toBeInTheDocument();
  expect(screen.getByRole("textbox",{name:"Ma note"})).toHaveValue("Note existante");
  view.unmount(); render(reader());
  await waitFor(() => expect(screen.getByRole("button",{name:"Afficher mes notes"})).toHaveAttribute("aria-pressed","true"));
  fireEvent.click(screen.getByRole("button", {name:"Afficher mes notes"}));
  expect(screen.queryByRole("textbox")).toBeNull();
  fireEvent.click(screen.getByRole("button", {name:"Afficher mes notes"}));
  expect(screen.getByRole("textbox")).toHaveValue("Note existante");
});

it("renders uninterrupted Arabic with original pause signs and retains verse audio", () => {
  render(reader());
  fireEvent.click(screen.getByText("Ma lecture · langue, taille et affichage"));
  fireEvent.click(screen.getByRole("button",{name:"Arabe seulement"}));
  fireEvent.click(screen.getByRole("button",{name:"Lecture en un bloc"}));
  const verse = screen.getByRole("button",{name:"Écouter à partir de 1:1"});
  expect(verse).toHaveAttribute("dir","rtl");
  expect(verse.textContent).toContain("ۖ");
  expect(verse.parentElement?.tagName).toBe("SPAN");
  expect(screen.queryByText("Sens en français")).toBeNull();
});

it("shares display settings across chapter controls", () => {
  render(<><QuranDisplayOptions /><QuranDisplayOptions /></>);
  fireEvent.click(screen.getAllByRole("button", {name:"Lecture en un bloc"})[0]);
  for (const button of screen.getAllByRole("button", {name:"Lecture en un bloc"})) expect(button).toHaveAttribute("aria-pressed","true");
});
