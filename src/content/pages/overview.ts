import { facts } from "../facts";
import { videos } from "../media";
import { activeCampaignForms, overviewForm } from "../forms";
import { home } from "./home";
import { routes } from "../site";
import type { FaqItem, HeroContent, Point, Seo, Stat, StepContent } from "../types";

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
    lead: "Ved du, hvad din investeringsportefølje samlet koster?",
  } satisfies HeroContent,
  heroText: [
    "Vi gennemgår dine omkostninger på tværs af rådgivning, bank og investeringsprodukter, så du kan se, hvad du betaler i kroner og procent – og hvor pengene går hen.",
    "Du får et bedre grundlag for at vurdere, om omkostningerne står mål med den værdi, du får.",
    "Du behøver ikke skifte bank eller rådgiver for at få klarhed.",
  ],
  /** ActiveCampaign-formular #9 (felter og tak-besked står i ActiveCampaign). */
  form: {
    id: activeCampaignForms.overview,
    title: "Bestil dit gratis omkostningsoverblik",
    intro: "Udfyld formularen, så kontakter vi dig og aftaler det videre forløb.",
    label: "Formular: Bestil dit gratis omkostningsoverblik",
    microcopy: overviewForm.microcopy,
  },

  what: {
    title: "Få hele billedet – ikke kun de synlige omkostninger",
    text: [
      "Din bank udarbejder hvert år en omkostningsopgørelse. Men det kan være vanskeligt at gennemskue den samlede pris, særligt hvis du har investeringer fordelt på flere depoter eller banker.",
      "Hos TOBA Advice hjælper vi dig med at samle oplysningerne og få overblik over, hvad du reelt betaler.",
    ],
    answersTitle: "Det får du svar på",
    answers: [
      { title: "Dine samlede omkostninger.", text: "Hvad betaler du årligt for din investeringsløsning – opgjort i både kroner og procent?" },
      { title: "Hvor omkostningerne ligger.", text: "Hvor meget går til rådgivning, depot, handel og de løbende omkostninger inde i fondene?" },
      { title: "Rabatter og provisioner.", text: "Er der rabatter eller provisioner knyttet til dine investeringer, og hvem får glæde af dem?" },
      { title: "Bankens egne produkter.", text: "Hvor stor en del af din portefølje består af bankens egne investeringsprodukter?" },
      { title: "Pris og værdi.", text: "Er der omkostninger eller investeringer, som kan være relevante at undersøge nærmere?" },
    ] satisfies Point[],
    note: "Målet er ikke nødvendigvis at finde den billigste løsning, men at skabe klarhed over, hvad du betaler, og hvad du får for pengene.",
    action: { label: "Få et gratis omkostningsoverblik", href: "#bestil", variant: "primary" as const },
  },

  example: {
    title: "3 depoter. Én samlet pris",
    text: [
      "En kunde kom til TOBA Advice med en investeret formue på godt 18 mio. kr. fordelt på tre depoter i en af de store danske banker.",
      "Kunden kendte sine serviceomkostninger, men manglede det samlede overblik. Især produktomkostningerne inde i fondene var svære at gennemskue, fordi de løbende trækkes fra afkastet.",
      "Først da vi gennemgik både service- og produktomkostninger på tværs af alle tre depoter, blev den samlede pris tydelig.",
    ],
    keyFigures: [
      { display: "1,36 %", label: "Samlede årlige omkostninger" },
      { display: "246.000 kr.", label: "Beregnet årlig omkostning ved en formue på godt 18 mio. kr." },
    ] satisfies Stat[],
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
    findingsTitle: "Hvad viste gennemgangen?",
    findings: [
      { title: "Omkostningerne lå flere steder.", text: "De tre depoter havde både serviceomkostninger til blandt andet rådgivning, depot og handel samt produktomkostninger, der løbende trækkes fra fondenes afkast." },
      { title: "Produktomkostningerne fyldte mest.", text: "På de frie midler udgjorde produktomkostningerne 0,95 % årligt – mere end det dobbelte af serviceomkostningerne." },
      { title: "Først det samlede overblik viste hele prisen.", text: "Først da omkostningerne blev samlet og vægtet på tværs af alle tre depoter, blev den samlede årlige pris på 1,36 % tydelig." },
    ] satisfies Point[],
    caption: "Kilde: Bankens omkostningsopgørelse 2025 og oplysninger fra pensionsselskabets rådgiver. Kronebeløbet er beregnet ud fra den oplyste formue og afrundet.",
  },

  relevant: {
    title: "Er et omkostningsoverblik relevant for dig?",
    fitTitle: "Et omkostningsoverblik kan være særligt relevant, hvis:",
    fits: [
      "Du har en større investerbar formue og er usikker på, hvad din investeringsløsning samlet koster.",
      "Du har investeringer fordelt på flere banker eller depoter og mangler det samlede overblik.",
      "Du er i tvivl om, hvordan din rådgiver bliver betalt, og om der er økonomiske interesser knyttet til de produkter, du bliver anbefalet.",
      "Du har solgt din virksomhed, opbygget en større formue eller blot ønsker et uafhængigt blik på dine nuværende omkostninger.",
    ],
    closing: "Du behøver ikke være utilfreds med din bank for at få glæde af et ekstra overblik.",
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
      "Når banker og rådgivere samler større investeringsbeløb, kan de ofte forhandle bedre vilkår hos kapitalforvalterne.",
      "Men hvem får egentlig glæde af rabatterne?",
      "Hos TOBA Advice har vi ingen egne investeringsprodukter og modtager ingen formidlingsprovision. De forvalterrabatter, vi forhandler hjem, sender vi ubeskåret videre til kunderne.",
      "I videoen forklarer Bent Hymøller, hvorfor det er en vigtig del af vores tilgang til uafhængig investeringsrådgivning.",
    ],
    video: videos.v06,
    fact: { value: facts.rebatesPaid.amountMio, decimals: 1, suffix: " mio. kr.", label: `udbetalt til TOBA Advices kunder i forvalterrabatter i ${facts.rebatesPaid.paidYear}.` },
  },

  how: {
    title: "Sådan foregår det",
    steps: [
      { title: "Udfyld formularen", text: "Vi kontakter dig inden for 1 hverdag." },
      { title: "Du deler dine omkostningsrapporter", text: "Vi aftaler, hvordan du sender dem sikkert. Har du flere depoter, skal vi gerne bruge en rapport fra hvert depot." },
      { title: "Vi gennemgår alle lag", text: "Vi lægger alle omkostninger sammen på tværs af dine depoter." },
      { title: "Du får hele overblikket", text: "På et møde på en time gennemgår vi resultatet med dig." },
    ] satisfies StepContent[],
    action: { label: "Bestil dit gratis omkostningsoverblik", href: "#bestil", variant: "primary" as const },
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
