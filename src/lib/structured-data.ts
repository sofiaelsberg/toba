import { facts } from "@/content/facts";
import { company, footer, routes } from "@/content/site";
import type { FaqItem, Person, VideoRef } from "@/content/types";
import type { NewsPost } from "@/lib/news";
import { SITE_URL } from "@/lib/seo";

/*
 * Schema.org-data (JSON-LD). Bruges af Google til søgeresultater og af AI-tjenester til at svare
 * korrekt på spørgsmål om TOBA Advice. Alt bygges ud fra indholdsfilerne – ret teksterne dér.
 */

const ORG_ID = `${SITE_URL}/#organisation`;
const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

/** Virksomheden + websitet. Står på alle sider (root layout). */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      "@id": ORG_ID,
      name: company.name,
      legalName: company.legalName,
      description: footer.about,
      url: SITE_URL,
      logo: abs("/icon.svg"),
      image: abs("/opengraph-image.png"),
      telephone: company.phone,
      vatID: `DK${company.cvr}`,
      foundingDate: String(facts.founded),
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: facts.employeesPlus },
      areaServed: { "@type": "Country", name: "Danmark" },
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.line1,
        postalCode: company.address.line2.split(" ")[0],
        addressLocality: company.address.line2.split(" ").slice(1).join(" "),
        addressCountry: "DK",
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Tilladelse",
        name: `Tilladelse som investeringsrådgiver (FT-nr. ${company.ftNumber})`,
        recognizedBy: { "@type": "GovernmentOrganization", name: "Finanstilsynet", url: "https://www.finanstilsynet.dk" },
      },
      knowsAbout: [
        "Uafhængig investeringsrådgivning",
        "Formuerådgivning",
        "Udvælgelse af kapitalforvaltere",
        "Omkostninger i investeringsporteføljer",
        "Private markets",
      ],
      sameAs: [company.linkedin].filter(Boolean),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: company.name,
      inLanguage: "da-DK",
      publisher: { "@id": ORG_ID },
    },
  ],
};

/** Medarbejdere og bestyrelse (teamsiden). */
export function teamJsonLd(list: Person[]) {
  return {
    "@context": "https://schema.org",
    "@graph": list.map((p) => ({
      "@type": "Person",
      "@id": `${SITE_URL}${routes.team}#${p.slug}`,
      name: p.name,
      jobTitle: p.title,
      image: abs(p.portrait.src),
      ...(p.email ? { email: p.email } : {}),
      ...(p.phone ? { telephone: p.phone } : {}),
      ...(p.linkedin ? { sameAs: [p.linkedin] } : {}),
      ...(p.group === "bestyrelse" ? { affiliation: { "@id": ORG_ID } } : { worksFor: { "@id": ORG_ID } }),
      ...(p.alsoIn?.length ? { hasOccupation: p.alsoIn.map((a) => ({ "@type": "Occupation", name: a.title })) } : {}),
    })),
  };
}

/** Spørgsmål og svar (fx på /omkostningsoverblik). */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.replace(/\*\*?/g, "") },
    })),
  };
}

/** "0:36" → "PT0M36S" */
function isoDuration(label: string) {
  const [m, s] = label.split(":").map(Number);
  return `PT${m || 0}M${s || 0}S`;
}

/** En kampagnevideo. Kræver src, plakat og udgivelsesdato. */
export function videoJsonLd(v: VideoRef) {
  if (!v.src || !v.poster || !v.uploadDate) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: [v.title, v.caption].filter(Boolean).join(" – "),
    thumbnailUrl: abs(v.poster),
    contentUrl: abs(v.src),
    uploadDate: v.uploadDate,
    duration: isoDuration(v.durationLabel),
    inLanguage: "da-DK",
    publisher: { "@id": ORG_ID },
  };
}

/** Nyhedsoversigten som blog med indlæg. */
export function newsListJsonLd(posts: NewsPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}${routes.news}#blog`,
    name: "Nyheder og indsigt fra TOBA Advice",
    url: `${SITE_URL}${routes.news}`,
    inLanguage: "da-DK",
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}${routes.news}/${p.slug}`,
      datePublished: p.date,
    })),
  };
}

/** Et nyhedsindlæg + brødkrummer. */
export function articleJsonLd(p: NewsPost) {
  const url = `${SITE_URL}${routes.news}/${p.slug}`;
  const author = p.author === "TOBA Advice" ? { "@id": ORG_ID } : { "@type": "Person", name: p.author, worksFor: { "@id": ORG_ID } };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#artikel`,
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.date,
        author,
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: url,
        inLanguage: "da-DK",
        isPartOf: { "@id": `${SITE_URL}${routes.news}#blog` },
        ...(p.image ? { image: abs(p.image) } : {}),
        ...(p.tags.length ? { keywords: p.tags.join(", ") } : {}),
        sameAs: [p.linkedin],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Forside", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Nyheder", item: `${SITE_URL}${routes.news}` },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      },
    ],
  };
}

/** JSON til <script type="application/ld+json">, sikret mod "</script>" i data. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
