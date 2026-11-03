import Link from "next/link";
import type { ReactNode } from "react";

import { ButtonLink, ButtonRow } from "@/components/blocks/links";
import { Media } from "@/components/blocks/media";
import { Eyebrow, GoldRule, Heading, Lead } from "@/components/blocks/typography";
import { Reveal } from "@/components/motion/reveal";
import type { Action, CardVisualKey, CtaCardContent } from "@/content/types";
import { cn } from "@/lib/utils";

/** 2–3 klikbare kort med guldstreg. Hele kortet er et link. `visuals` tegner kortenes illustrationer (fx lagkagen). */
export function CtaCards({
  cards,
  visuals,
  className,
  tone = "white",
  headingLevel = "h3",
}: {
  cards: CtaCardContent[];
  /** h2, når kortene står lige under sidens h1 (forsiden). */
  headingLevel?: "h2" | "h3";
  visuals?: Partial<Record<CardVisualKey, ReactNode>>;
  className?: string;
  tone?: "white" | "cream";
}) {
  const CardHeading = headingLevel;
  return (
    <ul className={cn("grid grid-cols-1 gap-6", cards.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2", className)}>
      {cards.map((c) => (
        <li key={c.href + c.title} className="flex">
          <Link
            href={c.href}
            data-cta="card"
            data-cta-label={c.title}
            className={cn(
              "group flex w-full flex-col gap-4 border-t-2 border-gold p-8 text-ink no-underline transition-[transform,box-shadow] duration-300 ease-toba hover:-translate-y-1 hover:shadow-raised",
              tone === "white" ? "bg-white" : "bg-cream",
            )}
          >
            {c.visual && visuals?.[c.visual]}
            {!c.visual && c.media && <Media media={c.media} sizes="(min-width: 900px) 33vw, 100vw" className="aspect-[16/10] object-cover object-top" />}
            {c.eyebrow && <Eyebrow>{c.eyebrow}</Eyebrow>}
            <CardHeading className="font-serif text-h3 font-medium text-navy">{c.title}</CardHeading>
            <p className="flex-1">{c.text}</p>
            <span className="self-start border-b border-gold pb-0.5 font-semibold text-navy transition-colors group-hover:text-gold-text">{c.linkLabel}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Navy afslutning: titel, indledning, to knapper. */
export function CtaBand({ title, lead, actions, id }: { title: string; lead?: string; actions: Action[]; id?: string }) {
  return (
    <section id={id} className="on-navy scroll-mt-24 bg-navy py-16 text-on-navy md:py-24">
      <Reveal className="wrap flex flex-col items-start gap-6">
        <GoldRule />
        <Heading title={title} />
        {lead && <Lead className="max-w-measure">{lead}</Lead>}
        <ButtonRow actions={actions} />
      </Reveal>
    </section>
  );
}

/** Lille vandret boks: titel + tekst + én knap. */
export function CtaStrip({ title, text, action, tone = "cream" }: { title: string; text: string; action: Action; tone?: "cream" | "white" }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-6 border-t-2 border-gold p-8", tone === "cream" ? "bg-cream" : "bg-white")}>
      <div className="flex max-w-[40rem] flex-col gap-1">
        <h3 className="font-serif text-h3 font-medium text-navy">{title}</h3>
        <p>{text}</p>
      </div>
      <ButtonLink action={action} />
    </div>
  );
}
