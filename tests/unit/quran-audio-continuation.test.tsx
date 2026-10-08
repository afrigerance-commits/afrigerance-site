import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PersistentQuranAudio, QuranAudioProvider, useQuranAudioContext, VersePlayButton } from "@/components/islamic/quran-audio-player";
vi.mock("@/lib/quran/reciters", async importOriginal => {
  const original = await importOriginal<Record<string, unknown>>();
  return { ...original, loadSectionRecitation: vi.fn(async () => new Map([[1,["https://example.com/1.mp3"]],[2,["https://example.com/2.mp3"]]])) };
});
let audio: FakeAudio;
class FakeAudio extends EventTarget {
  src = ""; preload = ""; paused = false;
  play = vi.fn(async () => { this.paused=false; this.dispatchEvent(new Event("playing")); });
  pause() { this.paused=true; }
  load() {}
  removeAttribute() { this.src=""; }
  constructor() { super(); audio=this; }
}
function Controls() {
  const player = useQuranAudioContext();
  return <><VersePlayButton verseNumber={1} /><output>{player.playingVerse ?? "stopped"}</output></>;
}
afterEach(() => vi.unstubAllGlobals());
it("a verse click continues across a surah boundary and stops at the section end", async () => {
  vi.stubGlobal("Audio",FakeAudio);
  const verses = [{number:1,globalNumber:7,sourceChapter:1,sourceVerse:7},{number:2,globalNumber:8,sourceChapter:2,sourceVerse:1}];
  const view=render(<QuranAudioProvider chapter={1} verses={verses}><Controls /></QuranAudioProvider>);
  fireEvent.click(screen.getByRole("button",{name:"Écouter le verset 1"}));
  await waitFor(() => expect(audio.src).toBe("https://example.com/1.mp3"));
  act(() => audio.dispatchEvent(new Event("ended")));
  expect(audio.src).toBe("https://example.com/2.mp3");
  expect(screen.getByRole("status")).toHaveTextContent("2");
  act(() => audio.dispatchEvent(new Event("ended")));
  expect(screen.getByRole("status")).toHaveTextContent("stopped");
  view.unmount();
});

it("keeps the playing audio mounted after leaving the reader", async () => {
  vi.stubGlobal("Audio",FakeAudio);
  const verses=[{number:1,globalNumber:7,sourceChapter:1,sourceVerse:7},{number:2,globalNumber:8,sourceChapter:2,sourceVerse:1}];
  const view=render(<PersistentQuranAudio><QuranAudioProvider chapter={1} verses={verses}><Controls/></QuranAudioProvider></PersistentQuranAudio>);
  fireEvent.click(screen.getByRole("button",{name:"Écouter le verset 1"}));
  await waitFor(()=>expect(audio.src).toBe("https://example.com/1.mp3"));
  const activeAudio=audio;
  view.rerender(<PersistentQuranAudio><h1>Ma routine</h1></PersistentQuranAudio>);
  expect(audio).toBe(activeAudio);
  expect(audio.paused).toBe(false);
  act(()=>audio.dispatchEvent(new Event("ended")));
  expect(audio.src).toBe("https://example.com/2.mp3");
  expect(screen.getByLabelText("Mini-lecteur du Coran")).toHaveTextContent("Sourate 2 · verset 1");
  fireEvent.click(screen.getByRole("button",{name:"Mettre la récitation en pause"}));
  expect(audio.paused).toBe(true);
  fireEvent.click(screen.getByRole("button",{name:"Reprendre la récitation"}));
  await waitFor(()=>expect(audio.paused).toBe(false));
  view.unmount();
});
