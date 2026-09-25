import Link from "next/link";
import { servicePoles } from "@/content/site";
import { ArrowRightIcon } from "./icons";

/** Garde le dernier mot du titre et la flèche sur la même ligne. */
function splitLastWord(title: string) {
  const index = title.lastIndexOf(" ");
  return index === -1 ? ["", title] : [title.slice(0, index + 1), title.slice(index + 1)];
}

export function ServicePoles() {
  return (
    <section aria-labelledby="poles-title" className="bg-white">
      <h2 id="poles-title" className="sr-only">
        Nos pôles de services
      </h2>
      <div className="site-container xl:py-14">
        <ul className="divide-line grid divide-y xl:grid-cols-2 xl:divide-x xl:divide-y-0">
          {servicePoles.map((pole) => {
            const [start, lastWord] = splitLastWord(pole.title);
            return (
              <li key={pole.id} className="py-11 sm:py-12 xl:py-6 xl:odd:pr-16 xl:even:pl-16 2xl:odd:pr-20 2xl:even:pl-20">
                <h3 className="text-ink max-w-[12em] text-[clamp(2rem,1rem+3vw,3rem)] leading-[1.12] font-bold tracking-[-0.03em] xl:text-[clamp(2.5rem,0.9rem+2.1vw,3rem)]">
                  <Link
                    href={pole.href}
                    className="hover:text-brand rounded-sm transition-colors"
                  >
                    {start}
                    <span className="whitespace-nowrap">
                      {lastWord}
                      <ArrowRightIcon className="text-brand ml-[0.5em] inline-block size-[0.7em] align-[-0.02em]" />
                    </span>
                  </Link>
                </h3>
                <p className="text-muted mt-4 max-w-[27em] text-[clamp(1.125rem,0.8rem+1.25vw,1.625rem)] leading-[1.5] sm:mt-5 xl:text-[clamp(1.25rem,0.6rem+1.1vw,1.5rem)]">
                  {pole.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
