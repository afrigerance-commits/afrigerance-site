import type { Metadata } from "next";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { FormAside } from "@/components/FormAside";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHero } from "@/components/PageHero";
import { appointmentForm } from "@/content/forms";
import { appointmentPage } from "@/content/pages";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: appointmentPage.metaTitle,
  description: appointmentPage.metaDescription,
  alternates: { canonical: routes.appointment },
};

export default function AppointmentPage() {
  const aside = appointmentPage.aside;
  return (
    <PageTransition>
      <PageHero
        eyebrow={appointmentPage.eyebrow}
        titleLead={appointmentPage.titleLead}
        titleAccent={appointmentPage.titleAccent}
        intro={appointmentPage.intro}
        crumbs={[{ label: appointmentPage.eyebrow }]}
        overlap
      />
      <div className="bg-surface pb-24 sm:pb-28 lg:pb-32">
        <div className="site-container grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <section
            aria-label={appointmentForm.title}
            className="relative z-10 -mt-16 rounded-[2rem] bg-white p-6 shadow-[0_40px_100px_-50px_rgb(17_19_23/0.55)] ring-1 ring-ink/[0.06] sm:-mt-20 sm:p-10 lg:-mt-28 lg:p-12"
          >
            <AppointmentForm />
          </section>
          <FormAside
            id="rdv-aside-title"
            title={aside.title}
            items={aside.steps}
            numbered
            linkText={aside.quoteText}
            link={aside.quoteCta}
          />
        </div>
      </div>
    </PageTransition>
  );
}
