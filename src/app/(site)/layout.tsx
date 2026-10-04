import { SiteChrome } from "@/components/SiteChrome";

/** Pages publiques du site : en-tête et pied de page communs. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteChrome>{children}</SiteChrome>;
}
