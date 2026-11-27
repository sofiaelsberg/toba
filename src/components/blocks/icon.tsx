import {
  CircleSlash2,
  HandCoins,
  ReceiptText,
  CircleUserRound,
  FileText,
  Globe,
  Library,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  Users,
  Cookie,
  Eye,
  HeartHandshake,
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
  "no-commission": CircleSlash2,
  "fixed-fee": ReceiptText,
  rebate: HandCoins,
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
  handshake: HeartHandshake,
  eye: Eye,
};

/** Guldikon i navy felt (48 px) – på navy flader en lys, gennemsigtig variant. */
export function IconBadge({ name, className }: { name: IconName; className?: string }) {
  const Icon = map[name];
  return (
    <span
      aria-hidden
      className={cn("flex size-12 shrink-0 items-center justify-center bg-navy text-gold [.on-navy_&]:bg-white/10", className)}
    >
      <Icon className="size-6" strokeWidth={1.5} />
    </span>
  );
}
