import type { ReactNode } from "react";

import type { HeroContent } from "@/content/types";
import { SectionHeading } from "./section";

/** Smal tekstside (politikker, Finanstilsynet, klage, cookies): hero + indhold i én læsebredde. */
export function NarrowPage({ hero, children }: { hero: HeroContent; children: ReactNode }) {
  return (
    <>
      <section className="bg-cream pt-16 pb-12 md:pt-24">
        <div className="mx-auto w-full max-w-[51.25rem] px-6">
          <SectionHeading as="h1" size="display" eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} />
        </div>
      </section>
      {children}
    </>
  );
}

export function NarrowBlock({ children, surface = "cream", className = "" }: { children: ReactNode; surface?: "cream" | "white"; className?: string }) {
  return (
    <section className={`${surface === "white" ? "bg-white" : "bg-cream"} py-12 md:py-16 ${className}`}>
      <div className="mx-auto flex w-full max-w-[51.25rem] flex-col gap-6 px-6">{children}</div>
    </section>
  );
}
