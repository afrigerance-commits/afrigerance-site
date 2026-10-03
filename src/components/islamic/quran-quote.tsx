import { ArabicText } from "@/components/islamic/arabic-text";
import { SourceTypeBadge } from "@/components/islamic/reliability-badge";

interface QuranQuoteProps {
  arabe: string;
  traduction: string;
  sourate: string;
  verset: string;
}

/** Bloc de citation coranique, visuellement distinct de toute autre forme de contenu. */
export function QuranQuote({ arabe, traduction, sourate, verset }: QuranQuoteProps) {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-emerald-900 px-6 py-10 text-ivory-50 sm:px-12 sm:py-14">
      <div className="geo-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <ArabicText as="p" variant="quran" className="quran-quote text-2xl sm:text-4xl">
          {arabe}
        </ArabicText>
        <p className="font-display text-lg italic text-ivory-50/90 sm:text-xl">« {traduction} »</p>
        <figcaption className="flex flex-col items-center gap-2">
          <span className="text-sm tracking-wide text-gold-500">
            Sourate {sourate}, verset {verset}
          </span>
          <SourceTypeBadge type="coran" className="border-gold-500/40 text-gold-500" />
        </figcaption>
      </div>
    </figure>
  );
}
