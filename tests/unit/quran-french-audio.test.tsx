import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { QuranAudioProvider, useQuranAudioContext } from "@/components/islamic/quran-audio-player";
import { loadFrenchRecitation } from "@/lib/quran/reciters";

const arabic = new Map([[1, ["https://example.com/ar-7.mp3"]], [2, ["https://example.com/ar-8.mp3"]]]);
const french = new Map([[1, ["https://example.com/fr-7.mp3"]], [2, ["https://example.com/fr-8.mp3"]]]);
vi.mock("@/lib/quran/reciters", async original => ({
  ...await original<Record<string, unknown>>(),
  loadSectionRecitation: vi.fn(async () => arabic),
  loadFrenchRecitation: vi.fn(async () => french),
}));
let audio: FakeAudio;
class FakeAudio extends EventTarget {
  src = ""; paused = true; preload = ""; currentTime = 0;
  play = vi.fn(async () => { this.paused = false; this.dispatchEvent(new Event("playing")); });
  pause() { this.paused = true; this.dispatchEvent(new Event("pause")); }
  removeAttribute() { this.src = ""; }
  load() {}
  constructor() {
    super();
    // Capture the engine's latest element to dispatch real media events in tests.
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    audio = this;
  }
}
const verses = [{ number: 1, globalNumber: 7, sourceChapter: 1, sourceVerse: 7 }, { number: 2, globalNumber: 8, sourceChapter: 2, sourceVerse: 1 }];
function Controls() {
  const p = useQuranAudioContext();
  return <>
    <button onClick={() => p.chooseTranslation(!p.translationEnabled)}>Traduction</button>
    <button onClick={() => p.playVerse(1, true)}>Lire</button>
    <button onClick={() => p.playVerse(2, true)}>Suivant</button>
    <button onClick={() => p.chooseRepeatMode("verse")}>Répéter</button>
    <button onClick={() => p.chooseRepeatMode("surah")}>Boucler</button>
    <button onClick={p.pause}>Pause</button><button onClick={p.resume}>Reprendre</button>
    <button onClick={p.stop}>Stop</button>
    <output data-testid="position">{p.playingVerse ?? "stop"}:{p.phase}</output>
    {p.error && <p role="alert">{p.error}</p>}
  </>;
}
beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("Audio", FakeAudio);
  vi.mocked(loadFrenchRecitation).mockResolvedValue(french);
});
afterEach(() => { cleanup(); localStorage.clear(); vi.unstubAllGlobals(); });
function setup() { render(<QuranAudioProvider chapter={1} verses={verses}><Controls /></QuranAudioProvider>); }
async function start() {
  setup();
  await act(async () => {}); // device-preference restoration
  fireEvent.click(screen.getByText("Traduction"));
  fireEvent.click(screen.getByText("Lire"));
  await waitFor(() => expect(audio.src).toBe("https://example.com/ar-7.mp3"));
}
function end() { act(() => audio.dispatchEvent(new Event("ended"))); }
it("alternates Arabic/French before advancing, including a surah boundary", async () => {
  await start(); end();
  expect(audio.src).toBe("https://example.com/fr-7.mp3");
  expect(screen.getByTestId("position")).toHaveTextContent("1:french");
  end(); expect(audio.src).toBe("https://example.com/ar-8.mp3");
  end(); expect(audio.src).toBe("https://example.com/fr-8.mp3");
  end(); expect(screen.getByTestId("position")).toHaveTextContent("stop:arabic");
});
it("repeats the entire Arabic/French pair, and loops only after the last French verse", async () => {
  await start(); fireEvent.click(screen.getByText("Répéter"));
  end(); expect(audio.src).toBe("https://example.com/fr-7.mp3");
  end(); expect(audio.src).toBe("https://example.com/ar-7.mp3");
  fireEvent.click(screen.getByText("Boucler"));
  end(); end(); expect(audio.src).toBe("https://example.com/ar-8.mp3");
  end(); expect(audio.src).toBe("https://example.com/fr-8.mp3");
  end(); expect(audio.src).toBe("https://example.com/ar-7.mp3");
});
it("pauses and resumes French without switching phase, and a verse jump restarts Arabic", async () => {
  await start(); end(); audio.currentTime = 4;
  fireEvent.click(screen.getByText("Pause")); expect(audio.paused).toBe(true);
  fireEvent.click(screen.getByText("Reprendre"));
  await waitFor(() => expect(audio.paused).toBe(false));
  expect(audio.currentTime).toBe(4); expect(audio.src).toBe("https://example.com/fr-7.mp3");
  fireEvent.click(screen.getByText("Suivant"));
  await waitFor(() => expect(audio.src).toBe("https://example.com/ar-8.mp3"));
});
it("stops on a missing French recording instead of silently skipping its translation", async () => {
  await start(); end();
  act(() => audio.dispatchEvent(new Event("error")));
  expect(screen.getByRole("alert")).toHaveTextContent("traduction française du verset 1");
  expect(screen.getByTestId("position")).toHaveTextContent("stop:arabic");
  expect(audio.src).toBe("");
});
it("cancels a pending catalog when translation is disabled, and keeps Arabic-only mode functional", async () => {
  let resolve!: (value: Map<number, string[]>) => void;
  vi.mocked(loadFrenchRecitation).mockReturnValueOnce(new Promise(done => { resolve = done; }));
  setup(); await act(async () => {});
  fireEvent.click(screen.getByText("Traduction")); fireEvent.click(screen.getByText("Lire"));
  await waitFor(() => expect(resolve).toBeDefined());
  fireEvent.click(screen.getByText("Traduction"));
  await act(async () => resolve(french));
  expect(audio.src).toBe("");
  fireEvent.click(screen.getByText("Lire"));
  await waitFor(() => expect(audio.src).toBe("https://example.com/ar-7.mp3"));
  end(); expect(audio.src).toBe("https://example.com/ar-8.mp3");
});
