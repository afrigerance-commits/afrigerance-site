import { Reveal } from "@/components/motion/reveal";

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <Reveal className="mx-auto mb-14 flex max-w-2xl flex-col gap-4 text-center">
      {eyebrow && <span className="mx-auto text-sm font-medium text-accent-text">{eyebrow}</span>}
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">{title}</h1>
      {description && <p className="text-muted">{description}</p>}
    </Reveal>
  );
}
