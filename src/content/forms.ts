/**
 * Tekster til formularerne. Felternes navne (keys) er dem, der sendes til ActiveCampaign.
 * Samtykketekster skal godkendes af compliance før lancering.
 */

export type FieldType = "text" | "email" | "tel" | "textarea" | "select";

export type FieldContent = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  optionalLabel?: string;
  placeholder?: string;
  autoComplete?: string;
  options?: { value: string; label: string }[];
  /** Fejltekst, når feltet mangler eller er ugyldigt. Siger hvad man skal gøre. */
  error?: string;
  /** Bredde i to-kolonne-grid */
  half?: boolean;
};

export type ConsentContent = {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  /** Samtykket dækker nyhedsbrev/markedsføring → nyhedsbrevslisten og samtykke-tag i ActiveCampaign. */
  marketing?: boolean;
};

export type FormContent = {
  id: "kontakt" | "guide" | "omkostningsoverblik";
  title: string;
  intro?: string;
  fields: FieldContent[];
  consents: ConsentContent[];
  submit: string;
  submitting: string;
  microcopy: { text: string; linkLabel: string; href: string; after?: string };
  success: { title: string; body: string[]; action?: { label: string; href: string } };
  failure: string;
};

const optional = "(valgfrit)";

export const contactForm: FormContent = {
  id: "kontakt",
  title: "Skriv til os",
  fields: [
    {
      name: "emne", label: "Hvad drejer det sig om?", type: "select", required: true,
      options: [
        { value: "moede", label: "Book et møde" },
        { value: "spoergsmaal", label: "Spørgsmål" },
        { value: "andet", label: "Andet" },
      ],
    },
    { name: "navn", label: "Navn", type: "text", required: true, autoComplete: "name", half: true, error: "Skriv dit navn, så vi ved, hvem vi taler med." },
    { name: "email", label: "E-mail", type: "email", required: true, autoComplete: "email", half: true, error: "Skriv din e-mail, så vi kan svare dig – fx navn@firma.dk." },
    { name: "telefon", label: "Telefon", type: "tel", optionalLabel: optional, autoComplete: "tel", half: true },
    { name: "virksomhed", label: "Virksomhed", type: "text", optionalLabel: optional, autoComplete: "organization", half: true },
    { name: "besked", label: "Besked", type: "textarea", required: true, placeholder: "Skriv din besked her", error: "Skriv et par ord om, hvad vi kan hjælpe med." },
  ],
  consents: [
    { name: "samtykke", required: true, label: "Ja tak, TOBA Advice må kontakte mig på e-mail og telefon om min henvendelse.", error: "Sæt kryds, så vi må kontakte dig om din henvendelse." },
    { name: "nyhedsbrev", marketing: true, label: "Send mig også TOBA Advices nyhedsbrev. Jeg kan altid afmelde mig igen." },
  ],
  submit: "Send besked",
  submitting: "Sender …",
  microcopy: { text: "Læs, hvordan vi behandler dine oplysninger, i vores", linkLabel: "privatlivspolitik", href: "/politikker", after: "." },
  success: { title: "Tak for din henvendelse!", body: ["Vi vender tilbage hurtigst muligt – senest inden for 24 timer."], action: { label: "Skriv en ny besked", href: "#formular" } },
  failure: "Beskeden kunne ikke sendes. Prøv igen, eller ring til os på +45 28 18 84 27.",
};

/**
 * ActiveCampaign-formularer, der indlejres direkte på landingssiderne.
 * Felter, tak-besked og handlinger (liste, tags) redigeres i ActiveCampaign – ikke her.
 */
export const activeCampaignForms = { account: "https://tobaadvice24097.activehosted.com", guide: 8, overview: 9 } as const;

