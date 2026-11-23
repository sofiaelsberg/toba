import Link from "next/link";

import { eyebrowClass } from "@/components/blocks/typography";
import { ButtonLink } from "@/components/blocks/links";
import { Logo } from "@/components/layout/logo";
import { notFound as c } from "@/content/pages/not-found";
import { footer } from "@/content/site";
import { telHref } from "@/lib/format";

export const metadata = { title: c.seo.title, robots: { index: false } };

export default function NotFound() {
  return (
    <div className="on-navy flex min-h-screen flex-col bg-navy text-on-navy">
      <header className="wrap py-7">
        <Logo tone="light" />
      </header>
      <main className="wrap flex-1 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-20">
          <div className="flex flex-col gap-5">
            <p className={`${eyebrowClass} text-gold-on-navy`}>{c.eyebrow}</p>
            <h1 className="font-serif text-[2.375rem] leading-[2.75rem] font-medium md:text-display md:leading-(--text-display--line-height)">{c.title}</h1>
            <p className="max-w-140 text-[1.25rem] leading-[1.875rem] md:text-[1.375rem] md:leading-8 md:font-light">{c.lead}</p>
            <ButtonLink action={c.homeAction} className="mt-2 self-start" />
            <p className="mt-4 text-small text-on-navy-muted">
              {c.help.before} <a href={telHref(c.help.phone)} className="text-white underline underline-offset-2">{c.help.phone}</a> {c.help.middle}{" "}
              <Link href={c.help.href} className="text-white underline underline-offset-2">
                {c.help.linkLabel}
              </Link>
              {c.help.after}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <svg viewBox="0 0 420 160" aria-hidden className="h-auto w-full max-w-105">
              <path d="M10 150 L170 20 L200 20 L360 150" fill="none" stroke="var(--gold)" strokeWidth="2" />
              <path d="M0 150 L420 150" stroke="var(--grey-light)" strokeWidth="1" opacity=".35" />
            </svg>
            <p className={`${eyebrowClass} text-gold-on-navy`}>{c.suggestionsTitle}</p>
            <nav aria-label={c.suggestionsTitle}>
              <ul className="border-b border-gold-light/60">
                {c.suggestions.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="flex items-center justify-between gap-4 border-t border-gold-light/60 py-4 text-lg font-medium text-white no-underline transition-[padding] duration-300 ease-toba hover:pl-2">
                      {s.label}
                      <span aria-hidden className="text-gold">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>
      <footer className="wrap border-t border-gold-light/60 py-6 text-caption text-on-navy-muted">{footer.companyLine}</footer>
    </div>
  );
}
