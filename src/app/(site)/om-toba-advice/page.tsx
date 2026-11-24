import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink, TextLink } from "@/components/blocks/links";
import { Eyebrow, headingClass } from "@/components/blocks/typography";
import { Media } from "@/components/blocks/media";
import { VideoBlock } from "@/components/blocks/video-block";
import { NewsCard } from "@/components/news/news-card";
import { CtaBand } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { FeatureList } from "@/components/sections/lists";
import { PeopleGrid } from "@/components/sections/people";
import { PersonQuote } from "@/components/sections/person-quote";
import { HeadingRow, Section, SectionHeading, Split } from "@/components/sections/section";
import { about as c } from "@/content/pages/about";
import { advisers, people } from "@/content/people";
import { brand, routes } from "@/content/site";
import { getAllPosts } from "@/lib/news";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.about, c.seo);

export default async function AboutPage() {
  const [latestPost] = await getAllPosts();
  const quotePerson = people.find((p) => p.slug === c.ownerQuote.personSlug);
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
            className="aspect-4/3 object-cover md:absolute md:inset-0 md:aspect-auto md:size-full"
          />
        }
      />

      <Section surface="white">
        <div className="flex flex-col gap-10">
          <HeadingRow title={c.advisers.title} lead={c.advisers.lead} link={c.advisers.link} />
          <PeopleGrid people={advisers} />
          {quotePerson && <PersonQuote text={c.ownerQuote.text} person={quotePerson} className="mt-6 border-t border-line pt-12" />}
        </div>
      </Section>

      <Section>
        <Split align="start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:gap-5">
              <Eyebrow>{c.name.eyebrow}</Eyebrow>
              <h2 className={headingClass}>
                {c.name.title.before}{" "}
                <Image
                  src={brand.logoDark.src}
                  width={brand.logoDark.width}
                  height={brand.logoDark.height}
                  alt={c.name.title.logoAlt}
                  className="inline-block h-[1.1em] w-auto align-[-0.21em]"
                />
                {c.name.title.after}
              </h2>
            </div>
            {c.name.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <VideoBlock video={c.name.video} />
        </Split>
      </Section>

      <Section surface="white">
        <Split align="center">
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-h3 font-medium text-navy">{c.latestNews.title}</h2>
            <p className="max-w-measure">{c.latestNews.lead}</p>
            <TextLink href={c.latestNews.link.href} className="self-start">
              {c.latestNews.link.label}
            </TextLink>
            <ButtonLink action={c.latestNews.newsletter} className="mt-4 self-start" />
          </div>
          {latestPost && (
            <div className="w-full max-w-md justify-self-center border-x border-b border-line md:justify-self-end">
              <NewsCard post={latestPost} headingLevel="h3" />
            </div>
          )}
        </Split>
      </Section>

      <Section>
        <div className="flex flex-col gap-12">
          <SectionHeading rule title={c.benefits.title} />
          <FeatureList features={c.benefits.features} />
          <TextLink href={c.benefits.link.href} className="self-start">
            {c.benefits.link.label}
          </TextLink>
        </div>
      </Section>

      <Section surface="white">
        <Split align="center">
          <div className="flex flex-col gap-5">
            <SectionHeading rule title={c.forYou.title} />
            <p>{c.forYou.text}</p>
          </div>
          <div className="flex flex-col gap-3 border-t-2 border-gold bg-cream p-8 md:p-10">
            <p className="font-serif text-stat font-medium text-navy">{c.forYou.highlight}</p>
            <p className="text-ink-muted">{c.forYou.highlightLabel}</p>
          </div>
        </Split>
      </Section>

      <CtaBand title={c.closing.title} lead={c.closing.lead} actions={c.closing.actions} tone="cream" />
    </>
  );
}
