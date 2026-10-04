import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { TextLink } from "./ui/button";

type FormAsideProps = {
  id: string;
  title: string;
  items: readonly string[];
  /** Puces numérotées (étapes) plutôt que des coches. */
  numbered?: boolean;
  linkText: string;
  link: { label: string; href: string };
};

/** Encadré à côté d'un formulaire : conseils ou étapes, puis un lien vers l'autre parcours. */
export function FormAside({ id, title, items, numbered, linkText, link }: FormAsideProps) {
  return (
    <aside aria-labelledby={id} className="lg:sticky lg:top-32 lg:self-start lg:pt-12">
      <div data-reveal="" className="rounded-[2rem] bg-white p-7 ring-1 ring-ink/[0.06] sm:p-8">
        <h2 id={id} className="text-display text-ink text-2xl">
          {title}
        </h2>
        <ul className="mt-6 space-y-4">
          {items.map((item, index) => (
            <li key={item} data-reveal="" style={{ "--i": index + 1 } as CSSProperties} className="flex gap-3">
              {numbered ? (
                <span className="text-brand w-6 shrink-0 font-mono text-sm leading-7">{String(index + 1).padStart(2, "0")}</span>
              ) : (
                <Check aria-hidden="true" className="text-brand mt-1 size-5 shrink-0" strokeWidth={2.25} />
              )}
              <span className="text-ink leading-7">{item}</span>
            </li>
          ))}
        </ul>
        <div className="border-line mt-7 border-t pt-6">
          <p className="text-muted">{linkText}</p>
          <TextLink href={link.href} className="mt-1">
            {link.label}
          </TextLink>
        </div>
      </div>
    </aside>
  );
}
