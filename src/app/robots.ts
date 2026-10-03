import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/compte", "/connexion", "/inscription", "/recherche"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
