/** Mikrotekster og tilgængelighedstekster, som komponenterne bruger. */
export const ui = {
  video: {
    play: "Se video",
    placeholderNote: "Plakatbillede fra videoen",
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
    readMoreAria: (name: string) => `Læs mere om ${name}`,
    closeProfile: "Luk profil",
    profileLabel: (name: string) => `Profil: ${name}`,
    bioMissing: "Profiltekst kommer snart.",
    bookWith: (first: string) => `Book et møde med ${first}`,
    linkedin: "LinkedIn →",
    portraitAlt: (name: string) => `Portræt af ${name}`,
  },
  accordion: { open: "+", close: "–" },
  calculator: {
    perYear: "om året",
  },
  lockedQuestion: "Låst spørgsmål – hent guiden for at se det",
} as const;
