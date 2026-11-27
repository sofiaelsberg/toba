import type { Metadata } from "next";
import Link from "next/link";

import { CookieSettingsButton } from "@/components/layout/cookie-banner";
import { buttonVariants } from "@/components/ui/button";
import { NarrowBlock, NarrowPage } from "@/components/sections/narrow-page";
import { cookieConsent, cookiesPage as c } from "@/content/pages/legal";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.cookies, c.seo);

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
          <h2 className="mt-6 font-serif text-h3 font-medium text-navy">{c.list.title}</h2>
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={c.list.title}>
            <table className="w-full min-w-[34rem] border-collapse bg-white text-left text-small">
              <thead>
                <tr className="border-b-2 border-gold">
                  <th scope="col" className="p-3 font-semibold text-navy">{c.list.headers.name}</th>
                  <th scope="col" className="p-3 font-semibold text-navy">{c.list.headers.provider}</th>
                  <th scope="col" className="p-3 font-semibold text-navy">{c.list.headers.purpose}</th>
                  <th scope="col" className="p-3 font-semibold text-navy">{c.list.headers.duration}</th>
                </tr>
              </thead>
              <tbody>
                {c.list.items.map((i) => (
                  <tr key={i.name} className="border-b border-line align-top">
                    <th scope="row" className="p-3 font-mono text-[0.8125rem] font-normal break-all">{i.name}</th>
                    <td className="p-3">
                      {i.provider}
                      <span className="block text-caption text-ink-muted">{cookieConsent.categories.find((x) => x.id === i.category)?.title}</span>
                    </td>
                    <td className="p-3">{i.purpose}</td>
                    <td className="p-3 whitespace-nowrap">{i.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-small text-ink-muted">{c.list.note}</p>
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
    </>
  );
}
