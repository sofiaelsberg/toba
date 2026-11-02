import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { CookieBanner } from "@/components/layout/cookie-banner";
import { MotionProvider } from "@/components/motion/motion-provider";
import { home } from "@/content/pages/home";
import { jsonLd, siteJsonLd } from "@/lib/structured-data";
import "./globals.css";

/** Selvhostede variable fonte (OFL) – samme som Google Fonts, men uden kald til Google (GDPR). */
const playfair = localFont({
  src: [
    { path: "../fonts/playfair-display-latin-wght-normal.woff2", weight: "400 900", style: "normal" },
    { path: "../fonts/playfair-display-latin-wght-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
});
const sourceSans = localFont({
  src: [
    { path: "../fonts/source-sans-3-latin-wght-normal.woff2", weight: "200 900", style: "normal" },
    { path: "../fonts/source-sans-3-latin-wght-italic.woff2", weight: "200 900", style: "italic" },
  ],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tobaadvice.com"),
  title: { default: home.seo.title, template: "%s" },
  description: home.seo.description,
  openGraph: { locale: "da_DK", type: "website", siteName: "TOBA Advice" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: Next slår blød scrolling fra ved sideskift, så en ny side starter i toppen uden animation.
    <html lang="da" data-scroll-behavior="smooth" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="flex min-h-full flex-col">
        {/* Virksomhed og website som schema.org-data – til Google og AI-tjenester. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteJsonLd)} />
        <MotionProvider>
          {children}
          <CookieBanner />
        </MotionProvider>
        {/* Vercel Speed Insights: måler indlæsningstider uden cookies. Sender kun data i produktion. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
