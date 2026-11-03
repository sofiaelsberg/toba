import { company, routes } from "../site";
import type { HeroContent, Point, Seo, StepContent } from "../types";

/** Politikker, Finanstilsynet, Klageadgang, Cookies + cookiebanner. Compliance skal læse alt. */

export const policies = {
  seo: { title: "Politikker | TOBA Advice", description: "Læs TOBA Advices politikker om interessekonflikter, privatliv, løn og bæredygtighed." } satisfies Seo,
  hero: {
    eyebrow: "Politikker",
    title: "Vores politikker",
    lead: "Vi mener, at du skal kunne se, hvordan vi arbejder – også når det handler om regler og ansvar. Her finder du de politikker, der gælder for TOBA Advice.",
  } satisfies HeroContent,
  documents: [
    { title: "Håndtering af interessekonflikter", text: "Sådan finder, forebygger og håndterer vi interessekonflikter – så rådgivningen altid tager udgangspunkt i dig.", date: "Gældende fra 1. oktober 2024", href: "/dokumenter/politik-interessekonflikter.pdf", cta: "Hent PDF" },
    { title: "Privatlivspolitik", text: "Sådan behandler og beskytter vi dine personoplysninger.", date: "Version 2 · opdateret 13. januar 2025", href: "/dokumenter/privatlivspolitik.pdf", cta: "Hent PDF" },
    { title: "Lønpolitik", text: "Sådan aflønner vi vores medarbejdere – uden incitamenter, der kan stride mod dine interesser.", date: "Gældende fra 1. oktober 2024", href: "/dokumenter/politik-loen.pdf", cta: "Hent PDF" },
    // TODO compliance: PDF'en tilhører TOBA Investments – afklar før lancering.
    { title: "Bæredygtighed og samfundsansvar", text: "Sådan indgår bæredygtighed og ansvarlighed i vores arbejde.", date: "Gældende fra november 2025", href: "/dokumenter/politik-baeredygtighed.pdf", cta: "Hent PDF" },
  ],
  cookiesItem: { title: "Cookies", text: "Sådan bruger vi cookies på tobaadvice.com.", linkLabel: "Læs cookiepolitikken →", href: routes.cookies },
  questions: {
    title: "Spørgsmål?",
    text: `Har du spørgsmål til vores politikker, så ring på ${company.phone} eller`,
    linkLabel: "skriv til os",
    href: routes.contact,
  },
};

export const fsa = {
  seo: { title: "Tilladelse fra Finanstilsynet | TOBA Advice", description: "TOBA Advice A/S er registreret hos Finanstilsynet som investeringsrådgiver. Se vores registreringsoplysninger." } satisfies Seo,
  hero: {
    eyebrow: "Finanstilsynet",
    title: "Godkendt af Finanstilsynet",
    lead: "TOBA Advice A/S har tilladelse fra Finanstilsynet til at drive virksomhed som investeringsrådgiver. Det betyder, at vi er under tilsyn og skal overholde de samme regler om rådgivning, interessekonflikter og kundebeskyttelse som resten af den finansielle sektor.",
  } satisfies HeroContent,
  registrationTitle: "Registreringsoplysninger",
  registration: [
    { key: "Virksomhed", value: company.legalName },
    { key: "CVR-nr.", value: company.cvr },
    { key: "FT-nr.", value: company.ftNumber },
    { key: "Adresse", value: `${company.address.line1}, ${company.address.line2}` },
    { key: "Virksomhedstype", value: "Investeringsrådgiver" },
    { key: "Område", value: "Fondsmæglerområdet" },
    { key: "Registreret hos Finanstilsynet", value: "11. december 2019" },
  ],
  // TODO: link til Finanstilsynets virksomhedsregister
  registerLink: { label: "Se os i Finanstilsynets virksomhedsregister", href: "", variant: "secondary" as const },
  meaningTitle: "Hvad betyder det for dig?",
  meaning: [
    { title: "Vi er under tilsyn.", text: "Finanstilsynet fører tilsyn med, at vi overholder reglerne." },
    { title: "Dine penge står i din egen bank.", text: "Vi er ikke en bank og opbevarer ikke dine værdipapirer. Dit depot ligger i den bank, du selv har valgt." },
    { title: "Du kan klage.", text: "Er du utilfreds, kan du klage til os og derefter til Forbrugerklagenævnet." },
  ],
  complaintsLink: { label: "Se klageadgang →", href: routes.complaints },
};

