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
  /**
   * "split": tekst og medie i hver sin kolonne inden for sidebredden (standard).
   * "bleed": mediet fylder hele hero'ens højde og løber ud til skærmens højre kant (forsiden).
   */
  layout?: "split" | "bleed";
  /** Vis tillidslinjen som et mørkt bånd under hero'en i stedet for en lille linje under teksten. */
  trustBand?: boolean;
  className?: string;
};

/** Teksten følger sidebreddens venstre kant (som .wrap); mediet tager resten ud til skærmens højre kant. */
const bleedGutter = "max(1.5rem, calc((100% - 72rem) / 2))";
const bleedColumns = `${bleedGutter} minmax(0, 7fr) minmax(0, 5fr) ${bleedGutter}`;

/** Sidens top: overlinje, H1 med ét fremhævet ord, indledning, knapper og evt. tillidslinje. */
export function Hero({ content, aside, surface = "cream", layout = "split", trustBand = false, className }: HeroProps) {
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
      {content.trustline && !trustBand && <Muted>{content.trustline}</Muted>}
    </div>
  );

  const band = content.trustline && trustBand && <TrustBand items={content.trustline.split(" · ")} />;

  if (layout === "bleed" && aside) {
    return (
      <section className={cn(surface === "navy" ? "on-navy bg-navy text-on-navy" : "bg-cream", className)}>
        <div className="flex flex-col md:grid md:min-h-[36rem]" style={{ gridTemplateColumns: bleedColumns }}>
          <div className="order-2 px-6 py-12 md:order-none md:col-start-2 md:self-center md:py-20 md:pr-12 md:pl-0">{text}</div>
          <div className="relative order-1 md:order-none md:col-span-2 md:col-start-3">{aside}</div>
        </div>
        {band}
      </section>
    );
  }

  return (
    <>
      <section
        className={cn(
          "py-16 md:pt-24 md:pb-16",
          surface === "navy" ? "on-navy bg-navy text-on-navy md:pb-24" : "bg-cream",
          className,
        )}
      >
        <div className="wrap">{aside ? <Split ratio="7-5">{text}{aside}</Split> : text}</div>
      </section>
      {band}
    </>
  );
}

/** Mørkt bånd med tillidspunkter, adskilt af små guldruder. */
function TrustBand({ items }: { items: string[] }) {
  return (
    <div className="on-navy bg-navy-deep text-on-navy">
      <ul className="wrap flex flex-col gap-1.5 py-4 text-small lg:flex-row lg:items-center lg:gap-x-8 lg:py-5">
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-8">
            {i > 0 && <span aria-hidden className="hidden size-1.5 rotate-45 bg-gold-on-navy lg:block" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
