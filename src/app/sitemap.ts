import type { MetadataRoute } from "next";

import { routes } from "@/content/site";

const BASE = "https://www.tobaadvice.com";

/** Alle offentlige sider. Nye sider tilføjes her (og i `routes`). */
const pages: { path: string; priority: number }[] = [
  { path: routes.home, priority: 1 },
  { path: routes.howWeInvest, priority: 0.9 },
  { path: routes.independent, priority: 0.9 },
  { path: routes.overview, priority: 0.9 },
  { path: routes.guide, priority: 0.8 },
  { path: routes.about, priority: 0.7 },
  { path: routes.team, priority: 0.7 },
  { path: routes.contact, priority: 0.7 },
  { path: routes.policies, priority: 0.3 },
  { path: routes.fsa, priority: 0.3 },
  { path: routes.complaints, priority: 0.3 },
  { path: routes.cookies, priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${BASE}${p.path === "/" ? "" : p.path}`, priority: p.priority }));
}
