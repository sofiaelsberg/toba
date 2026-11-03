#!/usr/bin/env node
/**
 * Henter TOBA Advices LinkedIn-opslag og gemmer dem som artikler i src/content/news/*.md.
 *
 *   node scripts/linkedin/sync.mjs --from-file linkedin-nyheder.json   # fra en eksport (som nu)
 *   node scripts/linkedin/sync.mjs --api                               # fra LinkedIns API (når adgangen er godkendt)
 *
 * Eksisterende artikler overskrives aldrig (de kan være redigeret/udbygget på hjemmesiden).
 * Brug --dry-run for at se, hvad der ville blive oprettet.
 *
 * API: LinkedIn Community Management API (scope r_organization_social).
 *   LINKEDIN_ACCESS_TOKEN  – token for en administrator af virksomhedssiden
 *   LINKEDIN_ORG_ID        – 104613890 (TOBA Advice)
 *   LINKEDIN_VERSION       – fx 202510 (LinkedIn-Version-header, ÅÅÅÅMM)
 *
 * --draft: nye indlæg gemmes med draft: true (bruges af det automatiske job), så de først vises efter gennemgang.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const POSTS_DIR = path.join(ROOT, "src/content/news");
const IMAGES_DIR = path.join(ROOT, "public/nyheder");
const ORG_ID = process.env.LINKEDIN_ORG_ID || "104613890";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const fromFile = args.includes("--from-file") ? args[args.indexOf("--from-file") + 1] : null;
const useApi = args.includes("--api");
const asDraft = args.includes("--draft"); // nye indlæg skjules, til de er gennemgået

// ---------- Tekst ----------

/** Dato ud fra LinkedIns aktivitets-id (de første 41 bit er et tidsstempel i ms). */
export function dateFromActivityId(id) {
  return new Date(Number(BigInt(id) >> 22n)).toISOString();
}

