import type { GroupId, Person } from "./types";

import { portrait } from "./media";

/** Alle medarbejdere. Kilde: tekster-team.md (bios fra Webflow, skrevet om). */
const raw: Omit<Person, "portrait">[] = [
  // Rådgivning
  {
    slug: "anders-bentholm",
    portraitFile: "anders-bentholm-v3.jpg",
    name: "Anders Bentholm",
    title: "CEO / Partner",
    group: "raadgivning",
    phone: "+45 28 18 84 27",
    email: "ab@tobaadvice.com",
    short: "Leder rådgivergruppen og har mange års erfaring med investerings- og formuerådgivning.",
    linkedin: "https://www.linkedin.com/in/anders-bentholm-79678b27/",
    bio: [
      "Anders er CEO og har ansvaret for TOBA Advices rådgivergruppe. Han har arbejdet med investerings- og formuerådgivning i mange år og har tidligere været ansat i Nordea Private Banking og Formuepleje A/S.",
    ],
  },
  {
    slug: "bent-hymoeller",
    portraitFile: "bent-hymoeller-v3.jpg",
    name: "Bent Hymøller",
    title: "Senior Relationship Manager / Partner",
    group: "raadgivning",
    phone: "+45 28 56 54 21",
    email: "hymoller@tobaadvice.com",
    short: "Over 36 års erfaring med investeringer.",
    linkedin: "https://www.linkedin.com/in/bent-hym%C3%B8ller-madsen-8470582/",
    bio: [
      "Bent er HD(F), certificeret investeringsrådgiver og partner i TOBA Advice. Han har over 36 års erfaring med investeringer og rådgiver især kunder med store formuer. Bent har tidligere været Sales Director i BankInvest, teamleder i Nordea Private Banking og investeringsrådgiver i SEB.",
    ],
  },
  {
    slug: "lars-dessau",
    portraitFile: "lars-dessau-v3.jpg",
    name: "Lars Dessau",
    title: "Senior Relationship Manager / Partner",
    group: "raadgivning",
    phone: "+45 93 98 43 33",
    email: "dessau@tobaadvice.com",
    short: "Erfaren rådgiver og forfatter til bogen “Kundeheltene”.",
    linkedin: "https://www.linkedin.com/in/larsdessau/",
    bio: [
      "Lars er en erfaren finansiel rådgiver med en solid baggrund inden for strategisk planlægning og finansiel rådgivning for formuende danskere i ind- og udland. Tidligere har Lars haft ledende stillinger hos Jyske Bank, Jyske Bank Gibraltar og Trusted Novus Bank, hvor han var leder af Private Banking.",
      "Som forfatter til bogen 'Kundeheltene' bidrager han til at forbedre kundeoplevelser med værdifuld indsigt og gode råd baseret på grundige undersøgelser i branchen. Hans ekspertise og passion for investering og kundetilfredshed gør ham til en uvurderlig ressource for sine kunder.",
    ],
  },
  {
    slug: "martin-svendsen",
    portraitFile: "martin-svendsen-v3.jpg",
    name: "Martin Svendsen",
    title: "Senior Relationship Manager / Partner",
    group: "raadgivning",
    phone: "+45 28 72 97 20",
    email: "svendsen@tobaadvice.com",
    short: "Cand.merc. og investeringsrådgiver siden 2006.",
    linkedin: "https://www.linkedin.com/in/martinsvendsen/",
    bio: [
      "Martin har den daglige kontakt med kunderne. Han er cand.merc. i økonomistyring og har arbejdet med porteføljesammensætning og investeringsrådgivning siden 2006. Før TOBA Advice var han 12 år i Jyske Bank, hvor han rådgav bankens private banking-kunder.",
      "Martin bor med sin familie lige syd for Aarhus. Fritiden går med familie og venner – gerne omkring et godt måltid, for madlavning er hans store interesse.",
    ],
  },
  {
    slug: "patrick-czyz",
    portraitFile: "patrick-czyz-v3.jpg",
    name: "Patrick Czyz",
    title: "Senior Relationship Manager / Partner",
    group: "raadgivning",
    phone: "+45 40 13 84 54",
    email: "pc@tobaadvice.com",
    short: "Uddannet formuerådgiver med over 12 års erfaring fra banksektoren.",
    linkedin: "https://www.linkedin.com/in/patrick-czyz-806436a4/",
    bio: [
      "Patrick er uddannet formuerådgiver og har over 12 års erfaring fra banksektoren, senest i Private Banking i Aarhus-området. Hos Patrick går formue- og investeringsrådgivning hånd i hånd. Han lægger vægt på at finde den løsning, der passer til netop dig og din situation.",
      "Når han ikke rådgiver, er Patrick formand for Mollerup Golf Club.",
    ],
  },
  // Analyse
  {
    slug: "bertel-roslev-rasmussen",
    name: "Bertel Roslev Rasmussen",
    title: "CIO / Partner",
    group: "analyse",
    alsoIn: [{ group: "bestyrelse", title: "Bestyrelsesmedlem" }],
    phone: "+45 29 92 95 32",
    email: "roslev@tobaadvice.com",
    press: [
      {
        headline: "Rådgiver kritiserer afkast ved Landbobanken-produkter: \"Investorer vil blive slemt skuffede\"",
        outlet: "FinansWatch",
        date: "2025-12-05",
        url: "https://finanswatch.dk/Finansnyt/kapitalforvaltning/article18813738.ece",
      },
    ],
    linkedin: "https://www.linkedin.com/in/bertel-roslev-rasmussen-2710635/",
    bio: [
      "Bertel står i spidsen for TOBA Advices analyseafdeling. Han har tidligere været partner og chef for investeringsafdelingen i konsulenthuset Kirstein A/S, hvor han rådgav institutionelle investorer om investeringsstrategi og udvælgelse af kapitalforvaltere.",
    ],
  },
  {
    slug: "anton-soerensen",
    name: "Anton Sørensen",
    title: "Head of Investment Operations / Partner",
    group: "analyse",
    phone: "+45 28 68 65 70",
    email: "antonsorensen@tobaadvice.com",
    linkedin: "https://www.linkedin.com/in/antons%C3%B8rensen/",
    bio: [
      "Anton arbejder i analyseafdelingen med produkt-, portefølje- og makroøkonomiske analyser og med rapporteringen til kunderne. Han kom til TOBA Advice direkte fra Aarhus Universitet, hvor han læste med speciale i finans. Før det var han Assistant Portfolio Manager hos Markedskraft.",
    ],
  },
  {
    slug: "christian-hechmann",
    name: "Christian Hechmann",
    title: "Investment Analyst",
    group: "analyse",
    phone: "+45 88 88 82 06",
    email: "ch@tobaadvice.com",
    linkedin: "https://www.linkedin.com/in/christian-hechmann-7a9b18203/",
    bio: [
      "Christian arbejder i analyseafdelingen, hvor han står for rapportering, opstart af nye kunder og omlægning af eksisterende kunders porteføljer. Han har en bachelor i finans fra Erhvervsakademi Aarhus og er ved at færdiggøre sin cand.merc. i finansiering fra Handelshøjskolen i Aarhus / Aarhus Universitet.",
    ],
  },
  {
    slug: "kristian-blaesbjerg-larsen",
    name: "Kristian Blæsbjerg Larsen",
    title: "Investeringsstrateg / Partner",
    group: "analyse",
    email: "kbl@tobaadvice.com",
    linkedin: "https://www.linkedin.com/in/kristian-bl%C3%A6sbjerg-larsen-97b74b5/",
    bio: [
      "Kristian er investeringsstrateg og partner i TOBA Advice, hvor han er tilknyttet analyseafdelingen. Han er cand.merc. i finansiering fra Handelshøjskolen i Aarhus og kommer fra en karriere i Nordea, senest som Chief Private Banker i Nordea Wealth Management. Han har desuden undervist som ekstern lektor på Handelshøjskolen / Aarhus Universitet.",
    ],
  },
  {
    slug: "alexander-holm",
    name: "Alexander Holm",
    title: "Intern – Investments",
    group: "analyse",
    email: "holm@tobaadvice.com",
    linkedin: "https://www.linkedin.com/in/alexander-holm-038761260/",
    bio: ["Alexander er tilknyttet analyseafdelingen i TOBA Advice. Han assisterer ved de fleste opgaver i analyseafdelingen, uanset om det er udarbejdelse af investeringsanalyser, kundeoplæg eller værktøjer, der understøtter afdelingens arbejdsopgaver."],
  },
  {
    slug: "mathias-braas-skytte",
    name: "Mathias Braas Skytte",
    title: "Intern – Investments",
    group: "analyse",
    email: "skytte@tobaadvice.com",
    linkedin: "https://www.linkedin.com/in/mathias-braas-skytte/",
    bio: ["Mathias er tilknyttet analyseafdelingen i TOBA Advice. Han assisterer ved de fleste opgaver i analyseafdelingen, uanset om det er udarbejdelse af investeringsanalyser, kundeoplæg eller værktøjer, der understøtter afdelingens arbejdsopgaver."],
  },
  // Administration
  {
    slug: "tonny-elsberg",
    name: "Tonny Elsberg",
    title: "COO / Partner",
    group: "administration",
    email: "elsberg@tobaadvice.com",
    short: "Medstifter af TOBA Advice med over 25 års erfaring fra den finansielle sektor.",
    linkedin: "https://www.linkedin.com/in/tonny-elsberg-86057715/",
    bio: [
      "Tonny er medstifter af TOBA Advice og COO. Han har over 25 års erfaring fra den finansielle sektor og har tidligere været partner i Clearhaus og finans- og fondschef i Sparekassen Kronjylland.",
    ],
  },
  {
    slug: "mette-jo-rehn-hermansen",
    name: "Mette Jo Rehn Hermansen",
    title: "CFO / Partner",
    group: "administration",
    phone: "+45 26 83 81 11",
    linkedin: "https://www.linkedin.com/in/mettejosoerensen/",
    bio: [
      "Mette er CFO i TOBA Advice og holder styr på finanserne – uanset om det er den daglige styring af økonomi og likviditet eller de langsigtede mål og budgetter, TOBA Advice manøvrerer efter. Hun har bred erfaring fra forskellige roller i økonomifunktionen hos tidligere arbejdsgivere.",
    ],
  },
  {
    slug: "sofia-lund-elsberg",
    name: "Sofia Lund Elsberg",
    title: "Frontend Developer",
    group: "administration",
    email: "se@tobaadvice.com",
    short: "Udvikler TOBA Advices hjemmeside.",
    linkedin: "https://www.linkedin.com/in/sofia-elsberg-2019691b6/",
    bio: ["Sofia står for udviklingen af TOBA Advices hjemmeside. Hun har en baggrund inden for både design og programmering."],
  },
  // Bestyrelse (formanden først)
  {
    slug: "dennis-birkeholm-larsen",
    name: "Dennis Birkeholm Larsen",
    title: "Bestyrelsesformand",
    group: "bestyrelse",
    linkedin: "https://www.linkedin.com/in/dennis-birkeholm-larsen-691599a/",
    bio: ["Dennis er formand for bestyrelsen i TOBA Advice. Han er advokat (L) og partner i advokatfirmaet Clemens Law."],
  },
  {
    slug: "peter-bager",
    name: "Peter Bager",
    title: "Bestyrelsesmedlem",
    group: "bestyrelse",
    short: "Professionelt bestyrelsesmedlem med baggrund i salg, marketing og digital udvikling.",
    linkedin: "https://www.linkedin.com/in/peter-bager/",
    bio: [
      "Peter er medlem af bestyrelsen i TOBA Advice. Han er professionelt bestyrelsesmedlem i en række virksomheder – typisk privatejede med en aktiv ejerkreds – og er bl.a. formand i Tvilum A/S og Proshop Europe A/S. Peter har en baggrund inden for salg og marketing og arbejder især med digital udvikling.",
    ],
  },
];

export const people: Person[] = raw.map((p) => ({ ...p, portrait: portrait(p.portraitFile ?? `${p.slug}-gs.jpg`, p.name) }));

export const groups: { id: GroupId; name: string; note?: string }[] = [
  { id: "raadgivning", name: "Rådgivning", note: "Din faste kontakt" },
  { id: "analyse", name: "Analyse", note: "Strategi, forvaltere og rapportering" },
  { id: "administration", name: "Administration" },
  { id: "bestyrelse", name: "Bestyrelse" },
];

export const advisers = people.filter((p) => p.group === "raadgivning");
