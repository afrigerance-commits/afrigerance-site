import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "onDark";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary:
    "border-[1.5px] border-brand text-brand hover:bg-brand hover:text-white",
  onDark:
    "border-[1.5px] border-white/90 text-white hover:bg-white/10 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-8 text-lg",
};

/** Classes des boutons du site, utilisables sur un lien comme sur un <button>. */
export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `inline-flex items-center justify-center gap-3 rounded-md py-2 text-center font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link {...props} className={buttonClasses(variant, size, className)} />;
}
