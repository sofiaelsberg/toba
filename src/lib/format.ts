/** Danske tal- og procentformater. Al formatering af tal går gennem disse. */

const da = "da-DK";

/** 45000 → "45.000" */
export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString(da, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** 0.45 → "0,45 %" (input er procentpoint, ikke brøk) */
export function formatPercent(value: number, decimals = 2): string {
  return `${formatNumber(value, decimals)} %`;
}

/** 45000 → "45.000 kr." */
export function formatKr(value: number): string {
  return `${formatNumber(Math.round(value))} kr.`;
}

/** Telefonnummer til tel:-link: "+45 28 18 84 27" → "+4528188427" */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

/** Fjerner *fremhævning* og **fed** fra en indholdstekst – til steder uden formatering (JSON-LD, llms.txt). */
export function stripMarkup(text: string): string {
  return text.replace(/\*\*?/g, "");
}

/** Udfylder {navn}-pladsholdere i indholdstekster: fill("Hej {navn}", { navn: "Sofia" }). */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? `{${k}}`);
}
