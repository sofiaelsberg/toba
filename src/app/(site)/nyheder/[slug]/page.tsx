import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ButtonLink, TextLink } from "@/components/blocks/links";
import { Eyebrow, Lead } from "@/components/blocks/typography";
import { ArticleBody } from "@/components/news/article-body";
import { NewsCard } from "@/components/news/news-card";
import { pickPosts } from "@/components/news/news-teaser";
import { CtaBand } from "@/components/sections/cta";
import { Disclaimer } from "@/components/sections/legal";
import { news as c } from "@/content/pages/news";
import { disclaimers, routes } from "@/content/site";
import { authorHref, authorPerson } from "@/lib/authors";
import { formatNewsDate, getAllPosts, getPost } from "@/lib/news";
import { pageMetadata } from "@/lib/seo";
import { articleJsonLd, jsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const base = pageMetadata(`${routes.news}/${post.slug}`, { title: `${post.title} | TOBA Advice`, description: post.description });
  return {
    ...base,
    authors: [{ name: post.author }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      ...(post.image ? { images: [{ url: post.image, alt: post.imageAlt || post.title }] } : {}),
    },
  };
}

const wrap = "mx-auto w-full max-w-[46rem] px-6";

/** Adressen læses inde i <Suspense>, så sideskift til et indlæg kan vises med det samme. */
export default function NewsArticlePage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-cream" />}>
      <NewsArticle params={params} />
    </Suspense>
  );
}

async function NewsArticle({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const all = await getAllPosts();
  // Samme forfatters indlæg først (når det er en medarbejder), derefter de nyeste.
  const sameAuthor = authorPerson(post.author) ? all.filter((p) => p.author === post.author).map((p) => p.slug) : [];
  const more = pickPosts(all, sameAuthor, 3, post.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleJsonLd(post))} />
      <article>
        <header className="bg-cream pt-12 pb-10 md:pt-16 md:pb-14">
          <div className={`${wrap} flex flex-col gap-5`}>
            <Link href={routes.news} className="self-start text-small font-semibold text-navy no-underline hover:underline">
              {c.back}
            </Link>
            <Eyebrow>
              <time dateTime={post.date}>{formatNewsDate(post.date)}</time> · {c.by} <Byline name={post.author} />
            </Eyebrow>
            <h1 className="font-serif text-[2.25rem] leading-[2.75rem] font-medium text-navy md:text-[3rem] md:leading-[3.5rem]">{post.title}</h1>
            {post.lead && <Lead className="text-ink-muted">{post.lead}</Lead>}
          </div>
        </header>

        <div className="bg-white py-12 md:py-16">
          <div className={`${wrap} flex flex-col gap-8`}>
            {post.image && post.imageSize && (
              <Image
                src={post.image}
                alt={post.imageAlt ?? ""}
                width={post.imageSize.width}
                height={post.imageSize.height}
                sizes="(min-width: 768px) 736px, 100vw"
                preload
                className="h-auto w-full"
              />
            )}

            <ArticleBody body={post.body} />

            {post.document && (
              <section aria-labelledby="slides" className="flex flex-col gap-3 border-t-2 border-gold bg-cream p-6">
                <h2 id="slides" className="font-serif text-h3 font-medium text-navy">{c.document.title}</h2>
                <p>{c.document.text(post.document.title, post.document.pages)}</p>
                <ButtonLink action={{ label: c.document.action, href: post.linkedin, variant: "secondary" }} className="self-start" />
              </section>
            )}

            <footer className="flex flex-col gap-4 border-t border-line pt-6">
              {post.tags.length > 0 && (
                <p className="text-small text-ink-muted">
                  <span className="font-semibold text-ink">{c.tagsLabel}:</span> {post.tags.join(" · ")}
                </p>
              )}
              <p className="text-small text-ink-muted">{c.publishedOnLinkedIn}</p>
              <TextLink href={post.linkedin} className="self-start">
                {c.linkedinLink}
              </TextLink>
            </footer>
          </div>
        </div>
      </article>

      <CtaBand title={c.cta.title} lead={c.cta.lead} actions={c.cta.actions} />

      {more.length > 0 && (
        <section className="bg-cream py-16 md:py-24">
          <div className="wrap flex flex-col gap-8">
            <h2 className="font-serif text-h2 font-medium text-navy">{c.moreTitle}</h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <NewsCard post={p} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Disclaimer content={disclaimers.standard} />
    </>
  );
}

/** Forfatterens navn – med link til profilen på teamsiden, når det er en medarbejder. */
function Byline({ name }: { name: string }) {
  const person = authorPerson(name);
  if (!person) return <>{name}</>;
  return (
    <Link href={authorHref(person)} rel="author" className="text-inherit underline decoration-gold underline-offset-4 hover:text-navy">
      {name}
    </Link>
  );
}
