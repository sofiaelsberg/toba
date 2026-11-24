import type { ReactNode } from "react";

import { ButtonLink, ButtonRow, TextLink } from "@/components/blocks/links";
import { Eyebrow, GoldRule, Heading, Lead } from "@/components/blocks/typography";
import { Reveal } from "@/components/motion/reveal";
import type { Action } from "@/content/types";
import { cn } from "@/lib/utils";

type Surface = "cream" | "white" | "navy";

const surfaces: Record<Surface, string> = {
  cream: "bg-cream",
  white: "bg-white",
  navy: "on-navy bg-navy text-on-navy",
};

type SectionProps = {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  className?: string;
  /** Afstand over/under. "default" = 96 px desktop / 64 px mobil. */
  spacing?: "default" | "compact" | "none";
  /** Glid ind, når sektionen kommer i syne. */
  reveal?: boolean;
  labelledBy?: string;
};

/** Ydre ramme for alle sektioner: flade, afstand og container. */
export function Section({ children, surface = "cream", id, className, spacing = "default", reveal = true, labelledBy }: SectionProps) {
  const inner = <div className="wrap">{children}</div>;
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        surfaces[surface],
        spacing === "default" && "py-16 md:py-24",
        spacing === "compact" && "py-8 md:py-16",
        "scroll-mt-24",
        className,
      )}
    >
      {reveal ? <Reveal>{inner}</Reveal> : inner}
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Guldstreg over titlen (bruges når der ikke er en overlinje). */
  rule?: boolean;
  as?: "h1" | "h2" | "h3";
  size?: "display" | "h2" | "h3";
  actions?: Action[];
  className?: string;
  leadClassName?: string;
  id?: string;
};

/** Overlinje + serif-overskrift + indledning. Bruges i næsten alle sektioner. */
export function SectionHeading({ eyebrow, title, lead, rule, as = "h2", size = "h2", actions, className, leadClassName, id }: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-[47.5rem] flex-col gap-4 md:gap-5", className)}>
      {rule && !eyebrow && <GoldRule />}
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading title={title} as={as} size={size} id={id} />
      {lead && (size === "display" ? <Lead className={cn("max-w-[37.5rem]", leadClassName)}>{lead}</Lead> : <p className={cn("max-w-measure", leadClassName)}>{lead}</p>)}
      {actions && <ButtonRow actions={actions} className="mt-2" />}
    </div>
  );
}

/** Sektionsoverskrift med et tekstlink ude til højre (fx "Alle nyheder →") – evt. med en knap ved siden af. */
export function HeadingRow({ title, lead, link, action }: { title: string; lead?: string; link: { href: string; label: string }; action?: Action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <SectionHeading rule title={title} lead={lead} />
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <TextLink href={link.href}>{link.label}</TextLink>
        {action && <ButtonLink action={action} />}
      </div>
    </div>
  );
}

/** To kolonner der stables på mobil. */
export function Split({
  children,
  className,
  align = "center",
  ratio = "even",
}: {
  children: ReactNode;
  className?: string;
  align?: "center" | "start" | "end";
  ratio?: "even" | "7-5" | "5-7";
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-10 md:gap-16",
        ratio === "even" && "md:grid-cols-2",
        ratio === "7-5" && "md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
        ratio === "5-7" && "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
        align === "center" && "items-center",
        align === "start" && "items-start",
        align === "end" && "items-end",
        className,
      )}
    >
      {children}
    </div>
  );
}
