import type { Metadata } from "next";

import { ButtonLink } from "@/components/blocks/links";
import { Eyebrow, GoldRule, Heading, Lead } from "@/components/blocks/typography";
import { VideoBlock } from "@/components/blocks/video-block";
import { ActiveCampaignForm } from "@/components/forms/ac-form";
import { SelfCheck } from "@/components/interactive/checklists";
import { CostCalculator } from "@/components/interactive/cost-calculator";
import { DepotExample } from "@/components/interactive/depot-example";
import { StepTimeline } from "@/components/interactive/step-timeline";
import { LandingShell } from "@/components/layout/landing-shell";
import { CtaStrip } from "@/components/sections/cta";
import { AccordionList, PointList } from "@/components/sections/lists";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { FactBox, StatsRow } from "@/components/sections/stats";
import { overview as c } from "@/content/pages/overview";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { faqJsonLd, jsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(routes.overview, c.seo, { ownShareImage: true });

/** Landingsside 2 – primær konvertering: bestil et gratis omkostningsoverblik. */
export default function OverviewPage() {
  return (
    <LandingShell action={c.headerAction}>
      <section className="bg-cream py-16 md:pt-22 md:pb-24">
        <div className="wrap grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] md:gap-16">
          <div className="flex flex-col gap-6 md:pt-6">
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>
            <Heading as="h1" size="display" title={c.hero.title} className="md:text-[3.75rem] md:leading-[4.125rem]" />
            <Lead className="max-w-150">{c.hero.lead}</Lead>
            {c.heroText.map((t) => (
              <p key={t} className="max-w-150">
                {t}
              </p>
            ))}
          </div>
          {/* Formularen står i hero, så den er det første, man møder. */}
          <div id="bestil" className="scroll-mt-24">
            <ActiveCampaignForm
              id={c.form.id}
              label={c.form.label}
              title={c.form.title}
              intro={c.form.intro}
              microcopy={c.form.microcopy}
            />
          </div>
        </div>
      </section>

      <Section surface="white">
        <Split align="start">
          <div className="flex flex-col gap-5">
            <SectionHeading rule title={c.what.title} />
            {c.what.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <p className="border-l border-gold-light pl-4 text-navy">{c.what.note}</p>
            <ButtonLink action={c.what.action} className="mt-2 self-start" />
          </div>
          <PointList title={c.what.answersTitle} points={c.what.answers} />
        </Split>
      </Section>

      <Section id="eksempel">
        <div className="flex flex-col gap-10">
          <Split align="start">
            <div className="flex flex-col gap-5">
              <SectionHeading rule title={c.example.title} />
              {c.example.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <StatsRow stats={c.example.keyFigures} className="md:mt-14 md:grid-cols-2" />
          </Split>
          <DepotExample content={c.example} />
          <p className="text-caption text-ink-muted">{c.example.caption}</p>
          <div className="flex flex-col gap-6">
            <h3 className="font-serif text-h3 font-medium text-navy">{c.example.findingsTitle}</h3>
            <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {c.example.findings.map((p, i) => (
                <li key={p.title} className="flex flex-col gap-1 border-t border-line pt-4">
                  <span className="font-serif text-h3 font-medium text-gold-text">{i + 1}</span>
                  <p className="font-semibold text-navy">{p.title}</p>
                  <p className="text-base">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
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

      <Section surface="white">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow={c.calculator.eyebrow} title={c.calculator.title} lead={c.calculator.lead} />
          <CostCalculator content={c.calculator.content} />
        </div>
      </Section>

      <Section>
        <Split align="start">
          <div className="flex flex-col gap-5">
            <SectionHeading rule title={c.relevant.title} />
            <p>{c.relevant.closing}</p>
          </div>
          <SelfCheck title={c.relevant.fitTitle} items={c.relevant.fits} result={c.relevant.fitResult} action={c.relevant.fitAction} />
        </Split>
      </Section>

      <Section surface="white">
        <div className="flex flex-col gap-12">
          <SectionHeading rule title={c.how.title} />
          <StepTimeline steps={c.how.steps} numbering="plain" />
          <ButtonLink action={c.how.action} className="self-start" />
        </div>
      </Section>

      <Section>
        <Split align="start">
          <SectionHeading rule title={c.faqTitle} />
          <AccordionList items={c.faq} />
          <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(c.faq))} />
        </Split>
      </Section>

      <section className="bg-cream pb-16 md:pb-24">
        <div className="wrap">
          <CtaStrip title={c.notReady.title} text={c.notReady.text} action={c.notReady.action} tone="white" />
        </div>
      </section>

    </LandingShell>
  );
}
