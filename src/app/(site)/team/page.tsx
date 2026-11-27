import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { TeamDirectory } from "@/components/sections/team-directory";
import { team as c } from "@/content/pages/team";
import { groups, people } from "@/content/people";
import { newsPath, routes } from "@/content/site";
import { authorPerson } from "@/lib/authors";
import { getAllPosts } from "@/lib/news";
import { pageMetadata } from "@/lib/seo";
import { jsonLd, teamJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(routes.team, c.seo);

export default async function TeamPage() {
  // De seneste tre indlæg pr. medarbejder vises i profilen.
  const articles: Record<string, { title: string; href: string }[]> = {};
  for (const post of await getAllPosts()) {
    const person = authorPerson(post.author);
    if (!person) continue;
    const list = (articles[person.slug] ??= []);
    if (list.length < 3) list.push({ title: post.title, href: newsPath(post.slug) });
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(teamJsonLd(people))} />
      <Hero content={c.hero} className="md:pb-8" />
      <Section spacing="none" reveal={false} className="pb-16 md:pb-24">
        <TeamDirectory people={people} groups={groups} allLabel={c.filterAll} profileUrlPrefix={c.profileUrlPrefix} bookHref={routes.bookMeeting} articles={articles} newsHref={routes.news} />
      </Section>
      <CtaBand title={c.closing.title} lead={c.closing.lead} actions={c.closing.actions} />
    </>
  );
}
