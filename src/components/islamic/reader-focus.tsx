"use client";
import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, X } from "lucide-react";

export function ReaderFocus({ children }: { children: ReactNode }) {
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!focused) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setFocused(false); };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [focused]);
  return <div className={focused ? "reader-focused" : "reader-standard"}>
    <div className="reader-mode-control sticky top-20 z-30 -mb-2 flex justify-end bg-background/95 py-2 backdrop-blur-sm">
      <button type="button" aria-pressed={focused} onClick={() => setFocused(value => !value)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/40 bg-surface px-4 py-2 text-sm font-semibold text-primary">
        {focused ? <X className="size-4" aria-hidden="true" /> : <BookOpen className="size-4" aria-hidden="true" />}{focused ? "Quitter la lecture concentrée" : "Lecture concentrée"}
      </button>
    </div>
    {children}
  </div>;
}
