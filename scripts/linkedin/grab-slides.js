/**
 * Henter slides fra ét LinkedIn-dokumentopslag (karrusel). Kør i browserkonsollen på opslagets side
 * (https://www.linkedin.com/feed/update/urn:li:activity:<id>/), mens du er logget ind.
 * Bladrer igennem alle sider og gemmer li-slides-<id>.json i Overførsler. Læs den ind med import-slides.mjs.
 */
(async () => {
  const id = location.pathname.match(/activity:(\d+)/)?.[1] ?? "ukendt";
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const labels = [...document.querySelectorAll("button")].map((b) => b.getAttribute("aria-label") || b.textContent || "");
  const total = Math.max(0, ...labels.map((t) => +(t.match(/(?:Side|Page) \d+ (?:af|of) (\d+)/)?.[1] ?? 0)));
  const pages = new Map();
  const collect = () => {
    for (const i of document.querySelectorAll("img")) {
      const m = (i.currentSrc || i.src).match(/feedshare-document-images_\d+\/[^/]+\/(\d+)\//);
      if (m && i.complete && i.naturalWidth && !pages.has(+m[1])) pages.set(+m[1], i);
    }
  };
  const next = () => [...document.querySelectorAll("button")].find((b) => /^(Gå til næste side|Next page)$/.test(b.getAttribute("aria-label") || ""));
  collect();
  for (let k = 0; k < total + 3 && pages.size < total; k++) {
    next()?.click();
    await sleep(1000);
    collect();
  }
  const slides = [];
  for (const [n, img] of [...pages].sort((a, b) => a[0] - b[0])) {
    const blob = await (await fetch(img.currentSrc || img.src)).blob();
    const data = await new Promise((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result.split(",")[1]); fr.readAsDataURL(blob); });
    slides.push({ n, type: blob.type, alt: img.alt || "", data });
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify({ id, total, slides })], { type: "application/json" }));
  a.download = `li-slides-${id}.json`;
  a.click();
  console.log(`${slides.length}/${total} slides gemt`);
})();
