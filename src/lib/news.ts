import fs from "node:fs";
import path from "node:path";

/**
 * Nyheder/indsigt: én Markdown-fil pr. indlæg i src/content/news/.
 * Filerne oprettes af scripts/linkedin/sync.mjs (fra LinkedIn) og kan redigeres og udbygges frit.
 *
 * Forside (frontmatter) – én værdi pr. linje, skrevet som JSON:
 *   title, description, date (ISO), author, linkedin (URL), linkedinId,
 *   linkedinShare?, lead?, image? (/nyheder/x.jpg), imageAlt?, document? {title, pages?, pdf?}, tags?, draft?
 *
 * Brødtekst: tomme linjer adskiller afsnit. "## " = mellemrubrik. Linjer, der starter med
 * "•", "-", "→" eller "1)"/"1." bliver til lister. **fed** og links (https://…) virker.
 */

export type NewsDocument = { title: string; pages?: number | null; pdf?: string | null };

/** Én side fra et slides-opslag: billedet og teksten på det (til tekstversion, Google og skærmlæsere). */
export type NewsSlide = { src: string; width: number; height: number; text: string };

export type NewsPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  linkedin: string;
  linkedinId: string;
  linkedinShare?: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  imageSize?: { width: number; height: number };
  document?: NewsDocument;
  /** Slides fra src/content/news/slides/<slug>.json (billederne ligger i public/nyheder/slides/<slug>/). */
  slides?: NewsSlide[];
  /** Billede til deling og Google: indlæggets billede eller første slide. */
  cover?: string;
  tags: string[];
  draft?: boolean;
  body: string;
};

const DIR = path.join(process.cwd(), "src/content/news");
const SLIDES_DIR = path.join(DIR, "slides");

function readSlides(slug: string): NewsSlide[] | undefined {
  const file = path.join(SLIDES_DIR, `${slug}.json`);
  return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, "utf8")) as NewsSlide[]) : undefined;
}

/** Bredde og højde fra en JPEG/PNG-fil (til next/image uden layoutskift). */
function imageSize(publicPath: string): { width: number; height: number } | undefined {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", publicPath));
    if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) return undefined;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + len;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function parse(file: string): NewsPost {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`Mangler frontmatter i ${file}`);
  const meta: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(": ");
    if (i > 0) meta[line.slice(0, i)] = JSON.parse(line.slice(i + 2));
  }
  const image = meta.image as string | undefined;
  const slug = file.replace(/\.md$/, "");
  const slides = readSlides(slug);
  return {
    slug,
    title: meta.title as string,
    description: meta.description as string,
    date: meta.date as string,
    author: (meta.author as string) || "TOBA Advice",
    linkedin: meta.linkedin as string,
    linkedinId: meta.linkedinId as string,
    linkedinShare: meta.linkedinShare as string | undefined,
    lead: meta.lead as string | undefined,
    image,
    imageAlt: (meta.imageAlt as string | undefined) ?? "",
    imageSize: image ? imageSize(image) : undefined,
    document: meta.document as NewsDocument | undefined,
    slides,
    cover: image ?? slides?.[0]?.src,
    tags: (meta.tags as string[] | undefined) ?? [],
    draft: Boolean(meta.draft),
    body: match[2].trim(),
  };
}

/**
 * Alle publicerede indlæg, nyeste først. Kladder (draft: true) vises ikke.
 * "use cache": filerne læses ved build, så siderne kan prerenderes (cacheComponents).
 */
export async function getAllPosts(): Promise<NewsPost[]> {
  "use cache";
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<NewsPost | undefined> {
  return (await getAllPosts()).find((p) => p.slug === slug);
}

const dateFormat = new Intl.DateTimeFormat("da-DK", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Copenhagen" });
export const formatNewsDate = (iso: string) => dateFormat.format(new Date(iso));
