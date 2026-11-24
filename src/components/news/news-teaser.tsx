import { NewsGrid } from "@/components/news/news-card";
import { HeadingRow, Section } from "@/components/sections/section";
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
        <HeadingRow title={content.title} lead={content.lead} link={{ href: routes.news, label: news.allLink }} action={news.newsletterButton} />
        <NewsGrid posts={posts} headingLevel="h3" />
      </div>
    </Section>
  );
}
