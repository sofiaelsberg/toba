"use client";

import { eyebrowClass } from "@/components/blocks/typography";
import { ButtonLink } from "@/components/blocks/links";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { serverError as c } from "@/content/pages/not-found";
import { telHref } from "@/lib/format";

/** Fejlgrænse for alle sider: vises i stedet for en hvid side, hvis noget fejler uventet. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="on-navy flex min-h-screen flex-col bg-navy text-on-navy">
      <header className="wrap py-7">
        <Logo tone="light" />
      </header>
      <main className="wrap flex flex-1 flex-col items-start justify-center gap-5 py-16">
        <p className={`${eyebrowClass} text-gold-on-navy`}>{c.eyebrow}</p>
        <h1 className="font-serif text-[2.375rem] leading-[2.75rem] font-medium md:text-display md:leading-(--text-display--line-height)">{c.title}</h1>
        <p className="max-w-140 text-[1.25rem] leading-[1.875rem]">{c.lead}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button variant="light" onClick={reset}>
            {c.retry}
          </Button>
          <ButtonLink action={c.homeAction} />
        </div>
        <a href={telHref(c.phone)} className="text-white">
          {c.phone}
        </a>
      </main>
    </div>
  );
}
