/**
 * Typer for alt indhold på sitet.
 * Regel: komponenter tager tekst ind via disse typer – ingen tekst i komponenterne.
 */

/** Tekst hvor *ord* vises fremhævet (kursiv guld) og **ord** vises fed. */
type Rich = string;

export type ButtonVariant = "primary" | "secondary" | "light" | "ghost-light";

export type Action = {
  label: string;
  href: string;
  variant?: ButtonVariant;
};

export type LinkItem = { label: string; href: string; external?: boolean };

export type ImageRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Medie, der endnu ikke findes – vises som navngivet pladsholder. */
export type PlaceholderRef = {
  placeholder: string;
  aspect?: "1/1" | "4/5" | "4/3" | "16/10";
};

/** Indlejret LinkedIn-opslag. `urn` findes i LinkedIns indlejringskode ("urn:li:ugcPost:…" / "urn:li:share:…"). */
export type LinkedInPostRef = {
  urn: string;
  /** Højde fra LinkedIns indlejringskode (afhænger af opslaget). */
  height: number;
};

/** Kort over forvalternes hovedkontorer: antal pr. region, navne vises ved hover/tryk på prikkerne. */
export type ManagerMapContent = {
  label: string;
  regions: { label: string; managers: number }[];
  locations: { label: string; lat: number; lon: number; managers: string[] }[];
  managerSingular: string;
  managerPlural: string;
  /** Overskrift på den udfoldelige liste under kortet (samme oplysninger som prikkerne – til tastatur, skærmlæser og små skærme). */
  listLabel: string;
  caption?: string;
};

/** Lydløs stemningsvideo i loop. */
export type AmbientVideoRef = {
  src: string;
  poster: string;
  aspect: NonNullable<PlaceholderRef["aspect"]>;
};

export type VideoRef = {
  id: string;            // "V03"
  title: string;         // vises på plakaten
  src?: string;          // mp4, når den findes
  poster?: string;
  durationLabel: string; // "0:36"
  caption?: string;      // navn og titel under videoen
  captionsSrc?: string;  // .vtt
};

export type SectionHeadingContent = {
  eyebrow?: string;
  title: Rich;
  lead?: string;
};

export type HeroContent = SectionHeadingContent & {
  actions?: Action[];
  trustline?: string;
};

export type Point = { title: string; text: string };

export type ValueItem = { number: string; title: string; text: string; forYouLabel: string; forYou: string };

export type Stat = {
  /** Tal der tælles op til. Udelad for tekst-"tal" som "Ejet". */
  value?: number;
  decimals?: number;
  /** Vises i stedet for value (fx "2016" der ikke skal tælle). */
  display?: string;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type FactContent = Stat & { source?: string };

/** Illustrationer, som siden tegner i et CTA-kort i stedet for et billede. */
export type CardVisualKey = "cake" | "overview" | "advisers";

export type CtaCardContent = {
  eyebrow?: string;
  title: string;
  text: string;
  linkLabel: string;
  href: string;
  media?: ImageRef | PlaceholderRef;
  visual?: CardVisualKey;
};

export type StepContent = { title: string; text: string };

export type FaqItem = { question: string; answer: string };

export type QuoteContent = { text: string; source: string };

export type IconName =
  | "globe"
  | "no-commission"
  | "fixed-fee"
  | "rebate"
  | "owners"
  | "person"
  | "shelves"
  | "phone-app"
  | "shield"
  | "phone"
  | "pin"
  | "linkedin"
  | "document"
  | "cookie";

export type FeatureContent = { icon: IconName; title: string; text: string };

export type DisclaimerContent = { label: string; text: string };

export type GroupId = "raadgivning" | "analyse" | "administration" | "bestyrelse";

export type Person = {
  slug: string;
  name: string;
  title: string;
  group: GroupId;
  portrait: ImageRef;
  /** Filnavn i /public/team, hvis det ikke er `<slug>.jpg`. Giv et nyt billede et nyt navn, så caches ikke viser det gamle. */
  portraitFile?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  /** Afsnit. Tom liste = bio mangler. */
  bio: string[];
  /** Vises også i en anden gruppe med en anden titel – fx en medarbejder, der også sidder i bestyrelsen. Tælles kun én gang under "Alle". */
  alsoIn?: { group: GroupId; title: string }[];
  /** Vis uden profil (studentermedhjælpere). */
  noProfile?: boolean;
  /** Kort tekst til kort og forside. */
  short?: string;
};

export type Seo = { title: string; description: string; ogDescription?: string };
