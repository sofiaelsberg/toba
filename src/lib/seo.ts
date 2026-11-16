import type { Metadata } from "next";

import type { Seo } from "@/content/types";

export const SITE_URL = "https://www.tobaadvice.com";

/**
 * Standard-delingsbillede (app/opengraph-image.png). Skal sættes eksplicit: et `openGraph`-objekt på en side
 * erstatter layoutets, så uden dette får sider uden eget billede intet og:image (LinkedIn viser så intet billede).
 * Sider med deres egen opengraph-image.png i mappen får automatisk deres eget i stedet.
 */
export const defaultShareImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "TOBA Advice – Investeringsrådgivning som den bør være",
};

/** "Titel | TOBA Advice" – men uden endelsen, hvis titlen så bliver for lang til Googles visning (ca. 60 tegn). */
export function withBrand(title: string, max = 60) {
  const full = `${title} | TOBA Advice`;
  return full.length <= max ? full : title;
}

/**
 * Metadata til en side: titel, beskrivelse, kanonisk adresse og Open Graph med URL.
 * Brug den på alle sider, så delinger på LinkedIn m.fl. altid får sitenavn, sprog og adresse med
 * (et `openGraph`-objekt på en side erstatter ellers layoutets i stedet for at blive flettet).
 */
export function pageMetadata(path: string, seo: Seo, opts: { ownShareImage?: boolean } = {}): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: seo.title,
      description: seo.ogDescription ?? seo.description,
      siteName: "TOBA Advice",
      locale: "da_DK",
      type: "website",
      // Sider med egen opengraph-image.png i mappen sætter ownShareImage – ellers overskriver standardbilledet deres eget.
      ...(opts.ownShareImage ? {} : { images: [defaultShareImage] }),
    },
  };
}
