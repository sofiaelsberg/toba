import { facts } from "../facts";
import { videos } from "../media";
import { routes } from "../site";
import type { CtaCardContent, FeatureContent, HeroContent, Point, Seo } from "../types";

export type FlowRow = { from: string; to: string; label?: string; tone: "neutral" | "bad" | "good"; fromIsYou?: boolean; toIsYou?: boolean };

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
    lead: "Der findes tre slags investeringsrådgivere. Forskellen afgør, om rådgivningen handler om dine interesser – eller om at sælge produkter.",
    actions: [
      { label: "Se forskellen", href: "#tre", variant: "light" },
      { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "ghost-light" },
    ],
  } satisfies HeroContent,
  videoIntro: "Tonny Elsberg forklarer på under et minut forskellen på de tre slags rådgivere.",
  video: videos.v10,

  kinds: {
    title: "Tre slags rådgivere – tre forskellige interesser",
    lead: "Følg pengene: Hvem betaler rådgiveren, og hvor ender rabatterne?",
    forYouLabel: "For dig:",
    cards: [
      {
        eyebrow: "1 · Afhængig", title: "Afhængig rådgivning",
        flow: [
          { from: "Dig", to: "Bankens egne fonde", tone: "neutral", fromIsYou: true },
          { from: "Bankens egne fonde", to: "Banken", tone: "bad" },
        ] satisfies FlowRow[],
        flowAria: "Du køber bankens egne fonde, og banken tjener på produktet.",
        text: "Rådgiveren sælger kun sine egne produkter – typisk bankens egne fonde. Indtjeningen kommer fra de produkter, du bliver anbefalet.",
        forYou: "Du får kun valget mellem ét hus’ produkter.",
        highlight: false,
      },
      {
        eyebrow: "2 · Ikke uafhængig", title: "Ikke uafhængig rådgivning",
        flow: [
          { from: "Dig", to: "Egne + andres fonde", tone: "neutral", fromIsYou: true },
          { from: "Fondene", to: "Rådgiver", label: "provision", tone: "bad" },
        ] satisfies FlowRow[],
        flowAria: "Du køber egne og andres fonde, og rådgiveren får provision fra fondene.",
        text: "Rådgiveren sælger typisk egne produkter plus et udvalg af andres, som der modtages provision for. Rådgiveren tjener altså penge, uanset hvilket produkt du vælger.",
        forYou: "Du kan ikke være sikker på, om anbefalingen er den bedste for dig – eller den bedst betalte.",
        highlight: false,
      },
      {
        eyebrow: "3 · Uafhængig – sådan er TOBA", title: "Uafhængig rådgivning",
        flow: [
          { from: "Dig", to: "Rådgiver", label: "honorar", tone: "good", fromIsYou: true },
          { from: "Fondene", to: "Dig", label: "rabat", tone: "good", toIsYou: true },
        ] satisfies FlowRow[],
        flowAria: "Du betaler rådgiveren et honorar, og rabatter fra fondene går videre til dig.",
        text: "Rådgiveren har ingen produkter at sælge og modtager ingen provision. Skulle der alligevel komme en, går hele beløbet videre til dig med det samme.",
        forYou: "Rådgivningen tager udelukkende udgangspunkt i, hvad der er bedst for dig.",
        highlight: true,
      },
    ],
  },

  law: {
    eyebrow: "Det siger loven",
    title: "Det skal der til for at kalde sig uafhængig",
    lead: "“Uafhængig” er ikke bare et ord. Ifølge loven om investeringsrådgivere (§ 9) må en rådgiver kun kalde sig uafhængig – eller noget, der ligner – hvis tre ting er opfyldt.",
    requirements: [
      { title: "Ingen provision", text: "Rådgiveren må ikke få betaling fra dem, der laver eller sælger investeringsprodukterne. Kommer der alligevel en betaling, skal hele beløbet gå videre til dig – med det samme." },
      { title: "Ingen tætte bånd", text: "Rådgiveren må ikke være tæt forbundet med en bank, et forvaltningsselskab, et forsikringsselskab eller lignende." },
      { title: "Et bredt udvalg", text: "Rådgiveren skal se på et tilstrækkeligt antal produkter på markedet – ikke kun nogle få huses." },
    ] satisfies Point[],
    factBox: "Er din rådgiver ikke uafhængig, skal det stå på rådgiverens hjemmeside – sammen med, hvor meget der modtages i provision, eller hvordan det beregnes.",
    tip: "**Godt råd:** Bruger din rådgiver et ord, der næsten lyder som uafhængig – fx “uvildig” – så spørg, om alle tre krav er opfyldt.",
  },

  why: {
    eyebrow: "Hvorfor betyder det noget for dig?",
    title: "Så længe en rådgiver tjener mere på nogle produkter end på andre, kan du ikke være helt sikker.",
    value: 95,
    lead: "af danskernes fondsbeholdninger i de fem største banker ligger i bankens egne fonde eller i fonde, som banken får provision for at sælge.",
    segments: [
      { label: "egne fonde", value: facts.bankShares.ownFunds },
      { label: "eksterne med provision", value: facts.bankShares.externalWithCommission },
      { label: "eksterne uden provision", value: facts.bankShares.externalWithout },
    ],
    source: "Kilde: Finanstilsynet, “Bankernes salg af egne fonde”, maj 2026.",
    benefitsTitle: "Det får du med uafhængig rådgivning",
    benefits: [
      { title: "Anbefalinger uden bagtanke.", text: "Rådgiveren tjener ikke mere på det ene produkt end på det andet." },
      { title: "Det bedste til opgaven.", text: "Valget sker på tværs af markedet – ikke kun blandt ét hus’ fonde." },
      { title: "Lavere omkostninger over tid.", text: "Rabatter og provisioner går til dig, så mere af afkastet bliver hos dig." },
      { title: "Du ved, hvad du betaler for.", text: "Du betaler for rådgivningen – ikke for at få solgt et produkt." },
    ] satisfies Point[],
  },

  practice: {
    title: "Sådan arbejder vi",
    lead: "Det at være uafhængig er hele fundamentet for TOBA Advice. Sådan ser det ud i praksis:",
    features: [
      { icon: "globe", title: "Frit valg på tværs af markedet.", text: `Vi vælger blandt de bedste forvaltere – i dag ${facts.managers} forvaltere i ${facts.countries} lande.` },
      { icon: "no-commission", title: "Ingen provision.", text: "Vi får ikke betaling for handler, salg eller følgeforretninger." },
      { icon: "fixed-fee", title: "Et fast honorar.", text: "Du betaler et fast rådgivningshonorar, som ikke afhænger af, hvilke investeringer vi vælger." },
      { icon: "rebate", title: "Rabatterne går til dig.", text: "Vi forhandler rabatter hjem for alle kunder samlet og sender dem ubeskåret videre." },
      { icon: "owners", title: "Ejet af medarbejderne.", text: "Vi har ingen ejere, der kræver, at vi sælger bestemte produkter." },
    ] satisfies FeatureContent[],
    rebate: { value: facts.rebatesPaid.amountMio, decimals: 1, suffix: " mio. kr.", label: `udbetalte vi til vores kunder i forvalterrabatter for ${facts.rebatesPaid.year}.` },
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
    lead: "Start med at blive klogere – eller få et konkret svar på, hvad din formue koster, og hvem der får pengene.",
    cards: [
      { eyebrow: "Læs guiden", title: "Hvem spiser din lagkage?", text: "En guide til omkostninger, rabatter og interessekonflikter.", linkLabel: "Hent guiden gratis", href: routes.guide },
      { eyebrow: "Gratis og uforpligtende", title: "Få gratis omkostningsoverblik", text: "Vi gennemgår alle lag i din portefølje.", linkLabel: "Få gratis omkostningsoverblik", href: routes.overview },
    ] satisfies CtaCardContent[],
  },
};
