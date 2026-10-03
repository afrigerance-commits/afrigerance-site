import type { Metadata, Viewport } from "next";
import { fontDisplay, fontBody, fontArabic, fontQuran } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { HeaderAuth } from "@/components/layout/header-auth";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { PageTransition } from "@/components/motion/page-transition";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F5EE" },
    { media: "(prefers-color-scheme: dark)", color: "#091C2B" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontArabic.variable} ${fontQuran.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: siteConfig.name,
            alternateName: siteConfig.nameArabic,
            description: siteConfig.description,
            url: siteConfig.url,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#contenu-principal" className="skip-link">
            Aller au contenu principal
          </a>
          <Header authSlot={<HeaderAuth />} />
          <main id="contenu-principal" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
