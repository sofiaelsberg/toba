# tobaadvice.com

Ny hjemmeside for TOBA Advice. Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, shadcn/ui (Radix) og Motion.

Design: Claude Design-filen "TOBA forside" og designsystemet "TOBA Advice – Web". Mapper og komponenter står i tabellen "Sådan er projektet bygget op" nedenfor.

## Kom i gang

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produktionsbuild (fejler, hvis en side læser request-data uden <Suspense>)
npx eslint src
npm run check:html # efter build: dublet-id'er og døde id-referencer i HTML'en
```

Kopiér `.env.example` til `.env.local`. Formularerne er ActiveCampaign-formularer (kontakt #10, guide #8, omkostningsoverblik #9), som redigeres i ActiveCampaign – der skal ingen nøgler til.

## Sådan er projektet bygget op

| Mappe | Indhold |
|---|---|
| `src/content/` | **Al tekst.** Sidetekster i `pages/` (én fil pr. side eller sidegruppe), nyhedsindlæg i `news/` (se `scripts/linkedin/README.md`), typer i `types.ts` og fælles tekster og tal i de øvrige filer (`site.ts`, `facts.ts`, `forms.ts`, `people.ts`, `media.ts`, `ui.ts`, `cake.ts` …). |
| `src/components/ui/` | shadcn-primitiver (button, input, checkbox, switch, accordion, sheet …) i TOBA-stil. |
| `src/components/sections/` | Sektioner, der går igen: `Section`, `SectionHeading`, `Hero`, `CtaCards`, `CtaBand`, `StatsRow`, `PointList`, `PeopleGrid`, `TeamDirectory` … |
| `src/components/blocks/` | Små byggeklodser: `RichText`, `ButtonLink`, `TextLink`, `Media`, `VideoBlock`, `IconBadge`. |
| `src/components/interactive/` | Signatur-elementerne: `LayerCake`, `CostCalculator`, `ShareBar`, `ReturnComparison`, `DepotExample`, `StepTimeline`, tjeklister, `MoneyFlow`, `AnchorNav`, `SegmentTabs`. |
| `src/components/forms/` | `ActiveCampaignForm` indlejrer ActiveCampaigns formularer (`ContactEmbedForm`, `GuideEmbedForm`). |
| `src/components/motion/` | `Reveal`, `CountUp`, `useProgressInView` og bevægelsestokens. |
| `src/app/(site)/` | Sider med fuld header/sidefod. |
| `src/app/(landing)/` | Landingssider med forenklet header/sidefod. |

### Regler

1. **Ingen tekst i komponenter.** Ret tekster i `src/content/`. `*ord*` = fremhævet (kursiv guld), `**ord**` = fed. `{navn}` udfyldes af koden, fx i beregneren.
2. **Tal, der går igen, står ét sted:** `src/content/facts.ts` (rabatbeløb, antal forvaltere, satser til beregneren …).
3. **Farver og typografi** kommer fra tokens i `src/app/globals.css` – brug `text-navy`, `bg-cream`, `text-gold-text`, `text-h2` osv., aldrig hex-koder i komponenterne.
4. **Bevægelse** følger brandbogen: én kurve (`ease-toba`), kører én gang og respekterer "reducer bevægelse". Alt står færdigt uden JavaScript. Tider: hover/fokus ca. 150 ms, ting der åbner 300–500 ms, ting der glider ind 600–900 ms, tal og søjler der tæller op op til 1,6 s.
5. **Fonte** (Playfair Display, Source Sans 3) er selvhostede i `src/fonts/` – ingen kald til Google.
6. **Tilgængelighed** (tilgængelighedsloven): siden skal overholde WCAG 2.1 AA / EN 301 549. Nye komponenter skal kunne bruges med tastatur, have synligt fokus, tekstalternativer og virke ved 320 px bredde og 200 % tekst. Oplysningerne på `/tilgaengelighed` (`accessibilityPage` i `src/content/pages/legal.ts`) skal gennemgås mindst én gang om året og ved større ændringer.

## Launch og drift

| Hvad | Hvor |
|---|---|
| Sitemap og robots | `src/app/sitemap.ts`, `src/app/robots.ts` (preview-deploys på Vercel indekseres ikke) |
| Viderestillinger fra den gamle Webflow-side | `legacyRedirects` i `next.config.ts` |
| Sikkerhedsheadere | `securityHeaders` i `next.config.ts` |
| Ikoner og delingsbilleder | `src/app/icon.svg`, `apple-icon.png`, `opengraph-image.png` (+ egne på kampagnesiderne) |
| Strukturerede data (Google) | `src/lib/structured-data.ts` – virksomhed og website på alle sider (rodlayoutet), desuden team, nyheder, FAQ og videoer |
| Formularer → ActiveCampaign | `src/components/forms/ac-form.tsx` indlejrer formularerne; id'erne står i `src/content/forms.ts`. Felter, liste, tags og tak-besked styres i ActiveCampaign. |
| Fejlsider | `src/app/not-found.tsx` (404), `src/app/error.tsx` (uventet fejl) |
| Hastighed | Vercel Speed Insights i `src/app/layout.tsx` |

### Før launch

- [ ] Sæt miljøvariablerne fra `.env.example` i Vercel (Production) – se `docs/analytics.md`.
- [ ] Aktivér automationen "Hvem spiser din lagkage? (Leadgen)" i ActiveCampaign og tjek, at den starter på listen "Lagkage (leadgen)" (id 6).
- [ ] Lav en automation, der giver besked til en rådgiver, når en kontakt får tagget "Website Formular" eller "omkostningsoverblik".
- [ ] Beslut, hvad der skal ske med de gamle sider `/toba-investments`, `/toba-investment-bonds`, `/toba-investment-equities`, `/dokument/*` (fondsbørsmeddelelser), `/nyheder` og `/blog/*`.
- [ ] Peg domænet (www.tobaadvice.com og tobaadvice.com) på Vercel, og send sitemap til Google Search Console.
- [ ] Compliance: TODO-kommentarerne i `src/content/` (afkastsammenligning, bæredygtighedspolitik, forvalternavne på kortet, "9 lande").
- [ ] Test formularerne på produktion (kontakt, guide, omkostningsoverblik).

## Status

- ✅ Alle sider, komponenter og indhold er færdige: forside, Sådan investerer vi, Uafhængig rådgivning, Om TOBA, Team, Kontakt, `/lagkage`, `/omkostningsoverblik`, politikker, Finanstilsynet, klage, cookies, 404 og fejlside.
- ✅ Videoer, stemningsvideo, fotos, AI-billeder til private markets, portrætter, forvalterkort og LinkedIn-opslag.
- ✅ Lighthouse (mobil, målt 29. okt. 2026): tilgængelighed 97–100, SEO 100, ingen layoutskift. Desktop-performance 98 på forsiden.
- ✅ Nye LinkedIn-opslag kommer automatisk på `/nyheder` hver morgen (se `scripts/linkedin/README.md`).
- ⏭ Det indlejrede opslag på Om TOBA skiftes stadig i hånden i `src/content/media.ts` (`linkedin.latestPost`).
- ⏭ Egne profilsider pr. rådgiver – i dag åbner profilen i et panel på teamsiden (`/team#navn`; `/team/navn` sendes dertil).
