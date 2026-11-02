import type { Metadata } from "next";

import { AddressCard, Disclaimer } from "@/components/sections/legal";
import { NumberedSteps } from "@/components/sections/lists";
import { NarrowBlock, NarrowPage } from "@/components/sections/narrow-page";
import { complaints as c } from "@/content/pages/legal";
import { disclaimers, routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.complaints, c.seo);

export default function ComplaintsPage() {
  const a = c.escalation.address;
  return (
    <>
      <NarrowPage hero={c.hero}>
        <NarrowBlock className="pt-0 md:pt-0">
          <h2 className="font-serif text-[2rem] leading-10 font-medium text-navy">{c.stepsTitle}</h2>
          <NumberedSteps steps={c.steps} pad columns={1} />
        </NarrowBlock>
        <NarrowBlock surface="white">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-[2rem] leading-10 font-medium text-navy">{c.escalation.title}</h2>
              <p>{c.escalation.text}</p>
            </div>
            <AddressCard name={a.name} lines={a.lines} phoneLabel={a.phoneLabel} phone={a.phone} emailLabel={a.emailLabel} email={a.email} />
          </div>
        </NarrowBlock>
      </NarrowPage>
      <Disclaimer content={disclaimers.short} />
    </>
  );
}
