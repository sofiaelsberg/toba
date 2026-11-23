# LinkedIn → /nyheder

Indlæggene på `/nyheder` er Markdown-filer i `src/content/news/` (billeder i `public/nyheder/`).
De oprettes ud fra TOBA Advices LinkedIn-opslag og kan derefter redigeres og udbygges frit –
synkroniseringen overskriver aldrig en eksisterende fil.

## Rediger et indlæg

Åbn filen i `src/content/news/`. Øverst står oplysningerne (én pr. linje, som JSON), derunder teksten.

- `title`, `description` (vises i Google – højst ca. 155 tegn), `lead` (intro under titlen)
- `draft: true` skjuler indlægget (fx indtil compliance har set det)

**Skal et opslag slet ikke på siden?** Tilføj dets id i `scripts/linkedin/afviste.json` og slet filen. Så hentes det aldrig igen – heller ikke af den automatiske synkronisering.
- Teksten: tom linje = nyt afsnit · `## ` = mellemrubrik · linjer med `•`, `-`, `→` eller `1)` = liste · `**fed**`

Korte LinkedIn-opslag kan med fordel udbygges her – længere, grundige tekster gør mest for Google og AI-søgning.

## Hent nye opslag

**Nu (uden API):** eksportér opslagene fra LinkedIn som `linkedin-nyheder.json` (se historikken) og kør

```bash
node scripts/linkedin/sync.mjs --from-file ~/Downloads/linkedin-nyheder.json --dry-run   # se, hvad der sker
node scripts/linkedin/sync.mjs --from-file ~/Downloads/linkedin-nyheder.json
```

**Automatisk via API'et (sat op 23. nov. 2026):**

Workflowet `.github/workflows/linkedin-sync.yml` kører hver morgen, committer nye indlæg, og Vercel deployer.
Alt, der er postet på TOBA's LinkedIn, er godkendt og kommer direkte på siden (ikke som kladde).

Det bruger tre GitHub-secrets (repo → Settings → Secrets and variables → Actions):

- `LINKEDIN_REFRESH_TOKEN` – holder ét år. Jobbet henter selv et nyt access token ved hver kørsel.
- `LINKEDIN_CLIENT_SECRET` – appens Client Secret (LinkedIn Developer Portal → appen TOBA Advice → Auth).
- (Client ID `78fu9r1nx9rjm0` og organisationens id `104613890` står i workflowet.)

Jobbet skriver i loggen, hvor mange dage refresh-tokenet har tilbage, og advarer, når der er under 30.

**Nyt refresh-token (én gang om året):**

1. Log ind på LinkedIn som administrator af virksomhedssiden, og åbn
   `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78fu9r1nx9rjm0&redirect_uri=https%3A%2F%2Fwww.linkedin.com%2Fdevelopers%2Ftools%2Foauth%2Fredirect&scope=r_organization_social&state=toba`
2. Tryk Allow, og kopiér koden mellem `code=` og `&state` i adresselinjen (den udløber efter få minutter).
3. Kør i Terminal:

   ```bash
   CODE='…'; SECRET='…'
   curl -s -X POST https://www.linkedin.com/oauth/v2/accessToken -d grant_type=authorization_code \
     --data-urlencode "code=$CODE" -d client_id=78fu9r1nx9rjm0 --data-urlencode "client_secret=$SECRET" \
     --data-urlencode redirect_uri=https://www.linkedin.com/developers/tools/oauth/redirect
   ```
4. Læg `refresh_token` fra svaret ind som secret `LINKEDIN_REFRESH_TOKEN`.

(LinkedIns token-værktøj i Developer Portal fejler med "state parameter was modified" – brug ovenstående.)

Lokalt: `LINKEDIN_ACCESS_TOKEN=… node scripts/linkedin/sync.mjs --api --dry-run`.

**Adresser:** `adresser.json` giver bestemte opslag en fast adresse (og evt. originalbillede og slides), nøglen er opslagets id fra API'et.
De 17 første indlæg beholder på den måde deres gamle adresser. Nye opslag får en adresse ud fra overskriften – vil du have en pænere, så omdøb filen (og evt. slides-mappen) og tilføj den i `adresser.json`.
Opslag genkendes på id, id'ets tidsstempel eller udgivelsestidspunktet, så samme opslag aldrig hentes to gange.

## Slides (dokumentopslag)

Slides vises på artiklen som billeder, man kan bladre i, med teksten fra hver slide under (til Google og skærmlæsere).
De ligger i `public/nyheder/slides/<slug>/` og teksten i `src/content/news/slides/<slug>.json` – ret teksten dér.

Hent slides fra et nyt opslag:

1. Åbn opslaget på LinkedIn (ved delinger: det oprindelige opslag), åbn browserens konsol, og kør indholdet af `grab-slides.js`.
2. `node scripts/linkedin/import-slides.mjs ~/Downloads/li-slides-*.json`
3. Tjek teksten i JSON-filen (især overskrifter med spærret skrift) og slet filerne i Overførsler.

Via API'et kan PDF-filen hentes direkte, når adgangen er godkendt.
