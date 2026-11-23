#!/usr/bin/env node
/**
 * Henter TOBA Advices LinkedIn-opslag og gemmer dem som artikler i src/content/news/*.md.
 *
 *   node scripts/linkedin/sync.mjs --from-file linkedin-nyheder.json   # fra en eksport (som nu)
 *   node scripts/linkedin/sync.mjs --api                               # fra LinkedIns API (når adgangen er godkendt)
 *
 * Eksisterende artikler overskrives aldrig (de kan være redigeret/udbygget på hjemmesiden).
 * Opslag i afviste.json hentes aldrig.
 * Brug --dry-run for at se, hvad der ville blive oprettet.
 *
 * API: LinkedIn Community Management API (scope r_organization_social).
 *   LINKEDIN_ACCESS_TOKEN  – token for en administrator af virksomhedssiden (gyldigt 60 dage), eller:
 *   LINKEDIN_REFRESH_TOKEN + LINKEDIN_CLIENT_ID + LINKEDIN_CLIENT_SECRET – så hentes et frisk token ved hver kørsel
 *   LINKEDIN_ORG_ID        – 104613890 (TOBA Advice)
 *   LINKEDIN_VERSION       – valgfri, fx 202611 (ÅÅÅÅMM). Ellers findes den nyeste aktive version automatisk.
 *
 * --draft: nye indlæg gemmes med draft: true, så de først vises efter gennemgang. Det automatiske job bruger det IKKE –
 *          alt, der er udgivet på TOBA's LinkedIn, skal direkte på siden.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const POSTS_DIR = path.join(ROOT, "src/content/news");
const IMAGES_DIR = path.join(ROOT, "public/nyheder");
const ORG_ID = process.env.LINKEDIN_ORG_ID || "104613890";
/** Opslag, der er afvist til hjemmesiden (se afviste.json). */
const REJECTED_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "afviste.json");
/** Faste adresser, originalbilleder og slides for bestemte opslag (se adresser.json). */
const ADDRESS_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "adresser.json");
const addresses = fs.existsSync(ADDRESS_FILE) ? JSON.parse(fs.readFileSync(ADDRESS_FILE, "utf8")).opslag : {};

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

/**
 * Kendte opslag (på siden eller afvist). LinkedIn giver samme opslag flere id'er: eksporten bruger
 * urn:li:activity, API'et urn:li:share/ugcPost, og planlagte opslag får et nyt id ved udgivelse.
 * Derfor genkendes et opslag på id, på id'ets tidsstempel (±10 s) eller på udgivelsestidspunktet (±60 s).
 */
const urnIds = (txt) => [...String(txt || "").matchAll(/urn:li:\w+:(\d+)/g)].map((m) => m[1]);
const idTime = (id) => { try { return Number(BigInt(id) >> 22n); } catch { return NaN; } };

function knownIndex(entries) {
  return {
    entries,
    match(p) {
      const ids = [p.id, ...urnIds(p.url)].filter(Boolean).map(String);
      const date = p.date ? Date.parse(p.date) : NaN;
      for (const e of entries) {
        if (ids.some((id) => e.ids.includes(id))) return e;
        if (ids.some((id) => e.ids.some((k) => Math.abs(idTime(id) - idTime(k)) < 10_000))) return e;
        if (!Number.isNaN(date) && e.dates.some((d) => Math.abs(date - d) < 60_000)) return e;
      }
      return null;
    },
  };
}

export function existingPosts() {
  if (!fs.existsSync(POSTS_DIR)) return knownIndex([]);
  const entries = [];
  for (const f of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
    const txt = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
    const fm = txt.split(/^---$/m)[1] || "";
    const ids = [...fm.matchAll(/^linkedinId: "([^"]+)"/gm)].map((m) => m[1]).concat(urnIds(fm));
    const dates = [...fm.matchAll(/^date: "([^"]+)"/gm)].map((m) => Date.parse(m[1])).filter((d) => !Number.isNaN(d));
    entries.push({ file: f, ids, dates });
  }
  return knownIndex(entries);
}

export function rejectedPosts() {
  if (!fs.existsSync(REJECTED_FILE)) return knownIndex([]);
  const list = JSON.parse(fs.readFileSync(REJECTED_FILE, "utf8")).opslag;
  return knownIndex(
    list.map((o) => ({
      file: o.titel,
      ids: [o.id, ...(o.andreIds || [])].map(String),
      dates: o.dato ? [Date.parse(o.dato)] : [],
    })),
  );
}

