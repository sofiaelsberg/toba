# LinkedIn → /nyheder

Indlæggene på `/nyheder` er Markdown-filer i `src/content/news/` (billeder i `public/nyheder/`).
De oprettes ud fra TOBA Advices LinkedIn-opslag og kan derefter redigeres og udbygges frit –
synkroniseringen overskriver aldrig en eksisterende fil.

## Rediger et indlæg

Åbn filen i `src/content/news/`. Øverst står oplysningerne (én pr. linje, som JSON), derunder teksten.

- `title`, `description` (vises i Google – højst ca. 155 tegn), `lead` (intro under titlen)
- `draft: true` skjuler indlægget (fx indtil compliance har set det)
- Teksten: tom linje = nyt afsnit · `## ` = mellemrubrik · linjer med `•`, `-`, `→` eller `1)` = liste · `**fed**`

Korte LinkedIn-opslag kan med fordel udbygges her – længere, grundige tekster gør mest for Google og AI-søgning.

## Hent nye opslag

**Nu (uden API):** eksportér opslagene fra LinkedIn som `linkedin-nyheder.json` (se historikken) og kør

```bash
node scripts/linkedin/sync.mjs --from-file ~/Downloads/linkedin-nyheder.json --dry-run   # se, hvad der sker
node scripts/linkedin/sync.mjs --from-file ~/Downloads/linkedin-nyheder.json
```

**Når API-adgangen er godkendt** (LinkedIn Community Management API, scope `r_organization_social`):

1. Opret et access token for en administrator af virksomhedssiden.
2. Kør lokalt: `LINKEDIN_ACCESS_TOKEN=… node scripts/linkedin/sync.mjs --api`
3. Eller automatisk: læg tokenet som secret `LINKEDIN_ACCESS_TOKEN` i GitHub (Settings → Secrets → Actions).
   Workflowet `.github/workflows/linkedin-sync.yml` kører hver morgen, committer nye indlæg som **kladder**
   (`draft: true`) og Vercel deployer. Gennemgå og fjern `draft`, når et indlæg skal på siden.

Organisationens id er `104613890`. Tokens udløber (typisk efter 60 dage) og skal fornys.

Via API'et hentes også billeder og – for slides-opslag – PDF-filen, så slides kan vises på hjemmesiden.
