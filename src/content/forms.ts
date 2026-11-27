/**
 * Formularerne på siden er ActiveCampaign-formularer, der indlejres direkte.
 * Felter, tak-besked og handlinger (liste, tags) redigeres i ActiveCampaign – ikke her.
 * Her står kun overskrifter og teksten under formularen.
 */

export type FormMicrocopy = { text: string; linkLabel: string; href: string; after?: string };
export type FormConsent = FormMicrocopy & { error: string };

import { routes } from "./site";

/** Formularernes id i ActiveCampaign (Website → Forms). */
export const activeCampaignForms = { account: "https://tobaadvice24097.activehosted.com", contact: 10, guide: 8, overview: 9, newsletter: 11 } as const;

/** Navnet, der sendes til Google Analytics som `form` ved `generate_lead`. */
export const formAnalyticsName: Record<number, "kontakt" | "guide" | "omkostningsoverblik" | "nyhedsbrev"> = {
  [activeCampaignForms.contact]: "kontakt",
  [activeCampaignForms.guide]: "guide",
  [activeCampaignForms.overview]: "omkostningsoverblik",
  [activeCampaignForms.newsletter]: "nyhedsbrev",
};

const privacy = { linkLabel: "privatlivspolitik", href: routes.privacy, after: "." };

export const contactForm = {
  title: "Skriv til os",
  label: "Kontaktformular",
  /** ?emne=moede på /kontakt forvælger emnet. Værdierne er valgmulighederne i feltet "Henvendelse emne" i ActiveCampaign. */
  topicField: "field[47]",
  topics: { moede: "Book et møde", spoergsmaal: "Spørgsmål", andet: "Andet" } as Record<string, string>,
  microcopy: { text: "Vi bruger dine oplysninger til at svare på din henvendelse. Læs mere i vores", ...privacy } satisfies FormMicrocopy,
};

export const guideForm = {
  title: "Hent guiden gratis",
  intro: "Skriv dit navn og din e-mail, så sender vi guiden direkte til din indbakke.",
  microcopy: { text: "Du kan afmelde dig med ét klik i alle vores e-mails. Læs mere i vores", ...privacy } satisfies FormMicrocopy,
};

export const overviewForm = {
  title: "Bestil dit gratis omkostningsoverblik",
  intro: "Udfyld formularen, så kontakter vi dig og aftaler det videre forløb.",
  microcopy: { text: "Gratis og uforpligtende. Læs mere i vores", ...privacy } satisfies FormMicrocopy,
};

export const newsletterForm = {
  title: "Tilmeld nyhedsbrev",
  label: "Tilmelding til nyhedsbrev",
  /** Feltet "Nyhedsbrev" i ActiveCampaign sættes til "Ja" og skjules (formularen spørger ikke). */
  fixed: { "field[45]": "Ja" } as Record<string, string>,
  /** Samtykke-afkrydsning over knappen. Formularen kan først sendes, når der er sat kryds.
   *  Felter og knaptekst ("Tilmeld mig nyhedsbrevet") redigeres i ActiveCampaign. */
  consent: {
    text: "Ja tak, jeg vil modtage nyhedsbreve fra TOBA på e-mail. Jeg kan altid afmelde mig. Se",
    linkLabel: "privatlivspolitikken",
    href: routes.privacy,
    after: ".",
    error: "Sæt kryds for at tilmelde dig nyhedsbrevet.",
  } satisfies FormConsent,
};
