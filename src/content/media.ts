import type { AmbientVideoRef, ImageRef, LinkedInPostRef, PlaceholderRef, VideoRef } from "./types";

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

/** Stemningsvideo fra kontoret (TOBA/kommunikation/utils/video/stemning), beskåret til 4:5 pr. klip.
 *  Klippene med kundeliste (12,8–15,8 s) og fondsnavne (29,7 s–) er klippet fra. */
export const ambient = {
  office: { src: "/media/stemning/kontoret-loop.mp4", poster: "/media/stemning/kontoret-loop.jpg", aspect: "4/5" },
} satisfies Record<string, AmbientVideoRef>;

/**
 * LinkedIn-opslag på Om TOBA. Indtil LinkedIns API er godkendt, skiftes opslaget her:
 * kopiér "urn:li:…" og højden fra opslagets indlejringskode (… → Indlejr dette opslag).
 */
export const linkedin = {
  latestPost: { urn: "urn:li:ugcPost:7506249940982046720", height: 567 },
} satisfies Record<string, LinkedInPostRef>;

export const images = {
  guideCover: { src: "/media/guide-forside.jpg", alt: "Forsiden af guiden Hvem spiser din lagkage?", width: 720, height: 1018 },
  /** Stemningsbilleder fra kontoret (TOBA/kommunikation/utils/img/stills). */
  meetingTable: { src: "/media/stills/moedebordet.jpg", alt: "Rådgiver underskriver papirer ved mødebordet", width: 864, height: 1080 },
  officeWindow: { src: "/media/stills/kontoret-vinduet.jpg", alt: "Kontoret på Store Torv med udsigt over byen", width: 864, height: 1080 },
  sameSide: { src: "/media/stills/paa-samme-side.jpg", alt: "To rådgivere gennemgår en portefølje side om side ved skærmen", width: 1200, height: 900 },
  clientPortal: { src: "/media/stills/kundeportal.jpg", alt: "Kundeportalen på skærmen med fordeling af porteføljen", width: 1280, height: 800 },
} satisfies Record<string, ImageRef>;

/** Medier der mangler. Teksten vises i pladsholderen. */
export const placeholders = {
  worldMap: { placeholder: "Verdenskort med forvalternes 9 lande – uden fondsnavne", aspect: "16/10" },
  privateCredit: { placeholder: "AI-billede · private credit", aspect: "4/3" },
  infrastructure: { placeholder: "AI-billede · infrastruktur", aspect: "4/3" },
  realAssets: { placeholder: "AI-billede · real assets", aspect: "4/3" },
  privateEquity: { placeholder: "AI-billede · private equity", aspect: "4/3" },
} satisfies Record<string, PlaceholderRef>;

/** Portrætter 4:5 (480×600). */
export function portrait(slug: string, name: string): ImageRef {
  return { src: `/team/${slug}.jpg`, alt: `Portræt af ${name}`, width: 480, height: 600 };
}
