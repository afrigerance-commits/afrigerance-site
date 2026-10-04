import type { CSSProperties } from "react";
import { audiences } from "@/content/home";
import { SectionHeading } from "../ui/SectionHeading";
import { AudienceIcon } from "../ui/service-icons";

/** Publics visés par les services (cahier des charges § 2.2 et § 6), en grille éditoriale. */
export function AudienceGrid() {
  return (
    <section aria-labelledby="audiences-title" className="bg-white py-24 sm:py-28 lg:py-36">
      <div className="site-container">
        <SectionHeading
          id="audiences-title"
          eyebrow={audiences.eyebrow}
          titleLead={audiences.titleLead}
          titleAccent={audiences.titleAccent}
          intro={audiences.intro}
        />
        <ul className="border-line mt-14 grid border-t sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {audiences.items.map((item, index) => (
            <li
              key={item.id}
              data-reveal=""
              style={{ "--i": index % 3 } as CSSProperties}
              className="border-line group border-b py-9 sm:px-8 sm:odd:border-r sm:odd:pl-0 lg:px-10 lg:odd:border-r-0 lg:[&:not(:nth-child(3n))]:border-r lg:[&:nth-child(3n+1)]:pl-0"
            >
              <span className="bg-surface text-brand flex size-14 items-center justify-center rounded-2xl transition-[background-color,color,rotate,scale] duration-500 ease-out-expo group-hover:bg-brand group-hover:text-white group-hover:-rotate-6 group-hover:scale-105">
                <AudienceIcon id={item.id} className="size-6" />
              </span>
              <h3 className="text-display text-ink mt-6 text-2xl sm:text-[1.75rem]">{item.title}</h3>
              <p className="text-muted mt-3 leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
