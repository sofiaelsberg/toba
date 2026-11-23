/**
 * Bevægelsestider fra brandbogen. Brug dem, hvor de passer; andre tider skal ligge i brandbogens spænd:
 * hover/fokus ca. 150 ms, ting der åbner 300–500 ms, ting der glider ind 600–900 ms, optælling op til 1,6 s.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.15,   // hover, fokus
  base: 0.3,    // ting der åbner/skifter
  slow: 0.7,    // sektioner der glider ind
  count: 0.9,   // tal der tæller op
  long: 1.4,    // tidslinjer, søjler
} as const;
