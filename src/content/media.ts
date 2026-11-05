import type { AmbientVideoRef, ImageRef, LinkedInPostRef, VideoRef } from "./types";

/**
 * Kampagnevideoerne (1:1, brændte undertekster). Webversioner (1080×1080, H.264) og
 * plakatbilleder ligger i /public/media/video. Originalerne ligger i TOBA/kommunikation.
 * Se medieplan-hjemmeside.md for valg og placering.
 */
export const videos = {
  v02: { id: "V02", title: "Hvem spiser din lagkage?", durationLabel: "0:38", src: "/media/video/v02-v2.mp4", poster: "/media/video/v02-v2.jpg", caption: "Martin Svendsen, Senior Relationship Manager / Partner, TOBA Advice", uploadDate: "2026-11-02" },
  v03: { id: "V03", title: "Rådgiver eller sælger?", durationLabel: "0:36", src: "/media/video/v03-v2.mp4", poster: "/media/video/v03-v2.jpg", caption: "Martin Svendsen, Senior Relationship Manager / Partner", uploadDate: "2026-11-02" },
  v05: { id: "V05", title: "Hvor havner rabatten?", durationLabel: "0:31", src: "/media/video/v05-v2.mp4", poster: "/media/video/v05-v2.jpg", caption: "Anton Sørensen", uploadDate: "2026-11-05" },
  v06: { id: "V06", title: "Hvor havner rabatten?", durationLabel: "0:28", src: "/media/video/v06-v2.mp4", poster: "/media/video/v06-v2.jpg", caption: "Bent Hymøller, Senior Relationship Manager / Partner, TOBA Advice", uploadDate: "2026-11-02" },
  v07: { id: "V07", title: "Uafhængighed", durationLabel: "0:26", src: "/media/video/v07-v2.mp4", poster: "/media/video/v07-v2.jpg", caption: "Bertel Roslev Rasmussen, CIO, om hvorfor frit valg betyder noget.", uploadDate: "2026-11-02" },
  v09: { id: "V09", title: "Uafhængighed", durationLabel: "0:30", src: "/media/video/v09-v2.mp4", poster: "/media/video/v09-v2.jpg", caption: "Bertel Roslev Rasmussen", uploadDate: "2026-11-02" },
  v10: { id: "V10", title: "Uafhængighed", durationLabel: "0:50", src: "/media/video/v10-v2.mp4", poster: "/media/video/v10-v2.jpg", caption: "Tonny Elsberg, COO / Partner, TOBA Advice", uploadDate: "2026-11-02" },
  v11: { id: "V11", title: "Hvorfor TOBA?", durationLabel: "0:31", src: "/media/video/v11-v2.mp4", poster: "/media/video/v11-v2.jpg", caption: "Tonny Elsberg, COO / Partner, TOBA Advice", uploadDate: "2026-11-02" },
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
  /** Stills fra stemningsvideoen (toba_stemning.mp4, 6,9 s og 26,95 s). */
  whiteboard: { src: "/media/stills/whiteboard.jpg", alt: "Rådgiver tegner en porteføljefordeling med aktier, obligationer og alternativer på whiteboardet", width: 1350, height: 972 },
  conversation: { src: "/media/stills/samtalen-2.jpg", alt: "Samtale ved mødebordet på kontoret", width: 1440, height: 960 },
  sameSide: { src: "/media/stills/paa-samme-side.jpg", alt: "To rådgivere gennemgår en portefølje side om side ved skærmen", width: 1200, height: 900 },
  /** Private markets: AI-genererede billeder, beskåret til 4:3. Markeret som illustration i alt-teksten. */
  privateCredit: { src: "/media/private-markets/private-credit.jpg", alt: "Illustration (AI-genereret): erhvervsbygning i skumring", width: 1024, height: 768 },
  infrastructure: { src: "/media/private-markets/infrastruktur.jpg", alt: "Illustration (AI-genereret): havvindmøller ved solnedgang, set fra kysten", width: 1024, height: 768 },
  realAssets: { src: "/media/private-markets/real-assets.jpg", alt: "Illustration (AI-genereret): skov og landbrugsjord set fra luften", width: 1024, height: 768 },
  privateEquity: { src: "/media/private-markets/private-equity.jpg", alt: "Illustration (AI-genereret): lyst værksted med arbejdsborde og træ", width: 1024, height: 768 },
  clientPortal: { src: "/media/stills/kundeportal.jpg", alt: "Kundeportalen på skærmen med fordeling af porteføljen", width: 1280, height: 800 },
} satisfies Record<string, ImageRef>;


/** Portrætter 4:5 (480×600). */
export function portrait(file: string, name: string): ImageRef {
  return { src: `/team/${file}`, alt: `Portræt af ${name}`, width: 480, height: 600 };
}
