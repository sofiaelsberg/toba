"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

import { ButtonLink, TextLink } from "@/components/blocks/links";
import { Eyebrow } from "@/components/blocks/typography";
import { EASE } from "@/components/motion/tokens";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import type { GroupId, Person } from "@/content/types";
import { ui } from "@/content/ui";
import { telHref } from "@/lib/format";
import { cn } from "@/lib/utils";

type Props = {
  people: Person[];
  groups: { id: GroupId; name: string; note?: string }[];
  allLabel: string;
  profileUrlPrefix: string;
  bookHref: string;
};

/** Teamsiden: filtre, grid grupperet efter afdeling og profiler i et sidepanel. */
export function TeamDirectory({ people, groups, allLabel, profileUrlPrefix, bookHref }: Props) {
  const [filter, setFilter] = useState<GroupId | "alle">("alle");
  const [open, setOpen] = useState<Person | null>(null);

  const filters = [{ id: "alle" as const, name: allLabel, count: people.length }, ...groups.map((g) => ({ id: g.id, name: g.name, count: people.filter((p) => p.group === g.id).length }))];
  const visible = groups.filter((g) => filter === "alle" || filter === g.id);

  return (
    <>
      <div role="group" aria-label={ui.team.filterLabel} className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.id)}
              className={cn(
                "min-h-11 cursor-pointer rounded-full border px-4.5 py-2.5 text-[0.9375rem] font-medium transition-colors duration-300 ease-toba",
                on ? "border-navy bg-navy text-white" : "border-line-strong bg-white text-navy",
              )}
            >
              {f.name} <span className="tabular opacity-70">{f.count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col gap-16">
        {visible.map((g) => (
          <section key={g.id} aria-labelledby={`gruppe-${g.id}`} className="flex flex-col gap-6">
            <div className="flex items-baseline gap-4 border-t-2 border-gold-light pt-4">
              <h2 id={`gruppe-${g.id}`} className="font-serif text-[2rem] leading-10 font-medium text-navy">
                {g.name}
              </h2>
              {g.note && <span className="text-small text-ink-muted">{g.note}</span>}
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {people
                .filter((p) => p.group === g.id)
                .map((p, i) => (
                  <motion.li key={`${filter}-${p.slug}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}>
                    <TeamCard person={p} onOpen={() => setOpen(p)} />
                  </motion.li>
                ))}
            </ul>
          </section>
        ))}
      </div>

      <Sheet open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <SheetContent closeLabel={ui.team.closeProfile} aria-describedby={undefined}>
          {open && <Profile person={open} groupName={groups.find((g) => g.id === open.group)?.name ?? ""} urlPrefix={profileUrlPrefix} bookHref={bookHref} />}
        </SheetContent>
      </Sheet>
    </>
  );
}

function TeamCard({ person, onOpen }: { person: Person; onOpen: () => void }) {
  const first = person.name.split(" ")[0];
  const inner = (
    <>
      <span className="relative block aspect-[4/5] overflow-hidden bg-line">
        <Image src={person.portrait.src} alt="" width={480} height={600} sizes="(min-width: 1024px) 25vw, 50vw" className="size-full object-cover transition-transform duration-700 ease-toba group-hover:scale-[1.03]" />
        {!person.noProfile && (
          <span className="absolute inset-x-0 bottom-0 hidden translate-y-2 bg-navy/92 px-3.5 py-3 text-[0.9375rem] font-semibold text-white opacity-0 transition-[opacity,transform] duration-300 ease-toba group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:block">
            {ui.team.readMore(first)}
          </span>
        )}
      </span>
      <span className="mt-3 block font-serif text-[1.375rem] leading-7 font-medium text-navy">{person.name}</span>
      <span className="block text-small text-ink-muted">{person.title}</span>
    </>
  );
  if (person.noProfile) return <div>{inner}</div>;
  return (
    <button type="button" onClick={onOpen} aria-label={ui.team.readMoreAria(person.name)} className="group block w-full cursor-pointer text-left">
      {inner}
    </button>
  );
}

function Profile({ person, groupName, urlPrefix, bookHref }: { person: Person; groupName: string; urlPrefix: string; bookHref: string }) {
  const first = person.name.split(" ")[0];
  return (
    <div className="flex flex-col gap-6 p-8">
      <SheetDescription className="pr-14 text-caption text-ink-muted">
        {urlPrefix}
        {person.slug}
      </SheetDescription>
      <div className="grid grid-cols-[10rem_minmax(0,1fr)] items-end gap-6">
        <div className="aspect-[4/5] overflow-hidden bg-line">
          <Image src={person.portrait.src} alt={person.portrait.alt} width={480} height={600} sizes="160px" className="size-full object-cover" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Eyebrow>{groupName}</Eyebrow>
          <SheetTitle className="font-serif text-[2rem] leading-10 font-medium text-navy">{person.name}</SheetTitle>
          <p className="text-small text-ink-muted">{person.title}</p>
        </div>
      </div>
      <div aria-hidden className="h-0.5 w-12 bg-gold" />
      {person.bio.length ? person.bio.map((b) => <p key={b.slice(0, 24)}>{b}</p>) : <p className="border-t-2 border-warning bg-white p-4 text-small text-ink-muted">{ui.team.bioMissing}</p>}
      <div className="flex flex-col gap-2 border-t border-line pt-4">
        {person.phone && <a href={telHref(person.phone)} className="text-navy no-underline">{person.phone}</a>}
        {person.email && <a href={`mailto:${person.email}`} className="text-navy no-underline">{person.email}</a>}
        {person.linkedin && <TextLink href={person.linkedin} className="self-start">{ui.team.linkedin}</TextLink>}
      </div>
      {person.group === "raadgivning" && <ButtonLink action={{ label: ui.team.bookWith(first), href: bookHref }} className="self-start" />}
    </div>
  );
}
