/**
 * Google Analytics 4 – kun med samtykke til "Statistik" og kun på det rigtige domæne.
 *
 *   NEXT_PUBLIC_GA_ID          Målings-ID (G-…). Uden det indlæses intet.
 *   NEXT_PUBLIC_ANALYTICS_HOSTS  Kommasepareret liste over domæner, der må måles (standard: tobaadvice.com).
 *                              Sæt fx "toba-two.vercel.app" midlertidigt for at teste før domæneskiftet.
 *
 * Hændelser sendes med track(). Uden samtykke (eller uden ID) gør track() ingenting.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";

const HOSTS = (process.env.NEXT_PUBLIC_ANALYTICS_HOSTS || "tobaadvice.com,www.tobaadvice.com")
  .split(",")
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean);

/** Må der måles på denne side? (rigtigt domæne + ID sat). */
export function analyticsAllowed(): boolean {
  if (!GA_ID || typeof window === "undefined") return false;
  return HOSTS.includes(window.location.hostname.toLowerCase());
}

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/**
 * De hændelser, vi måler (ud over sidevisninger, scroll, udgående links og PDF-downloads,
 * som GA4's "forbedret måling" klarer selv). Navnene skal også oprettes som "nøglebegivenheder" i GA.
 */
export type AnalyticsEvent =
  | { name: "generate_lead"; params: { form: "kontakt" | "guide" | "omkostningsoverblik"; topic?: string } }
  | { name: "book_meeting_click"; params: { location: string } }
  | { name: "contact_click"; params: { method: "phone" | "email"; location: string } }
  | { name: "video_start"; params: { video: string; title: string } }
  | { name: "slides_navigate"; params: { post: string; slide: number; total: number } }
  | { name: "slides_text_open"; params: { post: string } };

export function track<E extends AnalyticsEvent>(name: E["name"], params: E["params"]): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", name, params);
  window.gtag?.("event", name, params);
}
