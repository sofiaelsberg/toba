import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Disclaimer } from "@/components/sections/legal";
import { Section } from "@/components/sections/section";
import { TeamDirectory } from "@/components/sections/team-directory";
import { team as c } from "@/content/pages/team";
import { groups, people } from "@/content/people";
import { disclaimers, routes } from "@/content/site";

export const metadata: Metadata = { title: c.seo.title, description: c.seo.description };

export default function TeamPage() {
  return (
    <>
      <Hero content={c.hero} className="md:pb-8" />
      <Section spacing="none" reveal={false} className="pb-16 md:pb-24">
        <TeamDirectory people={people} groups={groups} allLabel={c.filterAll} profileUrlPrefix={c.profileUrlPrefix} bookHref={routes.bookMeeting} />
      </Section>
      <CtaBand title={c.closing.title} lead={c.closing.lead} actions={c.closing.actions} />
      <Disclaimer content={disclaimers.short} />
    </>
  );
}
