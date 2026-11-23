import Image from "next/image";

import type { Aspect, ImageRef } from "@/content/types";
import { cn } from "@/lib/utils";

export const aspects: Record<Aspect, string> = { "1/1": "aspect-square", "4/5": "aspect-[4/5]", "4/3": "aspect-[4/3]", "16/10": "aspect-[16/10]" };

export function Media({
  media,
  className,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
}: {
  media: ImageRef;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      preload={priority}
      className={cn("h-auto w-full", className)}
    />
  );
}
