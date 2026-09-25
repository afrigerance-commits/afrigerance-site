import { Logo } from "./Logo";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <header className="relative z-30 bg-white">
      <div className="site-container flex h-20 items-center justify-between gap-6 sm:h-24 lg:h-[7.5rem]">
        <Logo width={224} eager className="h-[3.25rem] sm:h-16 lg:h-[4.75rem]" />
        <SiteNav />
      </div>
    </header>
  );
}
