import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import fs from "node:fs";
import path from "node:path";


const docs = [
  { file: "politik-interessekonflikter", label: "Forretningsgang", footer: "TOBA Advice A/S · Store Torv 3C, 2. sal · 8000 Aarhus C · CVR 37424277", page: "Side" },
  { file: "politik-loen", label: "Politik", footer: "TOBA Advice A/S · Store Torv 3C, 2. sal · 8000 Aarhus C · CVR 37424277", page: "Side" },
  { file: "privatlivspolitik", label: "Policy", footer: "Toba Advice A/S · Store Torv 3C, 2. · 8000 Aarhus C · Company reg. no. 37424277", page: "Page" },
];
const browser = await chromium.launch();
const page = await browser.newPage();
for (const d of docs) {
  await page.goto("file://" + path.resolve(d.file + ".html"));
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: `../../public/dokumenter/${d.file}.pdf`,
    format: "A4",
    printBackground: true,
    tagged: true,
    outline: true,
    margin: { top: "20mm", bottom: "20mm", left: "22mm", right: "22mm" },
  });
  console.log("ok", d.file);
}
await browser.close();
