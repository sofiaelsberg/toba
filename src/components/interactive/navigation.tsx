"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import { RichText } from "@/components/blocks/rich-text";
import { EASE } from "@/components/motion/tokens";
import { cn } from "@/lib/utils";

/** Undermenu med ankerlinks; den sektion, man læser i, får guldstreg (scrollspy). */
export function AnchorNav({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-20 z-10 border-y border-line bg-white">
      <ul className="wrap flex gap-8 overflow-x-auto">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={cn(
                "block border-b-2 py-3.5 text-[0.9375rem] font-medium whitespace-nowrap no-underline transition-colors duration-300",
                active === i.id ? "border-gold text-navy" : "border-transparent text-ink-muted hover:text-navy",
              )}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type Mode = { label: string; title: string; text: string };

/** Faner – fx "Hele formuen / En del af formuen". */
export function SegmentTabs({ modes, label }: { modes: Mode[]; label: string }) {
  const [i, setI] = useState(0);
  const current = modes[i];
  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
        {modes.map((m, j) => (
          <button
            key={m.label}
            role="tab"
            type="button"
            id={`tab-${j}`}
            aria-selected={i === j}
            aria-controls="tabpanel"
            onClick={() => setI(j)}
            className={cn(
              "min-h-11 cursor-pointer rounded-full border px-4.5 py-2.5 font-medium transition-colors duration-300 ease-toba",
              i === j ? "border-navy bg-navy text-white" : "border-line-strong bg-white text-navy",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div id="tabpanel" role="tabpanel" aria-labelledby={`tab-${i}`} className="min-h-21 border-t border-line pt-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
            <p className="font-semibold text-navy">{current.title}</p>
            <p className="mt-1">
              <RichText text={current.text} />
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