export const guideForm: FormContent = {
  id: "guide",
  title: "Hent guiden gratis",
  intro: "Skriv dit navn og din e-mail, så sender vi guiden direkte til din indbakke.",
  fields: [
    { name: "fornavn", label: "Fornavn", type: "text", required: true, autoComplete: "given-name", error: "Skriv dit fornavn." },
    { name: "email", label: "E-mail", type: "email", required: true, autoComplete: "email", error: "Skriv din e-mail, så vi kan sende guiden – fx navn@firma.dk." },
    { name: "telefon", label: "Telefon", type: "tel", optionalLabel: optional, autoComplete: "tel", placeholder: "Oplys gerne dit telefonnummer, hvis du vil have en personlig gennemgang" },
  ],
  consents: [
    {
      name: "samtykke", required: true, marketing: true,
      label: "Ja tak, send mig guiden. Jeg accepterer samtidig, at TOBA Advice sender mig sit nyhedsbrev og må kontakte mig på e-mail og – hvis jeg har oplyst det – telefon med tilbud om et gratis omkostningsoverblik og anden information om investeringsrådgivning. Jeg kan til enhver tid trække mit samtykke tilbage.",
      error: "Sæt kryds, så vi må sende dig guiden.",
    },
  ],
  submit: "Send mig guiden",
  submitting: "Sender …",
  microcopy: { text: "Du kan afmelde dig med ét klik i alle vores e-mails. Læs mere i vores", linkLabel: "persondatapolitik", href: "/politikker", after: "." },
  success: {
    title: "Tak – guiden er på vej",
    body: [
      "Tjek din indbakke om et øjeblik. Kan du ikke finde den, så kig i spam-mappen.",
      "Vil du se din egen lagkage med det samme? Så kan du få et gratis omkostningsoverblik.",
    ],
    action: { label: "Få gratis omkostningsoverblik", href: "/omkostningsoverblik" },
  },
  failure: "Guiden kunne ikke sendes. Prøv igen, eller ring til os på +45 28 18 84 27.",
};

export const overviewForm: FormContent = {
  id: "omkostningsoverblik",
  title: "Bestil dit gratis omkostningsoverblik",
  intro: "Udfyld formularen, så kontakter vi dig og aftaler det videre forløb.",
  fields: [
    { name: "fornavn", label: "Fornavn", type: "text", required: true, autoComplete: "given-name", half: true, error: "Skriv dit fornavn." },
    { name: "efternavn", label: "Efternavn", type: "text", required: true, autoComplete: "family-name", half: true, error: "Skriv dit efternavn." },
    { name: "email", label: "E-mail", type: "email", required: true, autoComplete: "email", half: true, error: "Skriv din e-mail – fx navn@firma.dk." },
    { name: "telefon", label: "Telefon", type: "tel", required: true, autoComplete: "tel", half: true, error: "Skriv dit telefonnummer, så vi kan ringe og aftale forløbet." },
    {
      name: "formue_placering", label: "Hvor har du din formue i dag?", type: "select", optionalLabel: optional,
      options: [
        { value: "", label: "Vælg" },
        { value: "en-bank", label: "Én bank" },
        { value: "flere-banker", label: "Flere banker" },
        { value: "pension", label: "Pensionsselskab" },
        { value: "anden-raadgiver", label: "Anden rådgiver" },
        { value: "andet", label: "Andet" },
      ],
    },
    { name: "saerlige_oensker", label: "Er der noget, du gerne vil have os til at se særligt på?", type: "textarea", optionalLabel: optional },
  ],
  consents: [
    {
      name: "samtykke", required: true, marketing: true,
      label: "Ja tak, kontakt mig om et gratis omkostningsoverblik. Jeg accepterer, at TOBA Advice kontakter mig på telefon og e-mail om overblikket, sender mig sit nyhedsbrev og anden information om investeringsrådgivning. Jeg kan til enhver tid trække mit samtykke tilbage.",
      error: "Sæt kryds, så vi må kontakte dig om overblikket.",
    },
  ],
  submit: "Bestil mit overblik",
  submitting: "Sender …",
  microcopy: { text: "Gratis og uforpligtende. Læs mere i vores", linkLabel: "persondatapolitik", href: "/politikker", after: "." },
  success: {
    title: "Tak – vi kontakter dig snarest",
    body: [
      "Vi ringer eller skriver til dig inden for 1 hverdag for at aftale det videre forløb.",
      "Har du allerede din omkostnings- og afkastrapport klar? Så aftaler vi, hvordan du sender den sikkert, når vi kontakter dig.",
    ],
  },
  failure: "Bestillingen kunne ikke sendes. Prøv igen, eller ring til os på +45 28 18 84 27.",
};
