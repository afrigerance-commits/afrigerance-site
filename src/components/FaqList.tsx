import { Plus } from "lucide-react";
import type { CSSProperties } from "react";
import type { FaqItem } from "@/content/faq";
import { TextLink } from "./ui/button";

/**
 * Accordéon de questions (éléments <details> natifs : clavier et lecteurs d'écran sans script).
 * L'ouverture est animée là où le navigateur le permet (voir .faq-item dans globals.css).
 */
export function FaqList({ items, className = "" }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={`border-line border-t ${className}`}>
      {items.map((item, index) => (
        <details
          key={item.id}
          id={`question-${item.id}`}
          name="faq"
          data-reveal=""
          style={{ "--i": index } as CSSProperties}
          className="faq-item group border-line border-b"
        >
          <summary className="text-ink flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-6 text-lg font-semibold tracking-[-0.01em] transition-colors hover:text-brand-dark sm:text-xl [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="ring-line text-ink flex size-10 shrink-0 items-center justify-center rounded-full ring-1 transition-[rotate,background-color,color] duration-500 ease-out-expo group-open:bg-ink group-open:text-white group-open:rotate-[135deg]"
            >
              <Plus className="size-5" strokeWidth={2} />
            </span>
          </summary>
          <div className="pb-7 pr-14">
            <p className="text-muted max-w-[46em] text-[1.0625rem] leading-relaxed">{item.answer}</p>
            {item.link ? (
              <TextLink href={item.link.href} className="mt-3">
                {item.link.label}
              </TextLink>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
