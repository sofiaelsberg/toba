"use client";

import { useProgressInView } from "@/components/motion/use-progress-in-view";

/** Vulkanen (A'et i logoet) tegner sig i tre trin: bjerget, udbruddet, det nye landskab. */
export function VolcanoStory({ stages, label }: { stages: { title: string; text: string }[]; label: string }) {
  const { ref, progress } = useProgressInView<HTMLDivElement>({ amount: 0.4, duration: 2.6 });
  const part = (start: number, end: number) => Math.min(1, Math.max(0, (progress - start) / (end - start)));
  const mountain = part(0, 0.45);
  const burst = part(0.35, 0.6);
  const growth = part(0.55, 1);
  const lit = [mountain > 0.05, burst > 0.05, growth > 0.05];

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <svg viewBox="0 0 520 220" role="img" aria-label={label} className="h-auto w-full max-w-[32.5rem]">
        <path d="M20 200 L200 40 L230 40 L410 200" fill="none" stroke="var(--gold)" strokeWidth="2" strokeDasharray="560" strokeDashoffset={560 * (1 - mountain)} />
        <path d="M215 34 L190 6 M215 34 L215 0 M215 34 L240 6" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeDasharray="40" strokeDashoffset={40 * (1 - burst)} />
        <path d="M0 200 C80 170 140 186 200 176 C260 166 320 186 380 172 C430 162 480 178 520 170" fill="none" stroke="var(--gold-soft)" strokeWidth="2" strokeDasharray="560" strokeDashoffset={560 * (1 - growth)} />
        <path d="M0 214 L520 214" stroke="var(--grey-light)" strokeWidth="1" opacity=".4" />
      </svg>
      <ol className="grid grid-cols-3 gap-4 text-small text-on-navy-muted">
        {stages.map((s, i) => (
          <li key={s.title} className="transition-opacity duration-500" style={{ opacity: lit[i] ? 1 : 0.3 }}>
            <strong className="block font-semibold text-white">{s.title}</strong>
            {s.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
