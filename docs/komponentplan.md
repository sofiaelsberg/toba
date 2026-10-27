# Komponentplan – tobaadvice.com

Bygget ud fra de 11 tegneflader i Claude Design ("TOBA forside") og designsystemet "TOBA Advice – Web".
Stack: Next.js 16 (App Router, `cacheComponents`), React 19, TypeScript, Tailwind v4, shadcn/ui (Radix), Motion.

## Grundregel: ingen tekst i komponenterne

- **Al synlig tekst** (overskrifter, brødtekst, knapper, labels, fejlbeskeder, aria-labels, alt-tekster) ligger i `src/content/`.
- **Komponenter** tager tekst ind som props. De indeholder kun layout, stil og adfærd.
- **Tal, der går igen** (2,8 mio. kr., 19 forvaltere, 9 lande, 3 mia. kr., 2016, satser i beregneren) ligger ét sted, i `src/content/facts.ts`, og bruges overalt derfra. Så skal rabatbeløbet kun rettes ét sted, når 2026-tallet kommer.
- **Fremhævede ord** skrives med `*stjerner*` i teksten ("som den *bør* være") og vises af `<RichText>` som kursiv guld. Ingen HTML i indholdsfilerne.
- **Sider** (`src/app/**/page.tsx`) sætter blot sektioner sammen med indhold fra én indholdsfil.

## Mappestruktur

```
src/
  app/
    layout.tsx                 rodlayout: fonte, <html lang="da">, CookieBanner
    not-found.tsx              404
    (site)/layout.tsx          Header + Footer
    (site)/page.tsx            forside
    (site)/sadan-investerer-vi/page.tsx
    (site)/uafhaengig-investeringsraadgivning/page.tsx
    (site)/om-toba-advice/page.tsx
    (site)/team/page.tsx       (+ team/[slug]/page.tsx)
    (site)/kontakt/page.tsx
    (site)/politikker | finanstilsynet | klage | cookies /page.tsx
    (landing)/layout.tsx       LandingHeader + LandingFooter
    (landing)/lagkage/page.tsx
    (landing)/omkostningsoverblik/page.tsx
    actions/                   server actions til formularer (ActiveCampaign)
  components/
    ui/                        shadcn-primitiver (button, input, textarea, label, checkbox, select, switch, accordion, sheet)
    layout/                    Header, MobileMenu, Footer, LandingHeader, LandingFooter, CookieBanner
    sections/                  sektioner, der går igen på tværs af sider
    blocks/                    mindre byggeklodser inde i sektioner
    interactive/               de interaktive "signatur"-elementer
    forms/                     formularer og felter
    motion/                    Reveal, CountUp, DrawRule, useInViewOnce
  content/
    types.ts                   typer for alt indhold
    site.ts                    navigation, sidefod, kontaktinfo, firmaoplysninger, vigtig information
    facts.ts                   tal og satser, der går igen
    ui.ts                      mikrotekster: "Næste lag", "Luk profil", "Læs mere om …"
    forms.ts                   feltlabels, fejlbeskeder, samtykketekster, takbeskeder
    media.ts                   videoer (V01–V11), billeder, portrætter
    people.ts                  alle medarbejdere (bio, titel, kontakt, gruppe)
    pages/*.ts                 én fil pr. side
  lib/
    utils.ts                   cn()
    format.ts                  danske tal- og procentformater
```

## Det, der går igen (fundet i tegnefladerne)

### Layout (alle sider)

| Komponent | Bruges på | Noter |
|---|---|---|
| `Header` | alle (site) | Sticky, logo, 6 menupunkter, "Book et møde". Aktivt punkt med guldstreg. |
| `MobileMenu` | alle (site) | Under 1020 px. shadcn `Sheet`. |
| `Footer` | alle (site) | Logo, beskrivelse, knap, 3 linkkolonner, firmalinje. "Cookieindstillinger" åbner banneret. |
| `LandingHeader` / `LandingFooter` | lagkage, omkostningsoverblik | Forenklet: logo, telefon, én CTA. |
| `Disclaimer` | alle | "Vigtig information" – tekst pr. side (landingssider har længere version). |
| `CookieBanner` | alle | "Kun nødvendige" og "Accepter alle" lige synlige, "Tilpas" med `Switch`. Gemmer valg i cookie. |

### Sektioner (`components/sections`)

| Komponent | Hvor | Varianter / props |
|---|---|---|
| `Section` | overalt | `surface: cream \| white \| navy`, `id`, `reveal` |
| `SectionHeading` | overalt | `eyebrow?`, `title` (RichText), `lead?`, `rule?`, `as: h1\|h2` |
| `Hero` | alle sider | `variant: split-media \| split-card \| text \| navy`, eyebrow, titel, lead, actions[], trustline?, media |
| `SplitSection` | 15+ steder | To kolonner: tekst + medie/kort, `reverse`, `align` |
| `CtaCards` | forside, uafhængig | 2–3 kort med guldstreg, billede, titel, tekst, link |
| `CtaBand` | forside, om, team, sådan investerer vi | Navy afslutning: titel, lead, primær + sekundær knap |
| `CtaStrip` | sådan investerer vi, omkostningsoverblik | Lille boks "Hvad koster det?" / "Vil du først blive klogere?" |
| `ValueGrid` | forside | 01–04 værdier med "For dig:" |
| `FeatureList` | om, uafhængig, LP1 | Ikon + titel + tekst, 3 eller 6 punkter, staggered reveal |
| `PointList` | 8+ steder | Fed førstesætning + tekst, adskilt af hårstreger |
| `StepTimeline` | sådan investerer vi, LP2 | 4 trin; guldlinje tegner sig, prikker tændes |
| `NumberedSteps` | kom i gang, klage | Store tal 1–4 / 01–03 |
| `AccordionList` | forvaltere, FAQ, TA-fondene | shadcn `Accordion` |
| `StatsRow` | forside, om, LP1, forvaltere | 3–4 tal, tæller op én gang |
| `FactBox` | 6+ steder | Stort tal + forklaring (+ kilde), navy eller lys |
| `QuoteBlock` | sådan investerer vi | Citat med guldkant og kilde |
| `PeopleGrid` | forside, om, kontakt | Rådgiverkort med kontakt ved hover |
| `TeamDirectory` | team | Filtre + grid + `ProfileSheet` |
| `DocumentList` | politikker | Ikon, titel, tekst, dato, "Hent PDF" |
| `KeyValueTable` | finanstilsynet | Registreringsoplysninger |
| `AddressCard` | klage, kontakt | Adresseblok |
| `MediaPlaceholder` | overalt indtil filer kommer | Navngivet pladsholder (fx "V03 · Rådgiver eller sælger?") |

