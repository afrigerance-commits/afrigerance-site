import { Reveal } from "@/components/motion/reveal";
import { LightDivider } from "@/components/motion/light-divider";

export function PageHeader({
  eyebrow,
  title,
  description,
  divider = false,
  level = 1,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Punctuation de motion design (voir LightDivider) — réservée aux pages d'entrée d'une rubrique. */
  divider?: boolean;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className="relative mb-12 flex flex-col items-center gap-6 border-b border-border pb-10">
      <Reveal className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
        {eyebrow && <span className="eyebrow mx-auto">{eyebrow}</span>}
        <Heading className="section-title text-balance">{title}</Heading>
        {description && <p className="text-pretty leading-8 text-muted">{description}</p>}
      </Reveal>
      {divider && <LightDivider />}
    </div>
  );
}
