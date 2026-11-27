import { AdvisersVisual, CakeVisual, OverviewVisual } from "@/components/blocks/card-visuals";
import { ButtonLink, ButtonRow, TextLink } from "@/components/blocks/links";
import { GoldRule, Heading } from "@/components/blocks/typography";
import { CtaCards } from "@/components/sections/cta";
import { FactBox } from "@/components/sections/stats";
import { FaqSection, FeatureList, NumberedSteps } from "@/components/sections/lists";
import { NewsTeaser } from "@/components/news/news-teaser";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { WealthMap } from "@/components/sections/wealth-map";
import { routes } from "@/content/site";

import { AmbientVideo } from "@/components/blocks/ambient-video";
import { Hero } from "@/components/sections/hero";
import type { Metadata } from "next";
import { ShareFact } from "@/components/interactive/charts";
import { VideoBlock } from "@/components/blocks/video-block";
import { home as c } from "@/content/pages/home";
import { cake } from "@/content/cake";
import { independent } from "@/content/pages/independent";
import { overview } from "@/content/pages/overview";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.home, c.seo);

/** Forside – referencen for, hvordan sider sættes sammen af sektioner + indhold. */
export default function HomePage() {
  return (
    <>
      <Hero
        content={c.hero}
        layout="bleed"
        trustBand
        aside={<AmbientVideo video={c.heroMedia} className="aspect-4/3 md:absolute md:inset-0 md:aspect-auto" />}
      />

      <Section surface="white">
        <Split>
          <div className="flex flex-col gap-5">
            <SectionHeading rule title={c.sameSide.title} />
            {c.sameSide.text.map((t) => (
              <p key={t} className="max-w-measure">
                {t}
              </p>
            ))}
            <blockquote className="mt-2 max-w-measure border-l-2 border-gold pl-6">
              <p className="font-serif text-quote font-normal text-navy italic">{c.sameSide.quote}</p>
            </blockquote>
          </div>
          <VideoBlock video={c.sameSide.video} />
        </Split>
      </Section>

      <Section>
        <div className="flex flex-col gap-10 md:gap-12">
          <SectionHeading rule title={c.values.title} />
          <FeatureList features={c.values.features} />
        </div>
      </Section>

      <Section surface="white">
        <Split ratio="5-7" align="center">
          <SectionHeading rule title={c.wholeWealth.title} lead={c.wholeWealth.lead} actions={c.wholeWealth.actions} />
          <WealthMap content={c.wholeWealth.map} />
        </Split>
      </Section>

      <Section surface="navy" id="bank">
        <Split>
          <div className="flex flex-col gap-6">
            <SectionHeading rule title={c.bank.title} />
            {c.bank.text.map((t) => (
              <p key={t} className="max-w-measure">
                {t}
              </p>
            ))}
            <ButtonLink action={c.bank.action} className="self-start" />
          </div>
          <VideoBlock video={c.bank.video} />
        </Split>
        <ShareFact
          className="mt-14"
          value={c.bank.value}
          label={c.bank.factLabel}
          text={c.bank.factText}
          segments={c.bank.segments}
          source={c.bank.source}
        />
      </Section>

      <Section id="vilkaar">
        <Split>
          <div className="flex flex-col gap-6">
            <SectionHeading rule title={c.terms.title} lead={c.terms.lead} />
            <FactBox fact={c.terms.fact} tone="plain" className="border-t border-line pt-6" />
          </div>
          <VideoBlock video={c.terms.video} />
        </Split>
        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between md:gap-12">
          <p className="max-w-measure">{c.terms.text}</p>
          <div className="flex shrink-0 flex-col items-start gap-4">
            <ButtonLink action={c.terms.action} />
            <TextLink href={c.terms.link.href} className="text-small font-normal">
              {c.terms.link.label}
            </TextLink>
          </div>
        </div>
      </Section>

      <Section surface="white">
        <div className="flex flex-col gap-10">
          <SectionHeading rule title={c.ctaIntro.title} lead={c.ctaIntro.lead} />
          <CtaCards
            headingLevel="h3"
            tone="cream"
            cards={c.ctaCards}
            visuals={{
              cake: <CakeVisual content={cake} />,
              overview: <OverviewVisual content={overview.example} />,
              advisers: <AdvisersVisual content={independent.kinds} />,
            }}
          />
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

      <NewsTeaser content={c.news} id="nyheder" />

      <FaqSection id="spoergsmaal" title={c.faqTitle} items={c.faq} />
    </>
  );
}
