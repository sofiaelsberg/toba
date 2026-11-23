"use client";

import { useState } from "react";

import { eyebrowClass } from "@/components/blocks/typography";
import type { ManagerMapContent } from "@/content/types";
import { projectWorldDots, worldDots } from "@/content/maps/world-dots";
import { cn } from "@/lib/utils";

/**
 * Prikket kort med forvalternes hovedkontorer og antal forvaltere pr. region.
 * Hold musen over (eller tryk/fokusér) en guldprik for at se forvalterne på stedet.
 */
export function ManagerMap({ content, className }: { content: ManagerMapContent; className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <figure className={cn("flex flex-col gap-5 border border-line bg-white p-6", className)}>
      <div className="relative" onMouseLeave={() => setActive(null)}>
        <svg viewBox={`0 0 ${worldDots.width} ${worldDots.height}`} aria-hidden className="block h-auto w-full">
          <path d={worldDots.path} stroke="var(--layer-4)" strokeWidth={5} strokeLinecap="round" />
        </svg>
        <ul aria-label={content.label}>
          {content.locations.map((l) => {
            const { x, y } = projectWorldDots(l.lat, l.lon);
            const left = (x / worldDots.width) * 100;
            const top = (y / worldDots.height) * 100;
            const open = active === l.label;
            const id = `forvaltere-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            return (
              <li key={l.label} className={cn("absolute", open && "z-10")} style={{ left: `${left}%`, top: `${top}%` }}>
                <button
                  type="button"
                  aria-describedby={id}
                  aria-expanded={open}
                  onMouseEnter={() => setActive(l.label)}
                  onFocus={() => setActive(l.label)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(open ? null : l.label)}
                  className="group absolute flex size-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full"
                >
                  <span className="sr-only">{l.label}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "block size-3 rounded-full border-2 border-white bg-gold transition-transform duration-200 ease-toba group-hover:scale-125",
                      open && "scale-125",
                    )}
                  />
                </button>
                <div
                  id={id}
                  role="tooltip"
                  className={cn(
                    "pointer-events-none absolute bottom-4 w-max max-w-56 -translate-x-1/2 bg-navy px-3.5 py-2.5 text-[0.8125rem] leading-snug text-white shadow-raised transition-opacity duration-150",
                    left < 18 && "translate-x-[-15%]",
                    left > 82 && "translate-x-[-85%]",
                    open ? "opacity-100" : "sr-only opacity-0",
                  )}
                >
                  <span className="mb-1 block text-[0.6875rem] font-semibold tracking-[0.12em] text-gold-on-navy uppercase">{l.label}</span>
                  {l.managers.join(" · ")}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-4 sm:grid-cols-4">
        {content.regions.map((r) => (
          <li key={r.label} className="flex flex-col gap-0.5">
            <span className={`${eyebrowClass} text-gold-text`}>{r.label}</span>
            <span className="text-small text-ink">
              {r.managers} {r.managers === 1 ? content.managerSingular : content.managerPlural}
            </span>
          </li>
        ))}
      </ul>
      <details className="group border-t border-line pt-4">
        <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-navy">
          {content.listLabel}
          <span aria-hidden className="transition-transform duration-200 group-open:rotate-180">
            ▾
          </span>
        </summary>
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {content.locations.map((l) => (
            <div key={l.label}>
              <dt className={`${eyebrowClass} text-gold-text`}>{l.label}</dt>
              <dd className="text-small text-ink">{l.managers.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </details>
      {content.caption && <figcaption className="text-caption text-ink-muted">{content.caption}</figcaption>}
    </figure>
  );
}
