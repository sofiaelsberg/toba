import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ButtonLink, ButtonRow, TextLink } from "@/components/blocks/links";
import { Media } from "@/components/blocks/media";
import { Eyebrow, eyebrowClass } from "@/components/blocks/typography";
import { ArticleBody } from "@/components/news/article-body";
import { NewsGrid } from "@/components/news/news-card";
import { SlideViewer } from "@/components/news/slide-viewer";
import { pickPosts } from "@/components/news/news-teaser";
import { Disclaimer } from "@/components/sections/legal";
import { Section, SectionHeading, Split } from "@/components/sections/section";
import { news as c } from "@/content/pages/news";
import { disclaimers, newsPath, routes } from "@/content/site";
import { authorHref, authorPerson } from "@/lib/authors";
import { formatNewsDate, getAllPosts, getPost } from "@/lib/news";
import { pageMetadata, withBrand } from "@/lib/seo";
import { articleJsonLd, jsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const base = pageMetadata(newsPath(post.slug), { title: withBrand(post.title), description: post.description });
  return {
    ...base,
    authors: [{ name: post.author }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      ...(post.cover ? { images: [{ url: post.cover, alt: post.imageAlt || post.title }] } : {}),
    },
    // Samme billede på X/Twitter som på LinkedIn (ellers vises sitets standardbillede).
    ...(post.cover ? { twitter: { card: "summary_large_image", images: [{ url: post.cover, alt: post.imageAlt || post.title }] } } : {}),
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
        <header className="bg-cream pt-12 pb-10 md:pt-16 md:pb-12">
          <div className={`${wrap} flex flex-col gap-5`}>
            <Link href={routes.news} className="self-start text-small font-semibold text-navy no-underline hover:underline">
              {c.back}
            </Link>
            <Eyebrow>
              <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
            </Eyebrow>
            <h1 className="font-serif text-[2.25rem] leading-[2.75rem] font-medium text-navy md:text-[3rem] md:leading-[3.5rem]">{post.title}</h1>
            <Byline name={post.author} />
          </div>
        </header>

        <div className="bg-white py-12 md:py-16">
          <div className={`${wrap} flex flex-col gap-10`}>
            {/* Slides bærer typisk opslaget (tal og grafer) – derfor står de først. */}
            {post.slides?.length ? <SlideViewer title={post.document?.title ?? post.title} slides={post.slides} post={post.slug} /> : null}

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

            {!post.slides?.length && post.document && (
              <aside className="flex flex-col gap-3 border-t-2 border-gold bg-cream p-6">
                <h2 className="font-serif text-h3 font-medium text-navy">{c.document.title}</h2>
                <p>{c.document.text(post.document.title, post.document.pages)}</p>
                <ButtonLink action={{ label: c.document.action, href: post.linkedin, variant: "secondary" }} className="self-start" />
              </aside>
            )}

            {/* Ved delinger: TOBA Advices egen tekst fra delingen. */}
            {post.lead && (
              <aside aria-labelledby="deling" className="flex flex-col gap-2 border-l-2 border-gold bg-cream px-6 py-5">
                <h2 id="deling" className={`${eyebrowClass} text-gold-text`}>
                  {c.sharedBy}
                </h2>
                <p>{post.lead}</p>
              </aside>
            )}

            <AuthorBox name={post.author} />

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

      {more.length > 0 && (
        <section className="bg-cream py-16 md:py-24">
          <div className="wrap flex flex-col gap-8">
            <h2 className="font-serif text-h2 font-medium text-navy">{c.moreTitle}</h2>
            <NewsGrid posts={more} headingLevel="h3" />
          </div>
        </section>
      )}

      {/* Opfordring med et billede fra kontoret – rolig og i øjenhøjde frem for et salgsbanner. */}
      <Section surface="white">
        <Split>
          <Media media={c.cta.media} sizes="(min-width: 900px) 50vw, 100vw" />
          <div className="flex flex-col gap-6">
            <SectionHeading rule title={c.cta.title} lead={c.cta.lead} />
            <ButtonRow actions={c.cta.actions} />
          </div>
        </Split>
      </Section>

      <Disclaimer content={disclaimers.standard} />
    </>
  );
}

/** Forfatteren under titlen – med portræt og link til profilen, når det er en medarbejder. */
function Byline({ name }: { name: string }) {
  const person = authorPerson(name);
  if (!person) {
    return (
      <p className="text-small text-ink-muted">
        {c.by} {name}
      </p>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <Image src={person.portrait.src} alt="" width={96} height={120} sizes="48px" className="size-12 rounded-full object-cover object-top" />
      <p className="flex flex-col text-small leading-5">
        <span>
          {c.by}{" "}
          <Link href={authorHref(person)} rel="author" className="font-semibold text-navy underline decoration-gold underline-offset-4">
            {person.name}
          </Link>
        </span>
        <span className="text-ink-muted">{person.title}</span>
      </p>
    </div>
  );
}

/** "Om forfatteren" efter teksten – hvem der står bag, og hvor man kan læse mere. */
function AuthorBox({ name }: { name: string }) {
  const person = authorPerson(name);
  if (!person) return null;
  const first = person.name.split(" ")[0];
  return (
    <aside aria-labelledby="forfatter" className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-5 border-t-2 border-gold pt-6">
      <Image src={person.portrait.src} alt="" width={144} height={180} sizes="72px" className="aspect-[4/5] w-18 object-cover" />
      <div className="flex flex-col gap-2">
        <h2 id="forfatter" className="font-serif text-[1.375rem] leading-7 font-medium text-navy">
          {c.aboutAuthor(person.name)}
        </h2>
        {person.short && <p>{person.short}</p>}
        <TextLink href={authorHref(person)} className="self-start">
          {c.authorProfile(first)}
        </TextLink>
      </div>
    </aside>
  );
}
