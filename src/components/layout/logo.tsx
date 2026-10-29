import Image from "next/image";
import Link from "next/link";

import { brand, routes } from "@/content/site";
import { cn } from "@/lib/utils";

export function Logo({ tone = "dark", className, height = 28 }: { tone?: "dark" | "light"; className?: string; height?: number }) {
  const logo = tone === "dark" ? brand.logoDark : brand.logoLight;
  return (
    <Link href={routes.home} aria-label={brand.homeLabel} className={cn("inline-flex shrink-0 items-center", className)}>
      <Image src={logo.src} alt={brand.logoAlt} width={logo.width} height={logo.height} style={{ height, width: "auto" }} loading="eager" />
    </Link>
  );
}
