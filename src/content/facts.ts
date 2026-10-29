/**
 * Tal og satser, der går igen på flere sider.
 * Ret her – så opdateres forside, landingssider, Om TOBA m.fl. på én gang.
 */
export const facts = {
  /** Forvalterrabatter udbetalt til kunderne (vises som "udbetalt i 2026"). Opdatér, når næste rabat udbetales i foråret 2027. */
  rebatesPaid: { amountMio: 2.8, paidYear: 2026 },
  assetsUnderAdviceMia: 3,
  founded: 2016,
  employeesPlus: 10,
  managers: 19,
  countries: 9,
  yearsSelectingManagers: 20,
  minimumWealthMio: 5,

  /** Finanstilsynet, "Bankernes salg af egne fonde", maj 2026: andel af detailinvestorernes fondsbeholdninger i egne fonde hos de fem største banker. */
  ownFundsTop5Pct: 92,

  /** Regneeksempel fra guiden: 10 mio. over 20 år, 6,0 % mod 5,5 %. */
  cakeExample: { pointDifference: 0.5, extraMio: 2.9, wealthMio: 10, years: 20 },

  /** Afkasteksempel på Sådan investerer vi (Rådet for Afkastforventninger). */
  returnExample: { wealthMio: 10, years: 20, traditional: 4.8, diversified: 6.22, volatility: 8.48 },
} as const;

/**
 * Satser til omkostningsberegneren.
 * Foreløbige (besluttet 19. okt. 2026) – mangler bekræftelse fra TOBA og compliance.
 */
export const calculatorConfig = {
  feePct: 0.45,
  rebatePct: 0.37,
  minMio: 5,
  maxMio: 100,
  startMio: 10,
  stepMio: 1,
  compareYears: 10,
} as const;
