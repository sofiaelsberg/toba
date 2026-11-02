import { routes } from "../site";
import type { HeroContent, Seo } from "../types";

/** /nyheder – artikler bygget på TOBA Advices LinkedIn-opslag (selve artiklerne ligger i src/content/news/). */
export const news = {
  seo: {
    title: "Nyheder og indsigt om investering | TOBA Advice",
    description: "Analyser, holdninger og nyheder fra TOBA Advice om investering, omkostninger, risiko og uafhængig rådgivning.",
  } satisfies Seo,

  hero: {
    eyebrow: "Nyheder",
    title: "Nyheder og *indsigt*",
    lead: "Analyser, holdninger og nyheder fra os om investering, omkostninger og risiko. Alle indlæg er også delt på vores LinkedIn-side.",
  } satisfies HeroContent,

  readMore: "Læs indlægget",
  slidesBadge: "Med slides",
  back: "← Alle nyheder",
  by: "Af",
  publishedOnLinkedIn: "Indlægget blev først bragt på LinkedIn.",
  linkedinLink: "Se og kommentér på LinkedIn →",
  follow: { label: "Følg TOBA Advice på LinkedIn →" },
  tagsLabel: "Emner",
  document: {
    title: "Grafer og tal",
    text: (title: string, pages?: number | null) =>
      `Indlægget har ${pages ? `${pages} slides` : "slides"} med grafer og tal: “${title}”. De ligger på LinkedIn.`,
    action: "Se slides på LinkedIn",
  },
  moreTitle: "Flere indlæg",
  empty: "Der er ingen indlæg endnu.",

  cta: {
    title: "Vil du vide, hvad det betyder for din formue?",
    lead: "Book et uforpligtende møde med en af vores rådgivere – eller start med et gratis omkostningsoverblik.",
    actions: [
      { label: "Book et møde", href: routes.bookMeeting, variant: "light" as const },
      { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "ghost-light" as const },
    ],
  },
};
