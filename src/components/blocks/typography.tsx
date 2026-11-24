import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { RichText } from "./rich-text";

/** Overlinjens typografi (lille, fed, spærret versaltekst) – uden farve. */
export const eyebrowClass = "text-eyebrow font-semibold tracking-[0.12em] uppercase";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn(eyebrowClass, "text-gold-text [.on-navy_&]:text-gold-on-navy", className)}>
      {children}
    </p>
  );
}

/** Guldstreg over overskrifter. Tegner sig ind via Reveal-forælderen (scale-x). */
export function GoldRule({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-0.5 w-12 bg-gold", className)} />;
}

type HeadingProps = {
  title: string;
  as?: "h1" | "h2" | "h3";
  size?: "display" | "h2" | "h3";
  className?: string;
  id?: string;
};

const sizes = {
  display: "text-[2rem] leading-[2.5rem] min-[400px]:text-[2.375rem] min-[400px]:leading-[2.75rem] md:text-display md:leading-(--text-display--line-height) tracking-[-0.01em]",
  h2: "text-[1.875rem] leading-[2.375rem] md:text-h2 md:leading-(--text-h2--line-height)",
  h3: "text-h3",
};

/** Serif-overskrift i Playfair Display 500. Titlen kan indeholde *fremhævede* ord. */
/** Klasserne bag Heading – til overskrifter, der ikke kun er tekst (fx med logoet indsat). */
export const headingClass = cn("font-serif font-medium text-balance hyphens-auto break-words text-navy [.on-navy_&]:text-white", sizes.h2);

export function Heading({ title, as: Tag = "h2", size = "h2", className, id }: HeadingProps) {
  return (
    <Tag id={id} className={cn("font-serif font-medium text-balance hyphens-auto break-words text-navy [.on-navy_&]:text-white", sizes[size], className)}>
      <RichText text={title} />
    </Tag>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[1.25rem] leading-[1.875rem] md:text-lead md:leading-(--text-lead--line-height) md:font-light", className)}>{children}</p>
  );
}

export function Muted({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-small text-ink-muted [.on-navy_&]:text-on-navy-muted", className)}>{children}</p>;
}

export function Caption({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-caption text-ink-muted [.on-navy_&]:text-on-navy-muted", className)}>{children}</p>;
}
