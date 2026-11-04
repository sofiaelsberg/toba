"use client";

import { Lock, Square } from "lucide-react";
import { motion } from "motion/react";
import { createContext, useContext, useId, useState, type ReactNode } from "react";

import { ButtonLink } from "@/components/blocks/links";
import { RichText } from "@/components/blocks/rich-text";
import { EASE } from "@/components/motion/tokens";
import { useProgressInView } from "@/components/motion/use-progress-in-view";
import { Checkbox } from "@/components/ui/checkbox";
import type { Action, Point } from "@/content/types";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Lovens krav: flueben krydses af ét ad gangen                        */
/* ------------------------------------------------------------------ */

/** `numbered`: tal (1, 2, 3) i stedet for flueben – når teksten henviser til "tre krav". */
export function ChecklistReveal({ items, numbered = false }: { items: Point[]; numbered?: boolean }) {
  const { ref, progress } = useProgressInView<HTMLOListElement>({ amount: 0.5, duration: 1.6 });
  return (
    <ol ref={ref} className="border-b border-line">
      {items.map((it, i) => {
        const done = progress >= (i + 1) / items.length - 0.001;
        return (
          <li key={it.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-4 border-t border-line py-5">
            <span aria-hidden className={cn("flex size-10 items-center justify-center rounded-full border-2 border-gold transition-colors duration-400", done ? "bg-gold" : "bg-white")}>
              {numbered ? (
                <span className={cn("font-serif text-[1.25rem] leading-none font-medium transition-colors duration-400", done ? "text-white" : "text-gold-text")}>{i + 1}</span>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className={done ? "stroke-white" : "stroke-gold"}>
                  <path d="M4 10.5l4 4 8-9" strokeDasharray={24} strokeDashoffset={done ? 0 : 24} className="transition-[stroke-dashoffset] duration-500 ease-toba" />
                </svg>
              )}
            </span>
            <div>
              <h3 className="mb-1 font-serif text-[1.5rem] leading-8 font-medium text-navy">{it.title}</h3>
              <p>{it.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Låst tjekliste på /lagkage – låses op, når guiden er bestilt         */
/* ------------------------------------------------------------------ */

const UnlockContext = createContext<{ unlocked: boolean; unlock: () => void }>({ unlocked: false, unlock: () => {} });

export function UnlockProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  return <UnlockContext.Provider value={{ unlocked, unlock: () => setUnlocked(true) }}>{children}</UnlockContext.Provider>;
}

export function useUnlock() {
  return useContext(UnlockContext);
}

type LockedChecklistProps = {
  questions: string[];
  freeIndexes: number[];
  teaser: string;
  teaserAction: Action;
  unlockedText: string;
};

export function LockedChecklistIntro({ teaser, teaserAction, unlockedText }: Omit<LockedChecklistProps, "questions" | "freeIndexes">) {
  const { unlocked } = useUnlock();
  return unlocked ? (
    <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: EASE, duration: 0.5 }} className="text-navy">
      <RichText text={unlockedText} />
    </motion.p>
  ) : (
    <div className="flex flex-col gap-4">
      <p className="text-navy">
        <RichText text={teaser} />
      </p>
      <ButtonLink action={teaserAction} className="self-start" />
    </div>
  );
}

export function LockedChecklist({ questions, freeIndexes }: Pick<LockedChecklistProps, "questions" | "freeIndexes">) {
  const { unlocked } = useUnlock();
  return (
    <ol className="bg-white px-8 pt-2 pb-4">
      {questions.map((q, i) => {
        const open = unlocked || freeIndexes.includes(i);
        const justOpened = unlocked && !freeIndexes.includes(i);
        return (
          <motion.li
            key={q}
            initial={false}
            animate={justOpened ? { opacity: [0, 1], y: [12, 0] } : undefined}
            transition={{ ease: EASE, duration: 0.5, delay: i * 0.06 }}
            className="grid grid-cols-[3rem_minmax(0,1fr)_1.75rem] items-center gap-4 border-t border-line py-4.5 first:border-t-0"
          >
            <span className="font-serif text-[1.5rem] font-medium text-gold-text">{String(i + 1).padStart(2, "0")}</span>
            {open ? (
              <span className="text-navy">{q}</span>
            ) : (
              <span role="img" aria-label={ui.lockedQuestion} className="h-3.5 rounded-sm bg-line blur-[1.5px]" />
            )}
            {open ? <Square aria-hidden className="size-5 text-gold" strokeWidth={1.75} /> : <Lock aria-hidden className="size-5 text-line-strong" strokeWidth={1.75} />}
          </motion.li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* "Overblikket er for dig, hvis …" – selvtjek                          */
/* ------------------------------------------------------------------ */

export function SelfCheck({ title, items, result, action }: { title: string; items: string[]; result: string; action: Action }) {
  const id = useId();
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const any = checked.some(Boolean);
  return (
    <div className="flex flex-col">
      <h3 className="mb-3 font-serif text-h3 font-medium text-navy">{title}</h3>
      <ul>
        {items.map((t, i) => (
          <li key={t} className="flex items-start gap-3.5 border-t border-line py-4">
            <Checkbox
              id={`${id}-${i}`}
              checked={checked[i]}
              onCheckedChange={(v) => setChecked((c) => c.map((x, j) => (j === i ? v === true : x)))}
            />
            <label htmlFor={`${id}-${i}`} className="cursor-pointer">
              {t}
            </label>
          </li>
        ))}
      </ul>
      <div aria-live="polite">
        {any && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE, duration: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-gold bg-cream px-6 py-5"
          >
            <p className="font-semibold text-navy">{result}</p>
            <ButtonLink action={action} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
