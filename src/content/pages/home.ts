import { facts } from "../facts";
import { ambient, images, videos } from "../media";
import { routes, bookMeeting } from "../site";
import type { CtaCardContent, HeroContent, Point, Seo, Stat, ValueItem } from "../types";

export const home = {
  seo: {
    title: "TOBA Advice – uafhængig investeringsrådgivning som den bør være",
    description:
      "Uafhængig investeringsrådgivning uden uigennemsigtige gebyrer og skjulte interesser. Fast honorar, frit valg på alle hylder – og rabatterne går ubeskåret til dig.",
  } satisfies Seo,

  hero: {
    eyebrow: "Uafhængig investeringsrådgivning",
    title: "Investeringsrådgivning som den *bør* være",
    lead: "Ingen uigennemsigtige gebyrer. Ingen skjulte interesser. Kun ærlig rådgivning, hvor du ved præcis, hvad du betaler for – og hvem vi arbejder for: dig.",
    actions: [bookMeeting, { label: "Hvem spiser din lagkage?", href: "#lagkage", variant: "secondary" }],
    trustline: "Uafhængig investeringsrådgiver med tilladelse fra Finanstilsynet · Medarbejderejet · Siden 2016",
  } satisfies HeroContent,
  heroMedia: ambient.office,

  ctaCards: [
    { title: "Hvem spiser din lagkage?", text: "Download guiden og se, hvor værdien i din portefølje ender – og hvem der får rabatterne.", linkLabel: "Hent guiden gratis →", href: routes.guide, visual: "cake" },
    { title: "Få gratis omkostningsoverblik", text: "Få ét samlet billede af, hvad din formue koster – og hvem der får pengene. Gratis og uforpligtende.", linkLabel: "Bestil dit overblik →", href: routes.overview, visual: "overview" },
    { title: "Afhængig eller uafhængig?", text: "Der findes tre slags rådgivere – med tre forskellige interesser. Ved du, hvilken du har?", linkLabel: "Se forskellen →", href: routes.independent, visual: "advisers" },
  ] satisfies CtaCardContent[],

  sameSide: {
    title: "Vi sidder på *samme side* af bordet",
    lead: "Målet er enkelt: at du får de bedste vilkår for dine investeringer – og dermed for din fremtid. Vi har ingen egeninteresse i vores anbefalinger og arbejder ud fra et fast aftalt honorar.",
    points: [
      { title: "En sparringspartner – ikke en sælger.", text: "Din rådgiver sætter retningen for dine investeringer sammen med dig." },
      { title: "En strategi, der passer til dig.", text: "Skræddersyet til dine ønsker og behov – og fulgt løbende op, når din situation ændrer sig." },
      { title: "Direkte adgang til din rådgiver.", text: "Du ved, hvem du taler med – i både gode og dårlige tider." },
      { title: "Overblik, når det passer dig.", text: "Følg din formue online – på web og i app – og få en rapport hvert kvartal." },
    ] satisfies Point[],
    quote: "For værdi handler om mere end et godt afkast. Det handler om tillid og ordentlighed.",
    video: videos.v03,
  },

  bank: {
    eyebrow: "Hvem arbejder din bank for?",
    value: 95,
    lead: "af danskernes fondsbeholdninger i de fem største banker ligger i bankens egne fonde eller i fonde, som banken får provision for at sælge.",
    segments: [
      { label: "egne fonde", value: facts.bankShares.ownFunds },
      { label: "eksterne med provision", value: facts.bankShares.externalWithCommission },
      { label: "eksterne uden provision", value: facts.bankShares.externalWithout },
    ],
    text: "Det betyder ikke, at rådgivningen er dårlig. Men det betyder, at den ikke er fri. Vi har ingen indtægter fra egen forvaltning eller handel og tager ingen provision. Vi tjener kun på vores rådgivning – aldrig på de forvaltere, vi vælger.",
    source: "Kilde: Finanstilsynet, “Bankernes salg af egne fonde”, maj 2026.",
    link: { label: "Se forskellen på de tre slags rådgivere →", href: routes.independent },
    // OBS: Bertel siger "92 procent" i V09 – afklar før lancering.
    video: videos.v09,
  },

  cake: {
    title: "Hvem spiser din *lagkage*?",
    lead: "Omkostningerne i en investeringsløsning ligger i lag – og nogle af dem kan du slet ikke se. Det er ikke ét gebyr, der er problemet. Det er summen af alle lagene.",
    action: { label: "Hent guiden gratis", href: routes.guide, variant: "primary" as const },
    example: [
      { display: "0,5 %-point", label: "mere om året, der bliver hos dig i stedet for at gå til omkostninger" },
      { value: facts.cakeExample.extraMio, decimals: 1, suffix: " mio. kr.", label: "mere efter 20 år på en formue på 10 mio. kr." },
    ] satisfies Stat[],
    exampleNote: "Regneeksempel: 10 mio. kr. over 20 år med 6,0 % mod 5,5 % i årligt afkast efter omkostninger (32,1 mod 29,2 mio. kr.). Afrundet og kun til illustration.",
  },

  values: {
    title: "Det betyder vores værdier for dig",
    items: [
      { number: "01", title: "Uafhængighed", text: "Vi har ingen indtægter fra egen forvaltning eller handel. Derfor kan vi vælge frit mellem aktivklasser og investeringsprodukter.", forYouLabel: "For dig:", forYou: "Du får anbefalinger uden bagtanke – valgt frit på tværs af markedet." },
      { number: "02", title: "Transparens", text: "Du betaler et fast rådgivningshonorar, som ikke afhænger af, hvilke investeringer vi vælger. Vi får aldrig betaling for handler eller følgeforretninger.", forYouLabel: "For dig:", forYou: "Du ved præcis, hvad du betaler for – og hvorfor." },
      { number: "03", title: "Fællesskab", text: `Vi samler vores kunders volumen og forhandler rabatter hjem hos forvaltere og depotbanker. Rabatterne går ubeskåret videre – for ${facts.rebatesPaid.year} udbetalte vi ${String(facts.rebatesPaid.amountMio).replace(".", ",")} mio. kr.`, forYouLabel: "For dig:", forYou: "Du får en stor investors vilkår – også selvom du ikke selv er det." },
      { number: "04", title: "Adgang", text: "Vi giver adgang til et professionelt investeringssetup og til nogle af verdens bedste kapitalforvaltere – ikke kun i Danmark.", forYouLabel: "For dig:", forYou: "Du investerer på samme vilkår som professionelle investorer." },
    ] satisfies ValueItem[],
  },

  pricing: {
    eyebrow: "Fair priser – regn selv efter",
    title: "Vi forhandler rabatterne hjem. Du beholder dem.",
    text: `For ${facts.rebatesPaid.year} udbetalte vi **${String(facts.rebatesPaid.amountMio).replace(".", ",")} mio. kr.** i forvalterrabatter til vores kunder. Hver krone gik ubeskåret videre.`,
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
    footnote: "Eksempel. Portefølje med 35 % aktier, 40 % obligationer og 25 % alternativer, middel risiko. Honorar ekskl. moms. Rabatter udbetales kontant eller som institutionel andelsklasse. Dine faktiske omkostninger afhænger af din portefølje.",
  },

  professional: {
    title: "Investér som de *professionelle*",
    text: [
      `Du får adgang til de bedste forvaltere og investeringer, som normalt kun er forbeholdt professionelle investorer. Valget bygger på en grundig og faglig forvalterudvælgelse – i dag blandt ${facts.managers} forvaltere i ${facts.countries} lande.`,
      "Ingen kunder er ens. Derfor bliver din strategi skræddersyet til dig.",
    ],
    link: { label: "Sådan investerer vi →", href: routes.howWeInvest },
  },

  about: {
    eyebrow: "Om TOBA Advice",
    title: "Medarbejderejet – og på din side",
    text: [
      "TOBA Advice er en medarbejderejet investeringsrådgiver med tilladelse fra Finanstilsynet. Vi rådgiver personer med en investérbar formue på minimum 5 mio. kr. – med skræddersyet rådgivning og frit valg på alle hylder.",
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
    lead: "Har du spørgsmål, eller vil du have din investeringsopsætning gennemgået? Tag fat i en af os – vi tager gerne en uforpligtende snak.",
    link: { label: "Se hele vores team →", href: routes.team },
  },

  closing: {
    title: "Lad os tage en snak",
    lead: "Vil du vide, om din formue arbejder for dig – eller for andre? Book et uforpligtende møde med en af vores rådgivere.",
    actions: [
      { ...bookMeeting, variant: "light" as const },
      { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "ghost-light" as const },
    ],
  },
};
