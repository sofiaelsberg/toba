import { CountUp } from "@/components/motion/count-up";
import type { FactContent, Stat } from "@/content/types";
import { cn } from "@/lib/utils";

/** Et tal: tæller op, hvis `value` er sat, ellers vises `display`. */
export function StatValue({ stat, className }: { stat: Stat; className?: string }) {
  return (
    <span className={cn("font-serif font-medium", className)}>
      {stat.value !== undefined ? (
        <CountUp value={stat.value} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
      ) : (
        stat.display
      )}
    </span>
  );
}

/** 3–4 nøgletal med guldstreg over. */
export function StatsRow({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-6 border-t-2 border-gold-light pt-6",
        stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4",
        className,
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse gap-2">
          <dt className="text-small text-ink-muted [.on-navy_&]:text-on-navy-muted">{s.label}</dt>
          <dd>
            <StatValue stat={s} className="text-[2.25rem] leading-10 text-navy md:text-stat [.on-navy_&]:text-white" />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Stort tal med forklaring – navy eller lys boks. */
export function FactBox({ fact, tone = "navy", size = "lg", className }: { fact: FactContent; tone?: "navy" | "light" | "plain"; size?: "lg" | "xl"; className?: string }) {
  return (
    <div
      className={cn(
        tone === "navy" && "on-navy bg-navy p-7 text-on-navy md:p-8",
        tone === "light" && "border-t-2 border-gold bg-cream p-7 md:p-8",
        className,
      )}
    >
      <p>
        <StatValue
          stat={fact}
          className={cn(
            size === "lg" ? "text-[2.75rem] leading-[3rem] md:text-[3.5rem] md:leading-[3.75rem]" : "text-[4.5rem] leading-none md:text-[6rem]",
            "text-navy [.on-navy_&]:text-gold",
          )}
        />
      </p>
      <p className="mt-2 [.on-navy_&]:text-on-navy-muted">{fact.label}</p>
      {fact.source && <p className="mt-3 text-caption text-ink-muted [.on-navy_&]:text-on-navy-muted">{fact.source}</p>}
    </div>
  );
}
