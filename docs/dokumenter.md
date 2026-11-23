PDF'erne i `public/dokumenter/`.

**Politikker**, som /politikker linker til (stier og datoer i `src/content/pages/legal.ts`).
Kilde: `TOBA/kommunikation/hjemmeside-opdatering-og-redesign-202611/politikker/`.

- politik-interessekonflikter.pdf
- politik-loen.pdf
- politik-baeredygtighed.pdf  ← OBS: tilhører Investeringsforeningen TOBA Investments – afklar med compliance før lancering.

Opdatér en politik ved at erstatte filen med samme navn – så ændres linket ikke. Ret datoen i legal.ts.
De tre politikker, der laves af HTML (interessekonflikter, løn, privatlivspolitik), genereres med `scripts/politik-pdf/` – se README'en dér.

**Ikke linket fra siden:**

- privatlivspolitik.pdf – PDF-udgaven af privatlivspolitikken. /politikker linker til siden `/privatlivspolitik`.
- hvem-spiser-din-lagkage.pdf og omkostningsanalyse-eksempel.pdf – faste adresser til mails. De har `noindex` (se `headers()` i `next.config.ts`), så Google ikke finder dem.
