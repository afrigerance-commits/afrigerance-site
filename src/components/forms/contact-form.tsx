"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!CONTACT_EMAIL) return;
    const subject = encodeURIComponent(`Message depuis le site — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  if (!CONTACT_EMAIL) {
    return (
      <p className="rounded-lg border border-dashed border-border p-5 text-sm text-muted">
        L’adresse de contact n’est pas encore configurée. Définissez{" "}
        <code className="rounded bg-surface-muted px-1.5 py-0.5">NEXT_PUBLIC_CONTACT_EMAIL</code> dans vos variables
        d’environnement pour activer ce formulaire.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <Button type="submit" variant="accent" className="w-fit">
        Envoyer <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
