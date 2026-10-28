import type { ImageRef, PlaceholderRef, VideoRef } from "./types";

/**
 * Kampagnevideoerne (1:1, brændte undertekster). Webversioner (1080×1080, H.264) og
 * plakatbilleder ligger i /public/media/video. Originalerne ligger i TOBA/kommunikation.
 * Se medieplan-hjemmeside.md for valg og placering.
 */
export const videos = {
  v02: { id: "V02", title: "Hvem spiser din lagkage?", durationLabel: "0:38", src: "/media/video/v02.mp4", poster: "/media/video/v02.jpg", caption: "Martin Svendsen, Senior Relationship Manager / Partner, TOBA Advice" },
  v03: { id: "V03", title: "Rådgiver eller sælger?", durationLabel: "0:36", src: "/media/video/v03.mp4", poster: "/media/video/v03.jpg", caption: "Martin Svendsen, Senior Relationship Manager / Partner" },
  v05: { id: "V05", title: "Hvor havner rabatten?", durationLabel: "0:31", src: "/media/video/v05.mp4", poster: "/media/video/v05.jpg", caption: "Anton Sørensen" },
  v06: { id: "V06", title: "Hvor havner rabatten?", durationLabel: "0:28", src: "/media/video/v06.mp4", poster: "/media/video/v06.jpg", caption: "Bent Hymøller, Senior Relationship Manager / Partner, TOBA Advice" },
  v07: { id: "V07", title: "Uafhængighed", durationLabel: "0:26", src: "/media/video/v07.mp4", poster: "/media/video/v07.jpg", caption: "Bertel Roslev Rasmussen, CIO, om hvorfor frit valg betyder noget." },
  v09: { id: "V09", title: "Uafhængighed", durationLabel: "0:30", src: "/media/video/v09.mp4", poster: "/media/video/v09.jpg", caption: "Bertel Roslev Rasmussen" },
  v10: { id: "V10", title: "Uafhængighed", durationLabel: "0:50", src: "/media/video/v10.mp4", poster: "/media/video/v10.jpg", caption: "Tonny Elsberg, COO / Partner, TOBA Advice" },
  v11: { id: "V11", title: "Hvorfor TOBA?", durationLabel: "0:31", src: "/media/video/v11.mp4", poster: "/media/video/v11.jpg", caption: "Tonny Elsberg, COO / Partner, TOBA Advice" },
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
