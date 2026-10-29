import type { Metadata } from "next";

import { LinkedInPost } from "@/components/blocks/linkedin-post";
import { TextLink } from "@/components/blocks/links";
import { Media } from "@/components/blocks/media";
import { Eyebrow } from "@/components/blocks/typography";
import { VideoBlock } from "@/components/blocks/video-block";
import { VolcanoStory } from "@/components/interactive/volcano-story";
import { CtaBand } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Disclaimer } from "@/components/sections/legal";
import { FeatureList } from "@/components/sections/lists";
import { PeopleGrid } from "@/components/sections/people";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { StatsRow } from "@/components/sections/stats";
import { about as c } from "@/content/pages/about";
import { advisers } from "@/content/people";
import { disclaimers, routes } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: routes.about }, title: c.seo.title, description: c.seo.description };

export default function AboutPage() {
  return (
    <>
      <Hero content={c.hero} aside={<Media media={c.heroMedia} priority />} />

      <Section surface="navy">
        <Split align="start">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow={c.name.eyebrow} title={c.name.title} />
            <VolcanoStory stages={c.name.stages} label={c.name.illustrationLabel} />
            {c.name.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <VideoBlock video={c.name.video} />
        </Split>
      </Section>

      <Section>
        <div className="flex flex-col gap-12">
          <SectionHeading rule title={c.benefits.title} />
          <FeatureList features={c.benefits.features} />
          <TextLink href={c.benefits.link.href} className="self-start">
            {c.benefits.link.label}
          </TextLink>
        </div>
      </Section>

      <Section surface="white">
        <Split align="start">
          <div className="flex flex-col gap-5">
            <SectionHeading rule title={c.owned.title} />
            {c.owned.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <div className="flex flex-col gap-5 border-t-2 border-gold bg-cream p-8 md:p-10">
            <Eyebrow>{c.forYou.eyebrow}</Eyebrow>
            <p className="font-serif text-stat font-medium text-navy">{c.forYou.highlight}</p>
            <p>{c.forYou.text}</p>
          </div>
        </Split>
      </Section>

      <Section spacing="compact">
        <StatsRow stats={c.stats} />
      </Section>

      <Section surface="white">
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading rule title={c.advisers.title} lead={c.advisers.lead} />
            <TextLink href={c.advisers.link.href}>{c.advisers.link.label}</TextLink>
          </div>
          <PeopleGrid people={advisers} />
        </div>
      </Section>

      <Section>
        <Split>
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-h3 font-medium text-navy">{c.linkedin.title}</h2>
            {c.linkedin.link.href && (
              <TextLink href={c.linkedin.link.href} className="self-start">
                {c.linkedin.link.label}
              </TextLink>
            )}
          </div>
          <LinkedInPost post={c.linkedin.post} className="justify-self-center md:justify-self-end" />
        </Split>
      </Section>

      <CtaBand title={c.closing.title} lead={c.closing.lead} actions={c.closing.actions} />
      <Disclaimer content={disclaimers.short} />
    </>
  );
}
