import { Check } from "lucide-react";
import type { Metadata } from "next";

import { TextLink } from "@/components/blocks/links";
import { Media } from "@/components/blocks/media";
import { RichText } from "@/components/blocks/rich-text";
import { Caption } from "@/components/blocks/typography";
import { ReturnComparison } from "@/components/interactive/charts";
import { ManagerMap } from "@/components/interactive/manager-map";
import { AnchorNav } from "@/components/interactive/navigation";
import { StepTimeline } from "@/components/interactive/step-timeline";
import { Hero } from "@/components/sections/hero";
import { AccordionList, QuoteBlock } from "@/components/sections/lists";
import { PersonQuote } from "@/components/sections/person-quote";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { facts } from "@/content/facts";
import { howWeInvest as c } from "@/content/pages/how-we-invest";
import { people } from "@/content/people";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.howWeInvest, c.seo);

export default function HowWeInvestPage() {
  const cio = people.find((p) => p.slug === c.cioQuote.personSlug);
  return (
    <>
      <Hero
        content={c.hero}
        layout="bleed"
        trustBand
        aside={
          <Media
            media={c.heroMedia}
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className="aspect-4/3 object-cover object-[center_20%] md:absolute md:inset-0 md:aspect-auto md:size-full"
          />
        }
      />
      <AnchorNav items={c.anchors} label={c.anchorNavLabel} />

      <Section surface="white" id="strategi">
        <div className="flex flex-col gap-12">
          <SectionHeading rule title={c.strategy.title} />
          <StepTimeline steps={c.strategy.steps} />
          <QuoteBlock quote={c.strategy.quote} />
        </div>
      </Section>

      {cio && (
        <Section>
          <PersonQuote text={c.cioQuote.text} person={cio} />
        </Section>
      )}

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
          <SectionHeading rule title={c.managers.title} />
          <div aria-hidden className="border-t-2 border-gold-light" />
          <Split align="start">
            <AccordionList items={c.managers.process} defaultOpen={0} />
            <div className="flex flex-col gap-6">
              <ManagerMap content={c.managers.map} />
              <TextLink href={c.managers.link.href} className="self-start">
                {c.managers.link.label}
              </TextLink>
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
          <Split>
            <div className="flex flex-col gap-6">
              <SectionHeading rule title={c.cooperation.title} lead={c.cooperation.lead} />
              <ul className="flex flex-col gap-3">
                {c.cooperation.points.map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <Check aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
                    <p>
                      <strong className="font-semibold text-navy">{p.title}</strong> {p.text}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="border-l-2 border-gold-light pl-4 text-navy">
                <RichText text={c.cooperation.noBankSwitch} />
              </p>
            </div>
            <figure className="flex flex-col gap-3">
              <Media media={c.cooperation.media} />
              <Caption>{c.cooperation.caption}</Caption>
            </figure>
          </Split>
        </div>
      </Section>

    </>
  );
}
