import Image from "next/image";

import type { ImageRef, PlaceholderRef } from "@/content/types";
import { cn } from "@/lib/utils";

const aspects = { "1/1": "aspect-square", "4/5": "aspect-[4/5]", "4/3": "aspect-[4/3]", "16/10": "aspect-[16/10]" };

export function isPlaceholder(m: ImageRef | PlaceholderRef): m is PlaceholderRef {
  return "placeholder" in m;
}

/** Navngivet pladsholder for medier, der endnu ikke findes. */
export function MediaPlaceholder({ media, className, tone = "light" }: { media: PlaceholderRef; className?: string; tone?: "light" | "navy" }) {
  return (
    <div
      className={cn(
        "flex max-w-full items-end p-6 text-small",
        aspects[media.aspect ?? "4/3"],
        tone === "light" ? "border border-line bg-white text-ink-muted" : "bg-[repeating-linear-gradient(135deg,var(--navy)_0_18px,#2b3e4f_18px_36px)] text-on-navy-muted",
        className,
      )}
    >
      {media.placeholder}
    </div>
  );
}

/** Billede eller pladsholder. */
export function Media({
  media,
  className,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
  tone,
}: {
  media: ImageRef | PlaceholderRef;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "navy";
}) {
  if (isPlaceholder(media)) return <MediaPlaceholder media={media} className={className} tone={tone} />;
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      priority={priority}
      className={cn("h-auto w-full", className)}
    />
  );
}
