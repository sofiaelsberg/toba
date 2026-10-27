"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";

import { useIsClient } from "@/lib/use-is-client";
import { DURATION, EASE } from "./tokens";

type Options = {
  /** Andel af elementet der skal være synligt, før animationen starter. */
  amount?: number;
  duration?: number;
};

/**
 * Giver et tal fra 0 til 1, der animeres én gang, når elementet kommer i syne.
 *
 * - Server-render og uden JavaScript: 1 (alt står færdigt).
 * - Ved reduceret bevægelse: 1.
 */
export function useProgressInView<T extends Element>(options: Options = {}): { ref: RefObject<T | null>; progress: number } {
  const { amount = 0.4, duration = DURATION.long } = options;
  const ref = useRef<T>(null);
  const isClient = useIsClient();
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, 1, { duration, ease: EASE, onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, duration]);

  return { ref, progress: !isClient || reduce ? 1 : value };
}
