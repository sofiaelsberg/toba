import type { Metadata } from "next";
import { Suspense } from "react";

import { IconBadge } from "@/components/blocks/icon";
import { TextLink } from "@/components/blocks/links";
import { Eyebrow } from "@/components/blocks/typography";
import { ContactEmbedForm } from "@/components/forms/ac-form";
import { Disclaimer } from "@/components/sections/legal";
import { PeopleGrid } from "@/components/sections/people";
import { HeadingRow, Section, SectionHeading } from "@/components/sections/section";
import { contact as c } from "@/content/pages/contact";
import { advisers } from "@/content/people";
import { disclaimers, routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.contact, c.seo);

export default function ContactPage() {
  return (
    <>
      <section className="bg-cream py-16 md:py-24">
        <div className="wrap grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading as="h1" size="display" eyebrow={c.hero.eyebrow} title={c.hero.title} lead={c.hero.lead} />
            <ul className="border-b border-line">
              {c.details
                .filter((d) => d.value || d.lines || d.link?.href)
                .map((d) => (
                <li key={d.label} className="flex gap-4 border-t border-line py-5">
                  <IconBadge name={d.icon} />
                  <div className="flex flex-col gap-2">
                    <Eyebrow className="text-ink-muted">{d.label}</Eyebrow>
                    {d.value && (
                      <a href={d.href} className="font-serif text-h3 font-medium text-navy no-underline">
                        {d.value}
                      </a>
                    )}
                    {d.lines && (
                      <p>
                        {d.lines.map((l) => (
                          <span key={l} className="block">
                            {l}
                          </span>
                        ))}
                      </p>
                    )}
                    {d.link?.href && (
                      <TextLink href={d.link.href} className="self-start">
                        {d.link?.label}
                      </TextLink>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div id={c.formAnchor} className="scroll-mt-28">
            {/* useSearchParams kræver Suspense; fallback er samme formular uden forvalgt emne. */}
            <Suspense fallback={<ContactEmbedForm topic={null} />}>
              <ContactEmbedForm />
            </Suspense>
          </div>
        </div>
      </section>

      <Section surface="white">
        <div className="flex flex-col gap-10">
          <HeadingRow title={c.advisers.title} lead={c.advisers.lead} link={c.advisers.link} />
          <PeopleGrid people={advisers} contact="always" />
        </div>
      </Section>

      <Disclaimer content={disclaimers.short} />
    </>
  );
}
