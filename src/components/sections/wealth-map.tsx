import { Eyebrow } from "@/components/blocks/typography";
import type { WealthMapContent } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * "Én strategi for hele din formue": skattemiljøerne samlet under ét tag (TOBA-vinklen),
 * med familieplanen som fundament nederst.
 */
export function WealthMap({ content, className }: { content: WealthMapContent; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative flex flex-col items-center pt-2 pb-4">
        <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="h-10 w-full text-gold md:h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M0.5 9.5 L50 0.5 L99.5 9.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <Eyebrow className="-mt-3 bg-cream px-3">{content.label}</Eyebrow>
      </div>
      <ul className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
        {content.areas.map((area) => (
          <li key={area} className="bg-white px-6 py-5 text-[1.125rem] leading-7 font-semibold text-navy">
            {area}
          </li>
        ))}
      </ul>
      <div className="on-navy flex flex-col gap-2 bg-navy p-6 text-on-navy md:p-7">
        <p className="font-serif text-[1.375rem] leading-7 font-medium text-white">{content.family.title}</p>
        <p className="text-on-navy-muted">{content.family.text}</p>
      </div>
    </div>
  );
}
