import { facts } from "@/content/facts";
import { about } from "@/content/pages/about";
import { contact } from "@/content/pages/contact";
import { news } from "@/content/pages/news";
import { guide } from "@/content/pages/guide";
import { home } from "@/content/pages/home";
import { howWeInvest } from "@/content/pages/how-we-invest";
import { independent } from "@/content/pages/independent";
import { accessibilityPage, privacyPage, complaints, fsa, policies } from "@/content/pages/legal";
import { overview } from "@/content/pages/overview";
import { team } from "@/content/pages/team";
import { advisers, people } from "@/content/people";
import { company, footer, routes } from "@/content/site";
import { getAllPosts } from "@/lib/news";
import { SITE_URL } from "@/lib/seo";

/**
 * /llms.txt – en kort, maskinlæsbar oversigt til AI-tjenester (llmstxt.org).
 * Bygges ud fra indholdsfilerne, så den altid følger siden. Bruger ingen request-data, så Next bygger den statisk.
 */
const plain = (s: string) => s.replace(/\*\*?/g, "");
const link = (path: string, title: string, description: string) => `- [${plain(title).replace(/ \| TOBA Advice$/, "")}](${SITE_URL}${path === "/" ? "" : path}): ${plain(description)}`;

export async function GET() {
  const posts = await getAllPosts();
  const rebate = String(facts.rebatesPaid.amountMio).replace(".", ",");
  const body = `# ${company.name}

> ${footer.about}

${company.disambiguation}

${company.legalName} er en uafhængig investeringsrådgiver med tilladelse fra Finanstilsynet (FT-nr. ${company.ftNumber}, CVR ${company.cvr}). Virksomheden er etableret i ${facts.founded} og har været ejet af medarbejderne siden ${facts.employeeOwnedSince} og har i dag ${facts.assetsUnderAdviceMia} mia. kr. under rådgivning. Rådgiverne mødes med kunder i hele Danmark; kontoret ligger på ${company.address.line1}, ${company.address.line2}.

Nøglefakta:
- Uafhængig: ingen provision fra fonde eller forvaltere og ingen indtægter fra egen forvaltning eller handel. Kunden betaler et aftalt rådgivningshonorar.
- Forvalterrabatter sendes ubeskåret videre til kunderne – ${rebate} mio. kr. udbetalt i ${facts.rebatesPaid.paidYear}.
- Vi samarbejder med ${facts.managers} kapitalforvaltere i ${facts.countries} lande og har ${facts.yearsSelectingManagers}+ års erfaring med at udvælge forvaltere.
- Kunden beholder sit depot i sin egen bank; TOBA Advice opbevarer ikke værdipapirer.
- Målgruppe: personer, familier og virksomhedsejere med en investerbar formue på mindst ${facts.minimumWealthMio} mio. kr.
- Kontakt: ${company.phone} · ${SITE_URL}${routes.contact}

## Sider

${link(routes.home, home.seo.title, home.seo.description)}
${link(routes.howWeInvest, howWeInvest.seo.title, howWeInvest.seo.description)}
${link(routes.independent, independent.seo.title, independent.seo.description)}
${link(routes.overview, overview.seo.title, overview.seo.description)}
${link(routes.guide, guide.seo.title, guide.seo.description)}
${link(routes.about, about.seo.title, about.seo.description)}
${link(routes.team, team.seo.title, team.seo.description)}
${link(routes.contact, contact.seo.title, contact.seo.description)}
${link(routes.news, news.seo.title, news.seo.description)}

## Seneste indlæg

${posts.slice(0, 10).map((p) => link(`${routes.news}/${p.slug}`, p.title, p.description)).join("\n")}

## Rådgivere

${advisers.map((p) => `- ${p.name}, ${p.title}`).join("\n")}

## TOBA Advice i medierne

${people.flatMap((p) => (p.press ?? []).map((a) => `- ${a.outlet}, ${a.date}: "${a.headline}" – med bidrag fra ${p.name}, ${p.title}. ${a.url}`)).join("\n")}

## Spørgsmål og svar om TOBA Advice

${home.faq.map((f) => `- ${f.question} ${plain(f.answer)}`).join("\n")}

## Spørgsmål og svar om uafhængig investeringsrådgivning

${independent.faq.map((f) => `- ${f.question} ${plain(f.answer)}`).join("\n")}

## Ofte stillede spørgsmål om omkostningsoverblikket

${overview.faq.map((f) => `- ${f.question} ${plain(f.answer)}`).join("\n")}

## Regulering og politikker

${link(routes.fsa, fsa.seo.title, fsa.seo.description)}
${link(routes.policies, policies.seo.title, policies.seo.description)}
${link(routes.complaints, complaints.seo.title, complaints.seo.description)}
${link(routes.accessibility, accessibilityPage.seo.title, accessibilityPage.seo.description)}
${link(routes.privacy, privacyPage.seo.title, privacyPage.seo.description)}

## Bemærk

Indholdet på ${SITE_URL} er generel information og ikke individuel investeringsrådgivning. Investering indebærer risiko for tab.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
