import type { ReactNode } from "react";

import { Muted } from "@/components/blocks/typography";
import type { HeroContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { SectionHeading, Split } from "./section";

type HeroProps = {
  content: HeroContent;
  /** Billede, video, kort eller illustration i højre kolonne. Udelad for en tekst-hero. */
  aside?: ReactNode;
  surface?: "cream" | "navy";
  className?: string;
};

/** Sidens top: overlinje, H1 med ét fremhævet ord, indledning, knapper og evt. tillidslinje. */
export function Hero({ content, aside, surface = "cream", className }: HeroProps) {
  const text = (
    <div className="flex flex-col gap-6">
      <SectionHeading
        as="h1"
        size="display"
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        actions={content.actions}
      />
      {content.trustline && <Muted>{content.trustline}</Muted>}
    </div>
  );
  return (
    <section
      className={cn(
        "py-16 md:pt-24 md:pb-16",
        surface === "navy" ? "on-navy bg-navy text-on-navy md:pb-24" : "bg-cream",
        className,
      )}
    >
      <div className="wrap">{aside ? <Split ratio="7-5">{text}{aside}</Split> : text}</div>
    </section>
  );
}
