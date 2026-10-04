import { Reveal } from "@/components/motion/reveal";
import { LightDivider } from "@/components/motion/light-divider";

export function PageHeader({
  eyebrow,
  title,
  description,
  divider = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Punctuation de motion design (voir LightDivider) — réservée aux pages d'entrée d'une rubrique. */
  divider?: boolean;
}) {
  return (
    <div className="mb-14 flex flex-col items-center gap-6">
      <Reveal className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
        {eyebrow && <span className="mx-auto text-sm font-medium text-accent-text">{eyebrow}</span>}
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">{title}</h1>
        {description && <p className="text-muted">{description}</p>}
      </Reveal>
      {divider && <LightDivider />}
    </div>
  );
}