export const complaints = {
  seo: { title: "Klageadgang | TOBA Advice", description: "Er du utilfreds med vores rådgivning? Sådan klager du til TOBA Advice – og til Forbrugerklagenævnet, hvis vi ikke bliver enige." } satisfies Seo,
  hero: {
    eyebrow: "Klageadgang",
    title: "Er du utilfreds?",
    lead: "Så vil vi gerne høre det. De fleste ting kan løses med en snak, så kontakt gerne din rådgiver først.",
  } satisfies HeroContent,
  stepsTitle: "Sådan klager du",
  // Overvej klage@tobaadvice.com i stedet for en personlig adresse.
  complaintEmail: "ab@tobaadvice.com",
  steps: [
    { title: "Skriv til os", text: "Send din klage til **ab@tobaadvice.com** og skriv “Klage” i emnefeltet. Husk at oplyse din e-mail, så vi kan svare dig." },
    { title: "Vi bekræfter", text: "Du får en kvittering inden for 3 hverdage." },
    { title: "Vi behandler din klage", text: "Vores klageansvarlige indhenter oplysningerne, vurderer sagen sammen med de relevante personer og svarer dig skriftligt. Tager det længere tid, holder vi dig orienteret undervejs." },
  ] satisfies StepContent[],
  escalation: {
    title: "Er du stadig uenig?",
    text: "Så kan du klage til Forbrugerklagenævnet.",
    address: {
      name: "Forbrugerklagenævnet",
      lines: ["Nævnenes Hus", "Toldboden 2, 8800 Viborg"],
      phoneLabel: "Telefon:", phone: "+45 72 40 56 00",
      emailLabel: "E-mail:", email: "nh@naevneneshus.dk",
    },
  },
};

export const cookiesPage = {
  seo: { title: "Cookies | TOBA Advice", description: "Sådan bruger TOBA Advice cookies på tobaadvice.com, og sådan ændrer du dit valg." } satisfies Seo,
  hero: {
    eyebrow: "Cookies",
    title: "Cookies på tobaadvice.com",
    lead: "Vi bruger cookies til at få hjemmesiden til at virke og – hvis du siger ja – til at forstå, hvordan siden bliver brugt. Du bestemmer selv.",
  } satisfies HeroContent,
  usageTitle: "Sådan bruger vi cookies",
  list: {
    title: "Cookies vi bruger",
    headers: { name: "Navn", provider: "Fra", purpose: "Formål", duration: "Varighed" },
    /** Opdatér listen, hvis der kommer nye værktøjer på siden. */
    items: [
      { name: "toba_consent", provider: "TOBA Advice", category: "necessary", purpose: "Husker dit cookievalg.", duration: "6 måneder" },
      { name: "_ga", provider: "Google Analytics", category: "statistics", purpose: "Skelner besøgende fra hinanden, så vi kan tælle, hvor mange der bruger siden.", duration: "2 år" },
      { name: "_ga_<id>", provider: "Google Analytics", category: "statistics", purpose: "Husker dit besøg, så sidevisninger kan samles i ét besøg.", duration: "2 år" },
      { name: "bcookie, lidc m.fl.", provider: "LinkedIn", category: "marketing", purpose: "Sættes af LinkedIn, når vi viser et LinkedIn-opslag på siden.", duration: "Op til 1 år" },
    ] satisfies { name: string; provider: string; category: CookieCategoryId; purpose: string; duration: string }[],
    note: "Google Analytics indlæses først, når du siger ja til statistik. Google behandler oplysningerne på vores vegne og kan overføre dem til USA under EU-USA Data Privacy Framework. Vi bruger ikke data fra Google Analytics til annoncering.",
  },
  change: {
    title: "Skift dit valg",
    text: "Du kan altid ændre eller trække dit samtykke tilbage.",
    button: "Cookieindstillinger",
    privacyText: "Læs mere om, hvordan vi behandler personoplysninger, i vores",
    privacyLink: "privatlivspolitik",
    privacyHref: routes.policies,
  },
};

