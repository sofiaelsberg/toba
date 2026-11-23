import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge kender ikke vores typeskala (`--text-*` i globals.css) og troede, at fx `text-eyebrow`
 * var en farve – så `cn("text-eyebrow text-gold-text")` smed størrelsen væk. Listen skal følge globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h2", "h3", "h4", "stat", "quote", "lead", "body", "small", "caption", "eyebrow"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
