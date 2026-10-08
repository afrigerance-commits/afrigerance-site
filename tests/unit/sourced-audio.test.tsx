import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { SourcedAudio, InvocationAudio } from "@/components/islamic/sourced-audio";

afterEach(cleanup);

test("starting another recording pauses the current recording", () => {
  const pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  render(<><SourcedAudio src="/first.mp3" title="Premier" credit="Source" sourceUrl="https://example.com" /><SourcedAudio src="/second.mp3" title="Second" credit="Source" sourceUrl="https://example.com" /></>);
  fireEvent.play(screen.getByLabelText("Premier"));
  expect(pause).toHaveBeenCalledTimes(1);
  fireEvent.play(screen.getByLabelText("Second"));
  expect(pause).toHaveBeenCalledTimes(2);
  pause.mockRestore();
});

test("learning controls change playback speed and opt into looping", () => {
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  render(<SourcedAudio src="/first.mp3" title="Premier" credit="Source" sourceUrl="https://example.com" />);
  const audio = screen.getByLabelText("Premier") as HTMLAudioElement;
  expect(audio.loop).toBe(false);
  fireEvent.change(screen.getByLabelText("Vitesse : Premier"), { target: { value: "0.75" } });
  expect(audio.playbackRate).toBe(0.75);
  fireEvent.click(screen.getByLabelText("Rejouer le fichier en boucle"));
  expect(audio.loop).toBe(true);
  fireEvent.error(audio);
  expect(screen.getByRole("alert")).toHaveTextContent("Audio indisponible");
});

test("an unverified formula never gets a fabricated audio URL", () => {
  render(<InvocationAudio id="muslim-2721a" />);
  expect(screen.getByText(/en attente d’un enregistrement vérifié/)).toBeInTheDocument();
  expect(document.querySelector("audio")).toBeNull();
});
