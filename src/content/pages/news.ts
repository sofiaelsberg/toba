import { images } from "../media";
import { bookMeeting, company, routes } from "../site";
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
    lead: "Vi deler vores analyser, holdninger og perspektiver på investering, omkostninger og risiko her på siden, på LinkedIn og i vores nyhedsbrev.",
    actions: [
      { label: "Tilmeld dig nyhedsbrevet ↓", href: "#nyhedsbrev", variant: "primary" },
      { label: "Følg os på LinkedIn →", href: company.linkedin, variant: "secondary" },
    ],
  } satisfies HeroContent,

  readMore: "Læs indlægget",
  slidesBadge: "Med slides",
  back: "← Alle nyheder",
  by: "Af",
  sharedBy: "TOBA Advice skrev, da vi delte indlægget",
  aboutAuthor: (name: string) => `Om ${name}`,
  authorProfile: (first: string) => `Mød ${first} og resten af teamet →`,
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
  slides: {
    title: (title: string) => `Slides: ${title}`,
    region: "Slides – brug piletasterne for at bladre",
    prev: "Forrige slide",
    next: "Næste slide",
    position: (n: number, total: number) => `Slide ${n} af ${total}`,
    alt: (title: string, n: number, total: number) => `${title} – slide ${n} af ${total}. Teksten står under slides.`,
    textToggle: "Læs teksten fra slides",
  },
  moreTitle: "Flere indlæg",
  allLink: "Alle nyheder →",
  /** Knappen ved "Alle nyheder →" i nyhedsteaseren (fx på forsiden). */
  newsletterButton: { label: "Tilmeld nyhedsbrev", href: routes.newsletter, variant: "secondary" as const },
  empty: "Der er ingen indlæg endnu.",

  /** Tilmelding til nyhedsbrevet under indlæggene (#nyhedsbrev). Selve formularen er ActiveCampaign #11. */
  newsletter: {
    id: "nyhedsbrev",
    title: "Få vores perspektiver direkte i indbakken",
    lead: "Tilmeld dig vores nyhedsbrev, så sender vi dig vores nyeste analyser og holdninger om investering.",
  },

  cta: {
    title: "Vil du vide, hvad det betyder for din formue?",
    lead: "Book et uforpligtende møde med en af vores rådgivere – eller start med et gratis omkostningsoverblik.",
    media: images.conversation,
    actions: [
      { ...bookMeeting, variant: "primary" as const },
      { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "secondary" as const },
    ],
  },
};
