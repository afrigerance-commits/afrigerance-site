import type { CSSProperties, ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent?: string;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  /** Niveau du titre (h2 par défaut). */
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
};

/** En-tête de section : étiquette technique, titre en grotesque avec un mot en italique, introduction. */
export function SectionHeading({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  intro,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  className = "",
  children,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      <p
        data-reveal=""
        className={`eyebrow inline-flex items-center gap-3 ${dark ? "text-white" : "text-brand-dark"}`}
      >
        <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-white/60" : "bg-brand/50"}`} />
        {eyebrow}
      </p>
      <Tag
        id={id}
        data-reveal=""
        style={{ "--i": 1 } as CSSProperties}
        className={`text-display mt-5 text-[clamp(2.25rem,1.4rem+3.4vw,4.25rem)] ${dark ? "text-white" : "text-ink"} ${
          centered ? "mx-auto max-w-[16ch]" : "max-w-[18ch]"
        }`}
      >
        {titleLead}
        {titleAccent ? (
          <>
            {" "}
            <span className={`accent-serif ${dark ? "text-brand-soft" : "text-brand"}`}>{titleAccent}</span>
          </>
        ) : null}
      </Tag>
      {intro ? (
        <p
          data-reveal=""
          style={{ "--i": 2 } as CSSProperties}
          className={`mt-6 max-w-[38em] text-lg leading-relaxed sm:text-xl ${dark ? "text-white" : "text-muted"} ${
            centered ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      ) : null}
      {children}
    </div>
  );
}
