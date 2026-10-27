import type { Metadata } from "next";
import localFont from "next/font/local";

import { CookieBanner } from "@/components/layout/cookie-banner";
import { MotionProvider } from "@/components/motion/motion-provider";
import { home } from "@/content/pages/home";
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
    <html lang="da" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          {children}
          <CookieBanner />
        </MotionProvider>
      </body>
    </html>
  );
}
