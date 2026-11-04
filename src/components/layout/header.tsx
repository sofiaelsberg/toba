"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ButtonLink } from "@/components/blocks/links";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { bookMeeting, clientPortalLink, mainNav, navLabels } from "@/content/site";
import type { Action, LinkItem } from "@/content/types";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

function NavLink({ item, active, onClick, className }: { item: LinkItem; active: boolean; onClick?: () => void; className?: string }) {
  const cls = cn(
    "border-b border-transparent py-2 text-base whitespace-nowrap leading-5 font-medium text-ink no-underline transition-colors hover:border-gold hover:text-navy",
    active && "border-gold text-navy",
    item.external && "text-ink-muted",
    className,
  );
  return item.external ? (
    <a href={item.href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {item.label}
    </a>
  ) : (
    <Link href={item.href} className={cls} aria-current={active ? "page" : undefined} onClick={onClick}>
      {item.label}
    </Link>
  );
}

/**
 * Sticky header med logo, menu, Kundeportal og "Book et møde". Burgermenu under 1120 px (7 menupunkter).
 * Kampagnesiderne bruger samme header, men med sidens egen knap (fx "Hent guiden gratis") i stedet for "Book et møde".
 */
export function Header({ action = bookMeeting }: { action?: Action }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = [...mainNav, clientPortalLink];
  const isActive = (href: string) => href !== "/" && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream">
      <a href="#indhold" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:p-2">
        {navLabels.skipToContent}
      </a>
      <div className="wrap flex h-20 items-center gap-3 sm:gap-6 lg:gap-8">
        <Logo className="mr-auto" />
        <nav aria-label={navLabels.main} className="hidden items-center gap-7 min-[1120px]:flex">
          {items.map((i) => (
            <NavLink key={i.href} item={i} active={isActive(i.href)} />
          ))}
        </nav>
        {/* Under 380 px er der ikke plads til både logo, knap og menu – så står knappen i menuen. */}
        <ButtonLink action={action} className="whitespace-nowrap max-[379px]:hidden" />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label={navLabels.openMenu}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-navy text-navy min-[1120px]:hidden"
          >
            <Menu aria-hidden className="size-5" />
          </SheetTrigger>
          <SheetContent side="top" closeLabel={navLabels.closeMenu} aria-describedby={undefined}>
            <SheetTitle className="sr-only">{navLabels.mobile}</SheetTitle>
            <nav aria-label={navLabels.mobile} className="wrap flex flex-col gap-1 pt-20 pb-6">
              {items.map((i) => (
                <NavLink key={i.href} item={i} active={isActive(i.href)} onClick={() => setOpen(false)} className="py-3" />
              ))}
              {/* Lukker menuen, når knappen bruges. */}
              <div className="mt-4 min-[380px]:hidden" onClick={() => setOpen(false)}>
                <ButtonLink action={bookMeeting} />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
