import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RichTextProps = {
  text: string;
  /** Farve på fremhævede ord. "auto" = gold-text på lyse flader, gold på navy (via .on-navy). */
  emClassName?: string;
};

/**
 * Viser indholdstekst med enkel markering:
 *   *ord*   → fremhævet (kursiv, guld)
 *   **ord** → fed
 * Ingen HTML i indholdsfilerne.
 */
export function RichText({ text, emClassName }: RichTextProps) {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(<Fragment key={i++}>{text.slice(last, match.index)}</Fragment>);
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={i++} className="font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      parts.push(
        <em key={i++} className={cn("text-gold-text italic [.on-navy_&]:text-gold", emClassName)}>
          {token.slice(1, -1)}
        </em>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}