export type CookieCategoryId = "necessary" | "statistics" | "marketing";

export const cookieConsent = {
  title: "Cookies på tobaadvice.com",
  text: "Vi bruger nødvendige cookies, så siden virker. Med dit ja bruger vi også cookies til statistik og til at måle vores kampagner. Du bestemmer selv, og du kan altid ændre dit valg.",
  categories: [
    { id: "necessary", title: "Nødvendige cookies", text: "Får siden til at virke, fx husker de dit cookievalg. De kan ikke fravælges.", locked: true },
    { id: "statistics", title: "Statistik", text: "Viser os, hvilke sider der bliver besøgt, så vi kan gøre siden bedre. Bruges kun, hvis du siger ja." },
    { id: "marketing", title: "Marketing", text: "Bruges til at måle vores kampagner, fx på LinkedIn. Bruges kun, hvis du siger ja." },
  ] satisfies { id: CookieCategoryId; title: string; text: string; locked?: boolean }[],
  states: { always: "Altid aktive", on: "Til", off: "Fra" },
  buttons: { onlyNecessary: "Kun nødvendige", acceptAll: "Accepter alle", customize: "Tilpas", save: "Gem mit valg" },
  dialogLabel: "Cookies",
};

/**
 * Oplysninger om tilgængelighed (tilgængelighedsloven, § 35 og bilag 4):
 * a) en beskrivelse af tjenesten, b) hvordan den bruges, c) hvordan den lever op til kravene.
 * Gennemgås mindst én gang om året – og når hjemmesiden, kundeportalen eller rådgivningsforløbet ændres.
 */
