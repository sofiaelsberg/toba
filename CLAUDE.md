@AGENTS.md

# Regler for agenter

Følg "Regler" i README.md (afsnit 1–6). Kort:

1. Ingen tekst i komponenter – ret i `src/content/`.
2. Tal, der går igen, står kun i `src/content/facts.ts`.
3. Farver/typografi via tokens i `src/app/globals.css`, aldrig hex-koder.
4. Bevægelse: `ease-toba`, én gang, respektér "reducer bevægelse". Tider som brandbogen: hover/fokus ca. 150 ms, ting der åbner 300–500 ms, ting der glider ind 600–900 ms, tal og søjler der tæller op op til 1,6 s.
5. Fonte er selvhostede i `src/fonts/` – ingen Google-kald.
6. WCAG 2.1 AA: tastatur, synligt fokus, tekstalternativer, 320 px og 200 % tekst.

Tjek før commit: `npm run build`, `npx eslint src` og `npm run check:html` (dublet-id'er og døde id-referencer i det byggede HTML).

## Git

- Commit-forfatter er altid `sofia.elsberg@live.dk` (aldrig `sofiaelsberg@tobaadvice.com`).
- Commit og push ændringer uden at spørge først.
