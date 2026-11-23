"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";

import type { VideoRef } from "@/content/types";
import { ui } from "@/content/ui";
import { track } from "@/lib/analytics";
import { jsonLd, videoJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

/** Kampagnevideo i 1:1. Starter aldrig selv med lyd. */
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
    track("video_start", { video: video.id, title: video.title });
  }

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      {videoJsonLd(video) && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(videoJsonLd(video)!)} />}
      <div className="group relative aspect-square max-w-full overflow-hidden bg-navy">
        <video ref={ref} className="absolute inset-0 size-full object-cover" poster={video.poster} preload="none" playsInline muted>
          <source src={video.src} type="video/mp4" />
          {video.captionsSrc && <track kind="captions" srcLang="da" src={video.captionsSrc} default />}
        </video>
        {!playing && (
          <button
            type="button"
            onClick={play}
            className={cn(
              "absolute bottom-6 left-6 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm bg-cream px-4 py-2.5 text-[0.9375rem] font-semibold text-navy",
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