export const accessibilityPage = {
  seo: {
    title: "Tilgængelighed | TOBA Advice",
    description: "Sådan arbejder vi for, at alle kan bruge tobaadvice.com og vores rådgivning – og hvor du kan henvende dig, hvis noget ikke virker for dig.",
  } satisfies Seo,
  hero: {
    eyebrow: "Tilgængelighed",
    title: "Rådgivning, alle kan bruge",
    lead: "Vi vil gerne, at alle kan bruge vores hjemmeside og vores rådgivning – også hvis du ser, hører, læser eller bevæger dig anderledes end de fleste. Her kan du læse, hvordan vi gør, og hvad du kan gøre, hvis noget ikke virker for dig.",
  } satisfies HeroContent,

  service: {
    title: "Vores tjeneste",
    text: `${company.name} er investeringsrådgiver med tilladelse fra Finanstilsynet. Vi rådgiver personer med en investérbar formue på mindst 5 mio. kr. om, hvordan formuen skal investeres. Din formue står i din egen bank – vi rådgiver om den. Du har en fast rådgiver, som du taler med på møder, på telefon og på e-mail.`,
    stepsTitle: "Sådan foregår det",
    steps: [
      { title: "Du kontakter os", text: `Ring på ${company.phone}, skriv til os via kontaktformularen, eller book et møde. Du kan også kontakte en af vores rådgivere direkte.` },
      { title: "Et første møde", text: "Vi taler om dine mål, din tidshorisont og hvad du betaler i dag. Har du brug for, at mødet foregår på en bestemt måde – fx med mere tid, med en pårørende eller som videomøde – så sig til, så finder vi en løsning." },
      { title: "Et forslag", text: "Du får et skriftligt forslag til en strategi og et overblik over, hvad det koster. Din rådgiver gennemgår det med dig, så du kan stille spørgsmål." },
      { title: "Løbende overblik", text: "Du kan følge din formue i vores kundeportal og app, og du får en rapport hvert kvartal. Kan du ikke bruge kundeportalen, så sig til – så sender vi rapporterne til dig eller gennemgår dem på et møde." },
    ] satisfies StepContent[],
  },

  website: {
    title: "Sådan lever hjemmesiden op til kravene",
    lead: "tobaadvice.com er bygget efter den europæiske standard EN 301 549 og retningslinjerne WCAG 2.1 på niveau AA. Vi tester siden med automatiske værktøjer og manuelt, bl.a. med tastatur og forstørret tekst. Det betyder blandt andet:",
    points: [
      { title: "Tastatur.", text: "Hele siden kan bruges med tastatur alene, og det er tydeligt, hvor du er. Øverst på hver side kan du springe direkte til indholdet." },
      { title: "Skærmlæsere.", text: "Siden har en klar opbygning med overskrifter. Billeder har tekstbeskrivelser, og knapper og felter har navne, som en skærmlæser kan læse op." },
      { title: "Større tekst og små skærme.", text: "Du kan forstørre teksten til 200 %, og siden tilpasser sig skærme helt ned til 320 pixels i bredden – uden at du skal scrolle til siden." },
      { title: "Kontrast.", text: "Tekst og knapper har tilstrækkelig kontrast til baggrunden." },
      { title: "Video.", text: "Alle vores videoer har undertekster. Videoerne starter ikke af sig selv med lyd." },
      { title: "Bevægelse.", text: "Animationer kører kun én gang og slås fra, hvis du har valgt “reducer bevægelse” på din computer eller telefon. Stemningsvideoen på forsiden kan sættes på pause." },
      { title: "Formularer.", text: "Alle felter har en synlig etiket, og fejl bliver beskrevet i tekst – ikke kun med farve." },
      { title: "Klart sprog.", text: "Vi skriver så enkelt, vi kan, og forklarer fagudtryk, når vi bruger dem." },
    ] satisfies Point[],
  },

  limits: {
    title: "Det arbejder vi stadig på",
    points: [
      { title: "Politikker som PDF.", text: "Vores politikker er tilgængelige PDF-filer med overskrifter, bogmærker og tabeller, som en skærmlæser kan læse op. Har du brug for dem i et andet format, så kontakt os." },
      { title: "Kundeportalen og appen.", text: "Kundeportalen og appen leveres af en samarbejdspartner, og vi har ikke selv fuld kontrol over, hvor tilgængelige de er. Har du problemer med dem, så kontakt din rådgiver." },
      { title: "Indhold fra andre.", text: "Indlejret indhold fra andre tjenester, fx LinkedIn-opslag, lever ikke nødvendigvis op til de samme krav." },
    ] satisfies Point[],
  },

  contact: {
    title: "Virker noget ikke for dig?",
    text: `Så vil vi gerne høre det. Ring til os på ${company.phone}, eller skriv via kontaktformularen. Fortæl, hvad du prøvede at gøre, og hvad der ikke virkede – så hjælper vi dig og retter fejlen. Vi svarer inden for 24 timer.`,
    action: { label: "Skriv til os", href: routes.contact, variant: "primary" as const },
  },

  complaint: {
    title: "Klage over tilgængelighed",
    text: "Får du ikke en løsning hos os, kan du kontakte Erhvervsstyrelsen, som fører tilsyn med reglerne om tilgængelighed for produkter og tjenester. Du kan give dem et tip om tjenester, der ikke er tilgængelige.",
    link: { label: "Tip Erhvervsstyrelsen på sik.dk →", href: "https://www.sik.dk/tip" },
  },

  updated: "Senest gennemgået 29. oktober 2026. Vi gennemgår oplysningerne mindst én gang om året.",
};
