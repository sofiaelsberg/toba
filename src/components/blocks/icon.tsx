import {
  Ban,
  CircleUserRound,
  FileText,
  Globe,
  Library,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  Square,
  Undo2,
  Users,
  Cookie,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/content/types";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Lucide har ikke brand-ikoner længere – simpelt LinkedIn-mærke i samme stregstil. */
function LinkedinMark(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </svg>
  );
}

const map: Record<IconName, LucideIcon | typeof LinkedinMark> = {
  globe: Globe,
  "no-commission": Ban,
  "fixed-fee": Square,
  rebate: Undo2,
  owners: Users,
  person: CircleUserRound,
  shelves: Library,
  "phone-app": Smartphone,
  shield: ShieldCheck,
  phone: Phone,
  pin: MapPin,
  linkedin: LinkedinMark,
  document: FileText,
  cookie: Cookie,
};

/** Ikon i guldkantet felt (44 px). */
export function IconBadge({ name, className }: { name: IconName; className?: string }) {
  const Icon = map[name];
  return (
    <span
      aria-hidden
      className={cn("flex size-11 shrink-0 items-center justify-center border border-gold text-gold-text [.on-navy_&]:text-gold", className)}
    >
      <Icon className="size-[22px]" strokeWidth={1.75} />
    </span>
  );
}
