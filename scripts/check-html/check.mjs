#!/usr/bin/env node
/**
 * Tjekker de færdigbyggede sider (kør efter `npm run build`):
 *   - ingen id bruges to gange på samme side (WCAG 4.1.1)
 *   - aria-labelledby, aria-describedby, aria-controls, for og href="#…" peger på et id, der findes
 *
 *   node scripts/check-html/check.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), ".next/server/app");
if (!fs.existsSync(ROOT)) {
  console.error("Ingen build fundet – kør `npm run build` først.");
  process.exit(1);
}

const files = fs.readdirSync(ROOT, { recursive: true }).filter((f) => f.endsWith(".html")).map((f) => path.join(ROOT, f));
const problems = [];

for (const file of files) {
  // Scripts (RSC-data, JSON-LD) er ikke en del af DOM'en.
  const html = fs.readFileSync(file, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const page = path.relative(ROOT, file);
  const counts = new Map();
  for (const [, id] of html.matchAll(/\sid="([^"]+)"/g)) counts.set(id, (counts.get(id) ?? 0) + 1);
  for (const [id, n] of counts) if (n > 1) problems.push(`${page}: id="${id}" bruges ${n} gange`);
  for (const [, attr, value] of html.matchAll(/\s(aria-labelledby|aria-describedby|aria-controls|for)="([^"]+)"/g)) {
    for (const ref of value.split(/\s+/)) if (!counts.has(ref)) problems.push(`${page}: ${attr}="${ref}" peger på et id, der ikke findes`);
  }
  for (const [, ref] of html.matchAll(/href="#([^"]+)"/g)) if (!counts.has(ref)) problems.push(`${page}: href="#${ref}" peger på et id, der ikke findes`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`HTML ok: ${files.length} sider uden dublet-id'er eller døde id-referencer.`);
