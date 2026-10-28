import type { Metadata } from "next";
import Link from "next/link";

import { CookieSettingsButton } from "@/components/layout/cookie-banner";
import { buttonVariants } from "@/components/ui/button";
import { Disclaimer } from "@/components/sections/legal";
import { NarrowBlock, NarrowPage } from "@/components/sections/narrow-page";
import { cookieConsent, cookiesPage as c } from "@/content/pages/legal";
import { disclaimers } from "@/content/site";

export const metadata: Metadata = { title: c.seo.title, description: c.seo.description };

export default function CookiesPage() {
  return (
    <>
      <NarrowPage hero={c.hero}>
        <NarrowBlock className="pt-0 md:pt-0">
          <h2 className="font-serif text-[2rem] leading-10 font-medium text-navy">{c.usageTitle}</h2>
          <ul className="border-b border-line">
            {cookieConsent.categories.map((cat) => (
              <li key={cat.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-t border-line py-4.5">
                <div>
                  <p className="font-semibold text-navy">{cat.title}</p>
                  <p>{cat.text}</p>
                </div>
                {cat.locked && <span className="rounded-full bg-navy px-2.5 py-1 text-[0.875rem] whitespace-nowrap text-white">{cookieConsent.states.always}</span>}
              </li>
            ))}
          </ul>
          {/* TODO: erstattes af cookieværktøjets liste over konkrete cookies */}
          <p className="bg-white p-5 text-small text-ink-muted">{c.listPlaceholder}</p>
          <div className="mt-4 flex flex-col gap-3 border-t-2 border-gold bg-white p-7">
            <h2 className="font-serif text-h3 font-medium text-navy">{c.change.title}</h2>
            <p>{c.change.text}</p>
            <CookieSettingsButton className={buttonVariants({ variant: "primary", className: "self-start" })}>{c.change.button}</CookieSettingsButton>
            <p className="text-small text-ink-muted">
              {c.change.privacyText} <Link href={c.change.privacyHref}>{c.change.privacyLink}</Link>.
            </p>
          </div>
        </NarrowBlock>
      </NarrowPage>
      <Disclaimer content={disclaimers.short} />
    </>
  );
}
