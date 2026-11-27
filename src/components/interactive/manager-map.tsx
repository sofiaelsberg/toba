import { eyebrowClass } from "@/components/blocks/typography";
import type { ManagerMapContent } from "@/content/types";
import { projectWorldDots, worldDots } from "@/content/maps/world-dots";
import { cn } from "@/lib/utils";

/**
 * Statisk prikket kort med forvalternes hovedkontorer.
 * Prikkerne er pynt; skærmlæsere får stederne og forvalterne som en skjult liste.
 */
export function ManagerMap({ content, className }: { content: ManagerMapContent; className?: string }) {
  return (
    <figure className={cn("flex flex-col gap-5 border border-line bg-white p-6", className)}>
      <div className="relative">
        <svg viewBox={`0 0 ${worldDots.width} ${worldDots.height}`} aria-hidden className="block h-auto w-full">
          <path d={worldDots.path} stroke="var(--layer-4)" strokeWidth={5} strokeLinecap="round" />
        </svg>
        <ul aria-label={content.label}>
          {content.locations.map((l) => {
            const { x, y } = projectWorldDots(l.lat, l.lon);
            return (
              <li
                key={l.label}
                className="absolute"
                style={{ left: `${(x / worldDots.width) * 100}%`, top: `${(y / worldDots.height) * 100}%` }}
              >
                <span aria-hidden className="absolute block size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-gold" />
                <span className="sr-only">
                  {l.label}: {l.managers.join(", ")}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-4 sm:grid-cols-4">
        {content.regions.map((r) => (
          <li key={r.label} className={`${eyebrowClass} text-gold-text`}>
            {r.label}
          </li>
        ))}
      </ul>
      {content.caption && <figcaption className="text-caption text-ink-muted">{content.caption}</figcaption>}
    </figure>
  );
}
