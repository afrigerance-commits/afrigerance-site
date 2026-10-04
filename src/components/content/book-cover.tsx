import { BookOpen, Compass, Feather, Landmark, Layers3, Sparkles, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/types/content";

const covers = {
  "mukhtasar-al-akhdari": { tone: "from-[#164c43] via-[#123f38] to-[#071f2d]", Icon: Layers3, ornament: "◆" },
  "cours-de-fiqh-malikite": { tone: "from-[#204f55] via-[#153c46] to-[#0a2231]", Icon: BookOpen, ornament: "✦" },
  "ar-risala-ibn-abi-zayd": { tone: "from-[#594737] via-[#3d3832] to-[#172c2c]", Icon: ScrollText, ornament: "◇" },
  "kassab-sahih-bukhari-tome-1": { tone: "from-[#224953] via-[#112f3c] to-[#0a1b2c]", Icon: Landmark, ornament: "✧" },
  "histoires-des-prophetes-ibn-kathir": { tone: "from-[#75553a] via-[#544334] to-[#253938]", Icon: Compass, ornament: "✦" },
  "tazawwudu-ss-sighar": { tone: "from-[#455746] via-[#2c493e] to-[#132e37]", Icon: Sparkles, ornament: "◇" },
  "ar-rahiq-al-makhtum": { tone: "from-[#68503d] via-[#3b4641] to-[#102d36]", Icon: Feather, ornament: "◆" },
} as const;

/** Composition MIRÂTH originale : jamais une photographie de l'édition citée. */
export function BookCover({ book, className }: { book: Book; className?: string }) {
  const { tone, Icon, ornament } = covers[book.slug as keyof typeof covers] ?? covers["cours-de-fiqh-malikite"];

  return (
    <div className={cn("relative isolate flex aspect-[3/4] flex-col overflow-hidden rounded-lg bg-gradient-to-br p-4 text-ivory-50 shadow-[8px_14px_22px_-13px_rgba(9,28,43,.7)] sm:p-5", tone, className)} aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#e6c788 0.7px, transparent 0.7px)", backgroundSize: "15px 15px" }} />
      <div className="pointer-events-none absolute inset-3 rounded-sm border border-gold-500/45 sm:inset-4" />
      <div className="pointer-events-none absolute inset-5 rounded-sm border border-gold-500/20 sm:inset-6" />
      <div className="relative flex h-full flex-col items-center justify-between py-4 text-center sm:py-5">
        <span className="text-[9px] font-semibold uppercase tracking-[.26em] text-gold-500 sm:text-[10px]">MIRÂTH · Bibliothèque</span>
        <div className="flex flex-col items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/60 bg-white/5 text-gold-500 sm:h-16 sm:w-16">
            <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.3} />
          </span>
          <span className="text-lg leading-none text-gold-500">{ornament}</span>
          <span className="max-w-[15rem] font-display text-base font-semibold leading-tight text-ivory-50 sm:text-xl">{book.titreFrancais}</span>
        </div>
        <span className="max-w-[13rem] border-t border-gold-500/50 pt-3 text-[10px] leading-snug text-ivory-50/80 sm:text-xs">{book.auteur}</span>
      </div>
    </div>
  );
}
