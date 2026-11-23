/** Mikrotekster og tilgængelighedstekster, som komponenterne bruger. */
export const ui = {
  video: {
    play: "Se video",
  },
  linkedinPost: {
    iframeTitle: "Seneste opslag fra TOBA Advice på LinkedIn",
    consentTitle: "Se vores seneste opslag",
    consentText: "Opslaget hentes fra LinkedIn, som sætter cookies. Det vises, når du siger ja til marketing-cookies.",
    consentButton: "Tilpas cookies",
    openOnLinkedin: "Se opslaget på LinkedIn →",
  },
  ambientVideo: {
    pause: "Sæt stemningsvideoen på pause",
    play: "Afspil stemningsvideoen",
  },
  layerCake: {
    next: "Næste lag",
    restart: "Start forfra",
    groupLabel: "Lag i lagkagen",
    centerLabel: "Dit lag",
    ariaPrefix: "Illustration af lagkagen:",
    ariaShare: (share: number) => `Dit lag udgør cirka ${share} procent af kagen.`,
  },
  team: {
    filterLabel: "Vis afdeling",
    readMore: (first: string) => `Læs mere om ${first} →`,
    closeProfile: "Luk profil",
    profileLabel: (name: string) => `Profil: ${name}`,
    bioMissing: "Profiltekst kommer snart.",
    bookWith: (first: string) => `Book et møde med ${first}`,
    linkedin: "LinkedIn →",
    articles: (first: string) => `Artikler af ${first}`,
    allArticles: "Alle nyheder →",
  },
  lockedQuestion: "Låst spørgsmål – hent guiden for at se det",
} as const;
