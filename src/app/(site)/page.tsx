import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { ServicePoles } from "@/components/ServicePoles";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} — Infogérance et intégration de solutions technologiques au Sénégal`,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicePoles />
      <Partners />
    </>
  );
}