/** Fjerner LinkedIn-støj: "fed" unicode-skrift, "hashtag"-etiketter, hashtags, overflødige linjeskift. */
export function cleanText(raw) {
  let t = raw.normalize("NFKC").replace(/\r/g, "");
  t = t.replace(/^\s*hashtag\s*$/gim, "");
  const tags = [...new Set([...t.matchAll(/#([\p{L}\p{N}_]+)/gu)].map((m) => m[1]))];
  // Hashtag-linjer til sidst fjernes; hashtags midt i teksten bliver til almindelige ord.
  t = t.replace(/(\n\s*(#[\p{L}\p{N}_]+[\s,]*)+)+\s*$/u, "");
  t = t.replace(/#([\p{L}\p{N}_]+)/gu, "$1");
  t = t.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  return { text: t, tags };
}

/** API-format ("little text"): @[Navn](urn:...) og {hashtag|\#|Ord} og \-escapes. */
export function fromLittleText(s = "") {
  return s
    .replace(/@\[([^\]]+)\]\(urn:li:[^)]+\)/g, "$1")
    .replace(/\{hashtag\|\\?#\|([^}]+)\}/g, "#$1")
    .replace(/\\([\\()[\]{}<>@|*_~#-])/g, "$1");
}

const stripEmoji = (s) => s.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s{2,}/g, " ").trim();

export function slugify(s) {
  return stripEmoji(s)
    .toLowerCase()
    .replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa")
    .normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    .slice(0, 70).replace(/-+[^-]*$/, (m) => (m.length > 12 ? "" : m)).replace(/-+$/, "");
}

/** Første linje som titel (uden emojis), resten som brødtekst. */
export function splitTitle(text) {
  const [first, ...rest] = text.split("\n");
  const title = stripEmoji(first).replace(/[.:]+$/, "");
  return { title: title.length > 110 ? title.slice(0, 107).replace(/\s+\S*$/, "") + " …" : title, body: rest.join("\n").trim() };
}

export function excerpt(text, max = 155) {
  const plain = stripEmoji(text.replace(/\n+/g, " ")).replace(/\s+/g, " ").trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, max - 1).replace(/\s+\S*$/, "") + " …";
}

// ---------- Filer ----------

const q = (v) => JSON.stringify(v);

export function toMarkdown(post) {
  const fm = [
    `title: ${q(post.title)}`,
    `description: ${q(post.description)}`,
    `date: ${q(post.date)}`,
    `author: ${q(post.author)}`,
    `linkedin: ${q(post.linkedin)}`,
    `linkedinId: ${q(post.linkedinId)}`,
    post.lead ? `lead: ${q(post.lead)}` : null,
    post.image ? `image: ${q(post.image)}` : null,
    post.imageAlt != null && post.image ? `imageAlt: ${q(post.imageAlt)}` : null,
    post.document ? `document: ${q(post.document)}` : null,
    post.tags?.length ? `tags: ${q(post.tags)}` : null,
    post.draft ? "draft: true" : null,
  ].filter(Boolean);
  return `---\n${fm.join("\n")}\n---\n\n${post.body.trim()}\n`;
}

function existingIds() {
  if (!fs.existsSync(POSTS_DIR)) return new Map();
  const ids = new Map();
  for (const f of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
    const m = fs.readFileSync(path.join(POSTS_DIR, f), "utf8").match(/^linkedinId: "([^"]+)"/m);
    if (m) ids.set(m[1], f);
  }
  return ids;
}

function uniqueSlug(base, date) {
  let slug = base || `opslag-${date.slice(0, 10)}`;
  let n = 2;
  while (fs.existsSync(path.join(POSTS_DIR, `${slug}.md`))) slug = `${base}-${n++}`;
  return slug;
}

/** Fælles: et normaliseret opslag → artikel-fil (+ billede). */
async function writePost(p, seen) {
  if (seen.has(p.id)) return { skipped: p.id, file: seen.get(p.id) };
  const { text, tags } = cleanText(p.text || "");
  if (!text) return { skipped: p.id, reason: "uden tekst" };
  const { title, body } = splitTitle(text);
  const date = p.date || dateFromActivityId(p.id);
  const slug = uniqueSlug(slugify(title), date);
  let image = null;
  if (p.imageData) {
    image = `/nyheder/${slug}.jpg`;
    if (!dryRun) {
      fs.mkdirSync(IMAGES_DIR, { recursive: true });
      fs.writeFileSync(path.join(IMAGES_DIR, `${slug}.jpg`), p.imageData);
    }
  }
  const post = {
    title,
    description: excerpt(body || title),
    date,
    author: p.author || "TOBA Advice",
    linkedin: p.url,
    linkedinId: p.id,
    image,
    imageAlt: p.imageAlt ?? "",
    document: p.document || null,
    tags,
    draft: asDraft,
    body: body || text,
  };
  if (!dryRun) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
    fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), toMarkdown(post));
  }
  return { created: `${slug}.md` };
}

// ---------- Kilder ----------

/** Eksport fra browseren: { posts: [{ id, url, date, text, images: [{ file, alt }] }] } */
async function fromExport(file) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const dir = path.dirname(file);
  return data.posts.map((p) => {
    const img = p.images?.[0];
    const imgPath = img && path.join(dir, img.file);
    return {
      id: p.id,
      url: p.url,
      date: p.date,
      text: p.text,
      imageData: imgPath && fs.existsSync(imgPath) ? fs.readFileSync(imgPath) : null,
      imageAlt: img?.alt || "",
      document: p.document || null,
    };
  });
}

async function api(pathname) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) throw new Error("Mangler LINKEDIN_ACCESS_TOKEN");
  const res = await fetch(`https://api.linkedin.com/rest${pathname}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "LinkedIn-Version": process.env.LINKEDIN_VERSION || "202510",
      "X-Restli-Protocol-Version": "2.0.0",
    },
  });
  if (!res.ok) throw new Error(`LinkedIn ${res.status}: ${await res.text()}`);
  return res.json();
}

/** Community Management API: organisationens offentlige opslag. */
async function fromApi() {
  const author = encodeURIComponent(`urn:li:organization:${ORG_ID}`);
  const { elements = [] } = await api(`/posts?author=${author}&q=author&count=50&sortBy=LAST_MODIFIED`);
  const out = [];
  for (const e of elements) {
    if (e.lifecycleState !== "PUBLISHED" || e.visibility !== "PUBLIC") continue;
    const activity = (e.id || "").split(":").pop();
    let text = fromLittleText(e.commentary || "");
    const author = "TOBA Advice";
    let url = `https://www.linkedin.com/feed/update/${e.id}/`;
    // Deling af en medarbejders opslag: brug det oprindelige opslag som artikel og TOBA's tekst som intro.
    if (e.reshareContext?.parent) {
      try {
        const parent = await api(`/posts/${encodeURIComponent(e.reshareContext.parent)}`);
        text = `${fromLittleText(parent.commentary || "")}`;
        url = `https://www.linkedin.com/feed/update/${parent.id}/`;
        // Navnet på en medarbejder kræver en ekstra tilladelse – ret "author" i filen ved gennemgangen.
      } catch { /* behold TOBA's egen tekst */ }
    }
    let imageData = null;
    let document = null;
    const media = e.content?.media?.id;
    if (media?.startsWith("urn:li:image")) {
      const img = await api(`/images/${encodeURIComponent(media)}`);
      if (img.downloadUrl) imageData = Buffer.from(await (await fetch(img.downloadUrl)).arrayBuffer());
    } else if (media?.startsWith("urn:li:document")) {
      const doc = await api(`/documents/${encodeURIComponent(media)}`);
      document = { title: e.content.media.title || doc.title || "Slides", pages: null, pdf: doc.downloadUrl || null };
    }
    out.push({ id: activity, url, date: new Date(e.publishedAt || e.createdAt).toISOString(), text, author, imageData, imageAlt: e.content?.media?.altText || "", document });
  }
  return out;
}

// ---------- Kør ----------

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  if (!fromFile && !useApi) {
    console.log("Brug: --from-file <eksport.json> eller --api  (evt. --dry-run)");
    process.exit(1);
  }
  const posts = fromFile ? await fromExport(path.resolve(fromFile)) : await fromApi();
  const seen = existingIds();
  for (const p of posts) console.log(JSON.stringify(await writePost(p, seen)));
  if (dryRun) console.log("(dry-run – intet skrevet)");
}
