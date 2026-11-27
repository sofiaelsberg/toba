import type { Metadata } from "next";

import { TextLink } from "@/components/blocks/links";
import { RichText } from "@/components/blocks/rich-text";
import { Caption } from "@/components/blocks/typography";
import { PointList } from "@/components/sections/lists";
import { NarrowBlock, NarrowPage } from "@/components/sections/narrow-page";
import { privacyPage as c } from "@/content/pages/legal";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.privacy, c.seo);

const h2 = "scroll-mt-28 font-serif text-[2rem] leading-10 font-medium text-navy";

/** Privatlivspolitik – hjemmesiden, henvendelser, nyhedsbrev og kundeforholdet (GDPR art. 13–14). */
export default function PrivacyPage() {
  return (
    <>
      <NarrowPage hero={c.hero}>
        <NarrowBlock className="pt-0 md:pt-0">
          <Caption>{c.version}</Caption>
          <nav aria-labelledby="indholdsfortegnelse" className="border-t-2 border-gold bg-white p-6">
            <h2 id="indholdsfortegnelse" className="mb-3 font-serif text-[1.5rem] leading-8 font-medium text-navy">
              {c.tocTitle}
            </h2>
            <ol className="grid list-decimal gap-x-8 gap-y-1.5 pl-5 sm:grid-cols-2">
              {c.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-navy">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </NarrowBlock>
        {c.sections.map((s, i) => (
          <NarrowBlock key={s.id} surface={i % 2 === 0 ? "white" : "cream"}>
            <h2 id={s.id} className={h2}>
              {s.title}
            </h2>
            {s.text?.map((t) => (
              <p key={t.slice(0, 32)}>
                <RichText text={t} />
              </p>
            ))}
            {s.points && <PointList points={s.points} />}
            {s.after?.map((t) => (
              <p key={t.slice(0, 32)}>
                <RichText text={t} />
              </p>
            ))}
            {s.link && (
              <TextLink href={s.link.href} className="self-start">
                {s.link.label}
              </TextLink>
            )}
          </NarrowBlock>
        ))}
        <NarrowBlock>
          <Caption>{c.version}</Caption>
        </NarrowBlock>
      </NarrowPage>
    </>
  );
}
