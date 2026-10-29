"use client";

import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { AmbientVideoRef } from "@/content/types";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";
import { aspects } from "./media";

/**
 * Lydløs stemningsvideo i loop (fx i hero). Dekorativ: ingen lyd, ingen undertekster.
 * Står stille med plakatbilledet, hvis brugeren har slået animationer fra, og kan altid sættes på pause.
 */
export function AmbientVideo({ video, className }: { video: AmbientVideoRef; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? Boolean(reduce);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (paused) v.pause();
    else void v.play().catch(() => {});
  }, [paused]);

  return (
    <div className={cn("relative max-w-full overflow-hidden bg-navy", aspects[video.aspect], className)}>
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover"
        poster={video.poster}
        preload="metadata"
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={() => setUserPaused(!paused)}
        aria-label={paused ? ui.ambientVideo.play : ui.ambientVideo.pause}
        className="absolute right-3 bottom-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-navy/70 text-white backdrop-blur-sm transition-colors hover:bg-navy"
      >
        {paused ? <Play aria-hidden className="size-4 fill-current" /> : <Pause aria-hidden className="size-4 fill-current" />}
      </button>
    </div>
  );
}
