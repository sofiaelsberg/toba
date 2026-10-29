import { Check } from "lucide-react";
import type { ReactNode } from "react";

import type { CakeContent } from "@/content/cake";
import type { independent } from "@/content/pages/independent";
import type { overview } from "@/content/pages/overview";
import { formatNumber, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Små, statiske illustrationer til CTA-kort (16:10). Bygget af samme data som de store grafikker,
 * så kortet viser det, man får på siden bag linket. Dekorative: kortets titel bærer budskabet.
 * Alt er målt i em ud fra kortets bredde (cqw), så illustrationen skalerer som et billede.
 */
function Frame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div aria-hidden className="@container w-full">
      <div className={cn("aspect-[16/10] w-full overflow-hidden text-[4.2cqw] leading-[1.25]", className)}>{children}</div>
    </div>
  );
}

const LAYER_COLORS = ["var(--layer-1)", "var(--layer-2)", "var(--layer-3)", "var(--layer-4)"];

/** Lagkagen med alle lag lagt på og "dit lag" i midten. */
export function CakeVisual({ content }: { content: CakeContent }) {
  const R = 80;
  const total = content.layers.reduce((s, l) => s + l.thickness, 0);
  const scale = (R * 0.62) / total; // lagene fylder ca. 62 % af radius, som på den store kage
  const radii = content.layers.reduce<number[]>((acc, l) => [...acc, acc[acc.length - 1] - l.thickness * scale], [R]);
  return (
    <Frame className="grid grid-cols-2 items-center gap-[1.25em] bg-cream px-[1.9em]">
      <svg viewBox="0 0 172 172" className="h-[82%] w-auto justify-self-center">
        {radii.slice(0, -1).map((r, i) => (
          <circle key={i} cx={86} cy={86} r={r} fill={LAYER_COLORS[i]} />
        ))}
        <circle cx={86} cy={86} r={radii[radii.length - 1]} fill="var(--gold)" />
      </svg>
      <ul className="flex flex-col gap-[0.45em] text-ink">
        {content.layers.map((l, i) => (
          <li key={l.label} className="flex items-center gap-[0.6em]">
            <span className="size-[0.8em] shrink-0" style={{ background: LAYER_COLORS[i] }} />
            {l.label}
          </li>
        ))}
        <li className="flex items-center gap-[0.6em] font-semibold text-navy">
          <span className="size-[0.8em] shrink-0 bg-gold" />
          {content.steps[0].label}
        </li>
      </ul>
    </Frame>
  );
}

/** Det samlede tal fra omkostningsoverblikket – med depoterne som søjler. */
export function OverviewVisual({ content }: { content: (typeof overview)["example"] }) {
  const max = Math.max(...content.depots.map((d) => d.total));
  const colors = ["bg-gold", "bg-gold-soft", "bg-grey-light"];
  return (
    <Frame className="on-navy flex flex-col justify-between bg-navy px-[1.9em] py-[1.5em] text-on-navy">
      <div>
        <p className="text-[0.94em] text-on-navy-muted">{content.summary.label}</p>
        <p className="tabular font-serif text-[3.1em] leading-[1.1] font-medium text-gold">{formatPercent(content.summary.pct)}</p>
        <p className="tabular font-serif text-[1.25em]">
          ≈ {formatNumber(content.summary.yearlyKr)} kr. {content.yearlySuffix}
        </p>
      </div>
      <div className="flex flex-col gap-[0.3em]">
        {content.depots.map((d, i) => (
          <div key={d.name} className="grid grid-cols-[9em_minmax(0,1fr)] items-center gap-[1em] text-[0.86em] text-on-navy-muted">
            <span className="truncate">{d.name}</span>
            <span className="h-[0.5em] bg-white/10">
              <span className={cn("block h-full", colors[i])} style={{ width: `${(d.total / max) * 100}%` }} />
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/** De tre slags rådgivere – den uafhængige fremhævet. */
export function AdvisersVisual({ content }: { content: (typeof independent)["kinds"] }) {
  return (
    <Frame className="flex flex-col justify-center gap-[0.6em] bg-cream px-[1.9em]">
      {content.cards.map((k, i) => (
        <div
          key={k.title}
          className={cn(
            "flex items-center gap-[0.8em] border px-[1em] py-[0.7em] text-[1.1em]",
            k.highlight ? "border-gold bg-white font-semibold text-navy" : "border-line bg-white/60 text-ink-muted",
          )}
        >
          <span
            className={cn(
              "flex size-[1.6em] shrink-0 items-center justify-center rounded-full text-[0.8em] font-semibold",
              k.highlight ? "bg-gold text-white" : "border border-line-strong text-ink-muted",
            )}
          >
            {k.highlight ? <Check className="size-[1.1em]" strokeWidth={3} /> : i + 1}
          </span>
          {k.title}
        </div>
      ))}
    </Frame>
  );
}