### Byggeklodser (`components/blocks`)

`RichText`, `Eyebrow`, `GoldRule`, `ButtonLink` (shadcn `Button` med varianter `primary | secondary | light | ghost-light`), `TextLink` (guld understregning + pil), `IconBadge`, `VideoBlock` (1:1, plakat, "▶ Se video · 0:36", billedtekst), `Portrait` (4:5), `Pill`/`ToggleGroup`.

### Interaktive elementer (`components/interactive`)

| Komponent | Hvor | Adfærd |
|---|---|---|
| `LayerCake` | forside, LP1 | Lagkagen: trin-knapper + auto-afspilning én gang i view. Lag og tekster fra indhold. `endsWithToba` til/fra. |
| `CostCalculator` | forside | Skyder 5–100 mio., valgfri nuværende pris, søjler. Satser fra `facts.ts`. |
| `ShareBar` | forside, uafhængig | 95 % tæller op mens søjlen fyldes (71/24/5). |
| `ReturnComparison` | sådan investerer vi | To søjler 10 → 25,5 / 33,4 mio., forskel tæller op. |
| `DepotExample` | LP2 | Tre depoter + samlet panel 1,36 % / 246.122 kr. |
| `MoneyFlowCard` | uafhængig | "Følg pengene" – pile, der tegner sig. |
| `ChecklistReveal` | uafhængig (lovens krav) | Flueben krydses af ét ad gangen. |
| `LockedChecklist` | LP1 | 3 synlige + 4 låste spørgsmål, låses op efter tilmelding. |
| `SelfCheck` | LP2 | "Overblikket er for dig, hvis …" med afkrydsning. |
| `VolcanoStory` | om | Vulkanen tegner sig i 3 trin. |
| `SegmentTabs` | sådan investerer vi | "Hele formuen / En del af den". |
| `AnchorNav` | sådan investerer vi | Undermenu med scrollspy. |

### Formularer (`components/forms`)

Én fælles `LeadForm`-motor (react-hook-form + zod + server action) med tre konfigurationer:

| Formular | Felter | Sendes til |
|---|---|---|
| `ContactForm` | emne (forvalgt via `?emne=moede`), navn, e-mail, telefon, virksomhed, besked, samtykke, nyhedsbrev | ActiveCampaign "Kontakt" |
| `GuideForm` | fornavn, e-mail, telefon (valgfri), samtykke | ActiveCampaign "Guide" |
| `OverviewForm` | fornavn, efternavn, e-mail, telefon, hvor er formuen, særlige ønsker, samtykke | ActiveCampaign #5 |

Fælles: `Field` (label, fejl under feltet, `aria-invalid`), `ConsentCheckbox`, `FormSuccess` (guldflueben der tegner sig). Første felt med fejl får fokus.

### Motion (`components/motion`)

Én kilde til bevægelsesreglerne fra brandbogen: `EASE = [0.22, 1, 0.36, 1]`, `DURATION = { fast: .15, base: .3, slow: .7 }`.

- `Reveal` – glider 16 px op og fader ind, én gang. Indhold er synligt uden JS.
- `CountUp` – tæller til et tal, én gang i view, danske formater.
- `DrawRule` – guldstreg der tegner sig.
- `useInViewOnce` – fælles hook.
- Alle respekterer `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`.

## Indholdstyper (uddrag)

```ts
type Rich = string                 // *ord* = fremhævet
type Action = { label: string; href: string; variant?: "primary" | "secondary" | "light" | "ghost-light" }
type HeroContent = { eyebrow?: string; title: Rich; lead?: string; actions?: Action[]; trustline?: string }
type Person = { slug: string; name: string; title: string; group: GroupId; portrait: ImageRef; phone?: string; email?: string; linkedin?: string; bio: string[] }
```

Hele typesættet står i `src/content/types.ts`.

## Rækkefølge for at bygge siderne

1. ✅ Designtokens, fonte, shadcn-primitiver, layout, motion-hjælpere
2. ✅ Alle sektioner, byggeklodser, interaktive elementer og formularer
3. ✅ Alle indholdsfiler
4. ✅ Forsiden sat sammen som reference
5. ⏭ Resten af siderne sættes sammen (samme mønster som forsiden)
6. ⏭ ActiveCampaign-nøgler, rigtige medier, redirects (`next.config.ts`), sitemap og metadata
