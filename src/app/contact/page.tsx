import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question, une remarque documentaire, une proposition de collaboration ? Contactez l’équipe.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Contact" title="Une question, une remarque ?" />
      <Reveal>
        <ContactForm />
      </Reveal>
    </div>
  );
}
