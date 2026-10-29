import { facts } from "../facts";
import { videos } from "../media";
import { home } from "./home";
import { routes } from "../site";
import type { FaqItem, HeroContent, Point, Seo, StepContent } from "../types";

type DepotLine = { label: string; pct: number; kind: "service" | "product" | "total" };
type Depot = { name: string; amount: number; share: string; lines: DepotLine[]; total: number; yearlyKr: number; source: string };

/** Landingsside 2: /omkostningsoverblik */
export const overview = {
  seo: {
    title: "Gratis omkostningsoverblik | Se hvad din formue koster | TOBA Advice",
    description:
      "Få ét samlet billede af, hvad din formue koster – og hvem der får pengene. Gratis og uforpligtende. Du behøver ikke skifte bank eller rådgiver.",
    ogDescription: "Ved du, hvad din formue koster om året – alt inklusive? Få et gratis omkostningsoverblik.",
  } satisfies Seo,

  headerAction: { label: "Bestil dit overblik", href: "#bestil", variant: "primary" as const },

  hero: {
    eyebrow: "Gratis og uforpligtende",
    title: "Få et gratis *omkostningsoverblik*",
    lead: "Se, hvad din formue reelt koster – og hvem der får pengene. Du behøver ikke skifte bank eller rådgiver for at få klarhed.",
    actions: [
      { label: "Bestil dit overblik", href: "#bestil", variant: "primary" },
      { label: "Se eksempel på omkostningsoverblik", href: "#eksempel", variant: "secondary" },
    ],
  } satisfies HeroContent,
  heroTeaser: {
    eyebrow: "Eksempel · 3 depoter i én bank",
    value: "1,36 %",
    label: "samlede omkostninger om året, alt inklusive",
    yearly: "≈ 246.000 kr. om året",
    link: "Se hvordan →",
    href: "#eksempel",
  },

  what: {
    title: "Ét samlet billede af, hvad din formue koster",
    text: [
      "Din bank sender dig hvert år en omkostningsopgørelse. Men den er svær at læse – og har du flere depoter, ser du aldrig det samlede billede.",
      "Et omkostningsoverblik lægger alle lagene sammen: det, du betaler for rådgivning, depot og handel, og det, der trækkes direkte i dit afkast inde i fondene. Du ser det hele i kroner og procent – og hvem der får pengene.",
    ],
    answersTitle: "Det får du svar på",
    answers: [
      { title: "Hvad du betaler i alt.", text: "Dine samlede årlige omkostninger – i kroner og procent." },
      { title: "Hvor pengene går hen.", text: "Fordelingen mellem serviceomkostninger og omkostningerne inde i fondene." },
      { title: "Hvem der får rabatten.", text: "Om der er rabatter og provisioner i din løsning – og hvem der beholder dem." },
      { title: "Hvor fri din rådgivning er.", text: "Hvor stor en del af porteføljen der ligger i bankens egne produkter." },
      { title: "Hvad der er pengene værd.", text: "Hvilke investeringer der giver dig værdi for prisen – og hvilke der ikke gør." },
    ] satisfies Point[],
  },

  example: {
    title: "Sådan ser et overblik ud",
    lead: "Her er et rigtigt eksempel. En kunde havde godt 18 mio. kr. fordelt på tre depoter i en af de store danske banker. Hver for sig så depoterne ikke dyre ud. Lagt sammen betalte kunden 1,36 % – godt 246.000 kr. om året.",
    costsLabel: "Faktiske omkostninger, alt inkl.",
    shareSuffix: "af beløbet",
    depotTotalLabel: "Depot i alt",
    yearlySuffix: "årligt",
    depots: [
      { name: "Frie midler", amount: 13454916, share: "74,4 %", lines: [{ label: "Serviceomkostninger", pct: 0.39, kind: "service" }, { label: "Produktomkostninger", pct: 0.95, kind: "product" }], total: 1.34, yearlyKr: 180296, source: "Kilde: Bankens omkostningsopgørelse 2025" },
      { name: "Private pensioner", amount: 470646, share: "2,6 %", lines: [{ label: "Serviceomkostninger", pct: 0.36, kind: "service" }, { label: "Produktomkostninger", pct: 0.63, kind: "product" }], total: 0.99, yearlyKr: 4659, source: "Kilde: Bankens omkostningsopgørelse 2025" },
      { name: "Bankpension", amount: 4160975, share: "23,0 %", lines: [{ label: "Samlede omkostninger", pct: 1.47, kind: "total" }], total: 1.47, yearlyKr: 61166, source: "Kilde: Pensionsselskab – oplyst af rådgiver" },
    ] satisfies Depot[],
    summary: { eyebrow: "Samlet – vægtet på tværs af depoter", label: "Samlet omkostning, alt inkl.", pct: 1.36, yearlyKr: 246122, note: "Det tal stod ingen steder, før alle lag blev lagt sammen." },
    howToRead: [
      { title: "Hvert depot for sig.", text: "Omkostningerne er delt op i service – rådgivning, depot og handel – og produkt, der trækkes inde i fondene." },
      { title: "Det største lag er det usynlige.", text: "På de frie midler udgør produktomkostningerne 0,95 % – mere end det dobbelte af serviceomkostningerne." },
      { title: "Det samlede tal.", text: "Vægtet på tværs af alle tre depoter: 1,36 % om året. Det tal stod ingen steder, før alle lag blev lagt sammen." },
    ] satisfies Point[],
    caption: "Udsnit af et anonymiseret omkostningsoverblik. Kilde: Bankens omkostningsopgørelse 2025 og oplysninger fra pensionsselskabets rådgiver.",
  },

  clarity: {
    title: "Klarhed uden forpligtelser",
    text: [
      "Et omkostningsoverblik er ikke et salgsmøde. Måske viser det, at din nuværende løsning er fin. Så ved du det.",
      "Konklusionen er ikke nødvendigvis, at alt skal skiftes ud. Men først når du kan se hele billedet, kan du vurdere, hvad der er pengene værd. Du bestemmer selv, hvad du vil gøre bagefter.",
    ],
    fitTitle: "Overblikket er for dig, hvis …",
    fits: [
      "du har din formue i banken og ikke ved præcis, hvad den koster om året",
      "du har depoter flere steder og mangler det samlede billede",
      "du er i tvivl om, hvorvidt din rådgiver tjener på de produkter, du bliver anbefalet",
      "du har solgt din virksomhed eller fået en større formue og vil være sikker på, at den arbejder for dig",
      "det er længe siden, nogen har kigget din portefølje grundigt igennem",
    ],
    fitResult: "Så er et overblik relevant for dig.",
    fitAction: { label: "Bestil dit overblik", href: "#bestil", variant: "primary" as const },
  },

  /** Beregneren genbruger forsidens tekster og satser (facts.calculatorConfig); kun knappen peger på formularen her. */
  calculator: {
    eyebrow: "Regn selv efter",
    title: "Hvad ville din formue koste hos *os*?",
    lead: "Vælg din formue – og skriv gerne, hvad du betaler i dag. Så ser du, hvad rådgivning hos TOBA Advice koster, når rabatterne er trukket fra. Omkostningsoverblikket giver dig de præcise tal.",
    content: { ...home.calculator, action: { label: "Bestil dit præcise overblik", href: "#bestil", variant: "primary" as const } },
  },

  rebates: {
    title: "Hvor havner rabatterne?",
    text: [
      "Når en bank eller rådgiver samler mange investorer, kan de forhandle rabatter hjem hos forvalterne. Rabatten stammer fra omkostninger, der trækkes i dit afkast. Det er dine penge.",
      "Hos TOBA Advice går rabatterne ubeskåret videre til dig. De påvirker ikke, hvilke fonde vi anbefaler.",
    ],
    video: videos.v06,
    fact: { value: facts.rebatesPaid.amountMio, decimals: 1, suffix: " mio. kr.", label: `udbetalte vi til vores kunder i forvalterrabatter for ${facts.rebatesPaid.year}. Hver krone gik ubeskåret videre.` },
  },

  how: {
    title: "Sådan foregår det",
    steps: [
      { title: "Udfyld formularen", text: "Vi kontakter dig inden for 1 hverdag." },
      { title: "Send os din rapport", text: "Din omkostnings- og afkastrapport er alt, vi skal bruge. Du finder den i din netbank, og din rådgiver aftaler med dig, hvordan du sender den sikkert." },
      { title: "Vi gennemgår alle lag", text: "Vi lægger alle omkostninger sammen på tværs af dine depoter." },
      { title: "Du får hele overblikket", text: "På et møde på en time gennemgår vi resultatet med dig." },
    ] satisfies StepContent[],
  },

  faqTitle: "Ofte stillede spørgsmål",
  faq: [
    { question: "Koster det noget?", answer: "Nej. Overblikket er gratis og uforpligtende." },
    { question: "Forpligter jeg mig til noget?", answer: "Nej. Du får overblikket, og du bestemmer selv, hvad du vil gøre bagefter." },
    { question: "Hvad skal jeg sende?", answer: "Kun din omkostnings- og afkastrapport fra banken. Har du flere depoter, så send gerne rapporten for hvert af dem. Vi aftaler med dig, hvordan du sender den sikkert." },
    { question: "Hvor lang tid tager det?", answer: "Selve mødet varer en time. Vi gør forarbejdet, inden vi mødes." },
    { question: "Hvad sker der med mine oplysninger?", answer: "Vi bruger dem kun til at lave dit overblik og kontakte dig. Du kan læse mere i vores persondatapolitik." },
  ] satisfies FaqItem[],

  notReady: {
    title: "Vil du først blive klogere?",
    text: "Hent vores gratis guide og se, hvordan omkostninger, rabatter og interessekonflikter påvirker din portefølje.",
    action: { label: "Hent guiden gratis", href: routes.guide, variant: "secondary" as const },
  },
};
