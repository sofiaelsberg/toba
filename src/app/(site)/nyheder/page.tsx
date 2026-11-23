import type { Metadata } from "next";

import { TextLink } from "@/components/blocks/links";
import { Media } from "@/components/blocks/media";
import { NewsGrid } from "@/components/news/news-card";
import { Hero } from "@/components/sections/hero";
import { Disclaimer } from "@/components/sections/legal";
import { Section } from "@/components/sections/section";
import { news as c } from "@/content/pages/news";
import { company, disclaimers, routes } from "@/content/site";
import { getAllPosts } from "@/lib/news";
import { pageMetadata } from "@/lib/seo";
import { jsonLd, newsListJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(routes.news, c.seo);

export default async function NewsPage() {
  const posts = await getAllPosts();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(newsListJsonLd(posts))} />
      <Hero content={c.hero} aside={<Media media={c.heroMedia} priority />} />
      <Section spacing="none" className="pb-16 md:pb-24">
        <div className="flex flex-col gap-10">
          {posts.length ? (
            <NewsGrid posts={posts} priority={3} />
          ) : (
            <p>{c.empty}</p>
          )}
          <TextLink href={company.linkedin} className="self-start">
            {c.follow.label}
          </TextLink>
        </div>
      </Section>
      <Disclaimer content={disclaimers.short} />
    </>
  );
}
