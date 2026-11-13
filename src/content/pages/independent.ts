import { facts } from "../facts";
import { videos } from "../media";
import { routes } from "../site";
import type { CtaCardContent, FeatureContent, HeroContent, Seo } from "../types";

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
      { label: "Se forskellen", href: "#tre", variant: "primary" },
      { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "secondary" },
    ],
  } satisfies HeroContent,
  heroText: [
    "Der er forskel på afhængig, ikke uafhængig og uafhængig investeringsrådgivning.",
    "Bliv klogere på forskellene – og hvad de betyder for dig og dine investeringer.",
  ],

  kinds: {
    title: "Tre slags rådgivere – tre forskellige interesser",
    video: videos.v10,
    lawNote:
      "**“Uafhængig” er et krav i loven – ikke et løfte.** En uafhængig rådgiver må ikke beholde provision, må ikke have tætte bånd til banker eller forvaltere og skal vælge bredt på markedet. Ord, der lyder ens – fx “uvildig” – betyder ikke nødvendigvis det samme.",
    lawSource: "Kilde: Lov om investeringsrådgivere og boligkreditformidlere, § 9 og § 10.",
    forYouLabel: "For dig:",
    cards: [
      {
        eyebrow: "1 · Afhængig",
        title: "Afhængig rådgivning",
        flow: {
          nodes: [{ label: "Dig", you: true }, { label: "Bankens egne fonde" }, { label: "Banken" }],
          steps: [
            { label: "køber", tone: "neutral" },
            { label: "provision og rabat går til", tone: "bad" },
          ],
        } satisfies FlowChain,
        flowAria: "Du køber bankens egne fonde, og provisionen fra fondene går til banken.",
        forYou: "Dine valgmuligheder er begrænset til de produkter, rådgiveren tilbyder.",
        highlight: false,
      },
      {
        eyebrow: "2 · Ikke uafhængig",
        title: "Ikke uafhængig rådgivning",
        flow: {
          nodes: [{ label: "Dig", you: true }, { label: "Egne og andres fonde" }, { label: "Bankerne" }],
          steps: [
            { label: "køber", tone: "neutral" },
            { label: "provision og rabat går til", tone: "bad" },
          ],
        } satisfies FlowChain,
        flowAria: "Du køber egne og andres fonde, og provisionen fra fondene går til bankerne.",
        forYou: "Udvalget er bredere, men rådgiveren kan have en økonomisk interesse i bestemte anbefalinger.",
        highlight: false,
      },
      {
        badge: "Sådan er TOBA",
        eyebrow: "3 · Uafhængig",
        title: "Uafhængig rådgivning",
        flow: {
          nodes: [{ label: "Dig", you: true }, { label: "Fonde fra hele markedet" }, { label: "Dig", you: true }],
          steps: [
            { label: "køber", tone: "neutral" },
            { label: "provision og rabat går til", tone: "good" },
          ],
          note: "Rådgiveren får kun et fast honorar fra dig.",
        } satisfies FlowChain,
        flowAria:
          "Du køber fonde fra hele markedet, og provision og rabat fra fondene går til dig. Rådgiveren får kun et fast honorar fra dig.",
        forYou: "Rådgiveren kan vælge frit på markedet og tjener ikke på de produkter, du får anbefalet.",
        highlight: true,
      },
    ],
  },

  why: {
    title: "Hvorfor betyder uafhængighed noget for dig?",
    text: [
      "Hvis din rådgiver tjener på de produkter, du får anbefalet, er det ikke kun dine interesser, der styrer anbefalingen. Og det er mere udbredt, end mange tror.",
    ],
    value: facts.ownFundsTop5Pct,
    lead: "af fondsbeholdningerne hos de fem største danske banker ligger i gennemsnit i bankernes egne fonde.",
    segments: [
      { label: "bankernes egne fonde", value: facts.ownFundsTop5Pct },
      { label: "andre fonde", value: 100 - facts.ownFundsTop5Pct },
    ],
    after: [
      "Det gør ikke investeringerne dårlige. Men det betyder, at rådgivningen ikke er fri. Forskellen ligger i, hvordan din rådgiver bliver betalt – og der findes tre slags.",
    ],
    source: "Kilde: Finanstilsynet, “Bankernes salg af egne fonde”, maj 2026.",
  },

  practice: {
    title: "Sådan arbejder vi",
    features: [
      {
        icon: "globe",
        title: "Frit valg på tværs af markedet.",
        text: `Vi er ikke bundet til én bank eller én bestemt forvalter. Vi udvælger relevante investeringsløsninger på tværs af markedet og samarbejder i dag med ${facts.managers} forvaltere i ${facts.countries} lande.`,
      },
      {
        icon: "no-commission",
        title: "Ingen provision.",
        text: "Vi modtager ikke formidlingsprovision for at anbefale bestemte fonde eller investeringsprodukter. Vores indtjening afhænger derfor ikke af, hvilke produkter vi anbefaler.",
      },
      {
        icon: "fixed-fee",
        title: "Et gennemskueligt honorar.",
        text: "Du betaler et aftalt rådgivningshonorar, der ikke afhænger af, hvilke investeringer vi vælger til din portefølje.",
      },
      {
        icon: "owners",
        title: "Ejet af medarbejderne.",
        text: "TOBA Advice er ejet af medarbejderne selv. Vi arbejder langsigtet og har ingen eksterne ejere, der stiller krav om salg af bestemte investeringsprodukter.",
      },
    ] satisfies FeatureContent[],
    rebate: {
      value: facts.rebatesPaid.amountMio,
      decimals: 1,
      suffix: " mio. kr.",
      label: `udbetalt til vores kunder i forvalterrabatter i ${facts.rebatesPaid.paidYear}. Vi sidder på samme side af bordet som vores kunder.`,
    },
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
      {
        eyebrow: "Hvem spiser din lagkage?",
        title: "Vil du vide mere?",
        text: "Download vores gratis guide, og få indsigt i omkostninger, rabatter og interessekonflikter – samt 7 spørgsmål, du bør stille din rådgiver.",
        linkLabel: "Hent guiden gratis",
        href: routes.guide,
      },
      {
        eyebrow: "Gratis og uforpligtende",
        title: "Vil du have et overblik?",
        text: "Få gennemgået dine egne omkostninger. Gratis og uforpligtende.",
        linkLabel: "Få gratis omkostningsoverblik",
        href: routes.overview,
      },
    ] satisfies CtaCardContent[],
  },

  /** Relaterede indlæg fra /nyheder. Skift filnavnene for at vise andre (fyldes op med de nyeste). */
};
