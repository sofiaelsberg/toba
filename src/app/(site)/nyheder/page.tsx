import type { Metadata } from "next";

import { TextLink } from "@/components/blocks/links";
import { Media } from "@/components/blocks/media";
import { NewsCard } from "@/components/news/news-card";
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
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <li key={p.slug}>
                  <NewsCard post={p} priority={i < 3} />
                </li>
              ))}
            </ul>
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
