import type { Metadata } from "next";

import { ButtonLink, TextLink } from "@/components/blocks/links";
import { AmbientVideo } from "@/components/blocks/ambient-video";
import { AdvisersVisual, CakeVisual, OverviewVisual } from "@/components/blocks/card-visuals";
import { Media } from "@/components/blocks/media";
import { RichText } from "@/components/blocks/rich-text";
import { Caption, Eyebrow } from "@/components/blocks/typography";
import { VideoBlock } from "@/components/blocks/video-block";
import { ShareBar } from "@/components/interactive/charts";
import { CostCalculator } from "@/components/interactive/cost-calculator";
import { LayerCake } from "@/components/interactive/layer-cake";
import { CtaBand, CtaCards } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Disclaimer } from "@/components/sections/legal";
import { PointList, ValueGrid } from "@/components/sections/lists";
import { PeopleGrid } from "@/components/sections/people";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { StatsRow } from "@/components/sections/stats";
import { cake } from "@/content/cake";
import { home as c } from "@/content/pages/home";
import { independent } from "@/content/pages/independent";
import { overview } from "@/content/pages/overview";
import { advisers } from "@/content/people";
import { disclaimers, routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.home, c.seo);

/** Forside – referencen for, hvordan sider sættes sammen af sektioner + indhold. */
export default function HomePage() {
  return (
    <>
      <Hero content={c.hero} aside={<AmbientVideo video={c.heroMedia} />} />

      <Section surface="white">
        <Split>
          <div className="flex flex-col gap-6">
            <SectionHeading rule title={c.sameSide.title} lead={c.sameSide.lead} />
            <PointList points={c.sameSide.points} />
            <p className="font-serif text-quote font-medium text-navy italic">{c.sameSide.quote}</p>
          </div>
          <VideoBlock video={c.sameSide.video} />
        </Split>
      </Section>

      <Section>
        <div className="flex flex-col gap-10">
          <SectionHeading rule title={c.ctaIntro.title} lead={c.ctaIntro.lead} />
          <CtaCards
            headingLevel="h3"
            cards={c.ctaCards}
            visuals={{
              cake: <CakeVisual content={cake} />,
              overview: <OverviewVisual content={overview.example} />,
              advisers: <AdvisersVisual content={independent.kinds} />,
            }}
          />
        </div>
      </Section>

      <Section surface="navy" id="bank">
        <Split align="start">
          <div className="flex flex-col gap-5">
            <Eyebrow>{c.bank.eyebrow}</Eyebrow>
            <ShareBar value={c.bank.value} lead={c.bank.lead} segments={c.bank.segments} />
            <p className="max-w-140">{c.bank.text}</p>
            <Caption>{c.bank.source}</Caption>
            <TextLink href={c.bank.link.href} className="self-start">
              {c.bank.link.label}
            </TextLink>
          </div>
          <VideoBlock video={c.bank.video} />
        </Split>
      </Section>

      <Section surface="white" id="lagkage">
        <Split>
          <div className="flex flex-col gap-6">
            <SectionHeading rule title={c.cake.title} lead={c.cake.lead} />
            <ButtonLink action={c.cake.action} className="self-start" />
          </div>
          <LayerCake content={cake} withToba showStory />
        </Split>
        <div className="mt-16 grid grid-cols-1 gap-6 border-t-2 border-gold-light pt-6 md:grid-cols-3">
          <StatsRow stats={c.cake.example} className="border-none pt-0 md:col-span-2 md:grid-cols-2" />
          <Caption className="self-end">{c.cake.exampleNote}</Caption>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-12">
          <SectionHeading rule title={c.values.title} />
          <ValueGrid items={c.values.items} />
          <TextLink href={c.values.link.href} className="self-start">
            {c.values.link.label}
          </TextLink>
        </div>
      </Section>

      <Section surface="white" id="beregner">
        <div className="flex flex-col gap-12">
          <Split align="start">
            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow={c.pricing.eyebrow} title={c.pricing.title} />
              <p>
                <RichText text={c.pricing.text} />
              </p>
            </div>
            <VideoBlock video={c.pricing.video} className="w-full max-w-95 md:justify-self-end" />
          </Split>
          <CostCalculator content={c.calculator} />
        </div>
      </Section>

      <Section>
        <Split>
          <SectionHeading rule title={c.professional.title} />
          <div className="flex flex-col gap-4">
            {c.professional.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <TextLink href={c.professional.link.href} className="self-start">
              {c.professional.link.label}
            </TextLink>
          </div>
        </Split>
      </Section>

      <Section surface="white">
        <Split>
          <Media media={c.about.media} />
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow={c.about.eyebrow} title={c.about.title} />
            {c.about.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <TextLink href={c.about.link.href} className="self-start">
              {c.about.link.label}
            </TextLink>
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
          <div className="flex flex-col items-start gap-5 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-150">{c.advisers.text}</p>
            <ButtonLink action={c.advisers.contact} />
          </div>
        </div>
      </Section>

      <CtaBand title={c.closing.title} lead={c.closing.lead} actions={c.closing.actions} />
      <Disclaimer content={disclaimers.standard} />
    </>
  );
}
