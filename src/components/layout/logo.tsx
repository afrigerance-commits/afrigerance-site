import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="MIRÂTH — Accueil" className={`group flex shrink-0 items-center ${className ?? ""}`}>
      <span className="rounded-lg px-1.5 py-1 dark:bg-[#F8F5EE]">
        <Image src="/brand/mirath-logo.webp" alt="MIRÂTH — ميراث" width={800} height={320} unoptimized priority className="h-auto w-36 transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none sm:w-44" />
      </span>
    </Link>
  );
}
