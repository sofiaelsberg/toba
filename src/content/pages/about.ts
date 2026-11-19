import { facts } from "../facts";
import { images, linkedin, videos } from "../media";
import { company, routes, bookMeeting, trustline } from "../site";
import type { FeatureContent, HeroContent, Seo, Stat } from "../types";

export const about = {
  seo: {
    title: "Om TOBA Advice – uafhængig, medarbejderejet investeringsrådgiver",
    description:
      "TOBA Advice er en uafhængig, medarbejderejet investeringsrådgiver med tilladelse fra Finanstilsynet. Vi rådgiver formuer fra 5 mio. kr. i hele Danmark.",
  } satisfies Seo,

  hero: {
    eyebrow: "Om TOBA Advice",
    title: "Vi er uafhængige, ejet af medarbejderne – og på *din side*",
    lead: "Fra vores kontor i Aarhus rådgiver vi kunder i hele Danmark – og vi kommer gerne ud til dig.",
    actions: [bookMeeting],
    trustline,
  } satisfies HeroContent,
  heroMedia: images.officeWindow,

  name: {
    eyebrow: "Navnet",
    title: "Hvorfor hedder vi *TOBA*?",
    stages: [
      { title: "Udbruddet", text: "alt lægges øde" },
      { title: "Bagefter", text: "naturen vender tilbage" },
      { title: "En ny start", text: "A’et i vores logo" },
    ],
    illustrationLabel: "Illustration: en vulkan, der bryder ud, og et nyt landskab, der vokser frem – ligesom A’et i logoet.",
    text: [
      "Toba er navnet på en supervulkan på øen Sumatra i Indonesien. For 74.000 år siden var den i udbrud og det var så voldsomt at den lagde alt omkring sig øde. Efter udbruddet begyndte naturen langsomt at vende tilbage. For os symboliserer det en ny begyndelse – en ny start.",
      "Det er det vi gerne vil symbolisere med navnet TOBA: en ny tilgang til investeringsrådgivning, hvor vi tager udgangspunkt i dine behov. Derfor er A’et i vores logo en vulkan.",
    ],
    video: videos.v11,
  },

  benefits: {
    title: "Det får du hos TOBA Advice",
    features: [
      {
        icon: "person",
        title: "Rådgivning, der handler om dig",
        text: "Din strategi bliver skræddersyet til din formue, dine mål og den risiko, du er villig til at tage.",
      },
      {
        icon: "shelves",
        title: "Frit valg på alle hylder",
        text: `Vi tjener ikke penge på egen forvaltning eller handel. Derfor kan vi vælge frit – i dag blandt ${facts.managers} forvaltere i ${facts.countries} lande.`,
      },
      {
        icon: "fixed-fee",
        title: "Et fast honorar",
        text: "Du betaler et fast rådgivningshonorar, som ikke afhænger af, hvilke investeringer vi vælger.",
      },
      {
        icon: "rebate",
        title: "Rabatterne går til dig",
        text: `Vi forhandler rabatter hjem for alle kunder samlet og sender dem ubeskåret videre. I ${facts.rebatesPaid.paidYear} udbetalte vi ${String(facts.rebatesPaid.amountMio).replace(".", ",")} mio. kr.`,
      },
      {
        icon: "phone-app",
        title: "Overblik, når det passer dig",
        text: "Følg din formue online – på web og i app – og få en rapport hvert kvartal.",
      },
      { icon: "shield", title: "Tryghed", text: `Vi har tilladelse fra Finanstilsynet og har rådgivet siden ${facts.founded}.` },
    ] satisfies FeatureContent[],
    link: { label: "Læs om uafhængig rådgivning →", href: routes.independent },
  },

  owned: {
    title: "Ejet af dem, der *rådgiver* dig",
    text: [
      "TOBA Advice er ejet af medarbejderne. Det betyder, at de mennesker, du taler med, også er dem, der står bag virksomheden.",
      "Vi har ingen ejere, der kræver, at vi sælger bestemte produkter. Vores interesse er den samme som din: at din formue bliver passet godt på i mange år.",
    ],
  },

  forYou: {
    title: "Er TOBA Advice noget for dig?",
    highlight: `Fra ${facts.minimumWealthMio} mio. kr.`,
    highlightLabel: "i investérbar formue",
    text: "Vi rådgiver kunder med en investérbar formue på mindst 5 mio. kr. Mange af vores kunder er virksomhedsejere, selvstændige og familier, der vil have ro om en formue, de har arbejdet hårdt for – og en rådgiver, der siger tingene, som de er.",
  },

  stats: [
    { display: String(facts.founded), label: "etableret" },
    { value: facts.assetsUnderAdviceMia, suffix: " mia. kr.", label: "under rådgivning" },
    { value: facts.managers, suffix: " forvaltere", label: `i ${facts.countries} lande` },
    { value: facts.yearsSelectingManagers, suffix: "+ år", label: "med udvælgelse af kapitalforvaltere" },
  ] satisfies Stat[],

  /** OBS: Udkast fra Anders' version – citatet skal godkendes af Tonny før lancering. */
  cooQuote: {
    personSlug: "tonny-elsberg",
    text: "“Fordi vi selv ejer virksomheden, træffer vi beslutninger med et langt perspektiv. Vi skal kunne se vores kunder i øjnene om ti år – og det er det, der styrer, hvordan vi arbejder i dag.”",
  },

  advisers: {
    title: "Mød dine rådgivere",
    lead: "Har du spørgsmål, eller vil du have din investeringsopsætning gennemgået? Tag fat i en af os – vi tager gerne en uforpligtende snak.",
    link: { label: "Se hele vores team →", href: routes.team },
  },

  linkedin: {
    title: "Følg med i vores perspektiver på investering",
    link: { label: "Følg TOBA Advice på LinkedIn →", href: company.linkedin },
    post: linkedin.latestPost,
  },

  closing: {
    title: "Lad os starte med en samtale",
    lead: "Vil du vide, om din formue arbejder for dig – eller for andre? Book et uforpligtende møde, eller start med et gratis omkostningsoverblik.",
    actions: [
      { ...bookMeeting, variant: "light" as const },
      { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "ghost-light" as const },
    ],
  },
};
