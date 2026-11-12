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
function PersonCard({ person, contact = "hover", size = "default" }: { person: Person; contact?: "hover" | "always"; size?: "default" | "sm" }) {
  const sm = size === "sm";
  return (
    <div className="group flex min-w-0 flex-col gap-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        <Image
          src={person.portrait.src}
          alt={person.portrait.alt}
          width={person.portrait.width}
          height={person.portrait.height}
          sizes={sm ? "(min-width: 768px) 14vw, 50vw" : "(min-width: 1024px) 20vw, 50vw"}
          className="size-full object-cover transition-transform duration-700 ease-toba group-hover:scale-[1.03]"
        />
        {contact === "hover" && (
          <ContactLinks
            person={person}
            className={cn(
              "absolute inset-x-0 bottom-0 hidden translate-y-2 bg-navy/92 opacity-0 transition-[opacity,transform] duration-300 ease-toba group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:flex",
              sm ? "px-2.5 py-2 text-caption" : "px-3.5 py-3",
            )}
            linkClassName="text-white"
          />
        )}
      </div>
      <p className={cn("font-serif font-medium text-navy", sm ? "mt-2 text-[1.125rem] leading-6" : "mt-3 text-[1.375rem] leading-7")}>{person.name}</p>
      <p className={cn("text-ink-muted", sm ? "text-caption" : "text-small")}>{person.title}</p>
      <ContactLinks person={person} className={cn("pt-2", sm && "text-caption", contact === "hover" && "md:hidden")} linkClassName="text-navy" />
    </div>
  );
}

/** `size="sm"`: små kort i tre kolonner (to rækker for fem rådgivere), fx ved siden af en tekst. */
export function PeopleGrid({ people, contact, size = "default", className }: { people: Person[]; contact?: "hover" | "always"; size?: "default" | "sm"; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2", size === "sm" ? "gap-x-4 gap-y-6 sm:grid-cols-3" : "gap-6 md:grid-cols-3 lg:grid-cols-5", className)}>
      {people.map((p) => (
        <li key={p.slug} className="min-w-0">
          <PersonCard person={p} contact={contact} size={size} />
        </li>
      ))}
    </ul>
  );
}
