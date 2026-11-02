import type { Metadata } from "next";

import { ButtonLink, TextLink } from "@/components/blocks/links";
import { Caption } from "@/components/blocks/typography";
import { Disclaimer } from "@/components/sections/legal";
import { NumberedSteps, PointList } from "@/components/sections/lists";
import { NarrowBlock, NarrowPage } from "@/components/sections/narrow-page";
import { accessibilityPage as c } from "@/content/pages/legal";
import { disclaimers, routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.accessibility, c.seo);

const h2 = "font-serif text-[2rem] leading-10 font-medium text-navy";

/** Oplysninger om tilgængelighed efter tilgængelighedsloven (§ 35 og bilag 4). */
export default function AccessibilityPage() {
  return (
    <>
      <NarrowPage hero={c.hero}>
        <NarrowBlock className="pt-0 md:pt-0">
          <h2 className={h2}>{c.service.title}</h2>
          <p>{c.service.text}</p>
          <h3 className="mt-4 font-serif text-h3 font-medium text-navy">{c.service.stepsTitle}</h3>
          <NumberedSteps steps={c.service.steps} pad columns={1} />
        </NarrowBlock>
        <NarrowBlock surface="white">
          <h2 className={h2}>{c.website.title}</h2>
          <p>{c.website.lead}</p>
          <PointList points={c.website.points} />
        </NarrowBlock>
        <NarrowBlock>
          <h2 className={h2}>{c.limits.title}</h2>
          <PointList points={c.limits.points} />
        </NarrowBlock>
        <NarrowBlock surface="white">
          <h2 className={h2}>{c.contact.title}</h2>
          <p>{c.contact.text}</p>
          <ButtonLink action={c.contact.action} className="self-start" />
        </NarrowBlock>
        <NarrowBlock>
          <h2 className={h2}>{c.complaint.title}</h2>
          <p>{c.complaint.text}</p>
          <TextLink href={c.complaint.link.href} className="self-start">
            {c.complaint.link.label}
          </TextLink>
          <Caption className="mt-4">{c.updated}</Caption>
        </NarrowBlock>
      </NarrowPage>
      <Disclaimer content={disclaimers.short} />
    </>
  );
}
