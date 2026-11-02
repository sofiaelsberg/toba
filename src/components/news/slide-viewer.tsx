"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { news } from "@/content/pages/news";
import type { NewsSlide } from "@/lib/news";

/**
 * Slides fra et LinkedIn-dokumentopslag: en vandret række, man kan swipe/scrolle i eller bladre med knapperne,
 * og teksten fra hver slide under billederne (til skærmlæsere, Google og AI-søgning).
 * Virker også uden JavaScript – så scroller man bare.
 */
export function SlideViewer({ title, slides }: { title: string; slides: NewsSlide[] }) {
  const labels = news.slides;
  const id = useId();
  const track = useRef<HTMLOListElement>(null);
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  // Følg med i, hvilken slide der står i midten.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const items = [...el.children] as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(items.indexOf(e.target as HTMLElement));
      },
      { root: el, threshold: 0.6 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const go = (index: number) => {
    const el = track.current;
    const item = el?.children[index] as HTMLElement | undefined;
    if (!el || !item) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const box = el.getBoundingClientRect();
    const r = item.getBoundingClientRect();
    el.scrollBy({ left: r.left + r.width / 2 - (box.left + box.width / 2), behavior: reduce ? "auto" : "smooth" });
    setCurrent(index);
  };

  const button =
    "inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-navy text-navy transition-colors hover:bg-navy hover:text-white disabled:cursor-default disabled:border-line disabled:text-ink-muted disabled:hover:bg-transparent";

  return (
    <section aria-labelledby={`${id}-title`} className="flex flex-col gap-5 border-t-2 border-gold pt-6">
      <h2 id={`${id}-title`} className="font-serif text-h3 font-medium text-navy">
        {labels.title(title)}
      </h2>

      <ol
        ref={track}
        tabIndex={0}
        aria-label={labels.region}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 pb-2 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-2 sm:mx-0 sm:px-0"
      >
        {slides.map((s, i) => (
          <li key={s.src} className="shrink-0 basis-[85%] snap-center sm:basis-[62%]">
            <Image
              src={s.src}
              alt={labels.alt(title, i + 1, total)}
              width={s.width}
              height={s.height}
              sizes="(min-width: 768px) 460px, 85vw"
              className="h-auto w-full border border-line bg-navy"
            />
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-3">
        <button type="button" className={button} onClick={() => go(current - 1)} disabled={current === 0} aria-label={labels.prev}>
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <button type="button" className={button} onClick={() => go(current + 1)} disabled={current === total - 1} aria-label={labels.next}>
          <ChevronRight aria-hidden className="size-5" />
        </button>
        <p aria-live="polite" className="tabular ml-1 text-small text-ink-muted">
          {labels.position(current + 1, total)}
        </p>
      </div>

      <details className="group border-t border-line pt-4">
        <summary className="cursor-pointer font-semibold text-navy marker:text-gold">{labels.textToggle}</summary>
        <ol className="mt-4 flex flex-col gap-4">
          {slides.map((s, i) => (
            <li key={s.src} className="flex flex-col gap-1">
              <span className="text-caption font-semibold tracking-wide text-ink-muted uppercase">{labels.position(i + 1, total)}</span>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
