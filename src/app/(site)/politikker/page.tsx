import type { Metadata } from "next";
import Link from "next/link";

import { IconBadge } from "@/components/blocks/icon";
import { TextLink } from "@/components/blocks/links";
import { Disclaimer, DocumentList } from "@/components/sections/legal";
import { NarrowBlock, NarrowPage } from "@/components/sections/narrow-page";
import { policies as c } from "@/content/pages/legal";
import { disclaimers, routes } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: routes.policies }, title: c.seo.title, description: c.seo.description };

export default function PoliciesPage() {
  return (
    <>
      <NarrowPage hero={c.hero}>
        <NarrowBlock className="pt-0 md:pt-0">
          <div>
            <DocumentList documents={c.documents} />
            <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-5 border-b border-line py-6 md:grid-cols-[2.75rem_minmax(0,1fr)_auto]">
              <IconBadge name="cookie" />
              <div>
                <h2 className="font-serif text-[1.5rem] leading-8 font-medium text-navy">{c.cookiesItem.title}</h2>
                <p className="mt-0.5">{c.cookiesItem.text}</p>
              </div>
              <TextLink href={c.cookiesItem.href} className="col-start-2 justify-self-start md:col-start-auto">
                {c.cookiesItem.linkLabel}
              </TextLink>
            </div>
          </div>
          <div className="mt-6 border-t-2 border-gold bg-white px-7 py-6">
            <h2 className="mb-1.5 font-serif text-[1.5rem] leading-8 font-medium text-navy">{c.questions.title}</h2>
            <p>
              {c.questions.text} <Link href={c.questions.href}>{c.questions.linkLabel}</Link>.
            </p>
          </div>
        </NarrowBlock>
      </NarrowPage>
      <Disclaimer content={disclaimers.short} />
    </>
  );
}
