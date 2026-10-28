import { IconBadge } from "@/components/blocks/icon";
import { RichText } from "@/components/blocks/rich-text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem, FeatureContent, Point, QuoteContent, StepContent, ValueItem } from "@/content/types";
import { cn } from "@/lib/utils";

/** Fed førstesætning + tekst, adskilt af hårstreger. */
export function PointList({ points, className, title }: { points: Point[]; className?: string; title?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      {title && <p className="mb-2 text-eyebrow font-semibold tracking-[0.12em] text-gold-text uppercase [.on-navy_&]:text-gold">{title}</p>}
      <ul className="border-b border-line [.on-navy_&]:border-gold-light">
        {points.map((p) => (
          <li key={p.title} className="border-t border-line py-4 [.on-navy_&]:border-gold-light">
            <p className="font-semibold text-navy [.on-navy_&]:text-white">{p.title}</p>
            <p className="[.on-navy_&]:text-on-navy-muted">
              <RichText text={p.text} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 01–04: værdier med "For dig:". */
export function ValueGrid({ items }: { items: ValueItem[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((v) => (
        <li key={v.number} className="flex flex-col gap-3 border-t border-line pt-5">
          <span className="font-serif text-h3 font-medium text-gold-text">{v.number}</span>
          <h3 className="font-serif text-h3 font-medium text-navy">{v.title}</h3>
          <p>{v.text}</p>
          <p className="border-l border-gold-light pl-4 text-navy">
            <strong className="font-semibold">{v.forYouLabel}</strong> {v.forYou}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Ikon + titel + tekst. */
export function FeatureList({ features, columns = 3, inline }: { features: FeatureContent[]; columns?: 1 | 3; inline?: boolean }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-x-6 gap-y-10", columns === 3 && "md:grid-cols-3")}>
      {features.map((f) => (
        <li key={f.title} className={cn("flex gap-4", !inline && "flex-col gap-3")}>
          <IconBadge name={f.icon} />
          <div className="flex flex-col gap-1">
            <h3 className={cn(inline ? "font-semibold text-navy [.on-navy_&]:text-white" : "font-serif text-[1.5rem] leading-8 font-medium text-navy [.on-navy_&]:text-white")}>
              {f.title}
            </h3>
            <p className="[.on-navy_&]:text-on-navy-muted">{f.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Store tal 1–4 (eller 01–03) med titel og tekst. */
export function NumberedSteps({ steps, pad = false, columns = 4 }: { steps: StepContent[]; pad?: boolean; columns?: 1 | 4 }) {
  return (
    <ol className={cn("grid grid-cols-1 gap-6", columns === 4 && "sm:grid-cols-2 lg:grid-cols-4", columns === 1 && "gap-0")}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={cn(
            "flex gap-4 border-t border-line pt-5 [.on-navy_&]:border-gold-light",
            columns === 4 ? "flex-col gap-2.5" : "grid grid-cols-[3.5rem_minmax(0,1fr)] py-5 last:border-b",
          )}
        >
          <span className="font-serif text-[2.25rem] leading-10 font-medium text-gold-text [.on-navy_&]:text-gold">
            {pad ? String(i + 1).padStart(2, "0") : i + 1}
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-serif text-[1.5rem] leading-8 font-medium text-navy [.on-navy_&]:text-white">{s.title}</h3>
            <p className="[.on-navy_&]:text-on-navy-muted">
              <RichText text={s.text} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Spørgsmål/trin der foldes ud. Tom linje (\n\n) i svaret = nyt afsnit. */
export function AccordionList({ items, defaultOpen }: { items: FaqItem[]; defaultOpen?: number }) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen !== undefined ? `item-${defaultOpen}` : undefined}>
      {items.map((item, i) => (
        <AccordionItem key={item.question} value={`item-${i}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            {item.answer.split("\n\n").map((para) => (
              <p key={para.slice(0, 32)}>
                <RichText text={para} />
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function QuoteBlock({ quote }: { quote: QuoteContent }) {
  return (
    <blockquote className="max-w-[51rem] border-l-2 border-gold pl-6">
      <p className="font-serif text-quote font-medium text-navy italic">{quote.text}</p>
      <footer className="mt-3 text-small text-ink-muted">{quote.source}</footer>
    </blockquote>
  );
}
