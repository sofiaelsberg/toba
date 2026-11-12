import { facts } from "../facts";
import { ambient, images, videos } from "../media";
import { routes, bookMeeting } from "../site";
import type { CtaCardContent, HeroContent, Point, Seo, Stat, ValueItem, NewsTeaserContent } from "../types";

export const home = {
  seo: {
    title: "TOBA Advice – uafhængig investeringsrådgivning som den bør være",
    description:
      "Uafhængig investeringsrådgivning med fast honorar, frit valg på alle hylder og rabatter, der går ubeskåret til dig. Vi mødes med dig i hele Danmark.",
  } satisfies Seo,

  hero: {
    eyebrow: "Uafhængig investeringsrådgivning",
    title: "Vi tager os af dine investeringer, så du kan tage dig af *livet*",
    lead: "Uafhængig rådgivning om din samlede formue – for selskaber, privatpersoner, virksomhedsejere og familier.",
    actions: [bookMeeting, { label: "Hvem spiser din lagkage?", href: "#lagkage", variant: "secondary" }],
    trustline: `Uafhængig investeringsrådgiver med tilladelse fra Finanstilsynet · Etableret ${facts.founded} · Medarbejderejet siden ${facts.employeeOwnedSince}`,
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
    lead: "Hos TOBA Advice arbejder vi for at sikre dig attraktive og fair vilkår for dine investeringer. Vi har ingen økonomisk interesse i at anbefale bestemte investeringsprodukter.",
    points: [
      { title: "En sparringspartner – ikke en sælger.", text: "Sammen lægger vi en klar retning for dine investeringer." },
      {
        title: "En strategi, der passer til dig.",
        text: "Skræddersyet til dine ønsker og behov – og fulgt løbende op, når din situation ændrer sig.",
      },
      { title: "Direkte adgang til din rådgiver.", text: "Du ved, hvem du taler med – i både gode og dårlige tider." },
      {
        title: "Overblik, når det passer dig.",
        text: "Følg din formue online – på web og i app – og få en rapport hvert kvartal.",
      },
    ] satisfies Point[],
    quote: "For værdi handler om mere end et godt afkast. Det handler om tillid og ordentlighed.",
    video: videos.v03,
  },

  bank: {
    eyebrow: "Hvem arbejder din bank for?",
    value: facts.ownFundsTop5Pct,
    lead: "af fondsbeholdningerne hos de fem største danske banker ligger i gennemsnit i bankernes egne fonde.",
    segments: [
      { label: "bankernes egne fonde", value: facts.ownFundsTop5Pct },
      { label: "andre fonde", value: 100 - facts.ownFundsTop5Pct },
    ],
    text: "Det betyder ikke, at rådgivningen er dårlig. Men det betyder, at den ikke er fri. Vi har ingen indtægter fra egen forvaltning eller handel og tager ingen provision. Vi tjener kun på vores rådgivning – aldrig på de forvaltere, vi vælger.",
    source: "Kilde: Finanstilsynet, “Bankernes salg af egne fonde”, maj 2026.",
    link: { label: "Se forskellen på de tre slags rådgivere →", href: routes.independent },
    video: videos.v09,
  },

  cake: {
    title: "Hvem spiser din *lagkage*?",
    lead: "Omkostningerne i en investeringsløsning ligger i lag – og nogle af dem kan du slet ikke se. Det er ikke ét gebyr, der er problemet. Det er summen af alle lagene.",
    action: { label: "Hent guiden gratis", href: routes.guide, variant: "primary" as const },
    example: [
      { display: "0,5 %-point", label: "mere om året, der bliver hos dig i stedet for at gå til omkostninger" },
      {
        value: facts.cakeExample.extraMio,
        decimals: 1,
        suffix: " mio. kr.",
        label: "mere efter 20 år på en formue på 10 mio. kr.",
      },
    ] satisfies Stat[],
    exampleNote:
      "Regneeksempel: 10 mio. kr. over 20 år med 6,0 % mod 5,5 % i årligt afkast efter omkostninger (32,1 mod 29,2 mio. kr.). Afrundet og kun til illustration.",
  },

  values: {
    title: "Det betyder vores værdier for dig",
    items: [
      {
        number: "01",
        title: "Uafhængighed",
        text: "Vi har ingen indtægter fra egen forvaltning eller handel. Derfor kan vi vælge frit mellem aktivklasser og investeringsprodukter.",
        forYouLabel: "For dig:",
        forYou:
          "Du får rådgivning med udgangspunkt i dine interesser – ikke i hvilke produkter der giver rådgiveren størst indtjening.",
      },
      {
        number: "02",
        title: "Transparens",
        text: "Du betaler et fast rådgivningshonorar, som ikke afhænger af, hvilke investeringer vi vælger. Vi får aldrig betaling for handler eller følgeforretninger.",
        forYouLabel: "For dig:",
        forYou: "Du ved præcis, hvad du betaler for – og hvorfor.",
      },
      {
        number: "03",
        title: "Fællesskab",
        text: `Vi samler vores kunders volumen og forhandler rabatter hjem hos forvaltere og depotbanker. Rabatterne går ubeskåret videre – i ${facts.rebatesPaid.paidYear} udbetalte vi ${String(facts.rebatesPaid.amountMio).replace(".", ",")} mio. kr.`,
        forYouLabel: "For dig:",
        forYou: "Du får glæde af de stordriftsfordele, vi forhandler på vegne af vores kunder.",
      },
      {
        number: "04",
        title: "Adgang",
        text: "Vi giver adgang til et professionelt investeringssetup og udvalgte investeringsmuligheder, som normalt kræver større investeringsbeløb.",
        forYouLabel: "For dig:",
        forYou: "Du kan få adgang til udvalgte investeringer på institutionelle vilkår.",
      },
    ] satisfies ValueItem[],
    link: { label: "Læs mere om uafhængig investeringsrådgivning →", href: routes.independent },
  },

  pricing: {
    eyebrow: "Fair priser – regn selv efter",
    title: "Vi forhandler rabatterne hjem. Du beholder dem.",
    text: `I ${facts.rebatesPaid.paidYear} udbetalte vi **${String(facts.rebatesPaid.amountMio).replace(".", ",")} mio. kr.** i forvalterrabatter til vores kunder. Hver krone gik ubeskåret videre.`,
    video: videos.v05,
  },

  calculator: {
    title: "Hvad koster rådgivningen – når rabatterne er trukket fra?",
    wealthLabel: "Din investérbare formue",
    unitMio: "mio. kr.",
    rangeMinLabel: "5 mio.",
    rangeMaxLabel: "100 mio.",
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

  professional: {
    title: "Investér som de *professionelle*",
    text: [
      `Vi udvælger kapitalforvaltere gennem en grundig, faglig proces og samarbejder i dag med ${facts.managers} forvaltere i ${facts.countries} lande.`,
      "Ingen kunder er ens. Derfor sammensætter vi en investeringsstrategi med udgangspunkt i dine mål, din tidshorisont og den risiko, du er villig til at tage.",
    ],
    link: { label: "Sådan investerer vi →", href: routes.howWeInvest },
  },

  about: {
    eyebrow: "Om TOBA Advice",
    title: "Medarbejderejet – og på din side",
    text: [
      "TOBA Advice er en medarbejderejet investeringsrådgiver med tilladelse fra Finanstilsynet. Vi rådgiver personer med en investerbar formue på mindst 5 mio. kr. – med skræddersyet rådgivning og frit valg på alle hylder.",
      "Mange af vores kunder er virksomhedsejere, selvstændige og familier, der vil have ro om en formue, de har arbejdet hårdt for – og en rådgiver, der siger tingene, som de er.",
    ],
    link: { label: "Læs om TOBA →", href: routes.about },
    media: images.sameSide,
  },

  stats: [
    { value: facts.assetsUnderAdviceMia, suffix: " mia. kr.", label: "under rådgivning" },
    { display: String(facts.founded), label: "etableret" },
    { value: facts.employeesPlus, suffix: "+", label: "medarbejdere" },
    { value: facts.yearsSelectingManagers, suffix: "+ år", label: "med udvælgelse af kapitalforvaltere" },
  ] satisfies Stat[],

  advisers: {
    title: "Mød dine rådgivere",
    lead: "Hos TOBA Advice får du en personlig rådgiver, du kan sparre med om dine investeringer. Her kan du møde nogle af de mennesker, der står klar til at hjælpe dig.",
    text: "Har du spørgsmål, eller er du i tvivl om, hvem du skal kontakte? Så tag endelig fat i os. Vi hjælper dig gerne videre.",
    link: { label: "Se hele vores team →", href: routes.team },
    contact: { label: "Kontakt TOBA Advice", href: routes.contact, variant: "secondary" as const },
  },

  closing: {
    title: "Lad os tage en snak",
    lead: "Vil du vide, om din investeringsløsning passer til dine behov? Book et uforpligtende møde med en af vores rådgivere.",
    actions: [
      { ...bookMeeting, variant: "light" as const },
      { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "ghost-light" as const },
    ],
  },

  /** Seneste indlæg fra /nyheder (vises automatisk – de tre nyeste). */
  news: {
    title: "Seneste nyt og indsigt",
    lead: "Vores holdninger og analyser om investering, omkostninger og risiko – også delt på LinkedIn.",
  } satisfies NewsTeaserContent,
};
