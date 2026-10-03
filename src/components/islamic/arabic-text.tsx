import { cn } from "@/lib/utils";

interface ArabicTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "p" | "div";
  variant?: "arabic" | "quran";
}

/**
 * Enveloppe tout texte arabe avec dir="rtl" et lang="ar" pour une sémantique et
 * une accessibilité correctes, quelle que soit la direction du document parent.
 */
export function ArabicText({
  as: Tag = "span",
  variant = "arabic",
  className,
  ...props
}: ArabicTextProps) {
  return (
    <Tag
      dir="rtl"
      lang="ar"
      className={cn(variant === "quran" ? "font-quran" : "font-arabic", className)}
      {...props}
    />
  );
}