function uniqueSlug(base, date) {
  let slug = base || `opslag-${date.slice(0, 10)}`;
  let n = 2;
  while (fs.existsSync(path.join(POSTS_DIR, `${slug}.md`))) slug = `${base}-${n++}`;
  return slug;
}

/** Fælles: et normaliseret opslag → artikel-fil (+ billede). */
export async function writePost(p, seen, rejected) {
  const rej = rejected.match(p);
  if (rej) return { skipped: p.id, reason: "afvist (afviste.json)", title: rej.file };
  const known = seen.match(p);
  if (known) return { skipped: p.id, file: known.file };
  const { text, tags } = cleanText(p.text || "");
  if (!text) return { skipped: p.id, reason: "uden tekst" };
  const { title, body } = splitTitle(text);
  const date = p.date || dateFromActivityId(p.id);
  const fixed = [p.id, ...urnIds(p.url)].map((id) => addresses[id]).find(Boolean) || null;
  const slug = fixed && !fs.existsSync(path.join(POSTS_DIR, `${fixed.adresse}.md`)) ? fixed.adresse : uniqueSlug(slugify(title), date);
  let image = fixed?.billede || null;
  if (!image && p.imageData) {
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
    imageAlt: fixed?.billedtekst ?? p.imageAlt ?? "",
    document: fixed?.dokument || p.document || null,
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

let cachedToken = null;

/**
 * Access token: hentes frisk ud fra LINKEDIN_REFRESH_TOKEN + LINKEDIN_CLIENT_ID + LINKEDIN_CLIENT_SECRET
 * (refresh-tokenet holder ét år). Uden dem bruges LINKEDIN_ACCESS_TOKEN (gyldigt 60 dage).
 */
async function getToken() {
  if (cachedToken) return cachedToken;
  const { LINKEDIN_REFRESH_TOKEN: refresh, LINKEDIN_CLIENT_ID: id, LINKEDIN_CLIENT_SECRET: secret } = process.env;
  if (!refresh || !id || !secret) {
    if (process.env.LINKEDIN_ACCESS_TOKEN) return (cachedToken = process.env.LINKEDIN_ACCESS_TOKEN);
    throw new Error("Mangler LINKEDIN_ACCESS_TOKEN eller LINKEDIN_REFRESH_TOKEN + LINKEDIN_CLIENT_ID + LINKEDIN_CLIENT_SECRET");
  }
  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh, client_id: id, client_secret: secret }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`Kunne ikke forny LinkedIn-token (${res.status}): ${data.error_description || data.error || "ukendt fejl"}`);
  }
  if (data.refresh_token_expires_in) {
    const days = Math.round(data.refresh_token_expires_in / 86400);
    console.log(`LinkedIn: refresh-tokenet udløber om ${days} dage.`);
    if (days < 30) console.log("::warning::LinkedIn refresh-token udløber snart – lav et nyt login (se scripts/linkedin/README.md).");
  }
  return (cachedToken = data.access_token);
}

/** LinkedIn-Version (ÅÅÅÅMM). Starter ved indeværende måned og går tilbage, til LinkedIn accepterer den. */
let apiVersion = process.env.LINKEDIN_VERSION || null;

function previousMonth(v) {
  let y = Number(v.slice(0, 4)), m = Number(v.slice(4, 6)) - 1;
  if (m === 0) { y -= 1; m = 12; }
  return `${y}${String(m).padStart(2, "0")}`;
}

async function api(pathname) {
  const token = await getToken();
  if (!apiVersion) {
    const now = new Date();
    apiVersion = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  }
  for (let tries = 0; tries < 15; tries++) {
    const res = await fetch(`https://api.linkedin.com/rest${pathname}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "LinkedIn-Version": apiVersion,
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });
    if (res.status === 426) {
      // Versionen findes ikke (endnu) eller er udfaset – prøv måneden før.
      apiVersion = previousMonth(apiVersion);
      continue;
    }
    if (!res.ok) throw new Error(`LinkedIn ${res.status} (version ${apiVersion}): ${await res.text()}`);
    return res.json();
  }
  throw new Error("LinkedIn: fandt ingen aktiv API-version");
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
  const seen = existingPosts();
  const rejected = rejectedPosts();
  for (const p of posts) console.log(JSON.stringify(await writePost(p, seen, rejected)));
  if (dryRun) console.log("(dry-run – intet skrevet)");
}
