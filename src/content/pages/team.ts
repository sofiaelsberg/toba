import { routes, bookMeeting } from "../site";
import type { HeroContent, Seo } from "../types";

export const team = {
  seo: {
    title: "Teamet | TOBA Advice",
    description: "Mød rådgiverne og specialisterne bag TOBA Advice – medarbejderejet og på din side.",
  } satisfies Seo,

  hero: {
    eyebrow: "Teamet",
    title: "Mød *teamet*",
    lead: "Hos TOBA Advice taler du med dem, der ejer virksomheden. Vi er rådgivere, analytikere og administration – og vi har alle det samme mål: at din formue bliver passet godt på.",
  } satisfies HeroContent,

  filterAll: "Alle",
  profileUrlPrefix: "tobaadvice.com/team/",

  closing: {
    title: "Lad os tage en snak",
    lead: "Vil du vide, om din formue arbejder for dig – eller for andre? Book et uforpligtende møde med en af vores rådgivere.",
    actions: [
      { ...bookMeeting, variant: "light" as const },
      { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "ghost-light" as const },
    ],
  },
};
