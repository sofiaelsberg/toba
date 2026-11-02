import type { Metadata } from "next";

import { RichText } from "@/components/blocks/rich-text";
import { Caption, Eyebrow } from "@/components/blocks/typography";
import { VideoBlock } from "@/components/blocks/video-block";
import { ShareBar } from "@/components/interactive/charts";
import { ChecklistReveal } from "@/components/interactive/checklists";
import { MoneyFlow } from "@/components/interactive/money-flow";
import { CtaCards } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Disclaimer } from "@/components/sections/legal";
import { AccordionList, FeatureList } from "@/components/sections/lists";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { FactBox } from "@/components/sections/stats";
import { independent as c } from "@/content/pages/independent";
import { disclaimers, routes } from "@/content/site";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.independent, c.seo);

export default function IndependentPage() {
  return (
    <>
      <Hero
        surface="navy"
        content={c.hero}
        aside={
          <div className="flex flex-col gap-4 border-l border-gold-light pl-6 md:mb-3 md:self-end">
            {c.heroText.map((t) => (
              <p key={t} className="text-on-navy-muted">
                {t}
              </p>
            ))}
          </div>
        }
      />

      <Section surface="white">
        <Split>
          <div className="flex flex-col gap-5">
            <SectionHeading rule title={c.intro.title} />
            {c.intro.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <VideoBlock video={c.intro.video} />
        </Split>
      </Section>

      <Section id="tre">
        <div className="flex flex-col gap-12">
          <SectionHeading rule title={c.kinds.title} lead={c.kinds.lead} />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {c.kinds.cards.map((k) => (
              <li
                key={k.title}
                className={cn(
                  "flex flex-col gap-4 bg-white p-8 transition-[transform,box-shadow] duration-300 ease-toba hover:-translate-y-1 hover:shadow-raised",
                  k.highlight ? "border-2 border-gold" : "border-t-2 border-line",
                )}
              >
                <Eyebrow className={k.highlight ? "" : "text-ink-muted"}>{k.eyebrow}</Eyebrow>
                <h3 className="font-serif text-h3 font-medium text-navy">{k.title}</h3>
                <MoneyFlow rows={k.flow} label={k.flowAria} />
                <p className="flex-1">{k.text}</p>
                <p className="border-l border-gold-light pl-4 text-navy">
                  <strong className="font-semibold">{c.kinds.forYouLabel}</strong> {k.forYou}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section surface="white">
        <Split align="start">
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow={c.law.eyebrow} title={c.law.title} lead={c.law.lead} />
            <p className="border-t-2 border-gold bg-cream p-6">
              <RichText text={c.law.factBox} />
            </p>
            <p className="border-l border-gold-light pl-4 text-navy">
              <RichText text={c.law.tip} />
            </p>
            <Caption>{c.law.source}</Caption>
          </div>
          <ChecklistReveal items={c.law.requirements} />
        </Split>
      </Section>

      <Section surface="navy">
        <Split align="start">
          <div className="flex flex-col gap-5">
            <SectionHeading rule title={c.why.title} />
            {c.why.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <ShareBar value={c.why.value} lead={c.why.lead} segments={c.why.segments} />
            {c.why.after.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <Caption>{c.why.source}</Caption>
          </div>
        </Split>
      </Section>

      <Section>
        <div className="flex flex-col gap-12">
          <Split align="end">
            <SectionHeading rule title={c.practice.title} />
            <p>{c.practice.lead}</p>
          </Split>
          <Split align="start">
            <FeatureList features={c.practice.features} columns={1} inline />
            <div className="flex flex-col gap-8">
              <FactBox fact={c.practice.rebate} />
              <AccordionList items={[{ question: c.practice.taFunds.question, answer: c.practice.taFunds.answer.join("\n\n") }]} />
            </div>
          </Split>
        </div>
      </Section>

      <Section surface="white" id="naeste">
        <div className="flex flex-col gap-10">
          <SectionHeading rule title={c.next.title} lead={c.next.lead} />
          <CtaCards cards={c.next.cards} tone="cream" />
        </div>
      </Section>

      <Disclaimer content={disclaimers.short} />
    </>
  );
}
