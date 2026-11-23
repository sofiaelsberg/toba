import type { NextConfig } from "next";

/** Sikkerhedsheadere på alle svar. LinkedIn-opslaget indlejres som iframe fra linkedin.com, så frame-src er ikke låst. */
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

/** Gamle adresser fra Webflow-siden → nye sider (301). */
const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/hvem-spiser-din-lagkage", destination: "/lagkage" },
  { source: "/gratis-omkostningsoverblik", destination: "/omkostningsoverblik" },
  // Kun gamle profiladresser uden filendelse – ellers fanges portrætterne i /public/team.
  { source: "/team/:slug([^./]+)", destination: "/team" },
  // Gamle blogadresser fra Webflow → de nye nyheder.
  { source: "/blog", destination: "/nyheder" },
  { source: "/blog/:path*", destination: "/nyheder" },
  { source: "/search", destination: "/" },
  { source: "/401", destination: "/" },
  { source: "/404", destination: "/" },
  // Rester fra Webflow-skabelonen (aldrig brugt af TOBA).
  { source: "/portfolio/:path*", destination: "/" },
  { source: "/product/:path*", destination: "/" },
  { source: "/sku/:path*", destination: "/" },
  { source: "/category/:path*", destination: "/" },
  { source: "/blog-post-category/:path*", destination: "/" },
  { source: "/checkout", destination: "/" },
  { source: "/order-confirmation", destination: "/" },
  { source: "/paypal-checkout", destination: "/" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // PDF'er med en fast adresse til mails, som ikke skal findes via Google.
      { source: "/dokumenter/:file(hvem-spiser-din-lagkage|omkostningsanalyse-eksempel).pdf", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
