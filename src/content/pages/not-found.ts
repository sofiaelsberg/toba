import { company, routes } from "../site";

export const notFound = {
  seo: { title: "Siden findes ikke | TOBA" },
  eyebrow: "Fejl 404",
  title: "Den side findes ikke",
  lead: "Måske er den flyttet, eller også er der en tastefejl i adressen. Vi har lige bygget en ny hjemmeside, så nogle gamle links virker ikke længere.",
  homeAction: { label: "Gå til forsiden", href: routes.home, variant: "light" as const },
  suggestionsTitle: "Her er nogle steder, du kan starte",
  suggestions: [
    { label: "Sådan investerer vi", href: routes.howWeInvest },
    { label: "Få et gratis omkostningsoverblik", href: routes.overview },
    { label: "Mød teamet", href: routes.team },
  ],
  help: { before: "Kan du ikke finde det, du leder efter? Ring på", phone: company.phone, middle: "eller", linkLabel: "skriv til os", href: routes.contact, after: "." },
};

/** Vises, hvis en side fejler uventet (src/app/error.tsx). */
export const serverError = {
  eyebrow: "Noget gik galt",
  title: "Siden kunne ikke vises",
  lead: "Der skete en fejl hos os. Prøv igen om et øjeblik – eller ring til os, så hjælper vi dig videre.",
  retry: "Prøv igen",
  homeAction: { label: "Gå til forsiden", href: routes.home, variant: "ghost-light" as const },
  phone: company.phone,
};
