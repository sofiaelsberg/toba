import type { Metadata } from "next";

import { ButtonRow, TextLink } from "@/components/blocks/links";
import { Media } from "@/components/blocks/media";
import { RichText } from "@/components/blocks/rich-text";
import { Caption, GoldRule, Heading } from "@/components/blocks/typography";
import { VideoBlock } from "@/components/blocks/video-block";
import { ReturnComparison } from "@/components/interactive/charts";
import { ManagerMap } from "@/components/interactive/manager-map";
import { AnchorNav, SegmentTabs } from "@/components/interactive/navigation";
import { StepTimeline } from "@/components/interactive/step-timeline";
import { CtaStrip } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Disclaimer } from "@/components/sections/legal";
import { AccordionList, NumberedSteps, QuoteBlock } from "@/components/sections/lists";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { StatsRow } from "@/components/sections/stats";
import { facts } from "@/content/facts";
import { howWeInvest as c } from "@/content/pages/how-we-invest";
import { disclaimers } from "@/content/site";

export const metadata: Metadata = { title: c.seo.title, description: c.seo.description };

export default function HowWeInvestPage() {
  return (
    <>
      <Hero content={c.hero} aside={<Media media={c.heroMedia} />} />
      <AnchorNav items={c.anchors} label={c.anchorNavLabel} />

      <Section surface="white" id="strategi">
        <div className="flex flex-col gap-12">
          <Split align="end">
            <SectionHeading rule title={c.strategy.title} />
            <p>{c.strategy.lead}</p>
          </Split>
          <StepTimeline steps={c.strategy.steps} />
          <QuoteBlock quote={c.strategy.quote} />
        </div>
      </Section>

      <Section surface="navy" id="afkast">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow={c.returns.eyebrow} title={c.returns.title} lead={c.returns.lead} />
          <ReturnComparison
            start={facts.returnExample.wealthMio}
            years={facts.returnExample.years}
            series={c.returns.series}
            rateLabel={c.returns.rateLabel}
            valueSuffix={c.returns.valueSuffix}
            exampleLabel={c.returns.exampleLabel}
            differenceSuffix={c.returns.differenceSuffix}
            differenceLabel={c.returns.differenceLabel}
            volatility={c.returns.volatility}
            footnote={c.returns.footnote}
          />
        </div>
      </Section>

      <Section id="forvaltere">
        <div className="flex flex-col gap-12">
          <Split align="end">
            <SectionHeading rule title={c.managers.title} />
            <p>{c.managers.lead}</p>
          </Split>
          <StatsRow stats={c.managers.stats} />
          <Split align="start">
            <AccordionList items={c.managers.process} defaultOpen={0} />
            <div className="flex flex-col gap-6">
              <ManagerMap content={c.managers.map} />
              <div className="grid grid-cols-[10rem_minmax(0,1fr)] items-center gap-5">
                <VideoBlock video={{ ...c.managers.video, caption: undefined }} compact />
                <div className="flex flex-col gap-3">
                  <p className="text-small text-ink-muted">{c.managers.video.caption}</p>
                  <TextLink href={c.managers.link.href} className="self-start">
                    {c.managers.link.label}
                  </TextLink>
                </div>
              </div>
            </div>
          </Split>
        </div>
      </Section>

      <Section surface="white" id="private">
        <div className="flex flex-col gap-12">
          <Split align="end">
            <SectionHeading eyebrow={c.privateMarkets.eyebrow} title={c.privateMarkets.title} />
            <p>{c.privateMarkets.lead}</p>
          </Split>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.privateMarkets.categories.map((cat) => (
              <li key={cat.title} className="group flex flex-col gap-3">
                <div className="overflow-hidden">
                  <Media media={cat.media} className="transition-transform duration-700 ease-toba group-hover:scale-[1.04]" />
                </div>
                <h3 className="font-serif text-[1.5rem] leading-8 font-medium text-navy">{cat.title}</h3>
                <p className="text-base">{cat.text}</p>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 gap-8 bg-cream p-8 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <p className="text-small text-ink-muted">{c.privateMarkets.access.fromLabel}</p>
              <p className="font-serif text-[2rem] leading-10 font-medium text-ink-muted line-through decoration-gold">{c.privateMarkets.access.fromValue}</p>
              <p className="mt-3 text-small text-ink-muted">{c.privateMarkets.access.toLabel}</p>
              <p className="font-serif text-stat font-medium text-navy">{c.privateMarkets.access.toValue}</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>{c.privateMarkets.access.text}</p>
              <Caption>{c.privateMarkets.access.risk}</Caption>
            </div>
          </div>
        </div>
      </Section>

      <Section id="helheden">
        <Split align="start">
          <div className="flex flex-col gap-5">
            <SectionHeading rule title={c.whole.title} lead={c.whole.lead} />
            <p className="border-l border-gold-light pl-4 text-navy">{c.whole.note}</p>
          </div>
          <ul className="border-b border-line">
            {c.whole.areas.map((a) => (
              <li key={a.title} className="border-t border-line py-5">
                <h3 className="mb-1.5 font-serif text-[1.5rem] leading-8 font-medium text-navy">{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </Split>
      </Section>

      <Section surface="white" id="samarbejde">
        <div className="flex flex-col gap-16">
          <Split align="start">
            <div className="flex flex-col gap-5">
              <SectionHeading rule title={c.cooperation.title} />
              <SegmentTabs modes={c.cooperation.modes} label={c.cooperation.tabsLabel} />
              <p className="bg-cream px-6 py-5">
                <RichText text={c.cooperation.noBankSwitch} />
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-h3 font-medium text-navy">{c.cooperation.overview.title}</h3>
              <p>{c.cooperation.overview.text}</p>
              <Media media={c.cooperation.overview.media} />
              <Caption>{c.cooperation.overview.caption}</Caption>
            </div>
          </Split>
          <CtaStrip title={c.cooperation.price.title} text={c.cooperation.price.text} action={c.cooperation.price.action} />
        </div>
      </Section>

      <section id="kom-i-gang" className="on-navy scroll-mt-24 bg-navy py-16 text-on-navy md:py-24">
        <div className="wrap flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <GoldRule />
            <Heading title={c.getStarted.title} />
          </div>
          <NumberedSteps steps={c.getStarted.steps} />
          <ButtonRow actions={c.getStarted.actions} />
        </div>
      </section>

      <Disclaimer content={disclaimers.standard} />
    </>
  );
}
