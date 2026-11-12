import { facts } from "../facts";
import { images } from "../media";
import { routes, bookMeeting, trustline } from "../site";
import type { FaqItem, HeroContent, ManagerMapContent, Point, QuoteContent, Seo, Stat, StepContent, NewsTeaserContent } from "../types";

export const howWeInvest = {
  seo: {
    title: "Sådan investerer vi din formue | TOBA Advice",
    description:
      "En klar strategi, bred spredning, grundigt udvalgte forvaltere og adgang til private markets. Se, hvordan vi arbejder med din formue.",
  } satisfies Seo,

  anchorNavLabel: "På denne side",
  anchors: [
    { id: "strategi", label: "Strategi" },
    { id: "afkast", label: "Afkast og risiko" },
    { id: "forvaltere", label: "Forvaltere" },
    { id: "private", label: "Private markets" },
    { id: "helheden", label: "Helheden" },
    { id: "kom-i-gang", label: "Kom i gang" },
  ],

  hero: {
    eyebrow: "Vores investeringsproces",
    title: "Sådan *investerer* vi",
    lead: "En klar plan, de bedste forvaltere og en rådgiver, der følger med hele vejen. Her kan du se, hvordan vi arbejder med din formue.",
    actions: [bookMeeting, { label: "Se hvordan", href: "#strategi", variant: "secondary" }],
    trustline,
  } satisfies HeroContent,
  heroMedia: images.meetingTable,

  strategy: {
    title: "En plan, du kan holde fast i – også i modvind",
    steps: [
      { title: "Blankt papir", text: "Vi starter uden færdige porteføljer. Hele markedet er i spil." },
      { title: "Rammerne", text: "Vi aftaler dem sammen: din tidshorisont, hvor store udsving du kan leve med, og hvad du forventer af afkast." },
      { title: "Byggeklodserne", text: "Vi vælger frit på hele markedet. Det er sammensætningen, der afgør dit afkast." },
      { title: "Opfølgning", text: "Vi aftaler, hvor tit vi mødes, hvordan vi overvåger porteføljen, og hvornår vi justerer." },
    ] satisfies StepContent[],
    quote: {
      text: "“Over 90 % af udsvingene i en porteføljes afkast forklares af strategien – ikke af timing eller aktievalg.”",
      source: "Brinson, Hood & Beebower, Financial Analysts Journal, 1986",
    } satisfies QuoteContent,
  },

  /** OBS: Udkast fra Anders' version – citatet skal godkendes af Bertel før lancering. */
  cioQuote: {
    personSlug: "bertel-roslev-rasmussen",
    text: "“Mange forvaltere lover det bedste afkast og at kunne time markedet. Jeg lover ikke mere, end vi kan holde. Derfor bygger vi kernen af billige indeksfonde – og bruger kun aktive forvaltere dér, hvor de har bevist deres værdi.”",
  },

  returns: {
    eyebrow: "Afkast og risiko",
    title: "Mere afkast – for den samme risiko",
    lead: "Når porteføljen spredes over flere typer investeringer, kan du forvente mere afkast uden at tage mere risiko.",
    differenceSuffix: " mio. kr.",
    differenceLabel: "til forskel efter 20 år – med samme udsving",
    exampleLabel: "Eksempel: 10 mio. kr. over 20 år",
    // TODO compliance: definér, hvad "traditionel" og "bredt spredt" består af.
    series: [
      { label: "Traditionel portefølje", rate: facts.returnExample.traditional },
      { label: "Bredt spredt portefølje", rate: facts.returnExample.diversified },
    ],
    rateLabel: "om året",
    valueSuffix: " mio.",
    volatility: "Udsving (standardafvigelse): **8,48 %** i begge",
    footnote: "Regneeksempel baseret på forventede afkast fra Rådet for Afkastforventninger. Forventede afkast er ingen garanti for fremtidige afkast.",
  },

  managers: {
    title: "Sådan vælger vi forvaltere – og holder dem i kort snor",
    lead: "Vi bygger din portefølje af fonde fra nogle af de bedste kapitalforvaltere i verden. Hver forvalter er valgt, fordi de hører til de bedste inden for netop deres område.",
    stats: [
      { value: facts.managers, label: "forvaltere" },
      { value: facts.countries, label: "lande" },
      { value: facts.yearsSelectingManagers, suffix: "+ år", label: "erfaring med at udvælge kapitalforvaltere" },
    ] satisfies Stat[],
    process: [
      { question: "Screening", answer: "Vi kortlægger markedet – også de forvaltere, der ikke har et salgsapparat i Danmark." },
      { question: "Grundig gennemgang", answer: "Strategi, team, proces, omkostninger og historik – før noget kommer i din portefølje." },
      { question: "Adgang", answer: "Vi åbner fonde, der normalt kræver institutionelle beløb." },
      { question: "Forhandling", answer: "Vi forhandler bedre priser hjem på vegne af alle vores kunder." },
      { question: "Opfølgning", answer: "Vi mødes med forvalterne og følger dem kvartal for kvartal." },
      { question: "Udskiftning", answer: "Leverer en forvalter ikke, skifter vi." },
    ] satisfies FaqItem[],
    /** Kilde: M1-slides, slide 13 (forvalternes hovedkontorer). */
    map: {
      label: "Kort over, hvor vores forvaltere har hovedkontor",
      regions: [
        { label: "Danmark", managers: 6 },
        { label: "Norden", managers: 2 },
        { label: "Nordamerika", managers: 7 },
        { label: "Europa", managers: 4 },
      ],
      locations: [
        { label: "København", lat: 55.68, lon: 12.57, managers: ["HP Fonds", "Accunia", "Great Dane", "CABA Capital", "Thylander", "Winest"] },
        // Oslo og Stockholm er rykket en anelse, så prikkerne ikke overlapper København (min. 24 px mellem prikkerne, WCAG 2.5.8).
        { label: "Oslo", lat: 61.4, lon: 9.5, managers: ["Storebrand"] },
        { label: "Stockholm", lat: 61.3, lon: 18.5, managers: ["Coeli"] },
        { label: "London", lat: 51.51, lon: -0.13, managers: ["ICG", "Apax", "Twelve Securis"] },
        { label: "Frankfurt", lat: 50.11, lon: 8.68, managers: ["Xtrackers (DWS)"] },
        { label: "USA · østkysten", lat: 40.71, lon: -74.0, managers: ["Baron Capital", "J.P. Morgan", "StepStone Group", "Vanguard"] },
        { label: "Florida", lat: 26.12, lon: -80.14, managers: ["GQG Partners"] },
        { label: "Texas", lat: 30.27, lon: -97.74, managers: ["Vista"] },
        { label: "Californien", lat: 33.54, lon: -117.78, managers: ["WCM"] },
      ],
      managerSingular: "forvalter",
      managerPlural: "forvaltere",
      listLabel: "Se alle forvaltere og byer",
      caption: "Forvalternes hovedkontorer. Peg på eller tryk på en prik for at se, hvem der sidder hvor.",
    } satisfies ManagerMapContent,
    link: { label: "Læs om uafhængig rådgivning →", href: routes.independent },
  },

  privateMarkets: {
    eyebrow: "Private markets",
    title: "Investeringer, der normalt er forbeholdt de store",
    lead: "Pensionskasser og meget store formuer har i årevis investeret uden for børsen. Det giver spredning og kan beskytte mod inflation. Vi giver dig adgang til de samme muligheder.",
    categories: [
      { title: "Private credit", text: "Lån til private virksomheder. Stabilt afkast og beskyttelse mod inflation.", media: images.privateCredit },
      { title: "Infrastruktur", text: "Vedvarende energi, transport og digital infrastruktur. Spredning og stabilt afkast.", media: images.infrastructure },
      { title: "Real assets", text: "Ejendomme, skov og landbrugsjord. Spredning og beskyttelse mod inflation.", media: images.realAssets },
      { title: "Private equity", text: "Ejerskab i virksomheder, der ikke er børsnoterede. Mulighed for højere afkast.", media: images.privateEquity },
    ],
    access: {
      fromLabel: "Institutionelle fonde kræver typisk",
      fromValue: "10–20 mio. euro",
      toLabel: "Gennem vores platformssamarbejde fra",
      toValue: "750.000 kr.",
      text: "Du kommer ind på institutionelle vilkår – og med den grundige gennemgang gjort på forhånd.",
      risk: "Alternative investeringer er mindre likvide end børsnoterede aktier og obligationer og kan have højere risiko.",
    },
  },

  whole: {
    title: "Vi tænker i *helheden*",
    lead: "Din formue hænger sammen med resten af dit liv – din familie, din virksomhed og din fremtid. Derfor ser vi ikke kun på porteføljen.",
    note: "Vi sørger for, at tingene hænger sammen, og koordinerer med din advokat og revisor. Har du ikke en, henviser vi dig til nogen, vi kender og stoler på. Vi får ingen betaling for at henvise.",
    areas: [
      { title: "Familie", text: "Hvordan formuen skal række – også til børn og børnebørn." },
      { title: "Jura", text: "Ægtepagt, testamente og fremtidsfuldmagt skal passe til din investeringsstrategi." },
      { title: "Virksomhed", text: "Lønudtræk, ejeraftale og generationsskifte påvirker, hvordan din formue skal investeres." },
    ] satisfies Point[],
  },

  cooperation: {
    title: "Overblik, når det passer *dig*",
    lead: "Når strategien er på plads, følger vi din formue tæt – og du kan altid selv se, hvordan det går, på web og i app.",
    points: [
      { title: "Samlet porteføljeoverblik.", text: "Følg hele din portefølje ét sted." },
      { title: "Nøgletal.", text: "Se de vigtigste tal for din portefølje." },
      { title: "Afkastanalyse.", text: "Forstå, hvad der har drevet dit afkast." },
      { title: "Rapport hvert kvartal", text: "– og faste møder med din rådgiver." },
    ] satisfies Point[],
    noBankSwitch: "**Du behøver ikke skifte bank.** Vi er ikke en bank. Vi bruger dit eksisterende depot.",
    media: images.clientPortal,
    caption: "Illustrativt skærmbillede. Tallene er eksempler og ikke en faktisk kundeportefølje.",
    price: {
      title: "Hvad koster det?",
      text: "Fast honorar, og alle rabatter går ubeskåret til dig. Se, hvad din formue koster i dag.",
      action: { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "primary" as const },
    },
  },

  getStarted: {
    title: "Sådan kommer du i gang",
    steps: [
      { title: "Et uforpligtende møde", text: "Vi starter med dig: Hvad er formålet med dine penge? Hvad betaler du i dag? Hvad er vigtigt for dig?" },
      { title: "Et forslag", text: "Du får en strategi og et klart overblik over, hvad det koster." },
      { title: "Du bestemmer", text: "Ingen binding. Siger du ja, sætter vi det hele i gang – i din egen bank." },
      { title: "Vi følger op", text: "Fast møderytme og løbende overvågning. Du kan altid ringe direkte til din rådgiver." },
    ] satisfies StepContent[],
    actions: [
      { ...bookMeeting, variant: "light" as const },
      { label: "Start med et gratis omkostningsoverblik", href: routes.overview, variant: "ghost-light" as const },
    ],
  },

  /** Relaterede indlæg fra /nyheder. Skift filnavnene for at vise andre (fyldes op med de nyeste). */
  related: {
    title: "Læs mere om emnet",
    lead: "Indlæg om porteføljeopbygning, forvaltervalg og private markeder.",
    slugs: ["core-satellite-saadan-bygger-du-portefoeljen", "investering-i-alternativer-forvaltervalget-er-afgoerende", "hvorfor-interessere-sig-for-private-equity"],
  } satisfies NewsTeaserContent,
};
