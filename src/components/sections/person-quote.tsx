import Image from "next/image";

import { GoldRule } from "@/components/blocks/typography";
import type { Person } from "@/content/types";
import { cn } from "@/lib/utils";

/** Stort citat fra en medarbejder med portræt, navn og titel. */
export function PersonQuote({ text, person, className }: { text: string; person: Person; className?: string }) {
  return (
    <figure className={cn("grid grid-cols-1 items-center gap-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-12", className)}>
      <div className="relative aspect-[4/5] w-24 overflow-hidden bg-line md:w-44">
        <Image
          src={person.portrait.src}
          alt={person.portrait.alt}
          width={person.portrait.width}
          height={person.portrait.height}
          sizes="(min-width: 768px) 11rem, 6rem"
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-5">
        <GoldRule />
        <blockquote className="text-[1.1875rem] leading-[1.875rem] text-navy md:text-[1.375rem] md:leading-[2.125rem]">
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
