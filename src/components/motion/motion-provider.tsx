"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Slår bevægelse fra for brugere, der har bedt om reduceret bevægelse. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
