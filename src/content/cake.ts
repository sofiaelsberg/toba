/**
 * Lagkagen – signaturanimationen (forside og /lagkage).
 * Tykkelser er relative (illustration, ikke data). Kilde: guiden "Hvem spiser din lagkage?".
 */
export type CakeStep = { label: string; title: string; text: string };

export type CakeContent = {
  layers: { label: string; legend: string; thickness: number; tobaThickness: number }[];
  core: string;        // midten af kagen i kort-illustrationen
  steps: CakeStep[];   // første trin = "Din formue", sidste evt. "Med TOBA"
  tobaStep: CakeStep;
  footnote: string;
};

export const cake: CakeContent = {
  layers: [
    { label: "Banken", legend: "Banken: depot og handel", thickness: 22, tobaThickness: 12 },
    { label: "Fondene", legend: "Fondene: forvaltning", thickness: 44, tobaThickness: 24 },
    { label: "Rådgiveren", legend: "Rådgiveren: honorar", thickness: 22, tobaThickness: 14 },
    { label: "Skjulte lag", legend: "Skjulte lag: rabatter", thickness: 18, tobaThickness: 0 },
  ],
  core: "Dit nettoafkast",
  steps: [
    { label: "Din formue", title: "Din formue er en lagkage", text: "Hvert år vokser den forhåbentlig, fordi dine investeringer giver afkast. Men kagen består af flere lag – og kun ét af dem er dit." },
    { label: "+ Banken", title: "Banken: depot, handel og valuta", text: "Det lag, de fleste lægger mærke til. Det står på din årlige omkostningsopgørelse." },
    { label: "+ Fondene", title: "Fondene: forvaltning", text: "Produktomkostningerne trækkes direkte i afkastet og står aldrig på en regning. Ofte er det det største lag." },
    { label: "+ Rådgiveren", title: "Rådgiveren: honorar", text: "Prisen for rådgivningen. Den bør være synlig, fast og give dig reel værdi." },
    { label: "+ Skjulte lag", title: "Skjulte lag: rabatter, du ikke får", text: "Rabatter, der ikke ender hos dig, og produkter valgt af andre grunde end dine. De gør kagen mindre uden at stå på nogen regning." },
  ],
  tobaStep: { label: "Med TOBA", title: "Med TOBA bliver mere af kagen din", text: "Vi viser alle lagene, forhandler rabatterne hjem og sender dem videre til dig. Vi tjener kun på vores rådgivning." },
  footnote: "Illustration. Jo mere lagene omkring fylder, jo mindre bliver din andel i midten.",
};
