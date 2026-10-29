import { ButtonLink } from "@/components/blocks/links";
import { company, navLabels } from "@/content/site";
import type { Action } from "@/content/types";
import { telHref } from "@/lib/format";
import { Logo } from "./logo";

/** Landingssider: kun logo, telefon og én CTA – så fokus er på formularen. */
export function LandingHeader({ action }: { action: Action }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream">
      <a href="#indhold" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:p-2">
        {navLabels.skipToContent}
      </a>
      <div className="wrap flex h-18 items-center gap-4 sm:gap-6">
        <Logo className="mr-auto" height={26} />
        <a href={telHref(company.phone)} className="hidden text-small text-ink-muted no-underline md:inline">
          {company.phone}
        </a>
        <ButtonLink action={action} className="max-[379px]:px-4" />
      </div>
    </header>
  );
}
