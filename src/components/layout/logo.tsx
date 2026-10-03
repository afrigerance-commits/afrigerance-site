import Link from "next/link";
import { ArabicText } from "@/components/islamic/arabic-text";
import { siteConfig } from "@/lib/site-config";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className ?? ""}`}>
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/60 font-display text-lg text-gold-700 transition-colors group-hover:bg-gold-500/10 dark:text-gold-500"
        aria-hidden="true"
      >
        ع
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-lg font-semibold text-foreground">{siteConfig.name}</span>
        <ArabicText className="text-xs text-muted">{siteConfig.nameArabic}</ArabicText>
      </span>
    </Link>
  );
}
