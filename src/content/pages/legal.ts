import { company, routes } from "../site";
import type { HeroContent, Seo, StepContent } from "../types";

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
  listPlaceholder: "Liste over konkrete cookies – genereres af cookieværktøjet",
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
