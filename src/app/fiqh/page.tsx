import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { LightDivider } from "@/components/motion/light-divider";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Fiqh",
  description: "La jurisprudence islamique (fiqh), présentée sur cette plateforme selon le référentiel malikite.",
  alternates: { canonical: "/fiqh" },
};

export default function FiqhPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <Reveal className="flex flex-col items-center gap-5">
        <span className="text-sm font-medium text-accent-text">Fiqh</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">La jurisprudence islamique</h1>
        <p className="text-lg text-muted">{siteConfig.madhhab.note}</p>
        <LightDivider className="my-2" />
        <Button variant="accent" size="lg" asChild>
          <Link href="/fiqh/malikite">
            Académie de fiqh malikite <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </Reveal>
    </div>
  );
}
