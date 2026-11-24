import { facts } from "../facts";
import { images, videos } from "../media";
import { activeCampaignForms, guideForm } from "../forms";
import { routes } from "../site";
import type { FeatureContent, HeroContent, Point, Seo, Stat } from "../types";

/** Landingsside 1: /lagkage */
export const guide = {
  seo: {
    title: "Hvem spiser din lagkage? Gratis guide | TOBA Advice",
    description:
      "Ved du, hvad din investeringsportefølje egentlig koster? Hent TOBA Advices gratis guide til omkostninger, rabatter og interessekonflikter.",
    ogDescription: "Omkostninger er ikke problemet. Usynlige omkostninger er. Hent den gratis guide.",
  } satisfies Seo,

  headerAction: { label: "Hent guiden gratis", href: "#guide", variant: "primary" as const },

  hero: {
    eyebrow: "Gratis whitepaper",
    title: "Hvem spiser din *lagkage*?",
    lead: "Ved du, hvor meget af dit investeringsafkast der ender hos dig?",
  } satisfies HeroContent,
  heroText: [
    "Banken, fondene og rådgiveren kan alle tage en bid af afkastet. Men ved du, hvad du samlet betaler, hvem der får pengene, og om du får reel værdi for dem?",
    "Download vores gratis guide og få indsigt i omkostninger, rabatter og interessekonflikter i din investeringsportefølje.",
  ],
  /** ActiveCampaign-formular #8 (tak-beskeden står i ActiveCampaign). */
  form: {
    id: activeCampaignForms.guide,
    label: "Formular: Hent guiden gratis",
    title: guideForm.title,
    intro: guideForm.intro,
    microcopy: guideForm.microcopy,
  },
  cover: images.guideCover,

  intro: {
    title: "Omkostninger er ikke problemet. *Usynlige* omkostninger er.",
    text: [
      "Det er ikke kun dit afkast, der tæller. Det er, hvor meget af det du beholder.",
      "Nogle omkostninger kan du se. Andre trækkes løbende inde i fondene, og rabatter kan ende hos andre end dig.",
    ],
    fact: {
      value: facts.cakeExample.extraMio, decimals: 1, suffix: " mio. kr.",
      label: "mere efter 20 år på en formue på 10 mio. kr. – hvis bare 0,5 %-point mere om året bliver hos dig i stedet for at gå til omkostninger.*",
      source: "* Regneeksempel: 10 mio. kr. over 20 år med 6,0 % mod 5,5 % i årligt afkast efter omkostninger (32,1 mod 29,2 mio. kr.). Afrundet og kun til illustration.",
    },
    cakeNote: "Illustration. Lagene lægger sig ét ad gangen, når kagen kommer i syne.",
  },

  video: {
    title: "Hvem spiser egentlig af dit afkast?",
    text: "I videoen forklarer Martin Svendsen fra TOBA Advice, hvorfor det er vigtigt at kende de forskellige omkostninger – og hvad du som investor bør være opmærksom på.",
    video: videos.v02,
    action: { label: "Hent guiden gratis", href: "#guide", variant: "primary" as const },
  },

  benefits: {
    title: "Få et bedre overblik over dine investeringer",
    lead: "I vores gratis whitepaper får du blandt andet:",
    points: [
      { title: "Overblik over omkostningerne.", text: "Forstå, hvor omkostningerne ligger, og hvordan de påvirker dit afkast." },
      { title: "Indsigt i rabatter.", text: "Lær, hvad forvalterrabatter er, og hvorfor det betyder noget, hvem der modtager dem." },
      { title: "Rådgiver eller sælger?", text: "Bliv klogere på økonomiske interessekonflikter og betydningen af uafhængig rådgivning." },
      { title: "En konkret kundecase.", text: "Se, hvordan en gennemgang af en formue på over 18 mio. kr. afdækkede samlede årlige omkostninger på cirka 246.000 kr." },
      { title: "7 spørgsmål til din rådgiver.", text: "Få en konkret tjekliste, du kan tage med til dit næste møde." },
    ] satisfies Point[],
  },

  checklist: {
    title: "7 spørgsmål du bør stille din rådgiver",
    lead: "Du bør kunne få klare og forståelige svar på, hvad din investeringsløsning koster, og hvorfor dine investeringer er valgt. Her er tre af de spørgsmål, du finder i guiden:",
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
    teaser: "I whitepaperet får du alle syv spørgsmål, som du kan bruge til at få et bedre grundlag for dine investeringsbeslutninger.",
    teaserAction: { label: "Hent hele tjeklisten", href: "#guide", variant: "secondary" as const },
    unlocked: "**Låst op.** Her er hele listen – den står også i guiden i din indbakke.",
  },

  about: {
    title: "Uafhængig rådgivning. Uden skjulte interesser",
    lead: "Hos TOBA Advice er der ingen skjulte interesser. Derfor kan vi vælge frit – og altid ud fra, hvad der er bedst for dig.",
    features: [
      { icon: "globe", title: "Uafhængig rådgivning.", text: `Vi vælger frit på tværs af markedet – i dag blandt ${facts.managers} forvaltere i ${facts.countries} lande.` },
      { icon: "no-commission", title: "Ingen egen forvaltning. Ingen provision.", text: "Vi lever af vores rådgivning – ikke af de fonde, vi vælger." },
      { icon: "rebate", title: "Rabatterne går til dig.", text: "Vi forhandler rabatter hjem på vegne af alle vores kunder samlet – og sender dem ubeskåret videre til dig." },
    ] satisfies FeatureContent[],
    stats: [
      { value: facts.rebatesPaid.amountMio, decimals: 1, suffix: " mio. kr.", label: `i forvalterrabatter for ${facts.rebatesPaid.investmentYear} udbetalt til vore kunder i ${facts.rebatesPaid.paidYear}.` },
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
