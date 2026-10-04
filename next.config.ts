import type { NextConfig } from "next";

/** En-têtes de sécurité appliqués à tout le site. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  // Ignoré par les navigateurs tant que le site n'est pas servi en HTTPS (en local par exemple).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

/** Espace d'administration : jamais indexé, jamais mis en cache, jamais intégré dans un cadre. */
const adminHeaders = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  { key: "Cache-Control", value: "no-store" },
  { key: "Referrer-Policy", value: "same-origin" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["postgres"],
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin", headers: adminHeaders },
      { source: "/admin/:path*", headers: adminHeaders },
    ];
  },
};

export default nextConfig;
