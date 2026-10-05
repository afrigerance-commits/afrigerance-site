import Link from "next/link";
import { ArrowUpRight, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
export function EditorialEmpty({ title, description, href = "/bibliotheque", action = "Explorer la bibliothèque" }: { title:string; description:string; href?:string; action?:string }) {
  return <section className="relative mt-12 overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface px-6 py-10 sm:px-10 sm:py-14">
    <span aria-hidden="true" className="absolute -right-16 -top-20 size-80 rounded-full border border-accent/15" />
    <div className="relative max-w-xl"><Library className="mb-6 size-8 text-accent-text" strokeWidth={1.2} aria-hidden="true"/><p className="eyebrow">La rigueur avant la publication</p><h2 className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">{title}</h2><p className="mt-5 text-sm leading-8 text-muted">{description}</p><Button asChild variant="outline" className="mt-7"><Link href={href}>{action}<ArrowUpRight/></Link></Button></div>
  </section>;
}
