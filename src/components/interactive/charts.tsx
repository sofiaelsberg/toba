"use client";

import { RichText } from "@/components/blocks/rich-text";
import { DURATION } from "@/components/motion/tokens";
import { useProgressInView } from "@/components/motion/use-progress-in-view";
import { formatNumber, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type Segment = { label: string; value: number };

/**
 * 95 %-søjlen: tallet tæller op i takt med, at segmenterne fyldes.
 * Tallet stopper på `value` (fx 95), præcis når de første segmenter er fyldt.
 */
export function ShareBar({ value, lead, segments, source, className }: { value: number; lead: string; segments: Segment[]; source?: string; className?: string }) {
  const { ref, progress } = useProgressInView<HTMLDivElement>({ amount: 0.5, duration: 1.6 });
  const total = segments.reduce((a, s) => a + s.value, 0);
  const filled = progress * total;
  const offsets = segments.map((_, i) => segments.slice(0, i).reduce((a, x) => a + x.value, 0));
  const colors = ["bg-gold", "bg-gold-soft", "bg-grey-light"];
  const aria = segments.map((s) => `${s.value} % ${s.label}`).join(", ");

  return (
    <div ref={ref} className={cn("flex flex-col gap-4", className)}>
      <p className="tabular font-serif text-[5rem] leading-none font-medium text-gold md:text-[7.5rem]">
        <span aria-hidden>{Math.round(Math.min(value, filled))} %</span>
        <span className="sr-only">{value} %</span>
      </p>
      <p className="text-[1.25rem] leading-[1.875rem] md:text-lead md:leading-(--text-lead--line-height) md:font-light">{lead}</p>
      <div role="img" aria-label={aria} className="mt-2 flex h-4 w-full bg-white/10">
        {segments.map((s, i) => {
          const w = Math.max(0, Math.min(s.value, filled - offsets[i]));
          return <div key={s.label} className={cn("h-full", colors[i])} style={{ width: `${w}%` }} />;
        })}
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small text-on-navy-muted">
        {segments.map((s, i) => (
          <li key={s.label} className="flex items-center gap-2">
            <span aria-hidden className={cn("size-2.5", colors[i])} />
            {s.value} % {s.label}
          </li>
        ))}
      </ul>
      {source && <p className="text-caption text-on-navy-muted">{source}</p>}
    </div>
  );
}

/**
 * Kompakt faktaboks: tallet tæller op til venstre, en kort forklaring til højre.
 * Bruges som understøttende element under en sektion (fx forsiden), ikke som blikfang.
 */
export function ShareFact({
  value,
  label,
  text,
  segments,
  source,
  className,
}: {
  value: number;
  label?: string;
  text: string;
  segments?: Segment[];
  source?: string;
  className?: string;
}) {
  const { ref, progress } = useProgressInView<HTMLDivElement>({ amount: 0.6, duration: 1.2 });
  const colors = ["bg-gold", "bg-gold-soft", "bg-grey-light"];
  const total = segments?.reduce((a, s) => a + s.value, 0) ?? 0;
  const filled = progress * total;
  const offsets = segments?.map((_, i) => segments.slice(0, i).reduce((a, x) => a + x.value, 0)) ?? [];

  return (
    <div ref={ref} className={cn("grid grid-cols-1 items-center gap-4 border-y border-white/20 py-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12", className)}>
      <p className="tabular font-serif text-[3.5rem] leading-none font-medium text-gold md:text-[4.5rem]">
        <span aria-hidden>{Math.round(segments ? Math.min(value, filled) : progress * value)} %</span>
        <span className="sr-only">{value} %</span>
      </p>
      <div className="flex flex-col gap-2">
        <p>
          {label && <strong className="font-semibold">{label} </strong>}
          {text}
        </p>
        {segments && (
          <>
            <div role="img" aria-label={segments.map((s) => `${s.value} % ${s.label}`).join(", ")} className="mt-2 flex h-2 w-full bg-white/10">
              {segments.map((s, i) => (
                <div key={s.label} className={cn("h-full", colors[i])} style={{ width: `${Math.max(0, Math.min(s.value, filled - offsets[i]))}%` }} />
              ))}
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-caption text-on-navy-muted">
              {segments.map((s, i) => (
                <li key={s.label} className="flex items-center gap-2">
                  <span aria-hidden className={cn("size-2", colors[i])} />
                  {s.value} % {s.label}
                </li>
              ))}
            </ul>
          </>
        )}
        {source && <p className="text-caption text-on-navy-muted">{source}</p>}
      </div>
    </div>
  );
}

type Series = { label: string; rate: number };

/** To søjler der vokser fra startformuen til slutværdien; forskellen tæller op. */
export function ReturnComparison({
  start,
  years,
  series,
  rateLabel,
  valueSuffix,
  exampleLabel,
  differenceSuffix,
  differenceLabel,
  volatility,
  footnote,
}: {
  start: number;
  years: number;
  series: Series[];
  rateLabel: string;
  valueSuffix: string;
  exampleLabel: string;
  differenceSuffix: string;
  differenceLabel: string;
  volatility: string;
  footnote: string;
}) {
  const { ref, progress } = useProgressInView<HTMLDivElement>({ amount: 0.5, duration: DURATION.long + 0.2 });
  const finals = series.map((s) => start * Math.pow(1 + s.rate / 100, years));
  const max = Math.max(...finals) * 1.08;
  const diff = finals[finals.length - 1] - finals[0];

  return (
    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
      <div className="order-2 flex flex-col gap-1 md:order-1">
        <p className="tabular font-serif text-stat font-medium text-gold">
          <span aria-hidden>{formatNumber(diff * progress, 1)}</span>
          <span className="sr-only">{formatNumber(diff, 1)}</span>
          {differenceSuffix}
        </p>
        <p className="text-small text-on-navy-muted">{differenceLabel}</p>
      </div>
      <div ref={ref} className="order-1 flex flex-col gap-7 md:order-2">
        <p className="text-small text-on-navy-muted">{exampleLabel}</p>
        {series.map((s, i) => {
          const v = start + (finals[i] - start) * progress;
          const last = i === series.length - 1;
          return (
            <div key={s.label} className="grid gap-2">
              <div className="flex justify-between gap-4">
                <span>
                  {s.label} · {formatPercent(s.rate)} {rateLabel}
                </span>
                <span className={cn("tabular font-semibold", last && "text-gold-on-navy")}>
                  {formatNumber(v, 1)}
                  {valueSuffix}
                </span>
              </div>
              <div className="h-10 bg-white/10">
                <div className={cn("h-full", last ? "bg-gold" : "bg-grey-light")} style={{ width: `${((v / max) * 100).toFixed(2)}%` }} />
              </div>
            </div>
          );
        })}
        <p className="border-t border-gold-light pt-4 text-small text-on-navy-muted">
          <RichText text={volatility} />
        </p>
        <div className="flex flex-col gap-3 text-caption text-on-navy-muted">
          {footnote.split("\n").map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
