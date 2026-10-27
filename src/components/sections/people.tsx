import Image from "next/image";

import type { Person } from "@/content/types";
import { telHref } from "@/lib/format";
import { cn } from "@/lib/utils";

function ContactLinks({ person, className, linkClassName }: { person: Person; className?: string; linkClassName?: string }) {
  if (!person.phone && !person.email) return null;
  return (
    <div className={cn("flex min-w-0 flex-col gap-0.5 text-small [overflow-wrap:anywhere]", className)}>
      {person.phone && (
        <a href={telHref(person.phone)} className={cn("no-underline hover:underline", linkClassName)}>
          {person.phone}
        </a>
      )}
      {person.email && (
        <a href={`mailto:${person.email}`} className={cn("no-underline hover:underline", linkClassName)}>
          {person.email}
        </a>
      )}
    </div>
  );
}

/**
 * Rådgiverkort: portræt 4:5, navn, titel.
 * `hover`: kontakt glider op over billedet ved hover/fokus på desktop og står under navnet på mobil.
 * `always`: kontakt står altid under navnet.
 */
export function PersonCard({ person, contact = "hover" }: { person: Person; contact?: "hover" | "always" }) {
  return (
    <div className="group flex min-w-0 flex-col gap-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        <Image
          src={person.portrait.src}
          alt={person.portrait.alt}
          width={person.portrait.width}
          height={person.portrait.height}
          sizes="(min-width: 1024px) 20vw, 50vw"
          className="size-full object-cover transition-transform duration-700 ease-toba group-hover:scale-[1.03]"
        />
        {contact === "hover" && (
          <ContactLinks
            person={person}
            className="absolute inset-x-0 bottom-0 hidden translate-y-2 bg-navy/92 px-3.5 py-3 opacity-0 transition-[opacity,transform] duration-300 ease-toba group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:flex"
            linkClassName="text-white"
          />
        )}
      </div>
      <p className="mt-3 font-serif text-[1.375rem] leading-7 font-medium text-navy">{person.name}</p>
      <p className="text-small text-ink-muted">{person.title}</p>
      <ContactLinks person={person} className={cn("pt-2", contact === "hover" && "md:hidden")} linkClassName="text-navy" />
    </div>
  );
}

export function PeopleGrid({ people, contact }: { people: Person[]; contact?: "hover" | "always" }) {
  return (
    <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
      {people.map((p) => (
        <li key={p.slug} className="min-w-0">
          <PersonCard person={p} contact={contact} />
        </li>
      ))}
    </ul>
  );
}
