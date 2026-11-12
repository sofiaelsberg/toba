import Image from "next/image";

import { GoldRule } from "@/components/blocks/typography";
import type { Person } from "@/content/types";
import { cn } from "@/lib/utils";

/** Stort citat fra en medarbejder med portræt, navn og titel. */
export function PersonQuote({ text, person, className }: { text: string; person: Person; className?: string }) {
  return (
    <figure className={cn("grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] md:gap-16", className)}>
      <div className="relative aspect-[4/5] w-32 overflow-hidden bg-line md:w-full md:max-w-64">
        <Image
          src={person.portrait.src}
          alt={person.portrait.alt}
          width={person.portrait.width}
          height={person.portrait.height}
          sizes="(min-width: 768px) 16rem, 8rem"
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-6">
        <GoldRule />
        <blockquote className="font-serif text-[1.5rem] leading-[2.125rem] font-medium text-balance text-navy md:text-[2rem] md:leading-[2.75rem]">
          <p>{text}</p>
        </blockquote>
        <figcaption>
          <p className="font-semibold text-navy">{person.name}</p>
          <p className="text-small text-ink-muted">{person.title}</p>
        </figcaption>
      </div>
    </figure>
  );
}
