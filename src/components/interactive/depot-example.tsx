"use client";

import { useProgressInView } from "@/components/motion/use-progress-in-view";
import type { overview } from "@/content/pages/overview";
import { formatNumber, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type Content = (typeof overview)["example"];

const SCALE = 1.6; // % om året = fuld søjle
const kindColor = { service: "bg-navy", product: "bg-gold", total: "bg-layer-3" } as const;
const weightColors = ["bg-gold", "bg-gold-soft", "bg-grey-light"];

/** Omkostningsoverblikket: tre depoter og et samlet panel, hvor lagene lægges sammen. */
export function DepotExample({ content }: { content: Content }) {
  const { ref: cardsRef, progress: cardsProgress } = useProgressInView<HTMLUListElement>({ amount: 0.3, duration: 0.9 });
  const { ref: sumRef, progress: sumProgress } = useProgressInView<HTMLDivElement>({ amount: 0.5, duration: 1.6 });

  return (
    <div className="flex flex-col gap-10">
      <ul ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {content.depots.map((d) => (
          <li key={d.name} className="flex flex-col gap-4 border-t-2 border-line bg-white p-7">
            <p className="text-eyebrow font-semibold tracking-[0.12em] text-ink-muted uppercase">{d.name}</p>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <span className="tabular font-serif text-[1.625rem] leading-8 font-medium text-navy">{formatNumber(d.amount)} kr.</span>
              <span className="text-[0.875rem] text-ink-muted">
                {d.share} {content.shareSuffix}
              </span>
            </div>
            <div className="flex flex-col gap-2 bg-cream p-4">
              <p className="text-eyebrow font-semibold tracking-[0.12em] text-gold-text uppercase">{content.costsLabel}</p>
              {d.lines.map((l) => (
                <div key={l.label} className="flex justify-between gap-3 text-base">
                  <span className="flex items-center gap-2">
                    <span aria-hidden className={cn("size-2.5", kindColor[l.kind])} />
                    {l.label}
                  </span>
                  <span className="tabular">{formatPercent(l.pct)}</span>
                </div>
              ))}
              <div role="img" aria-label={d.lines.map((l) => `${l.label} ${formatPercent(l.pct)}`).join(", ")} className="mt-1 flex h-3 bg-white">
                {d.lines.map((l) => (
                  <div key={l.label} className={kindColor[l.kind]} style={{ width: `${(l.pct / SCALE) * 100 * cardsProgress}%` }} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t-2 border-line pt-3.5">
              <div>
                <p className="font-semibold text-navy">{content.depotTotalLabel}</p>
                <p className="tabular text-[0.875rem] text-ink-muted">
                  ≈ {formatNumber(d.yearlyKr)} kr. {content.yearlySuffix}
                </p>
              </div>
              <span className="tabular font-serif text-[1.75rem] font-medium text-navy">{formatPercent(d.total)}</span>
            </div>
            <p className="text-caption text-ink-muted italic">{d.source}</p>
          </li>
        ))}
      </ul>

      <div ref={sumRef} className="on-navy grid grid-cols-1 items-center gap-10 bg-navy p-8 text-on-navy md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-12 md:p-10">
        <div className="flex flex-col gap-4">
          <p className="text-eyebrow font-semibold tracking-[0.12em] text-gold uppercase">{content.summary.eyebrow}</p>
          {content.depots.map((d, i) => (
            <div key={d.name} className="grid gap-1.5">
              <div className="flex justify-between gap-3 text-base">
                <span>
                  {d.name} <span className="text-on-navy-muted">· {d.share}</span>
                </span>
                <span className="tabular font-semibold">{formatPercent(d.total)}</span>
              </div>
              <div className="h-2.5 bg-white/10">
                <div className={cn("h-full", weightColors[i])} style={{ width: `${(d.total / SCALE) * 100 * sumProgress}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-gold-light md:border-l md:pl-8">
          <p className="text-on-navy-muted">{content.summary.label}</p>
          <p className="tabular font-serif text-[4rem] leading-none font-medium text-gold md:text-[5rem]">
            <span aria-hidden>{formatPercent(content.summary.pct * sumProgress)}</span>
            <span className="sr-only">{formatPercent(content.summary.pct)}</span>
          </p>
          <p className="tabular mt-2 font-serif text-[1.75rem] leading-9 font-medium">≈ {formatNumber(content.summary.yearlyKr * sumProgress)} kr. {content.yearlySuffix}</p>
          <p className="mt-2 text-small text-on-navy-muted">{content.summary.note}</p>
        </div>
      </div>
    </div>
  );
}
