import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { news as c } from "@/content/pages/news";
import { newsPath } from "@/content/site";
import { formatNewsDate, type NewsPost } from "@/lib/news";

/** Indlæg som kort i et grid (1–3 kolonner). `priority`: antal kort øverst, hvis billede hentes med det samme. */
export function NewsGrid({ posts, headingLevel, priority = 0 }: { posts: NewsPost[]; headingLevel?: "h2" | "h3"; priority?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <li key={p.slug}>
          <NewsCard post={p} headingLevel={headingLevel} priority={i < priority} />
        </li>
      ))}
    </ul>
  );
}

/** Kort til oversigten. Indlæg uden billede får en rolig navy-flade med titlen på slides. */
export function NewsCard({ post, headingLevel = "h2", priority = false }: { post: NewsPost; headingLevel?: "h2" | "h3"; priority?: boolean }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col border-t-2 border-gold bg-white transition-shadow duration-300 ease-toba hover:shadow-raised">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            preload={priority}
            className="object-cover transition-transform duration-700 ease-toba group-hover:scale-[1.03]"
          />
        ) : post.slides?.length ? (
          // Forsiden af slides – vist i sin helhed på navy, som et dokument.
          <Image
            src={post.slides[0].src}
            alt=""
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 60vw"
            preload={priority}
            className="object-contain py-4 drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-toba group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden className="flex size-full flex-col justify-between p-6 text-white">
            <FileText className="size-6 text-gold-on-navy" />
            <p className="line-clamp-3 font-serif text-[1.375rem] leading-7">{post.document?.title ?? post.title}</p>
          </div>
        )}
        {post.document && (
          <span className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 text-caption font-semibold text-navy">{c.slidesBadge}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-caption text-ink-muted">
          <time dateTime={post.date}>{formatNewsDate(post.date)}</time> · {post.author}
        </p>
        <Heading className="font-serif text-[1.375rem] leading-7 font-medium text-navy">
          {/* Hele kortet er klikbart via ::after på linket. */}
          <Link href={newsPath(post.slug)} className="no-underline after:absolute after:inset-0" data-cta="news_card">
            {post.title}
          </Link>
        </Heading>
        <p className="line-clamp-3 text-small text-ink">{post.description}</p>
        <span aria-hidden className="mt-auto self-start border-b border-gold pb-0.5 text-small font-semibold text-navy">
          {c.readMore} →
        </span>
      </div>
    </article>
  );
}
