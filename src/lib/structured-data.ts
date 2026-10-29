import { company } from "@/content/site";

const BASE = "https://www.tobaadvice.com";

/** Schema.org-data om virksomheden (vises i Googles søgeresultater). Bygget ud fra `company`. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: company.name,
  legalName: company.legalName,
  url: BASE,
  logo: `${BASE}/icon.svg`,
  image: `${BASE}/opengraph-image.png`,
  telephone: company.phone,
  vatID: `DK${company.cvr}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.line1,
    postalCode: company.address.line2.split(" ")[0],
    addressLocality: company.address.line2.split(" ").slice(1).join(" "),
    addressCountry: "DK",
  },
  sameAs: [company.linkedin].filter(Boolean),
};

/** JSON til <script type="application/ld+json">, sikret mod "</script>" i data. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
