"use client";

import { formatNumber } from "@/lib/format";
import { DURATION } from "./tokens";
import { useProgressInView } from "./use-progress-in-view";

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

/** Tæller op til `value` én gang i syne. Teksten til skærmlæsere er altid det færdige tal. */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "", className, duration = DURATION.count }: CountUpProps) {
  const { ref, progress } = useProgressInView<HTMLSpanElement>({ amount: 0.6, duration });
  const final = `${prefix}${formatNumber(value, decimals)}${suffix}`;
  return (
    <span ref={ref} className={className}>
      <span aria-hidden className="tabular">
        {prefix}
        {formatNumber(value * progress, decimals)}
        {suffix}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
