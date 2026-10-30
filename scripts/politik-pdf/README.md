# Politikker som tilgængelige PDF'er

Kilderne til `public/dokumenter/politik-interessekonflikter.pdf`, `politik-loen.pdf` og `privatlivspolitik.pdf`.
PDF'erne er tagged (overskrifter, tabeller med kolonne- og rækkeoverskrifter, lister, links, bogmærker),
har sprog (da/en) og titel – så de kan læses med skærmlæser (tilgængelighedsloven / PDF/UA).

## Sådan opdaterer du en politik

1. Ret teksten i HTML-filen (fx `politik-loen.html`). Brug rigtige overskrifter (`h2`, `h3`), lister og tabeller med `th`.
2. Generér PDF'erne (kræver Playwright med Chromium):
   ```bash
   cd scripts/politik-pdf
   node render.mjs
   python3 efterbehandl.py   # sætter titel, sprog og tjekker, at alt indhold er tagget (kræver pikepdf)
   ```
3. Tjek gerne resultatet i PAC (gratis, pdfua.foundation) eller Adobes tilgængelighedstjek.

`fonts/` indeholder faste vægte af Source Sans 3 og Playfair Display (OFL-licens, se `src/fonts/`), lavet ud fra sidens variable fonte. Variable fonte bliver indlejret som Type 3 i PDF'en – det skal undgås.

Undgå CSS-listetal og sidehoveder/-fødder fra Chrome – de bliver ikke tagget. Numre skrives som tekst.
