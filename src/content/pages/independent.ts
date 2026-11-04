import { facts } from "../facts";
import { videos } from "../media";
import { routes } from "../site";
import type { CtaCardContent, FeatureContent, HeroContent, Point, Seo, NewsTeaserContent } from "../types";

/** "Følg pengene": knuder oppefra og ned med en pil og en forklaring imellem. steps har én mindre end nodes. */
export type FlowChain = {
  nodes: { label: string; you?: boolean }[];
  steps: { label: string; tone: "neutral" | "bad" | "good" }[];
  note?: string;
};

export const independent = {
  seo: {
    title: "Uafhængig investeringsrådgivning – hvad betyder det? | TOBA Advice",
    description:
      "Der findes tre slags investeringsrådgivere: afhængige, ikke uafhængige og uafhængige. Se forskellen – og hvad den betyder for dig og dine penge.",
    ogDescription: "Ved du, hvilken slags rådgiver du har? Se forskellen på afhængig og uafhængig rådgivning.",
  } satisfies Seo,

  hero: {
    eyebrow: "Uafhængig investeringsrådgivning",
    title: "Hvem arbejder din rådgiver *for*?",
    lead: "Når du modtager investeringsrådgivning, bør dine interesser altid komme først. Men ved du, hvordan din rådgiver bliver betalt, og om der er økonomiske interesser knyttet til de produkter, du bliver anbefalet?",
    actions: [
      { label: "Se forskellen", href: "#tre", variant: "light" },
      { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "ghost-light" },
    ],
  } satisfies HeroContent,
  heroText: [
    "Der er forskel på afhængig, ikke uafhængig og uafhængig investeringsrådgivning.",
    "Bliv klogere på forskellene – og hvad de betyder for dig og dine investeringer.",
  ],

  intro: {
    title: "Hvad betyder uafhængig rådgivning *egentlig*?",
    text: [
      "Uafhængighed handler ikke kun om, hvilke investeringsprodukter en rådgiver kan tilbyde. Det handler også om, hvordan rådgiveren bliver betalt, og hvilke økonomiske interesser der kan påvirke anbefalingerne.",
      "I videoen forklarer Tonny Elsberg forskellen på de tre rådgivningsformer – og hvorfor det er vigtigt at kende forskellen.",
    ],
    video: videos.v10,
  },

  kinds: {
    title: "Tre slags rådgivere – tre forskellige interesser",
    lead: "Ikke alle investeringsrådgivere arbejder efter den samme model. Forskellen handler blandt andet om, hvilke produkter de kan anbefale, hvordan de bliver betalt, og hvilke økonomiske interesser der kan være forbundet med rådgivningen.",
    forYouLabel: "For dig:",
    cards: [
      {
        eyebrow: "1 · Afhængig", title: "Afhængig rådgivning",
        flow: {
          nodes: [{ label: "Dig", you: true }, { label: "Bankens egne fonde" }, { label: "Banken" }],
          steps: [{ label: "køber", tone: "neutral" }, { label: "provisionen går til", tone: "bad" }],
        } satisfies FlowChain,
        flowAria: "Du køber bankens egne fonde, og provisionen fra fondene går til banken.",
        text: "Rådgivningen er knyttet til et bestemt produktunivers, typisk bankens egne investeringsprodukter.",
        forYou: "Dine valgmuligheder er begrænset til de produkter, rådgiveren tilbyder.",
        highlight: false,
      },
      {
        eyebrow: "2 · Ikke uafhængig", title: "Ikke uafhængig rådgivning",
        flow: {
          nodes: [{ label: "Dig", you: true }, { label: "Egne og andres fonde" }, { label: "Rådgiveren" }],
          steps: [{ label: "køber", tone: "neutral" }, { label: "provisionen går til", tone: "bad" }],
        } satisfies FlowChain,
        flowAria: "Du køber egne og andres fonde, og provisionen fra fondene går til rådgiveren.",
        text: "Rådgiveren kan anbefale både egne og eksterne produkter, men kan have økonomiske interesser knyttet til bestemte anbefalinger.",
        forYou: "Du bør undersøge, hvordan rådgiveren bliver betalt, og hvilke produkter der indgår i udvalget.",
        highlight: false,
      },
      {
        eyebrow: "3 · Uafhængig – sådan er TOBA", title: "Uafhængig rådgivning",
        flow: {
          nodes: [{ label: "Dig", you: true }, { label: "Fonde fra hele markedet" }, { label: "Dig", you: true }],
          steps: [{ label: "køber", tone: "neutral" }, { label: "rabatten går tilbage til", tone: "good" }],
          note: "Rådgiveren får kun et fast honorar fra dig.",
        } satisfies FlowChain,
        flowAria: "Du køber fonde fra hele markedet, og rabatten fra fondene går tilbage til dig. Rådgiveren får kun et fast honorar fra dig.",
        text: "Rådgivningen bygger på et bredt udvalg af relevante investeringsprodukter og er ikke baseret på provision fra de produkter, der anbefales.",
        forYou: "Rådgivningen tager kun udgangspunkt i, hvad der er bedst for dig.",
        highlight: true,
      },
    ],
  },

  law: {
    eyebrow: "Det siger loven",
    title: "Det skal der til for at kalde sig uafhængig",
    lead: "“Uafhængig” er ikke bare et løfte. Det er en betegnelse, der stiller konkrete krav til, hvordan en investeringsrådgiver arbejder. Ifølge lovgivningen skal en uafhængig investeringsrådgiver blandt andet leve op til tre centrale krav.",
    requirements: [
      { title: "Ingen provision til rådgiveren", text: "Rådgiveren må ikke beholde provision eller andre økonomiske fordele fra de investeringsprodukter, der anbefales. Modtages sådanne betalinger, skal de videregives til kunden efter gældende regler." },
      { title: "Ingen tætte bånd", text: "Rådgiveren må ikke have bestemte forbindelser til banker, kapitalforvaltere eller andre finansielle virksomheder, som er uforenelige med kravene til uafhængighed." },
      { title: "Et bredt udvalg af investeringer", text: "Rådgivningen skal bygge på en tilstrækkelig bred vurdering af relevante produkter på markedet – ikke kun et snævert udvalg fra én udbyder." },
    ] satisfies Point[],
    factBox: "**Vidste du det?** Hvis en investeringsrådgiver ikke er uafhængig, skal det fremgå af virksomhedens hjemmeside. Rådgiveren skal også oplyse størrelsen af – eller beregningsgrundlaget for – eventuel provision.",
    tip: "**Godt råd:** Bruger din rådgiver et ord, der næsten lyder som uafhængig – fx “uvildig” – så spørg, om alle tre krav er opfyldt.",
    source: "Kilde: Lov om investeringsrådgivere og boligkreditformidlere, § 9 og § 10.",
  },

  why: {
    title: "Hvorfor betyder uafhængighed noget for dig?",
    text: [
      "Når du overlader rådgivningen om din formue til andre, skal du kunne stole på, at anbefalingerne tager udgangspunkt i dine interesser.",
      "Men hvis rådgiveren også tjener penge på bestemte investeringsprodukter, kan der opstå interessekonflikter.",
      "Uafhængig rådgivning handler om at sikre, at dine interesser er i centrum – uden økonomiske incitamenter til at anbefale bestemte produkter.",
    ],
    value: facts.ownFundsTop5Pct,
    lead: "Ifølge Finanstilsynets analyse ligger i gennemsnit 92 % af fondsbeholdningerne hos de fem største danske banker i bankernes egne fonde.",
    segments: [
      { label: "bankernes egne fonde", value: facts.ownFundsTop5Pct },
      { label: "andre fonde", value: 100 - facts.ownFundsTop5Pct },
    ],
    after: [
      "Det betyder ikke nødvendigvis, at investeringerne er dårlige. Men det understreger, hvorfor det er vigtigt at forstå, hvordan din rådgiver bliver betalt, og hvilke investeringsmuligheder der bliver taget i betragtning.",
      "Det afgørende er ikke kun, hvad du investerer i – men også hvorfor netop de investeringer er blevet valgt.",
    ],
    source: "Kilde: Finanstilsynet, “Bankernes salg af egne fonde”, maj 2026.",
  },

  practice: {
    title: "Sådan arbejder vi",
    lead: "Uafhængighed er fundamentet for TOBA Advice. Vi har ingen egne investeringsprodukter og lever af vores rådgivning – ikke af de fonde, vi anbefaler. Det betyder helt konkret:",
    features: [
      { icon: "globe", title: "Frit valg på tværs af markedet.", text: `Vi er ikke bundet til én bank eller én bestemt forvalter. Vi udvælger relevante investeringsløsninger på tværs af markedet og samarbejder i dag med ${facts.managers} forvaltere i ${facts.countries} lande.` },
      { icon: "no-commission", title: "Ingen provision.", text: "Vi modtager ikke formidlingsprovision for at anbefale bestemte fonde eller investeringsprodukter. Vores indtjening afhænger derfor ikke af, hvilke produkter vi anbefaler." },
      { icon: "fixed-fee", title: "Et gennemskueligt honorar.", text: "Du betaler et aftalt rådgivningshonorar, der ikke afhænger af, hvilke investeringer vi vælger til din portefølje." },
      { icon: "rebate", title: "Rabatterne går til dig.", text: "Vi forhandler rabatter hjem for alle kunder samlet og sender dem ubeskåret videre." },
      { icon: "owners", title: "Ejet af medarbejderne.", text: "TOBA Advice er ejet af medarbejderne selv. Vi arbejder langsigtet og har ingen eksterne ejere, der stiller krav om salg af bestemte investeringsprodukter." },
    ] satisfies FeatureContent[],
    rebate: { value: facts.rebatesPaid.amountMio, decimals: 1, suffix: " mio. kr.", label: `udbetalt til vores kunder i forvalterrabatter i ${facts.rebatesPaid.paidYear}. Vi sidder på samme side af bordet som vores kunder.` },
    taFunds: {
      question: "Hvad med TA Globale Aktier og TA Globale Obligationer?",
      answer: [
        "TOBA Advice er investeringsrådgiver for to afdelinger i en investeringsforening: TA Globale Aktier og TA Globale Obligationer. Vores honorar for den rådgivning betales af foreningen.",
        "Har du de to fonde i din portefølje, indgår de ikke i grundlaget for dit rådgivningshonorar. Du betaler altså kun én gang.",
        "Satsen er den samme. Den eneste forskel er, hvem der betaler os: foreningen eller dig.",
      ],
    },
  },

  next: {
    title: "Hvilken slags rådgivning får du i dag?",
    lead: "Ved du, hvad du samlet betaler for din investeringsløsning, og om din rådgiver har økonomiske interesser i de produkter, du bliver anbefalet? Uanset om du ønsker mere viden eller et konkret overblik over din egen portefølje, hjælper vi dig gerne videre.",
    cards: [
      { eyebrow: "Hvem spiser din lagkage?", title: "Vil du vide mere?", text: "Download vores gratis guide, og få indsigt i omkostninger, rabatter og interessekonflikter – samt 7 spørgsmål, du bør stille din rådgiver.", linkLabel: "Hent guiden gratis", href: routes.guide },
      { eyebrow: "Gratis og uforpligtende", title: "Vil du have et overblik?", text: "Få gennemgået dine egne omkostninger. Gratis og uforpligtende.", linkLabel: "Få gratis omkostningsoverblik", href: routes.overview },
    ] satisfies CtaCardContent[],
  },

  /** Relaterede indlæg fra /nyheder. Skift filnavnene for at vise andre (fyldes op med de nyeste). */
  related: {
    title: "Læs mere om emnet",
    lead: "Indlæg om omkostninger, interessekonflikter og bankernes egne produkter.",
    slugs: ["er-du-en-cash-cow-for-banken", "betaler-du-for-en-vare-du-sjaeldent-modtager", "siger-du-ogsaa-ja-tak-naar-telefonen-ringer"],
  } satisfies NewsTeaserContent,
};
