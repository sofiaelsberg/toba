"use client";

import { useId, useState } from "react";

import { ButtonLink } from "@/components/blocks/links";
import { RichText } from "@/components/blocks/rich-text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculatorConfig } from "@/content/facts";
import type { home } from "@/content/pages/home";
import type { Action } from "@/content/types";
import { fill, formatKr, formatNumber, formatPercent } from "@/lib/format";

/** Forsidens tekster; knappen kan pege andre steder hen (fx "#bestil" på /omkostningsoverblik). */
type Content = Omit<(typeof home)["calculator"], "action"> & { action: Action };

/**
 * Omkostningsberegneren. Satser kommer fra `calculatorConfig` (content/facts.ts).
 * Intet gemmes; formuen kan sendes videre til /omkostningsoverblik via CTA'en.
 */
export function CostCalculator({ content }: { content: Content }) {
  const id = useId();
  const cfg = calculatorConfig;
  const [mio, setMio] = useState<number>(cfg.startMio);
  const [today, setToday] = useState("");

  const kr = mio * 1_000_000;
  const fee = (kr * cfg.feePct) / 100;
  const rebate = (kr * cfg.rebatePct) / 100;
  const net = fee - rebate;
  const maxFee = (cfg.maxMio * 1_000_000 * cfg.feePct) / 100;
  const pct = parseFloat(today.replace(",", "."));
  const hasToday = Number.isFinite(pct) && pct > 0 && pct < 10;
  const todayKr = hasToday ? (kr * pct) / 100 : 0;
  const diff = hasToday ? Math.max(0, (todayKr - net) * cfg.compareYears) : 0;

  const rows = [
    { label: content.feeLabel, pct: cfg.feePct, value: fee, color: "bg-navy", sign: "" },
    { label: content.rebateLabel, pct: cfg.rebatePct, value: rebate, color: "bg-gold", sign: "− " },
  ];

  return (
    <div className="grid grid-cols-1 gap-12 bg-cream p-8 shadow-raised md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:p-10">
      <div className="flex flex-col gap-6">
        <h3 className="font-serif text-h3 font-medium text-navy">{content.title}</h3>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-formue`}>{content.wealthLabel}</Label>
          <output htmlFor={`${id}-formue`} className="tabular font-serif text-[2.5rem] leading-[3rem] font-medium text-navy">
            {formatNumber(mio)} {content.unitMio}
          </output>
          <input
            id={`${id}-formue`}
            type="range"
            min={cfg.minMio}
            max={cfg.maxMio}
            step={cfg.stepMio}
            value={mio}
            onChange={(e) => setMio(Number(e.target.value))}
            aria-valuetext={`${formatNumber(mio)} ${content.unitMio}`}
            className="h-8 w-full cursor-pointer accent-navy"
          />
          <div className="flex justify-between text-caption text-ink-muted">
            <span>{content.rangeMinLabel}</span>
            <span>{content.rangeMaxLabel}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-idag`}>{content.todayLabel}</Label>
          {/* Knappen står ved feltet: kender man ikke sin pris, er overblikket næste skridt. */}
          <div className="flex flex-wrap items-center gap-3">
            <Input id={`${id}-idag`} inputMode="decimal" placeholder={content.todayPlaceholder} value={today} onChange={(e) => setToday(e.target.value)} className="w-24" />
            <ButtonLink action={{ ...content.action, href: withFormue(content.action.href, mio) }} />
          </div>
          <p className="text-small text-ink-muted">{content.todayHint}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {rows.map((r) => (
          <div key={r.label} className="grid gap-1.5">
            <div className="flex justify-between gap-4">
              <span>
                {r.label} · {formatPercent(r.pct)}
              </span>
              <span className="tabular">
                {r.sign}
                {formatKr(r.value)}
              </span>
            </div>
            <div className="h-2.5 bg-white">
              <div className={`h-full ${r.color} transition-[width] duration-700 ease-toba`} style={{ width: `${(r.value / maxFee) * 100}%` }} />
            </div>
          </div>
        ))}
        <div className="grid gap-1 border-t-2 border-navy pt-3.5">
          <div className="flex items-baseline justify-between gap-4 font-semibold text-navy">
            <span>
              {content.netLabel} · {formatPercent(cfg.feePct - cfg.rebatePct)}
            </span>
            <span className="tabular font-serif text-[2rem] leading-10 font-medium">{formatKr(net)}</span>
          </div>
          <p className="text-small text-ink-muted">{content.perYear}</p>
        </div>
        <div aria-live="polite">
          {hasToday && (
            <p className="border-t-2 border-gold bg-white p-5">
              <RichText text={fill(content.compare, { today: formatKr(todayKr), diff: formatKr(diff) })} />
            </p>
          )}
        </div>
      </div>
      <p className="max-w-measure text-caption text-ink-muted md:col-span-2">{content.footnote}</p>
    </div>
  );
}

/** Tilføjer ?formue= til linket – også når det peger på et anker på samme side (fx "#bestil"). */
function withFormue(href: string, mio: number) {
  const [base, hash = ""] = href.split("#");
  return `${base}${base.includes("?") ? "&" : "?"}formue=${mio}${hash ? `#${hash}` : ""}`;
}
