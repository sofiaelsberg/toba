"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
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
  const [playing, setPlaying] = useState(false);
  const paused = userPaused ?? Boolean(reduce);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (paused) v.pause();
    else void v.play().catch(() => {});
  }, [paused]);

  return (
    <div className={cn("relative max-w-full overflow-hidden bg-navy", aspects[video.aspect], className)}>
      {/* Plakaten er et prioriteret billede, så den vises med det samme (LCP). Videoen toner ind ovenpå. */}
      <Image src={video.poster} alt="" fill preload sizes="(min-width: 900px) 40vw, 100vw" className="object-cover" />
      <video
        ref={ref}
        className={cn("absolute inset-0 size-full object-cover transition-opacity duration-700 ease-toba", playing ? "opacity-100" : "opacity-0")}
        onPlaying={() => setPlaying(true)}
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
