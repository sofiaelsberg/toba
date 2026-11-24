import { facts } from "../facts";
import { videos } from "../media";
import { routes } from "../site";
import type { CtaCardContent, FaqItem, FeatureContent, HeroContent, Point, Seo, NewsTeaserContent } from "../types";

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
          nodes: [{ label: "Dig", you: true }, { label: "Bankens egne & andres fonde" }, { label: "Bankerne" }],
          steps: [
            { label: "køber", tone: "neutral" },
            { label: "provision og rabat går til", tone: "bad" },
          ],
        } satisfies FlowChain,
        flowAria: "Du køber bankens og andres fonde, og provisionen fra fondene går til bankerne.",
        forYou: "Udvalget er bredere, men rådgiveren kan have en økonomisk interesse i bestemte anbefalinger.",
        highlight: false,
      },
      {
        eyebrow: "3 · Uafhængig",
        badge: "Sådan er TOBA",
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

  law: {
    eyebrow: "Det siger loven",
    title: "Det skal der til for at kalde sig uafhængig",
    lead: "“Uafhængig” er ikke bare et løfte. Det er en betegnelse, der stiller konkrete krav til, hvordan en investeringsrådgiver arbejder. Ifølge lovgivningen skal en uafhængig investeringsrådgiver blandt andet leve op til tre centrale krav.",
    requirements: [
      {
        title: "Ingen provision til rådgiveren",
        text: "Rådgiveren må ikke beholde provision eller andre økonomiske fordele fra de investeringsprodukter, der anbefales. Modtages sådanne betalinger, skal de videregives til kunden efter gældende regler.",
      },
      {
        title: "Ingen tætte bånd",
        text: "Rådgiveren må ikke have bestemte forbindelser til banker, kapitalforvaltere eller andre finansielle virksomheder, som er uforenelige med kravene til uafhængighed.",
      },
      {
        title: "Et bredt udvalg af investeringer",
        text: "Rådgivningen skal bygge på en tilstrækkelig bred vurdering af relevante produkter på markedet – ikke kun et snævert udvalg fra én udbyder.",
      },
    ] satisfies Point[],
    factBox:
      "**Vidste du det?** Hvis en investeringsrådgiver ikke er uafhængig, skal det fremgå af virksomhedens hjemmeside – sammen med størrelsen af eventuel provision. Og ord, der lyder ens – fx “uvildig” – betyder ikke nødvendigvis det samme som uafhængig.",
    source: "Kilde: Lov om investeringsrådgivere og boligkreditformidlere, § 9 og § 10.",
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
    after: ["Det gør ikke investeringerne dårlige. Men det betyder, at rådgivningen ikke er uafhængig."],
    source: "Kilde: Finanstilsynet, “Bankernes salg af egne fonde”, maj 2026.",
  },

  practice: {
    title: "Sådan arbejder vi",
    features: [
      {
        icon: "globe",
        title: "Frit valg på tværs af markedet.",
        text: `Vi samarbejder i dag med ${facts.managers} forvaltere i ${facts.countries} lande.`,
      },
      {
        icon: "no-commission",
        title: "Ingen provision.",
        text: "Vores indtjening afhænger ikke af, hvilke produkter vi anbefaler.",
      },
      {
        icon: "fixed-fee",
        title: "Et gennemskueligt honorar.",
        text: "Du betaler et fast, aftalt honorar – uanset hvad vi investerer i.",
      },
      {
        icon: "owners",
        title: "Ejet af medarbejderne.",
        text: "Vi har ingen eksterne ejere, der stiller krav om salg.",
      },
    ] satisfies FeatureContent[],
    rebate: {
      value: facts.rebatesPaid.amountMio,
      decimals: 1,
      suffix: " mio. kr.",
      label: `udbetalt til vore kunder i forvalterrabatter i ${facts.rebatesPaid.paidYear} for investeringsåret ${facts.rebatesPaid.investmentYear}. Vi forhandler rabatterne hjem for alle kunder samlet – og sender dem ubeskåret videre til dig.`,
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

  /** Spørgsmål og svar – vises på siden og sendes til Google/AI som FAQ-data. */
  faqTitle: "Spørgsmål og svar",
  faq: [
    {
      question: "Hvad betyder uafhængig investeringsrådgivning?",
      answer:
        "Uafhængig er en betegnelse med konkrete krav i lovgivningen. En uafhængig investeringsrådgiver må ikke beholde provision fra de produkter, der anbefales, må ikke have bånd til banker eller kapitalforvaltere, der er uforenelige med uafhængighed, og skal vælge blandt et bredt udvalg af investeringer på markedet (lov om investeringsrådgivere og boligkreditformidlere, § 9 og § 10).",
    },
    {
      question: "Er uvildig det samme som uafhængig?",
      answer:
        "Nej, ikke nødvendigvis. Kun “uafhængig” er knyttet til lovens krav. Hvis en investeringsrådgiver ikke er uafhængig, skal det fremgå af virksomhedens hjemmeside – sammen med størrelsen af eventuel provision.",
    },
    {
      question: "Hvordan finder jeg ud af, om min rådgiver er uafhængig?",
      answer:
        "Spørg, hvordan rådgiveren bliver betalt, og om der er provision eller egne produkter involveret i anbefalingerne. Tjek også rådgiverens hjemmeside, som skal oplyse det, hvis rådgivningen ikke er uafhængig. I vores gratis guide “Hvem spiser din lagkage?” finder du 7 spørgsmål, du bør stille din rådgiver.",
    },
    {
      question: "Hvorfor koster uafhængig rådgivning et honorar?",
      answer:
        "Fordi rådgiveren ikke må tjene på produkterne, betaler du i stedet et fast, aftalt honorar. Det gør omkostningen synlig. Hos TOBA Advice går de rabatter, vi forhandler hjem hos kapitalforvalterne, desuden ubeskåret videre til dig.",
    },
  ] satisfies FaqItem[],

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
  related: {
    title: "Læs mere om emnet",
    lead: "Indlæg om omkostninger, interessekonflikter og bankernes egne produkter.",
    slugs: [
      "er-du-en-cash-cow-for-banken",
      "betaler-du-for-en-vare-du-sjaeldent-modtager",
      "siger-du-ogsaa-ja-tak-naar-telefonen-ringer",
    ],
  } satisfies NewsTeaserContent,
};
