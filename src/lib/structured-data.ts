import { facts } from "@/content/facts";
import { company, footer, newsPath, routes } from "@/content/site";
import type { FaqItem, Person, VideoRef } from "@/content/types";
import { authorHref, authorPerson } from "@/lib/authors";
import type { NewsPost } from "@/lib/news";
import { stripMarkup } from "@/lib/format";
import { absoluteUrl as abs, SITE_URL } from "@/lib/seo";

/*
 * Schema.org-data (JSON-LD). Bruges af Google til søgeresultater og af AI-tjenester til at svare
 * korrekt på spørgsmål om TOBA. Alt bygges ud fra indholdsfilerne – ret teksterne dér.
 */

const ORG_ID = `${SITE_URL}/#organisation`;

/** Virksomheden + websitet. Står på alle sider (root layout). */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      "@id": ORG_ID,
      name: company.name,
      alternateName: [company.legalName, "TOBA Advice"],
      legalName: company.legalName,
      description: footer.about,
      disambiguatingDescription: company.disambiguation,
      url: SITE_URL,
      logo: abs("/icon.svg"),
      image: abs("/opengraph-image.png"),
      telephone: company.phone,
      hasMap: company.mapsUrl,
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
        "Investeringsrådgiver",
        "Formuerådgivning",
        "Udvælgelse af kapitalforvaltere",
        "Omkostninger i investeringsporteføljer",
        "Forvalterrabatter",
        "Private markets",
        "Private equity",
        "Investering af pensionsmidler",
        "Investering i holdingselskaber og virksomhedsskatteordningen",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Uafhængig investeringsrådgivning",
            serviceType: "Investeringsrådgivning",
            description: `Uafhængig rådgivning om hele formuen for personer, familier, virksomhedsejere og selskaber med en investerbar formue på mindst ${facts.minimumWealthMio} mio. kr. Fast honorar, ingen provision, og forvalterrabatter går ubeskåret til kunden.`,
            url: abs(routes.independent),
            areaServed: { "@type": "Country", name: "Danmark" },
            provider: { "@id": ORG_ID },
          },
        },
        {
          "@type": "Offer",
          price: 0,
          priceCurrency: "DKK",
          itemOffered: {
            "@type": "Service",
            name: "Gratis omkostningsoverblik",
            description: "Gennemgang af hvad din nuværende investeringsløsning koster i kroner og procent – og hvem der får pengene. Gratis og uforpligtende.",
            url: abs(routes.overview),
            provider: { "@id": ORG_ID },
          },
        },
      ],
      sameAs: [...company.profiles],
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
      "@id": abs(authorHref(p)),
      name: p.name,
      jobTitle: p.title,
      image: abs(p.portrait.src),
      ...(p.email ? { email: p.email } : {}),
      ...(p.phone ? { telephone: p.phone } : {}),
      ...(p.linkedin ? { sameAs: [p.linkedin] } : {}),
      ...(p.group === "bestyrelse" ? { affiliation: { "@id": ORG_ID } } : { worksFor: { "@id": ORG_ID } }),
      ...(p.alsoIn?.length ? { hasOccupation: p.alsoIn.map((a) => ({ "@type": "Occupation", name: a.title })) } : {}),
      ...(p.press?.length
        ? {
            subjectOf: p.press.map((a) => ({
              "@type": "NewsArticle",
              headline: a.headline,
              datePublished: a.date,
              url: a.url,
              publisher: { "@type": "Organization", name: a.outlet },
            })),
          }
        : {}),
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
      acceptedAnswer: { "@type": "Answer", text: stripMarkup(f.answer) },
    })),
  };
}

/** "0:36" → "PT0M36S" */
function isoDuration(label: string) {
  const [m, s] = label.split(":").map(Number);
  return `PT${m || 0}M${s || 0}S`;
}

/** En kampagnevideo. Kræver udgivelsesdato. */
export function videoJsonLd(v: VideoRef) {
  if (!v.uploadDate) return null;
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
    "@id": abs(`${routes.news}#blog`),
    name: "Nyheder og indsigt fra TOBA",
    url: abs(routes.news),
    inLanguage: "da-DK",
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: abs(newsPath(p.slug)),
      datePublished: p.date,
    })),
  };
}

/** Et nyhedsindlæg + brødkrummer. */
export function articleJsonLd(p: NewsPost) {
  const url = abs(newsPath(p.slug));
  const person = authorPerson(p.author);
  const author = person
    ? { "@type": "Person", "@id": abs(authorHref(person)), name: person.name, jobTitle: person.title, url: abs(authorHref(person)), worksFor: { "@id": ORG_ID } }
    : p.author === "TOBA"
      ? { "@id": ORG_ID }
      : { "@type": "Person", name: p.author, worksFor: { "@id": ORG_ID } };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#artikel`,
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.updated ?? p.date,
        author,
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: url,
        inLanguage: "da-DK",
        isPartOf: { "@id": abs(`${routes.news}#blog`) },
        ...(p.cover ? { image: abs(p.cover) } : {}),
        ...(p.tags.length ? { keywords: p.tags.join(", ") } : {}),
        sameAs: [p.linkedin],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Forside", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Nyheder", item: abs(routes.news) },
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
