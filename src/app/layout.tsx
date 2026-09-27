import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${figtree.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">{children}</body>
    </html>
  );
}
