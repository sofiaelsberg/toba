import type { Metadata } from "next";

import { RichText } from "@/components/blocks/rich-text";
import { Caption, eyebrowClass } from "@/components/blocks/typography";
import { VideoBlock } from "@/components/blocks/video-block";
import { ShareBar } from "@/components/interactive/charts";
import { ChecklistReveal } from "@/components/interactive/checklists";
import { MoneyFlow } from "@/components/interactive/money-flow";
import { CtaCards } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Disclaimer } from "@/components/sections/legal";
import { FaqSection, FeatureList } from "@/components/sections/lists";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { FactBox } from "@/components/sections/stats";
import { independent as c } from "@/content/pages/independent";
import { disclaimers, routes } from "@/content/site";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.independent, c.seo, { ownShareImage: true });

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
          <SectionHeading rule title={c.kinds.title} />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {c.kinds.cards.map((k) => (
              <li
                key={k.title}
                className={cn(
                  "relative flex flex-col gap-4 bg-white p-8 transition-[transform,box-shadow] duration-300 ease-toba hover:-translate-y-1 hover:shadow-raised md:row-span-3 md:grid md:grid-rows-subgrid",
                  k.highlight ? "border-2 border-gold" : "border-t-2 border-line",
                )}
              >
                {"badge" in k && k.badge && (
                  <span className={`${eyebrowClass} absolute -top-3.5 left-7 bg-gold-text px-3 py-1 text-white`}>
                    {k.badge}
                  </span>
                )}
                <h3 className={cn(eyebrowClass, k.highlight ? "text-gold-text" : "text-ink-muted")}>
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

      <Section surface="white">
        <Split align="start">
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow={c.law.eyebrow} title={c.law.title} lead={c.law.lead} />
            <p className="border-t-2 border-gold bg-cream p-6">
              <RichText text={c.law.factBox} />
            </p>
            <Caption>{c.law.source}</Caption>
          </div>
          <ChecklistReveal items={c.law.requirements} numbered />
        </Split>
      </Section>

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

      <Section>
        <div className="flex flex-col gap-12">
          <SectionHeading rule title={c.practice.title} />
          <Split align="start">
            <FeatureList features={c.practice.features} columns={1} inline />
            <FactBox fact={c.practice.rebate} />
          </Split>
        </div>
      </Section>

      <Section surface="white" id="naeste">
        <div className="flex flex-col gap-10">
          <SectionHeading rule title={c.next.title} lead={c.next.lead} />
          <CtaCards cards={c.next.cards} tone="cream" />
        </div>
      </Section>

      <FaqSection id="spoergsmaal" surface="cream" title={c.faqTitle} items={c.faq} />

      <Disclaimer content={disclaimers.short} />
    </>
  );
}
