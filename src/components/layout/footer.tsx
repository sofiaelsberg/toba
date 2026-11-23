import Link from "next/link";

import { ButtonLink } from "@/components/blocks/links";
import { bookMeeting, company, footer, landingChrome } from "@/content/site";
import { telHref } from "@/lib/format";
import { Logo } from "./logo";
import { CookieSettingsButton } from "./cookie-banner";

const linkCls = "text-small text-white no-underline hover:text-cream hover:underline";

export function Footer() {
  return (
    <footer className="on-navy bg-navy pt-16 pb-8 text-on-navy">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div className="col-span-2 flex flex-col items-start gap-5 md:col-span-1">
            <Logo tone="light" />
            <p className="max-w-90 text-small text-on-navy-muted">{footer.about}</p>
            <ButtonLink action={{ ...bookMeeting, variant: "light" }} />
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-eyebrow font-semibold tracking-[0.12em] text-gold-on-navy uppercase">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
                {col.title === footer.columns[2].title && (
                  <li>
                    <CookieSettingsButton className={linkCls}>{footer.cookieSettingsLabel}</CookieSettingsButton>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-gold-light pt-5 text-caption text-on-navy-muted">
          <a href={telHref(company.phone)} className="text-inherit no-underline">
            {company.phone}
          </a>
          <span>
            {company.address.line1}, {company.address.line2}
          </span>
          {company.linkedin && (
            <a href={company.linkedin} className="text-inherit no-underline" target="_blank" rel="noopener noreferrer">
              {footer.linkedinLabel}
            </a>
          )}
          <span>{footer.companyLine}</span>
        </div>
      </div>
    </footer>
  );
}

/** Forenklet sidefod til landingssider. */
export function LandingFooter() {
  return (
    <footer className="on-navy bg-navy py-10 text-on-navy-muted">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-caption">
        <Logo tone="light" height={24} />
        <span>
          {footer.companyLine} · {company.address.line1}, {company.address.line2}
        </span>
        <span className="flex flex-wrap gap-x-4 gap-y-2">
          {landingChrome.footerLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-white no-underline">
              {l.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}
