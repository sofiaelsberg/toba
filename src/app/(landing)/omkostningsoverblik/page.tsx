import type { Metadata } from "next";
import Link from "next/link";

import { ButtonRow } from "@/components/blocks/links";
import { Eyebrow, GoldRule, Heading, Lead } from "@/components/blocks/typography";
import { VideoBlock } from "@/components/blocks/video-block";
import { OverviewForm } from "@/components/forms/forms";
import { SelfCheck } from "@/components/interactive/checklists";
import { DepotExample } from "@/components/interactive/depot-example";
import { StepTimeline } from "@/components/interactive/step-timeline";
import { LandingHeader } from "@/components/layout/landing-header";
import { CtaStrip } from "@/components/sections/cta";
import { Disclaimer } from "@/components/sections/legal";
import { AccordionList, PointList } from "@/components/sections/lists";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { FactBox } from "@/components/sections/stats";
import { overview as c } from "@/content/pages/overview";
import { disclaimers } from "@/content/site";

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  openGraph: { description: c.seo.ogDescription },
};

/** Landingsside 2 – primær konvertering: bestil et gratis omkostningsoverblik. */
export default function OverviewPage() {
  return (
    <>
      <LandingHeader action={c.headerAction} />
      <main id="indhold">
        <section className="bg-cream py-16 md:pt-22 md:pb-24">
          <div className="wrap grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
            <div className="flex flex-col gap-6">
              <Eyebrow>{c.hero.eyebrow}</Eyebrow>
              <Heading as="h1" size="display" title={c.hero.title} className="md:text-[3.75rem] md:leading-[4.125rem]" />
              <Lead className="max-w-150">{c.hero.lead}</Lead>
              <ButtonRow actions={c.hero.actions} className="mt-2" />
            </div>
            <Link href={c.heroTeaser.href} className="flex flex-col gap-3 border-t-2 border-gold bg-white p-8 text-ink no-underline shadow-raised">
              <Eyebrow className="text-ink-muted">{c.heroTeaser.eyebrow}</Eyebrow>
              <p className="font-serif text-[4.5rem] leading-none font-medium text-navy">{c.heroTeaser.value}</p>
              <p>{c.heroTeaser.label}</p>
              <p className="mt-2 font-serif text-h3 font-medium text-gold-text">{c.heroTeaser.yearly}</p>
              <span className="mt-2 self-start border-b border-gold pb-0.5 font-semibold text-navy">{c.heroTeaser.link}</span>
            </Link>
          </div>
        </section>

        <Section surface="white">
          <Split align="start">
            <div className="flex flex-col gap-5">
              <SectionHeading rule title={c.what.title} />
              {c.what.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <PointList title={c.what.answersTitle} points={c.what.answers} />
          </Split>
        </Section>

        <Section id="eksempel">
          <div className="flex flex-col gap-10">
            <Split align="end">
              <SectionHeading rule title={c.example.title} />
              <p>{c.example.lead}</p>
            </Split>
            <DepotExample content={c.example} />
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {c.example.howToRead.map((p) => (
                <li key={p.title} className="border-t border-line pt-4">
                  <p className="font-semibold text-navy">{p.title}</p>
                  <p className="text-base">{p.text}</p>
                </li>
              ))}
            </ul>
            <p className="text-caption text-ink-muted">{c.example.caption}</p>
          </div>
        </Section>

        <Section surface="white">
          <Split align="start">
            <div className="flex flex-col gap-5">
              <SectionHeading rule title={c.clarity.title} />
              {c.clarity.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <SelfCheck title={c.clarity.fitTitle} items={c.clarity.fits} result={c.clarity.fitResult} action={c.clarity.fitAction} />
          </Split>
        </Section>

        <Section surface="navy">
          <Split>
            <VideoBlock video={c.rebates.video} className="max-w-115" />
            <div className="flex flex-col gap-5">
              <GoldRule />
              <Heading title={c.rebates.title} />
              {c.rebates.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
              <FactBox fact={c.rebates.fact} tone="plain" className="border-t border-gold-light pt-5" />
            </div>
          </Split>
        </Section>

        <Section>
          <div className="flex flex-col gap-12">
            <SectionHeading rule title={c.how.title} />
            <StepTimeline steps={c.how.steps} numbering="plain" />
          </div>
        </Section>

        <section id="bestil" className="scroll-mt-20 bg-white py-16 md:py-24">
          <div className="wrap max-w-[53.75rem]">
            <div className="border-t-2 border-gold bg-cream p-8 shadow-raised md:p-12">
              <OverviewForm />
            </div>
          </div>
        </section>

        <Section>
          <Split align="start">
            <SectionHeading rule title={c.faqTitle} />
            <AccordionList items={c.faq} />
          </Split>
        </Section>

        <section className="bg-cream pb-16 md:pb-24">
          <div className="wrap">
            <CtaStrip title={c.notReady.title} text={c.notReady.text} action={c.notReady.action} tone="white" />
          </div>
        </section>

        <Disclaimer content={disclaimers.overview} />
      </main>
    </>
  );
}
