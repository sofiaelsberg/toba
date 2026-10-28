# tobaadvice.com

Ny hjemmeside for TOBA Advice. Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, shadcn/ui (Radix) og Motion.

Design: Claude Design-filen "TOBA forside" og designsystemet "TOBA Advice – Web". Komponentoversigten står i [`docs/komponentplan.md`](docs/komponentplan.md).

## Kom i gang

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produktionsbuild (fejler, hvis en side læser request-data uden <Suspense>)
npx eslint src
```

Kopiér `.env.example` til `.env.local` og udfyld ActiveCampaign-nøglerne. Uden nøgler virker formularerne lokalt, men intet sendes.

## Sådan er projektet bygget op

| Mappe | Indhold |
|---|---|
| `src/content/` | **Al tekst.** Én fil pr. side i `pages/`, plus fælles filer (`site.ts`, `facts.ts`, `forms.ts`, `people.ts`, `media.ts`, `ui.ts`, `cake.ts`). |
| `src/components/ui/` | shadcn-primitiver (button, input, checkbox, switch, accordion, sheet …) i TOBA-stil. |
| `src/components/sections/` | Sektioner, der går igen: `Section`, `SectionHeading`, `Hero`, `CtaCards`, `CtaBand`, `StatsRow`, `PointList`, `PeopleGrid`, `TeamDirectory` … |
| `src/components/blocks/` | Små byggeklodser: `RichText`, `ButtonLink`, `TextLink`, `Media`, `VideoBlock`, `IconBadge`. |
| `src/components/interactive/` | Signatur-elementerne: `LayerCake`, `CostCalculator`, `ShareBar`, `ReturnComparison`, `DepotExample`, `StepTimeline`, tjeklister, `MoneyFlow`, `VolcanoStory`, `AnchorNav`, `SegmentTabs`. |
| `src/components/forms/` | Én formularmotor (`LeadForm`) + `ContactForm`, `GuideForm`, `OverviewForm`. |
| `src/components/motion/` | `Reveal`, `CountUp`, `useProgressInView` og bevægelsestokens. |
| `src/app/(site)/` | Sider med fuld header/sidefod. |
| `src/app/(landing)/` | Landingssider med forenklet header/sidefod. |
| `src/app/actions/` | Server action, der sender formularer til ActiveCampaign. |

### Regler

1. **Ingen tekst i komponenter.** Ret tekster i `src/content/`. `*ord*` = fremhævet (kursiv guld), `**ord**` = fed. `{navn}` udfyldes af koden, fx i beregneren.
2. **Tal, der går igen, står ét sted:** `src/content/facts.ts` (rabatbeløb, antal forvaltere, satser til beregneren …).
3. **Farver og typografi** kommer fra tokens i `src/app/globals.css` – brug `text-navy`, `bg-cream`, `text-gold-text`, `text-h2` osv., aldrig hex-koder i komponenterne.
4. **Bevægelse** følger brandbogen: én kurve (`ease-toba`), 150/300/700 ms, kører én gang og respekterer "reducer bevægelse". Alt står færdigt uden JavaScript.
5. **Fonte** (Playfair Display, Source Sans 3) er selvhostede i `src/fonts/` – ingen kald til Google.

## Status

- ✅ Designtokens, layout (header, sidefod, cookiebanner), alle komponenter og alle indholdsfiler.
- ✅ Alle sider er sat sammen: forside, Sådan investerer vi, Uafhængig rådgivning, Om TOBA, Team, Kontakt, de to kampagnesider (`/lagkage`, `/omkostningsoverblik`), politikker, Finanstilsynet, klage, cookies og 404.
- ✅ Politik-PDF'er ligger i `public/dokumenter/` (bæredygtighedspolitikken afventer compliance).
- ⏭ Rigtige videoer og fotos (`src/content/media.ts`), LinkedIn-URL (`company.linkedin` i `src/content/site.ts`), redirects fra den gamle side i `next.config.ts`, sitemap, favicon og ActiveCampaign-nøgler og -felter (`.env.example`).
- ⏭ Egne profilsider pr. rådgiver (`/team/[slug]`) – i dag åbner profilen i et panel på teamsiden.
