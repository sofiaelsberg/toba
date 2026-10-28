import type { ImageRef, PlaceholderRef, VideoRef } from "./types";

/**
 * Kampagnevideoerne (1:1, brændte undertekster). `src`/`poster` udfyldes, når filerne
 * ligger i /public/media/video. Indtil da vises en navngivet pladsholder.
 * Se medieplan-hjemmeside.md for valg og placering.
 */
export const videos = {
  v02: { id: "V02", title: "Hvem spiser din lagkage?", durationLabel: "", caption: "Martin Svendsen, Senior Relationship Manager / Partner, TOBA Advice" },
  v03: { id: "V03", title: "Rådgiver eller sælger?", durationLabel: "0:36", caption: "Martin Svendsen, Senior Relationship Manager / Partner" },
  v05: { id: "V05", title: "Hvor havner rabatten?", durationLabel: "0:31", caption: "Anton Sørensen" },
  v06: { id: "V06", title: "Hvor havner rabatten?", durationLabel: "", caption: "Bent Hymøller, Senior Relationship Manager / Partner, TOBA Advice" },
  v07: { id: "V07", title: "Uafhængighed", durationLabel: "0:26", caption: "Bertel Roslev Rasmussen, CIO, om hvorfor frit valg betyder noget." },
  v09: { id: "V09", title: "Uafhængighed", durationLabel: "0:30", caption: "Bertel Roslev Rasmussen" },
  v10: { id: "V10", title: "Uafhængighed", durationLabel: "0:50", caption: "Tonny Elsberg, COO / Partner, TOBA Advice" },
  v11: { id: "V11", title: "Hvorfor TOBA?", durationLabel: "", caption: "Tonny Elsberg, COO / Partner, TOBA Advice" },
} satisfies Record<string, VideoRef>;

export const images = {
  guideCover: { src: "/media/guide-forside.jpg", alt: "Forsiden af guiden Hvem spiser din lagkage?", width: 720, height: 1018 },
  /** Stillbillede fra V10 (26,2 s), beskåret over underteksterne. */
  v10Still: { src: "/media/stills/tonny-uafhaengighed.jpg", alt: "Tonny Elsberg, COO og partner i TOBA Advice, på kontoret", width: 1280, height: 800 },
} satisfies Record<string, ImageRef>;

/** Medier der mangler. Teksten vises i pladsholderen. */
export const placeholders = {
  heroLoop: { placeholder: "Lydløs loop · rådgivere ved skrivebordet på Store Torv (b-roll fra V09 og V05)", aspect: "4/5" },
  overviewExcerpt: { placeholder: "Udsnit af omkostningsoverblikket", aspect: "16/10" },
  clientEvent: { placeholder: "Foto: kundearrangement med oplæg", aspect: "4/3" },
  meetingTable: { placeholder: "Foto: rådgiver og kunde ved mødebordet på Store Torv", aspect: "4/5" },
  teamOffice: { placeholder: "Foto: holdet på kontoret på Store Torv", aspect: "4/5" },
  worldMap: { placeholder: "Verdenskort med forvalternes 9 lande – uden fondsnavne", aspect: "16/10" },
  clientPortal: { placeholder: "Skærmbilleder fra kundeportalen og appen", aspect: "16/10" },
  linkedinPost: { placeholder: "Indlejret LinkedIn-opslag fra Tonny – vælges senere", aspect: "4/3" },
  privateCredit: { placeholder: "AI-billede · private credit", aspect: "4/3" },
  infrastructure: { placeholder: "AI-billede · infrastruktur", aspect: "4/3" },
  realAssets: { placeholder: "AI-billede · real assets", aspect: "4/3" },
  privateEquity: { placeholder: "AI-billede · private equity", aspect: "4/3" },
} satisfies Record<string, PlaceholderRef>;

/** Portrætter 4:5 (480×600). */
export function portrait(slug: string, name: string): ImageRef {
  return { src: `/team/${slug}.jpg`, alt: `Portræt af ${name}`, width: 480, height: 600 };
}
