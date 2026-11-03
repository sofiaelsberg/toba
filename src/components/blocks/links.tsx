import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { Action } from "@/content/types";
import { cn } from "@/lib/utils";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** Knap som link. Variant kommer fra indholdet. data-cta: klik måles som cta_click (se components/layout/analytics.tsx). */
export function ButtonLink({ action, className, size }: { action: Action; className?: string; size?: "default" | "sm" }) {
  const external = isExternal(action.href);
  return (
    <Button asChild variant={action.variant ?? "primary"} size={size} className={className}>
      {external ? (
        <a href={action.href} target="_blank" rel="noopener noreferrer" data-cta="button">
          {action.label}
        </a>
      ) : (
        <Link href={action.href} data-cta="button">
          {action.label}
        </Link>
      )}
    </Button>
  );
}

export function ButtonRow({ actions, className }: { actions?: Action[]; className?: string }) {
  if (!actions?.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {actions.map((a) => (
        <ButtonLink key={a.href + a.label} action={a} />
      ))}
    </div>
  );
}

/** Tekstlink med guld understregning – "Læs mere →". */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const cls = cn(
    "border-b border-gold pb-0.5 text-base leading-5 font-semibold text-navy no-underline transition-colors hover:text-gold-text [.on-navy_&]:text-white [.on-navy_&]:hover:text-cream",
    className,
  );
  if (!href) return <span className={cls}>{children}</span>;
  return isExternal(href) ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer" data-cta="link">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls} data-cta="link">
      {children}
    </Link>
  );
}
