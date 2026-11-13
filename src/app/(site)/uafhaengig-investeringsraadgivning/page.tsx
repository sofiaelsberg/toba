import type { Metadata } from "next";

import { RichText } from "@/components/blocks/rich-text";
import { Caption } from "@/components/blocks/typography";
import { VideoBlock } from "@/components/blocks/video-block";
import { ShareBar } from "@/components/interactive/charts";
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
        content={c.hero}
        aside={
          <div className="flex flex-col gap-4 border-l border-gold-light pl-6 md:mb-3 md:self-end">
            {c.heroText.map((t) => (
              <p key={t} className="text-ink-muted">
                {t}
              </p>
            ))}
          </div>
        }
      />

      <Section surface="navy">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2 md:gap-y-6">
          <div className="flex flex-col gap-5">
            <SectionHeading rule title={c.why.title} />
            {c.why.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <div className="flex flex-col gap-5 md:col-start-2 md:row-span-2 md:row-start-1">
            <ShareBar value={c.why.value} lead={c.why.lead} segments={c.why.segments} />
            <Caption>{c.why.source}</Caption>
          </div>
          <div className="flex flex-col gap-5 md:col-start-1 md:row-start-2">
            {c.why.after.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section surface="white" id="tre">
        <div className="flex flex-col gap-12">
          <Split>
            <div className="flex flex-col gap-6">
              <SectionHeading rule title={c.kinds.title} />
              <div className="flex flex-col gap-2 border-l-2 border-gold-light pl-4">
                <p className="text-navy">
                  <RichText text={c.kinds.lawNote} />
                </p>
                <Caption>{c.kinds.lawSource}</Caption>
              </div>
            </div>
            <VideoBlock video={c.kinds.video} />
          </Split>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {c.kinds.cards.map((k) => (
              <li
                key={k.title}
                className={cn(
                  "relative flex flex-col gap-4 bg-cream p-8 transition-[transform,box-shadow] duration-300 ease-toba hover:-translate-y-1 hover:shadow-raised md:row-span-3 md:grid md:grid-rows-subgrid",
                  k.highlight ? "border-2 border-gold" : "border-t-2 border-line",
                )}
              >
                {"badge" in k && k.badge && (
                  <span className="absolute -top-3.5 left-7 bg-gold-text px-3 py-1 text-eyebrow font-semibold tracking-[0.12em] text-white uppercase">
                    {k.badge}
                  </span>
                )}
                <h3 className={cn("text-eyebrow font-semibold tracking-[0.12em] uppercase", k.highlight ? "text-gold-text" : "text-ink-muted")}>
                  {k.eyebrow}
                </h3>
                <MoneyFlow flow={k.flow} label={k.flowAria} />
                <p className="self-end border-l border-gold-light pl-4 text-navy">
                  <strong className="font-semibold">{c.kinds.forYouLabel}</strong> {k.forYou}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-12">
          <SectionHeading rule title={c.practice.title} />
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
