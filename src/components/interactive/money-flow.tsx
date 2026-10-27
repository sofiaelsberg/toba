"use client";

import { motion } from "motion/react";

import type { FlowRow } from "@/content/pages/independent";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/tokens";

const tone = { neutral: "text-ink-muted", bad: "text-negative", good: "text-gold-text" };

function Node({ label, you }: { label: string; you?: boolean }) {
  return <span className={cn("border px-2.5 py-1.5 whitespace-nowrap", you ? "border-navy bg-navy text-white" : "border-line-strong bg-white text-navy")}>{label}</span>;
}

/** "Følg pengene": små pile mellem knuder, der tegner sig én gang i syne. */
export function MoneyFlow({ rows, label }: { rows: FlowRow[]; label: string }) {
  return (
    <div role="img" aria-label={label} className="flex flex-col gap-2 bg-cream p-4 text-[0.9375rem] font-medium">
      {rows.map((r, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2">
          <Node label={r.from} you={r.fromIsYou} />
          <span className={cn("flex min-w-16 flex-1 items-center gap-1.5 text-caption", tone[r.tone])}>
            <motion.span
              className="h-0.5 flex-1 origin-left bg-current"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.25 }}
            />
            <span className="size-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-current" />
            {r.label}
          </span>
          <Node label={r.to} you={r.toIsYou} />
        </div>
      ))}
    </div>
  );
}
