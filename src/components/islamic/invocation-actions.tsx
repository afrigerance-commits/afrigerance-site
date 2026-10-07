"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InvocationActions({
  title,
  arabic,
  translation,
  reference,
}: {
  title: string;
  arabic: string;
  translation: string;
  reference: string;
}) {
  const [copied, setCopied] = useState(false);
  const text = `${title}\n\n${arabic}\n\n${translation}\n\n${reference}\nMIRÂTH`;

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: `${title} — MIRÂTH`, text });
      return;
    }
    await copy();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="outline" size="sm" onClick={copy} aria-live="polite">
        {copied ? <Check /> : <Copy />}
        {copied ? "Copié" : "Copier"}
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={share}>
        <Share2 />
        Partager
      </Button>
    </div>
  );
}
