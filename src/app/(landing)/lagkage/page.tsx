import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/blocks/links";
import { Heading, Lead } from "@/components/blocks/typography";
import { VideoBlock } from "@/components/blocks/video-block";
import { GuideEmbedForm } from "@/components/forms/ac-form";
import { LockedChecklist, LockedChecklistIntro, UnlockProvider } from "@/components/interactive/checklists";
import { LayerCake } from "@/components/interactive/layer-cake";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/sections/legal";
import { FeatureList, PointList } from "@/components/sections/lists";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { FactBox, StatsRow } from "@/components/sections/stats";
import { cake } from "@/content/cake";
import { guide as c } from "@/content/pages/guide";
import { disclaimers, routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.guide, c.seo);

/** Landingsside 1 – LinkedIn-kampagnen: hent guiden. */
export default function GuidePage() {
  return (
    <UnlockProvider>
      {/* Wrapper: så starter et sideskift i toppen – se (site)/layout.tsx. */}
      <div className="flex flex-1 flex-col">
      <Header action={c.headerAction} />
      <main id="indhold">
        <section className="bg-cream py-16 md:pt-22 md:pb-24">
          <div className="wrap grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
            <div className="flex flex-col gap-6">
              <p className="text-eyebrow font-semibold tracking-[0.12em] text-gold-text uppercase">{c.hero.eyebrow}</p>
              <Heading as="h1" size="display" title={c.hero.title} className="md:text-[4rem] md:leading-[4.375rem]" />
              <Lead className="max-w-150">{c.hero.lead}</Lead>
              {c.heroText.map((t) => (
                <p key={t} className="max-w-150">
                  {t}
                </p>
              ))}
            </div>
            {/* Formularen står i hero på desktop og lige under introen på mobil. */}
            <div id="guide" className="scroll-mt-24">
              <GuideEmbedForm id={c.form.id} label={c.form.label} title={c.form.title} intro={c.form.intro} microcopy={c.form.microcopy} />
            </div>
          </div>
        </section>

        <Section surface="white">
          <Split>
            <div className="flex flex-col gap-5">
              <SectionHeading rule title={c.intro.title} />
              {c.intro.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
              <FactBox fact={c.intro.fact} className="mt-2" />
            </div>
            <div className="flex flex-col gap-3">
              <LayerCake content={{ ...cake, footnote: c.intro.cakeNote }} autoplay />
            </div>
          </Split>
        </Section>

        <Section>
          <Split>
            <VideoBlock video={c.video.video} className="max-w-120" />
            <div className="flex flex-col gap-6">
              <SectionHeading rule title={c.video.title} lead={c.video.text} />
              <ButtonLink action={c.video.action} className="self-start" />
            </div>
          </Split>
        </Section>

        <Section surface="white">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading rule title={c.benefits.title} lead={c.benefits.lead} />
              <PointList points={c.benefits.points} />
            </div>
            {/* Guidens forside som fysisk rapport – retter sig op ved hover */}
            <div className="mx-auto w-full max-w-80 [perspective:1200px] md:max-w-100">
              <Image
                src={c.cover.src}
                alt={c.cover.alt}
                width={c.cover.width}
                height={c.cover.height}
                sizes="(min-width: 900px) 400px, 320px"
                className="h-auto w-full shadow-[0_30px_60px_rgba(37,55,71,0.25),0_8px_24px_rgba(37,55,71,0.08)] transition-transform duration-700 ease-toba [transform:rotateY(-10deg)_rotateX(3deg)] hover:[transform:rotateY(-3deg)_rotateX(1deg)_translateY(-4px)] motion-reduce:[transform:none]"
              />
            </div>
          </div>
        </Section>

        <Section>
          <Split align="start">
            <div className="flex flex-col gap-5">
              <SectionHeading rule title={c.checklist.title} lead={c.checklist.lead} />
              <LockedChecklistIntro teaser={c.checklist.teaser} teaserAction={c.checklist.teaserAction} unlockedText={c.checklist.unlocked} />
            </div>
            <LockedChecklist questions={c.checklist.questions} freeIndexes={c.checklist.freeIndexes} />
          </Split>
        </Section>

        <Section surface="navy">
          <div className="flex flex-col gap-12">
            <SectionHeading rule title={c.about.title} lead={c.about.lead} leadClassName="text-on-navy-muted" />
            <FeatureList features={c.about.features} />
            <StatsRow stats={c.about.stats} />
          </div>
        </Section>

        <Section surface="white">
          <Split>
            <SectionHeading rule title={c.secondary.title} />
            <div className="flex flex-col gap-4">
              {c.secondary.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
              <ButtonLink action={c.secondary.action} className="self-start" />
            </div>
          </Split>
        </Section>

        <Disclaimer content={disclaimers.guide} />
      </main>
      </div>
    </UnlockProvider>
  );
}
