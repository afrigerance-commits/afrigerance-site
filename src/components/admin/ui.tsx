"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";
import { buttonClasses } from "../ui/button";

/** Bouton d'envoi désactivé pendant le traitement (évite les doubles clics). */
export function PendingButton({
  children,
  pendingLabel,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  pendingLabel: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={buttonClasses(variant, "md", className)}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
