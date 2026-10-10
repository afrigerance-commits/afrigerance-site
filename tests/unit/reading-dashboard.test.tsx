import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ReadingDashboard } from "@/components/quran/reading-dashboard";
import { NotesLibrary } from "@/components/quran/notes-library";
import { notesKey } from "@/lib/quran/notes";
afterEach(() => { cleanup(); localStorage.clear(); });
it("validates a chosen objective explicitly and restores its history", async () => {
  render(<ReadingDashboard />);
  const validate = screen.getByRole("button", { name: "J’ai lu mon objectif" });
  await waitFor(() => expect(validate).not.toBeDisabled());
  fireEvent.change(screen.getByLabelText("Quantité"),{ target: { value: "5" } });
  fireEvent.click(validate);
  expect(screen.getByRole("status")).toHaveTextContent("5 versets déclarés lus");
  const saved = JSON.parse(localStorage.getItem("mirath:reading-plan:v1")!);
  expect(saved.completed).toBe(5);
  expect(Object.values(saved.logs)).toEqual([5]);
  cleanup(); render(<ReadingDashboard />);
  await waitFor(() => expect(screen.getByText("5 / 6236 versets")).toBeInTheDocument());
});
it("renders personal notes as text, without interpreting HTML", async () => {
  localStorage.setItem(notesKey,JSON.stringify({ "1:1": { chapter:1, verse:1, text: '<script>fake</script>Ma note', updated:"2026-10-10T00:00:00Z" } }));
  const { container } = render(<NotesLibrary />);
  await waitFor(() => expect(screen.getByText('<script>fake</script>Ma note')).toBeInTheDocument());
  expect(container.querySelector("script")).toBeNull();
  expect(screen.getByRole("link",{ name:/Sourate 1/ })).toHaveAttribute("href","/coran/1#verset-1");
});
