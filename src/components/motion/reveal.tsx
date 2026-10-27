"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { DURATION, EASE } from "./tokens";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  delay?: number;
};

/**
 * Glider 16 px op og fader ind, én gang, når elementet kommer i syne.
 * Indholdet er synligt fra server-render; kun elementer under folden skjules ved mount.
 */
export function Reveal({ children, className, as = "div", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const top = ref.current.getBoundingClientRect().top;
    if (top > window.innerHeight) setHidden(true);
  }, [reduce]);

  const Comp = motion[as] as ElementType;
  return (
    <Comp
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y: 16 } : undefined}
      whileInView={hidden ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: DURATION.slow, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}
