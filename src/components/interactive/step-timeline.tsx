"use client";

import { useProgressInView } from "@/components/motion/use-progress-in-view";
import type { StepContent } from "@/content/types";
import { cn } from "@/lib/utils";

/** Trin på en tidslinje: guldstregen tegner sig, og prikkerne tændes i takt. */
export function StepTimeline({ steps, numbering = "padded" }: { steps: StepContent[]; numbering?: "padded" | "plain" }) {
  const { ref, progress } = useProgressInView<HTMLDivElement>({ amount: 0.4 });
  const last = steps.length - 1;
  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute inset-x-0 top-[13px] hidden h-0.5 bg-line lg:block" />
      <div aria-hidden className="absolute top-[13px] left-0 hidden h-0.5 bg-gold lg:block" style={{ width: `${progress * 100}%` }} />
      <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((s, i) => {
          const lit = progress >= (i / last) * 0.999;
          return (
            <li key={s.title} className="flex flex-col gap-3">
              <span
                aria-hidden
                className={cn(
                  "flex size-7 items-center justify-center rounded-full border-2 border-gold text-caption font-semibold transition-colors duration-300",
                  lit ? "bg-gold text-white" : "bg-white text-gold-text",
                )}
              >
                {numbering === "padded" ? String(i + 1).padStart(2, "0") : i + 1}
              </span>
              <h3 className="mt-2 font-serif text-[1.5rem] leading-8 font-medium text-navy md:text-h3">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
