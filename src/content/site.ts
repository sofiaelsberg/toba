import type { Action, DisclaimerContent, LinkItem } from "./types";

export const routes = {
  home: "/",
  howWeInvest: "/sadan-investerer-vi",
  independent: "/uafhaengig-investeringsraadgivning",
  about: "/om-toba-advice",
  team: "/team",
  contact: "/kontakt",
  bookMeeting: "/kontakt?emne=moede#formular",
  guide: "/lagkage",
  overview: "/omkostningsoverblik",
  policies: "/politikker",
  fsa: "/finanstilsynet",
  complaints: "/klage",
  cookies: "/cookies",
  accessibility: "/tilgaengelighed",
  clientPortal: "https://client.tobaadvice.onperformativ.com",
} as const;

export const company = {
  name: "TOBA Advice",
  legalName: "TOBA Advice A/S",
  cvr: "37424277",
  ftNumber: "34150",
  phone: "+45 28 18 84 27",
  address: { line1: "Store Torv 3C, 2. sal", line2: "8000 Aarhus C" },
  mapsUrl: "https://maps.google.com/?q=Store+Torv+3C,+8000+Aarhus+C",
  linkedin: "https://www.linkedin.com/company/toba-advice",
} as const;

export const brand = {
  logoDark: { src: "/brand/toba-logo-dark.svg", width: 1285, height: 453 },
  logoLight: { src: "/brand/toba-logo-light.svg", width: 100, height: 36 },
  logoAlt: "TOBA Advice",
  homeLabel: "TOBA Advice – forside",
} as const;

export const bookMeeting: Action = { label: "Book et møde", href: routes.bookMeeting, variant: "primary" };

export const mainNav: LinkItem[] = [
  { label: "Sådan investerer vi", href: routes.howWeInvest },
  { label: "Uafhængig rådgivning", href: routes.independent },
  { label: "Om TOBA", href: routes.about },
  { label: "Team", href: routes.team },
  { label: "Kontakt", href: routes.contact },
];

export const clientPortalLink: LinkItem = { label: "Kundeportal", href: routes.clientPortal, external: true };

export const navLabels = {
  main: "Hovedmenu",
  mobile: "Mobilmenu",
  openMenu: "Åbn menu",
  closeMenu: "Luk menu",
  skipToContent: "Spring til indhold",
} as const;

export const footer = {
  about:
    "TOBA Advice leverer uafhængig, individuel og gennemsigtig investeringsrådgivning og henvender sig til personer med en investérbar formue på minimum 5 mio. kr.",
  columns: [
    {
      title: "Om TOBA",
      links: [
        { label: "Sådan investerer vi", href: routes.howWeInvest },
        { label: "Uafhængig rådgivning", href: routes.independent },
        { label: "Om TOBA", href: routes.about },
        { label: "Team", href: routes.team },
        { label: "Kontakt", href: routes.contact },
      ],
    },
    {
      title: "Kom i gang",
      links: [
        { label: "Gratis omkostningsoverblik", href: routes.overview },
        { label: "Hent guiden “Hvem spiser din lagkage?”", href: routes.guide },
      ],
    },
    {
      title: "Politikker",
      links: [
        { label: "Finanstilsynet", href: routes.fsa },
        { label: "Politikker", href: routes.policies },
        { label: "Klageadgang", href: routes.complaints },
        { label: "Cookies", href: routes.cookies },
        { label: "Tilgængelighed", href: routes.accessibility },
      ],
    },
  ] satisfies { title: string; links: LinkItem[] }[],
  cookieSettingsLabel: "Cookieindstillinger",
  linkedinLabel: "LinkedIn",
  companyLine: `${company.legalName} · CVR ${company.cvr} · Godkendt af Finanstilsynet (FT-nr. ${company.ftNumber})`,
} as const;

export const landingChrome = {
  footerLinks: [
    { label: "Persondatapolitik", href: routes.policies },
    { label: "Cookies", href: routes.cookies },
    { label: "Tilgængelighed", href: routes.accessibility },
    { label: "tobaadvice.com", href: routes.home },
  ] satisfies LinkItem[],
} as const;

export const disclaimers = {
  standard: {
    label: "Vigtig information.",
    text: "Indholdet på denne side er generel information og ikke individuel investeringsrådgivning. Investering indebærer risiko for tab. Historiske og forventede afkast er ingen garanti for fremtidige afkast.",
  },
  short: {
    label: "Vigtig information.",
    text: "Indholdet på denne side er generel information og ikke individuel investeringsrådgivning. Investering indebærer risiko for tab.",
  },
  guide: {
    label: "Vigtig information.",
    text: "Indholdet på denne side er generel information og ikke individuel investeringsrådgivning. Tal og eksempler er illustrative og bygger på de angivne forudsætninger. Historiske afkast er ingen garanti for fremtidige afkast. Investering indebærer risiko for tab.",
  },
  overview: {
    label: "Vigtig information.",
    text: "Indholdet på denne side er generel information og ikke individuel investeringsrådgivning. Eksemplet er anonymiseret og kun til illustration. Historiske afkast er ingen garanti for fremtidige afkast. Investering indebærer risiko for tab.",
  },
} satisfies Record<string, DisclaimerContent>;
