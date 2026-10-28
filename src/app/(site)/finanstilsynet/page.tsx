import type { Metadata } from "next";

import { ButtonLink, TextLink } from "@/components/blocks/links";
import { Disclaimer, KeyValueTable } from "@/components/sections/legal";
import { PointList } from "@/components/sections/lists";
import { NarrowBlock, NarrowPage } from "@/components/sections/narrow-page";
import { fsa as c } from "@/content/pages/legal";
import { disclaimers } from "@/content/site";

export const metadata: Metadata = { title: c.seo.title, description: c.seo.description };

export default function FsaPage() {
  return (
    <>
      <NarrowPage hero={c.hero}>
        <NarrowBlock className="pt-0 md:pt-0">
          <KeyValueTable title={c.registrationTitle} rows={c.registration} />
          {c.registerLink.href && <ButtonLink action={c.registerLink} className="self-start" />}
        </NarrowBlock>
        <NarrowBlock surface="white">
          <h2 className="font-serif text-[2rem] leading-10 font-medium text-navy">{c.meaningTitle}</h2>
          <PointList points={c.meaning} />
          <TextLink href={c.complaintsLink.href} className="self-start">
            {c.complaintsLink.label}
          </TextLink>
        </NarrowBlock>
      </NarrowPage>
      <Disclaimer content={disclaimers.short} />
    </>
  );
}
