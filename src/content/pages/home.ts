import { calculatorConfig, facts } from "../facts";
import { ambient, videos } from "../media";
import { routes, bookMeeting, trustline } from "../site";
import type { CtaCardContent, StepContent, FactContent, FaqItem, FeatureContent, HeroContent, NewsTeaserContent, Seo, Stat, WealthMapContent } from "../types";

export const home = {
  seo: {
    title: "Uafhængig investeringsrådgiver i Aarhus og hele Danmark | TOBA Advice",
    description:
      "Uafhængig investerings- og formuerådgivning med fast honorar, ingen provision og frit valg blandt kapitalforvaltere. Rabatterne går ubeskåret til dig.",
  } satisfies Seo,

  hero: {
    eyebrow: "Uafhængig investeringsrådgivning",
    title: "Vi tager os af dine investeringer, så du kan tage dig af *livet*",
    lead: "Uafhængig rådgivning om din samlede formue – for selskaber, privatpersoner, virksomhedsejere og familier.",
    actions: [bookMeeting, { label: "Hvem spiser din lagkage?", href: routes.guide, variant: "secondary" }],
    trustline,
  } satisfies HeroContent,
  heroMedia: ambient.office,

  ctaIntro: {
    title: "Bliv klogere på dine investeringer",
    lead: "Uanset om du ønsker mere viden eller et konkret overblik over dine investeringer, kan du starte her.",
  },
  ctaCards: [
    {
      title: "Hvem spiser din lagkage?",
      text: "Download guiden og bliv klogere på, hvad dine investeringer koster, og hvem der får pengene.",
      linkLabel: "Hent guiden gratis →",
      href: routes.guide,
      visual: "cake",
    },
    {
      title: "Få gratis omkostningsoverblik",
      text: "Få ét samlet billede af, hvad din formue koster – og hvem der får pengene. Gratis og uforpligtende.",
      linkLabel: "Bestil dit overblik →",
      href: routes.overview,
      visual: "overview",
    },
    {
      title: "Afhængig eller uafhængig?",
      text: "Der er forskel på, hvordan investeringsrådgivere arbejder og bliver betalt. Ved du, hvilken type rådgivning du får?",
      linkLabel: "Se forskellen →",
      href: routes.independent,
      visual: "advisers",
    },
  ] satisfies CtaCardContent[],

  sameSide: {
    title: "Vi sidder på *samme side* af bordet",
    text: [
      "Hos TOBA Advice arbejder vi for at sikre dig attraktive og fair vilkår for dine investeringer. Vi har ingen egne investeringsprodukter og ingen økonomisk interesse i at anbefale bestemte produkter.",
      "Du får en sparringspartner, der tager udgangspunkt i dig og dine behov.",
      "For værdi handler om mere end et godt afkast. Det handler om tillid og ordentlighed.",
    ],
    video: videos.v03,
  },

  /** De tre bærende værdier (Frihed, Tryghed, Transparens) – lige efter "Vi sidder på samme side af bordet". */
  values: {
    title: "Det bygger vores rådgivning på",
    features: [
      {
        icon: "shelves",
        title: "Frihed",
        text: "Du får adgang til investeringer på tværs af markedet – også udvalgte alternative fonde, der normalt er forbeholdt professionelle investorer. Du bestemmer selv, hvor meget du vil involveres.",
      },
      {
        icon: "shield",
        title: "Tryghed",
        text: "Du har en fast rådgiver, der kender dig og din økonomi. Og du kan følge din formue i app og på web, når det passer dig.",
      },
      {
        icon: "rebate",
        title: "Transparens",
        text: "Du ved, hvad du betaler, og hvad du betaler for. De rabatter, vi forhandler hjem på dine investeringer, går ubeskåret videre til dig.",
      },
    ] satisfies FeatureContent[],
  },

  wholeWealth: {
    title: "Én strategi for *hele* din formue",
    lead: "De fleste har formuen fordelt flere steder. Vi rådgiver om investeringerne på tværs af alle dine skattemiljøer, så det hele hænger sammen.",
    actions: [{ label: "Sådan investerer vi", href: routes.howWeInvest, variant: "primary" as const }],
    map: {
      label: "Én samlet strategi",
      areas: ["Frie midler", "Pensionsmidler", "Virksomheds\u00adskatteordningen", "Holding- og driftsselskab"],
      family: {
        title: "Og familieplanen",
        text: "Skat, ægtepagt, testamente og generationsskifte. Vi sparrer med dig, henviser til advokater og revisorer, vi stoler på – og sørger for, at tingene sker.",
      },
    } satisfies WealthMapContent,
  },

  bank: {
    title: "Hvem arbejder din rådgiver *for*?",
    text: [
      "Når din rådgiver også tjener på de produkter, du bliver anbefalet, kan der være andre interesser end dine på spil.",
      "Hos TOBA Advice har vi ingen egne investeringsprodukter og modtager ingen formidlingsprovision. Du betaler os for rådgivningen – og de rabatter, vi forhandler hjem, går ubeskåret til dig.",
    ],
    action: { label: "Læs mere om uafhængig investeringsrådgivning", href: routes.independent, variant: "light" as const },
    value: facts.ownFundsTop5Pct,
    factLabel: "Finanstilsynets analyse:",
    factText: `${facts.ownFundsTop5Pct} % af fondsbeholdningerne hos de fem største danske banker ligger i gennemsnit i bankernes egne fonde. Bertel forklarer, hvad det betyder for dig.`,
    segments: [
      { label: "bankernes egne fonde", value: facts.ownFundsTop5Pct },
      { label: "andre fonde", value: 100 - facts.ownFundsTop5Pct },
    ],
    source: "Kilde: Finanstilsynet, “Bankernes salg af egne fonde”, maj 2026.",
    video: videos.v09,
  },

  terms: {
    title: "Sammen får vi bedre vilkår",
    lead: "Når vi forhandler på vegne af alle vores kunder, kan vi opnå bedre vilkår hos kapitalforvalterne. Rabatterne går ubeskåret videre til dig.",
    fact: {
      value: facts.rebatesPaid.amountMio,
      decimals: 1,
      suffix: " mio. kr.",
      label: `i forvalterrabatter for ${facts.rebatesPaid.investmentYear} udbetalt til vores kunder i ${facts.rebatesPaid.paidYear}.`,
    } satisfies FactContent,
    video: videos.v05,
    text: "Vil du vide, hvad dine investeringer samlet koster? Vi gennemgår dine omkostninger og giver dig et overblik i kroner og procent – gratis og uforpligtende.",
    action: { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "primary" as const },
    link: { label: "Hent guiden “Hvem spiser din lagkage?” →", href: routes.guide },
  },


  calculator: {
    title: "Hvad koster rådgivningen – når rabatterne er trukket fra?",
    wealthLabel: "Din investérbare formue",
    unitMio: "mio. kr.",
    rangeMinLabel: `${calculatorConfig.minMio} mio.`,
    rangeMaxLabel: `${calculatorConfig.maxMio} mio.`,
    todayLabel: "Valgfrit: Hvad betaler du i dag? (% om året)",
    todayPlaceholder: "fx 1,2",
    todayHint: "Ved du det ikke? Det finder vi ud af for dig i omkostningsoverblikket.",
    feeLabel: "Rådgivningshonorar",
    rebateLabel: "Rabatter, vi forhandler hjem",
    netLabel: "Du betaler netto",
    perYear: "om året",
    /** {today} og {diff} udfyldes af beregneren. */
    compare: "Med din nuværende pris betaler du ca. **{today}** om året. Forskellen over 10 år er ca. **{diff}**",
    action: { label: "Få et præcist omkostningsoverblik", href: routes.overview, variant: "primary" as const },
    footnote:
      "Eksempel. Portefølje med 35 % aktier, 40 % obligationer og 25 % alternativer, middel risiko. Honorar ekskl. moms. Rabatter udbetales kontant eller som institutionel andelsklasse. Dine faktiske omkostninger afhænger af din portefølje.",
  },

  about: {
    eyebrow: "Om TOBA Advice",
    title: "Ejet af dem, der rådgiver dig",
    text: [
      `TOBA Advice er en medarbejderejet investeringsrådgiver med tilladelse fra Finanstilsynet. Vi rådgiver personer med en investerbar formue på mindst ${facts.minimumWealthMio} mio. kr. – med skræddersyet rådgivning og frit valg på alle hylder.`,
    ],
    link: { label: "Mød hele teamet →", href: routes.team },
  },

  stats: [
    { value: facts.assetsUnderAdviceMia, suffix: " mia. kr.", label: "under rådgivning" },
    { display: String(facts.founded), label: "etableret" },
    { value: facts.employeesPlus, suffix: "+", label: "medarbejdere" },
    { value: facts.yearsSelectingManagers, suffix: "+ år", label: "med udvælgelse af kapitalforvaltere" },
  ] satisfies Stat[],



  /** Spørgsmål og svar – vises på forsiden og sendes til Google/AI som FAQ-data. Korte, selvstændige svar. */
  faqTitle: "Spørgsmål og svar om uafhængig investeringsrådgivning",
  faq: [
    {
      question: "Hvad laver en uafhængig investeringsrådgiver?",
      answer: `En uafhængig investeringsrådgiver hjælper dig med at sammensætte og følge din investeringsportefølje uden at tjene på de produkter, du bliver anbefalet. TOBA Advice har tilladelse fra Finanstilsynet som investeringsrådgiver, modtager ingen provision og har ingen egne investeringsprodukter. Vi rådgiver om hele din formue – frie midler, pension, virksomhedsskatteordningen og holdingselskab – så det hænger sammen i én strategi.`,
    },
    {
      question: "Hvad er forskellen på en investeringsrådgiver, en bank og en kapitalforvalter?",
      answer: `En kapitalforvalter forvalter fonde og porteføljer. En bank rådgiver typisk også om sine egne fonde – hos de fem største danske banker ligger i gennemsnit ${facts.ownFundsTop5Pct} % af fondsbeholdningerne i bankernes egne fonde (Finanstilsynet, maj 2026). TOBA Advice er hverken bank eller kapitalforvalter: Vi er en uafhængig investeringsrådgiver, der vælger frit blandt kapitalforvaltere på tværs af markedet. I dag samarbejder vi med ${facts.managers} forvaltere i ${facts.countries} lande.`,
    },
    {
      question: "Hvad koster uafhængig investeringsrådgivning?",
      answer: `Du betaler et fast, aftalt rådgivningshonorar – uanset hvad vi investerer i. Vi modtager ingen provision, og de rabatter, vi forhandler hjem hos kapitalforvalterne, går ubeskåret videre til dig. I ${facts.rebatesPaid.paidYear} udbetalte vi ${String(facts.rebatesPaid.amountMio).replace(".", ",")} mio. kr. i forvalterrabatter til vores kunder. Vil du vide, hvad din nuværende løsning koster, kan du få et gratis omkostningsoverblik.`,
    },
    {
      question: "Hvem kan blive kunde hos TOBA Advice?",
      answer: `Vi rådgiver privatpersoner, familier, virksomhedsejere og selskaber med en investerbar formue på mindst ${facts.minimumWealthMio} mio. kr.`,
    },
    {
      question: "Er TOBA Advice et alternativ til private banking og formueforvaltning i banken?",
      answer: `Ja. Vi rådgiver om hele din formue, men uden egne produkter at sælge og uden at tjene på dine investeringer. Du har en fast rådgiver, får en rapport hvert kvartal og kan følge din formue på web og i app.`,
    },
    {
      question: "Skal jeg flytte min bank for at blive kunde?",
      answer: "Nej. Du beholder dit depot i din egen bank. TOBA Advice opbevarer ikke værdipapirer.",
    },
    {
      question: "Hvor holder I til?",
      answer: `Vores kontor ligger på Store Torv i Aarhus C, men vi rådgiver kunder i hele Danmark og kommer gerne ud til dig.`,
    },
  ] satisfies FaqItem[],

  getStarted: {
    title: "Sådan kommer du i gang",
    steps: [
      {
        title: "Et uforpligtende møde",
        text: "Vi starter med dig: Hvad er formålet med dine penge? Hvad betaler du i dag? Hvad er vigtigt for dig?",
      },
      { title: "Et forslag", text: "Du får en strategi og et klart overblik over, hvad det koster." },
      { title: "Du bestemmer", text: "Ingen binding. Siger du ja, sætter vi det hele i gang – i din egen bank." },
      { title: "Vi følger op", text: "Fast møderytme og løbende overvågning. Du kan altid ringe direkte til din rådgiver." },
    ] satisfies StepContent[],
    actions: [
      { ...bookMeeting, variant: "light" as const },
      { label: "Start med et gratis omkostningsoverblik", href: routes.overview, variant: "ghost-light" as const },
    ],
  },
  news: {
    title: "Seneste nyt og indsigt",
    lead: "Vores holdninger og analyser om investering, omkostninger og risiko – også delt på LinkedIn.",
  } satisfies NewsTeaserContent,
};
