import { TextLink } from "@/components/blocks/links";
import { NewsCard } from "@/components/news/news-card";
import { Section, SectionHeading } from "@/components/sections/section";
import { news } from "@/content/pages/news";
import { routes } from "@/content/site";
import type { NewsTeaserContent } from "@/content/types";
import { getAllPosts, type NewsPost } from "@/lib/news";

/** Udvælger indlæg: de valgte først, derefter de nyeste. */
export function pickPosts(all: NewsPost[], slugs: string[] = [], limit = 3, exclude?: string): NewsPost[] {
  const pool = all.filter((p) => p.slug !== exclude);
  const chosen = slugs.map((s) => pool.find((p) => p.slug === s)).filter((p): p is NewsPost => Boolean(p));
  const rest = pool.filter((p) => !chosen.includes(p));
  return [...chosen, ...rest].slice(0, limit);
}

/** Sektion med tre indlæg fra /nyheder – til forsiden og emnesiderne (intern linkning). */
export async function NewsTeaser({ content, surface = "cream", id }: { content: NewsTeaserContent; surface?: "cream" | "white"; id?: string }) {
  const posts = pickPosts(await getAllPosts(), content.slugs);
  if (!posts.length) return null;
  return (
    <Section surface={surface} id={id}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading rule title={content.title} lead={content.lead} />
          <TextLink href={routes.news}>{news.allLink}</TextLink>
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <NewsCard post={p} headingLevel="h3" />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
