# Google Analytics og Search Console

Koden er klar. GA indlæses **kun** når den besøgende har sagt ja til "Statistik", og **kun** på tobaadvice.com
(Consent Mode v2, "basic"). Uden målings-ID sker der ingenting. Se `src/lib/analytics.ts` og
`src/components/layout/analytics.tsx`.

Brug den eksisterende property **Toba Advice** (konto tobaadvice@gmail.com, a340445780 / p472133751),
så historikken fra den gamle side fortsætter.

## Ved domæneskiftet

1. **Målings-ID:** `G-508HFMTYFG` (datastrømmen "Tobaadvice.com", strøm-id 10127623337 – samme som den gamle side bruger).
2. **Vercel** → Settings → Environment Variables → `NEXT_PUBLIC_GA_ID` = `G-508HFMTYFG`, kun **Production**. Redeploy
   (værdien bygges ind i siden, så den virker først efter et nyt deploy).
3. **Fjern GA fra den gamle Webflow-side** samtidig, så besøg ikke tælles dobbelt i overgangen.
4. Tjek i GA → Rapporter → **Realtid**, at dit eget besøg dukker op (husk at sige ja til statistik).

Test før skiftet: sæt `NEXT_PUBLIC_ANALYTICS_HOSTS=toba-two.vercel.app` (Preview/Production), redeploy,
tjek Realtid – og fjern variablen igen bagefter.

## Indstillinger i GA (en gang)

- **Nøglebegivenheder** (Administrator → Begivenheder): marker `generate_lead`. Gerne også `book_meeting_click`.
  De vises først på listen, når de er sket én gang.
- **Dataopbevaring:** 14 måneder (standard er 2).
- **Google-signaler:** slået fra (vi bruger ikke GA til annoncering).
- **Intern trafik:** filtrér kontorets IP-adresse fra (Datastrøm → Konfigurer tag-indstillinger → Definer intern trafik).
- **Forbedret måling** (Datastrøm): behold sidevisninger, scroll, udgående klik og fildownloads slået til.
  "Sideændringer baseret på browserhistorik" skal være slået til (måler sideskift på den nye side).
- **Search Console-tilknytning** (Administrator → Produktlinks), når Search Console er sat op.

## Hændelser, siden sender

| Hændelse | Hvornår | Parametre |
|---|---|---|
| `generate_lead` | Formular sendt (kontakt, guide, omkostningsoverblik) | `form`, `topic` (emne på kontaktformularen) |
| `book_meeting_click` | Klik på "Book et møde" | `location` (side) |
| `cta_click` | Klik på en knap, et tekstlink ("Læs mere →"), et kort eller et nyhedskort | `cta_type` (button/link/card/news_card), `cta_label` (teksten), `cta_section` (sektionens overskrift), `location` (side), `destination` (hvor den fører hen) |
| `contact_click` | Klik på telefonnummer eller e-mail | `method`, `location` |
| `video_start` | En video startes | `video`, `title` |
| `slides_navigate` | Læser bladrer til en ny slide i et nyhedsindlæg | `post`, `slide`, `total` |
| `slides_text_open` | "Læs teksten fra slides" åbnes | `post` |

Parametrene skal oprettes som **brugerdefinerede dimensioner** (Administrator → Brugerdefinerede definitioner),
hvis de skal kunne bruges i rapporterne: `form`, `topic`, `location`, `post`, `cta_type`, `cta_label`, `cta_section`, `destination`.

Nye knapper måles automatisk, når de bruger `ButtonLink`, `TextLink` eller `CtaCards`. Andre links kan måles ved at give dem `data-cta="…"` (og evt. `data-cta-label`).

## Search Console

1. Opret en **domæne-property** for `tobaadvice.com` og bekræft via DNS (TXT-post hos domæneudbyderen).
   Alternativt "HTML-tag": læg koden i `GOOGLE_SITE_VERIFICATION` i Vercel.
2. Indsend sitemap: `https://www.tobaadvice.com/sitemap.xml`.
3. Gamle adresser fra Webflow sendes videre med 301 (se `next.config.ts`) – hold øje med "Sider" i et par uger.

## Cookiesiden

`/cookies` viser listen fra `src/content/pages/legal.ts` (`cookiesPage.list`). Opdatér den, hvis der kommer
nye værktøjer (fx LinkedIn Insight Tag).
