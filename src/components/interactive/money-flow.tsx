"use client";

import { motion } from "motion/react";

import { EASE } from "@/components/motion/tokens";
import type { FlowChain } from "@/content/pages/independent";
import { cn } from "@/lib/utils";

const tone = { neutral: "text-ink-muted", bad: "text-negative", good: "text-gold-text" };

function Node({ label, you }: { label: string; you?: boolean }) {
  return (
    <span className={cn("self-start border px-3 py-1.5", you ? "border-navy bg-navy text-white" : "border-line-strong bg-white text-navy")}>{label}</span>
  );
}

/**
 * "Følg pengene": knuder oppefra og ned. Mellem dem en pil, der tegner sig én gang i syne, og en forklaring.
 * Lodret, så pilene altid peger på noget – også i smalle kort og på mobil.
 */
export function MoneyFlow({ flow, label }: { flow: FlowChain; label: string }) {
  return (
    <div role="img" aria-label={label} className="flex flex-col bg-white p-4 text-[0.9375rem] font-medium">
      {flow.nodes.map((n, i) => {
        const step = flow.steps[i];
        return (
          <div key={i} className="flex flex-col">
            <Node label={n.label} you={n.you} />
            {step && (
              <div className={cn("flex h-16 items-stretch gap-2.5 py-2 pl-4", tone[step.tone])}>
                <span className="flex w-2.5 flex-col items-center">
                  <motion.span
                    className="w-0.5 flex-1 origin-top bg-current"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.3 }}
                  />
                  <span className="size-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-current" />
                </span>
                <span className="self-center text-caption">{step.label}</span>
              </div>
            )}
          </div>
        );
      })}
      {flow.note && <p className="mt-3 border-t border-line pt-2.5 text-caption font-normal text-ink-muted">{flow.note}</p>}
    </div>
  );
}
