import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "onDark" | "light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_14px_34px_-14px_rgb(46_117_182/0.75)] hover:bg-brand-dark hover:shadow-[0_18px_40px_-14px_rgb(34_89_140/0.8)]",
  secondary: "bg-white text-ink ring-1 ring-ink/15 ring-inset hover:ring-ink/40 hover:bg-surface",
  // Sur fond bleu ou anthracite : contour blanc, fond plein blanc au survol (aucun voile clair sous le texte blanc).
  onDark:
    "text-white ring-1 ring-white/75 ring-inset hover:bg-white hover:text-brand-dark hover:ring-white focus-visible:outline-white",
  // Bouton principal sur fond bleu : blanc, texte bleu.
  light:
    "bg-white text-brand-dark shadow-[0_14px_34px_-14px_rgb(17_19_23/0.45)] hover:bg-brand-soft focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-[0.9375rem]",
  lg: "min-h-14 px-7 text-base sm:min-h-[3.75rem] sm:px-8 sm:text-[1.0625rem]",
};

/** Classes des boutons du site, utilisables sur un lien comme sur un <button>. */
export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `group/button relative inline-flex items-center justify-center gap-3 rounded-full py-2 text-center font-semibold tracking-[-0.005em] transition-[background-color,box-shadow,color,translate] duration-300 ease-out-quint disabled:cursor-not-allowed disabled:opacity-70 ${variants[variant]} ${sizes[size]} ${extra}`;
}

/** Flèche qui file en diagonale au survol (micro-interaction des boutons d'action). */
export function ButtonArrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex size-5 shrink-0 overflow-hidden ${className}`}
    >
      <ArrowUpRight
        strokeWidth={2.25}
        className="absolute inset-0 size-5 transition-transform duration-500 ease-out-expo group-hover/button:translate-x-full group-hover/button:-translate-y-full"
      />
      <ArrowUpRight
        strokeWidth={2.25}
        className="absolute inset-0 size-5 -translate-x-full translate-y-full transition-transform duration-500 ease-out-expo group-hover/button:translate-x-0 group-hover/button:translate-y-0"
      />
    </span>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  /** Ajoute la flèche animée après le libellé. */
  arrow?: boolean;
  /** Le bouton se rapproche légèrement du pointeur (boutons principaux uniquement). */
  magnetic?: boolean;
  children: ReactNode;
};

export function ButtonLink({ variant, size, className, arrow, magnetic, children, ...props }: ButtonLinkProps) {
  return (
    <Link {...props} data-magnetic={magnetic ? "" : undefined} className={buttonClasses(variant, size, className)}>
      {children}
      {arrow ? <ButtonArrow /> : null}
    </Link>
  );
}

/** Lien texte avec flèche, pour les actions secondaires. */
export function TextLink({
  className = "",
  children,
  tone = "brand",
  ...props
}: ComponentProps<typeof Link> & { tone?: "brand" | "light"; children: ReactNode }) {
  const color = tone === "light" ? "text-white focus-visible:outline-white" : "text-brand-dark";
  return (
    <Link
      {...props}
      className={`group/button inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold ${color} ${className}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover/button:bg-[length:100%_1.5px]">
        {children}
      </span>
      <ButtonArrow className="size-4 [&>svg]:size-4" />
    </Link>
  );
}
