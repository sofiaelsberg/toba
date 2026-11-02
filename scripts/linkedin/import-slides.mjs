#!/usr/bin/env node
/**
 * Læser slides hentet med grab-slides.js ind på det indlæg, der har samme LinkedIn-id.
 *
 *   node scripts/linkedin/import-slides.mjs ~/Downloads/li-slides-*.json
 *
 * Billeder → public/nyheder/slides/<slug>/01.png …  Tekst → src/content/news/slides/<slug>.json
 * Teksten er LinkedIns aflæsning af slides. Tjek den: spærret skrift ("R I S I K O") bliver samlet,
 * men ordmellemrum i den slags overskrifter skal måske rettes i hånden.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const POSTS = path.join(ROOT, "src/content/news");

/** Bredde og højde fra PNG/JPEG. */
function size(buf) {
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  let i = 2;
  while (i < buf.length) {
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return { width: 0, height: 0 };
}

export function cleanSlideText(t) {
  return t
    .replace(/\s+/g, " ")
    .replace(/\bSwipe\s*→/g, "")
    .replace(/(?:→\s*)?(?<![\d,.])\d+ \/ \d+(?![\d,])/g, "")
    .replace(/(?:^|(?<=\s))((?:\S ){3,}\S)(?=\s|$)/g, (m) => m.replace(/ /g, "")) // spærret skrift
    .replace(/\s{2,}/g, " ")
    .trim();
}

const byId = new Map();
for (const f of fs.readdirSync(POSTS).filter((f) => f.endsWith(".md"))) {
  const id = fs.readFileSync(path.join(POSTS, f), "utf8").match(/^linkedin: "[^"]*activity:(\d+)/m)?.[1];
  if (id) byId.set(id, f.replace(/\.md$/, ""));
}

for (const file of process.argv.slice(2)) {
  const { id, total, slides } = JSON.parse(fs.readFileSync(file, "utf8"));
  const slug = byId.get(id);
  if (!slug) { console.log(`${file}: intet indlæg med linkedin-id ${id} (deling? brug det oprindelige opslags id)`); continue; }
  if (slides.length !== total) console.log(`${slug}: kun ${slides.length} af ${total} slides – hent igen`);
  const dir = path.join(ROOT, "public/nyheder/slides", slug);
  fs.mkdirSync(dir, { recursive: true });
  const out = slides.map((s) => {
    const buf = Buffer.from(s.data, "base64");
    const name = `${String(s.n).padStart(2, "0")}.${s.type.includes("png") ? "png" : "jpg"}`;
    fs.writeFileSync(path.join(dir, name), buf);
    return { src: `/nyheder/slides/${slug}/${name}`, ...size(buf), text: cleanSlideText(s.alt) };
  });
  fs.mkdirSync(path.join(POSTS, "slides"), { recursive: true });
  fs.writeFileSync(path.join(POSTS, "slides", `${slug}.json`), JSON.stringify(out, null, 2) + "\n");
  console.log(`${slug}: ${out.length} slides`);
}
