/** Bevægelsesregler fra brandbogen. Brug altid disse – ikke egne værdier. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.15,   // hover, fokus
  base: 0.3,    // ting der åbner/skifter
  slow: 0.7,    // sektioner der glider ind
  count: 0.9,   // tal der tæller op
  long: 1.4,    // tidslinjer, søjler
} as const;
