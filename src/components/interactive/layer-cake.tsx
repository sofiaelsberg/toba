"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { CakeContent } from "@/content/cake";
import { ui } from "@/content/ui";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";

type Props = {
  content: CakeContent;
  /** Medtag sidste trin "Med TOBA" (forsiden). Landingssiden slutter ved problemet. */
  withToba?: boolean;
  /** Vis trin-tekst og "Næste lag" (forsiden). Ellers kun knapperne. */
  showStory?: boolean;
  /** Afspil lagene ét ad gangen, når kagen kommer i syne (én gang). */
  autoplay?: boolean;
  className?: string;
};

const R = 220;
const LAYER_COLORS = ["var(--layer-1)", "var(--layer-2)", "var(--layer-3)", "var(--layer-4)"];

/**
 * Lagkagen: koncentriske lag, der gør "dit lag" i midten mindre.
 * Uden JS / ved reduceret bevægelse vises alle lag (sidste trin før "Med TOBA").
 * På sitet kan den evt. kobles til scroll (sticky sektion) – se Lagkage-storyboardet.
 */
export function LayerCake({ content, withToba = false, showStory = false, autoplay = false, className }: Props) {
  const steps = withToba ? [...content.steps, content.tobaStep] : content.steps;
  const allLayers = content.steps.length - 1;
  const isClient = useIsClient();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  /** Valgt af brugeren (null = ikke rørt). */
  const [picked, setPicked] = useState<number | null>(null);
  /** Hvor langt autoafspilningen er nået. */
  const [played, setPlayed] = useState(0);

  useEffect(() => {
    if (!autoplay || reduce || !inView) return;
    const timers = Array.from({ length: allLayers }, (_, i) => setTimeout(() => setPlayed(i + 1), (i + 1) * 800));
    return () => timers.forEach(clearTimeout);
  }, [autoplay, reduce, inView, allLayers]);

  // Uden JS, ved reduceret bevægelse eller uden autoplay: alle lag. Ellers autoafspilningens trin.
  const step = picked ?? (!isClient || reduce || !autoplay ? allLayers : played);

  const isToba = withToba && step === steps.length - 1;
  const thickness = content.layers.map((l, i) => (isToba ? l.tobaThickness : step > i ? l.thickness : 0));
  const radii = thickness.reduce<number[]>((acc, t) => [...acc, acc[acc.length - 1] - t], [R]);
  const core = radii[radii.length - 1];
  const share = Math.round(((core * core) / (R * R)) * 100);
  const current = steps[step];

  function pick(i: number) {
    setPicked(i);
  }

  return (
    <div ref={ref} className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-5">
        <svg viewBox="0 0 480 480" role="img" aria-label={`${ui.layerCake.ariaPrefix} ${current.title}. ${ui.layerCake.ariaShare(share)}`} className="h-auto w-full max-w-[28rem]">
          {radii.slice(0, -1).map((r, i) => (
            <circle key={i} cx={240} cy={240} r={r} fill={LAYER_COLORS[i]} className="transition-[r] duration-700 ease-toba" />
          ))}
          <circle cx={240} cy={240} r={core} fill={isToba ? "var(--gold-text)" : "var(--gold)"} className="transition-[r,fill] duration-700 ease-toba" />
          <text x={240} y={236} textAnchor="middle" className="fill-white font-serif text-[26px] font-medium">
            {ui.layerCake.centerLabel}
          </text>
          <text x={240} y={264} textAnchor="middle" className="fill-white font-sans text-[18px] font-semibold">
            {share} %
          </text>
        </svg>
        <ul className="grid w-full max-w-[28rem] grid-cols-2 gap-x-6 gap-y-2 text-small">
          {content.layers.map((l, i) => {
            const active = isToba ? l.tobaThickness > 0 : step > i;
            return (
              <li key={l.label} className={cn("flex items-center gap-2 transition-colors duration-300", active ? "text-ink" : "text-ink-muted")}>
                <span aria-hidden className={cn("size-3 shrink-0 outline outline-line-strong/40 transition-opacity duration-300", !active && "opacity-35")} style={{ background: LAYER_COLORS[i] }} />
                {l.legend}
              </li>
            );
          })}
        </ul>
      </div>

      <div role="group" aria-label={ui.layerCake.groupLabel} className={cn("flex flex-wrap gap-2", !showStory && "justify-center")}>
        {steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={step === i}
            onClick={() => pick(i)}
            className={cn(
              "min-h-10 cursor-pointer rounded-full border px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-300 ease-toba",
              step === i ? "border-navy bg-navy text-white" : "border-line-strong bg-white text-navy",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {showStory && (
        <>
          <div aria-live="polite" className="flex min-h-36 flex-col gap-2 border-t border-line pt-5">
            <p className="text-h4 font-semibold text-navy">{current.title}</p>
            <p className="max-w-[35rem]">{current.text}</p>
          </div>
          <button
            type="button"
            onClick={() => pick(step < steps.length - 1 ? step + 1 : 0)}
            className="inline-flex min-h-12 cursor-pointer items-center self-start rounded-sm border border-navy px-6 font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            {step < steps.length - 1 ? ui.layerCake.next : ui.layerCake.restart}
          </button>
        </>
      )}
      <p className="text-caption text-ink-muted">{content.footnote}</p>
    </div>
  );
}
