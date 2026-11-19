"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";

import type { VideoRef } from "@/content/types";
import { ui } from "@/content/ui";
import { track } from "@/lib/analytics";
import { jsonLd, videoJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

/**
 * Kampagnevideo i 1:1. Starter aldrig selv med lyd.
 * Uden `src` vises en navngivet pladsholder med plakattekst.
 */
export function VideoBlock({ video, className, compact }: { video: VideoRef; className?: string; compact?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const label = `${ui.video.play}: ${video.title}`;

  function play() {
    if (!ref.current) return;
    ref.current.muted = false;
    ref.current.controls = true;
    void ref.current.play();
    setPlaying(true);
    track("video_start", { video: video.id, title: video.title });
  }

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      {videoJsonLd(video) && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(videoJsonLd(video)!)} />}
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
        {!playing && video.src && (
          <button
            type="button"
            onClick={play}
            aria-label={label}
            className="absolute inset-0 flex cursor-pointer items-center justify-center"
          >
            <span
              className={cn(
                "flex size-16 items-center justify-center rounded-full bg-cream/90 text-navy shadow-lg transition-transform duration-300 ease-toba group-hover:scale-110 md:size-20",
                compact && "size-11 md:size-12",
              )}
            >
              <Play aria-hidden className={cn("ml-1 size-6 fill-current md:size-7", compact && "ml-0.5 size-4 md:size-4")} />
            </span>
          </button>
        )}
      </div>
      {video.caption && <figcaption className="text-small text-ink-muted [.on-navy_&]:text-on-navy-muted">{video.caption}</figcaption>}
    </figure>
  );
}
