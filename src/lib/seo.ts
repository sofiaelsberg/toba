import type { Metadata } from "next";

import type { Seo } from "@/content/types";

export const SITE_URL = "https://www.tobaadvice.com";

/**
 * Metadata til en side: titel, beskrivelse, kanonisk adresse og Open Graph med URL.
 * Brug den på alle sider, så delinger på LinkedIn m.fl. altid får sitenavn, sprog og adresse med
 * (et `openGraph`-objekt på en side erstatter ellers layoutets i stedet for at blive flettet).
 */
export function pageMetadata(path: string, seo: Seo): Metadata {
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
    },
  };
}
