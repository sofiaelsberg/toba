"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";

import type { VideoRef } from "@/content/types";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";

/**
 * Kampagnevideo i 1:1. Starter aldrig selv med lyd.
 * Uden `src` vises en navngivet pladsholder med plakattekst.
 */
export function VideoBlock({ video, className, compact }: { video: VideoRef; className?: string; compact?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const label = [ui.video.play, video.durationLabel].filter(Boolean).join(" · ");

  function play() {
    if (!ref.current) return;
    ref.current.muted = false;
    ref.current.controls = true;
    void ref.current.play();
    setPlaying(true);
  }

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div className="group relative aspect-square max-w-full overflow-hidden bg-navy">
        {video.src ? (
          <video
            ref={ref}
            className="absolute inset-0 size-full object-cover"
            poster={video.poster}
            preload="none"
            playsInline
            muted
          >
            <source src={video.src} type="video/mp4" />
            {video.captionsSrc && <track kind="captions" srcLang="da" src={video.captionsSrc} default />}
          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,var(--navy-deep)_0_18px,#22333f_18px_36px)] p-8 text-center text-small text-on-navy-muted transition-transform duration-700 ease-toba group-hover:scale-[1.03]">
            {video.id} · {video.title}
            <br />
            {ui.video.placeholderNote}
          </div>
        )}
        {!playing && (
          <button
            type="button"
            onClick={play}
            disabled={!video.src}
            className={cn(
              "absolute bottom-6 left-6 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm bg-cream px-4 py-2.5 text-[0.9375rem] font-semibold text-navy disabled:cursor-default",
              compact && "bottom-2 left-2 px-2.5 text-caption",
            )}
          >
            <Play aria-hidden className="size-4 fill-current" />
            {label}
          </button>
        )}
      </div>
      {video.caption && <figcaption className="text-small text-ink-muted [.on-navy_&]:text-on-navy-muted">{video.caption}</figcaption>}
    </figure>
  );
}
