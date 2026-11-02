import { company, routes } from "../site";
import type { HeroContent, Seo } from "../types";

export const contact = {
  seo: {
    title: "Kontakt os – book et uforpligtende møde | TOBA Advice",
    description: "Ring, skriv eller book et uforpligtende møde med en af vores rådgivere. Vi kommer gerne ud til dig – i hele Danmark.",
  } satisfies Seo,

  hero: {
    eyebrow: "Kontakt",
    title: "Kontakt *os* her",
    lead: "Vi er altid åbne for en snak om rådgivning og om, hvordan du får mest ud af din formue. Ræk endelig ud, hvis du har spørgsmål eller vil have hjælp til at finde den rigtige løsning.",
  } satisfies HeroContent,

  details: [
    { icon: "phone" as const, label: "Telefon", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` },
    { icon: "pin" as const, label: "Adresse", lines: [company.name, company.address.line1, company.address.line2], link: { label: "Find vej →", href: company.mapsUrl } },
    { icon: "linkedin" as const, label: "LinkedIn", link: { label: "Følg os på LinkedIn →", href: company.linkedin } },
  ],

  /** ?emne=moede forvælger "Book et møde" */
  meetingParam: { key: "emne", value: "moede" },
  formAnchor: "formular",

  advisers: {
    title: "Kontakt rådgivningsteamet",
    lead: "Har du en formue eller investeringer, du gerne vil have gennemgået eller optimeret? Tag fat i en af vores rådgivere direkte.",
    link: { label: "Se hele teamet →", href: routes.team },
  },
};
