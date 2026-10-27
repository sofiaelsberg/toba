import { facts } from "../facts";
import { images, videos } from "../media";
import { routes } from "../site";
import type { FeatureContent, HeroContent, Point, Seo, Stat } from "../types";

/** Landingsside 1: /lagkage */
export const guide = {
  seo: {
    title: "Hvem spiser din lagkage? Gratis guide | TOBA Advice",
    description:
      "Se, hvad din formue koster – og hvem der får pengene. Download vores gratis guide til omkostninger, rabatter og interessekonflikter i din investeringsportefølje.",
    ogDescription: "Omkostninger er ikke problemet. Usynlige omkostninger er. Hent den gratis guide.",
  } satisfies Seo,

  headerAction: { label: "Hent guiden gratis", href: "#guide", variant: "primary" as const },

  hero: {
    eyebrow: "Gratis guide",
    title: "Hvem spiser din *lagkage*?",
    lead: "Se, hvad din formue koster – og hvem der får pengene. Hent vores guide til omkostninger, rabatter og interessekonflikter i din investeringsportefølje.",
    actions: [{ label: "Hent guiden gratis", href: "#guide", variant: "primary" }],
  } satisfies HeroContent,
  cover: images.guideCover,

  intro: {
    title: "Omkostninger er ikke problemet. *Usynlige* omkostninger er.",
    text: [
      "Din formue er som en lagkage. Den vokser forhåbentlig hvert år – men banken, fondene og rådgiveren tager hver deres lag. Nogle lag kan du se på en regning. Andre trækkes direkte i dit afkast, uden at du opdager det.",
      "Og så er der rabatterne. Når en bank eller rådgiver samler mange investorer, kan de forhandle sig til lavere omkostninger hos forvalterne. Spørgsmålet er, om rabatten lander hos dig – eller hos en anden.",
    ],
    fact: {
      value: facts.cakeExample.extraMio, decimals: 1, suffix: " mio. kr.",
      label: "mere efter 20 år på en formue på 10 mio. kr. – hvis bare 0,5 %-point mere om året bliver hos dig i stedet for at gå til omkostninger.*",
      source: "* Regneeksempel: 10 mio. kr. over 20 år med 6,0 % mod 5,5 % i årligt afkast efter omkostninger (32,1 mod 29,2 mio. kr.). Afrundet og kun til illustration.",
    },
    cakeNote: "Illustration. Lagene lægger sig ét ad gangen, når kagen kommer i syne.",
  },

  video: {
    title: "Hvor ender værdien i din portefølje?",
    text: "Martin Svendsen forklarer, hvorfor det ofte er de omkostninger, du ikke kan se, der koster mest.",
    video: videos.v02,
  },

  benefits: {
    title: "Det får du ud af guiden",
    points: [
      { title: "De fire lag i din lagkage.", text: "Hvilke omkostninger der gemmer sig i din portefølje – og hvilket lag der typisk er det største." },
      { title: "Hvem får rabatten?", text: "Hvad en forvalterrabat er, hvor den kommer fra – og hvorfor det betyder noget for dig, hvem der beholder den." },
      { title: "Hvad Finanstilsynet fandt.", text: "Hvor stor en del af danskernes fondsbeholdninger i de største banker der ligger i bankens egne fonde eller fonde med provision." },
      { title: "Hele tjeklisten.", text: "Alle 7 spørgsmål, du bør stille din rådgiver – klar til at tage med til dit næste møde." },
      { title: "En ægte case.", text: "Hvad en kunde med 18 mio. kr. i en af de store banker reelt betalte om året, da alle lag blev lagt sammen." },
    ] satisfies Point[],
  },

  checklist: {
    title: "7 spørgsmål du bør stille din rådgiver",
    lead: "Gode svar er korte og konkrete. Bliver svarene lange og uklare, er det i sig selv et svar. Her er tre af dem:",
    /** Indeks der altid vises (spørgsmål 1, 3 og 5). Resten låses op efter tilmelding. */
    freeIndexes: [0, 2, 4],
    questions: [
      "Hvad betaler jeg samlet set for min investeringsløsning?",
      "Hvilke omkostninger ligger inde i fondene eller produkterne?",
      "Hvordan bliver min rådgiver betalt – og af hvem?",
      "Hvor stor en del af min portefølje består af bankens egne produkter?",
      "Modtager banken eller rådgiveren rabatter, provisioner eller andre betalinger?",
      "Er min portefølje sammensat ud fra hele markedet eller et begrænset produktudvalg?",
      "Hvad er begrundelsen for hvert produkt i min portefølje?",
    ],
    teaser: "**+ 4 spørgsmål mere i guiden.** Hent hele tjeklisten, og tag den med til dit næste møde med banken eller din rådgiver.",
    teaserAction: { label: "Hent hele tjeklisten", href: "#guide", variant: "secondary" as const },
    unlocked: "**Låst op.** Her er hele listen – den står også i guiden i din indbakke.",
  },

  about: {
    title: "Rådgivning, hvor du ved, hvem vi arbejder for",
    lead: "Hos TOBA Advice er der ingen skjulte interesser. Derfor kan vi vælge frit – og altid ud fra, hvad der er bedst for dig.",
    features: [
      { icon: "globe", title: "Uafhængig rådgivning.", text: `Vi vælger frit på tværs af markedet – i dag blandt ${facts.managers} forvaltere i ${facts.countries} lande.` },
      { icon: "no-commission", title: "Ingen egen forvaltning. Ingen provision.", text: "Vi lever af vores rådgivning – ikke af de fonde, vi vælger." },
      { icon: "rebate", title: "Rabatterne går til dig.", text: "Vi forhandler rabatter hjem på vegne af alle vores kunder samlet – og sender dem ubeskåret videre til dig." },
    ] satisfies FeatureContent[],
    stats: [
      { value: facts.rebatesPaid.amountMio, decimals: 1, suffix: " mio. kr.", label: `udbetalte vi til vores kunder i forvalterrabatter for ${facts.rebatesPaid.year}. Hver krone gik ubeskåret videre.` },
      { value: facts.yearsSelectingManagers, suffix: "+ år", label: "med udvælgelse af kapitalforvaltere" },
      { value: facts.assetsUnderAdviceMia, suffix: " mia. kr.", label: "under rådgivning" },
      { display: "Ejet", label: "af medarbejderne" },
    ] satisfies Stat[],
  },

  secondary: {
    title: "Vil du se din *egen* lagkage?",
    text: [
      "Send os din omkostnings- og afkastrapport fra banken – det er alt, vi skal bruge. Vi gennemgår alle lag i din portefølje og viser dig hele billedet på et møde på en time.",
      "Det er gratis og uforpligtende. Du behøver ikke skifte bank eller rådgiver for at få klarhed – og du bestemmer selv, hvad du vil gøre bagefter.",
    ],
    action: { label: "Få gratis omkostningsoverblik", href: routes.overview, variant: "primary" as const },
  },
};
