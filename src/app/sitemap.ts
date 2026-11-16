import type { MetadataRoute } from "next";

import { routes } from "@/content/site";
import { getAllPosts } from "@/lib/news";

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
  { path: routes.privacy, priority: 0.2 },
  { path: routes.accessibility, priority: 0.2 },
  { path: routes.news, priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  const all = await getAllPosts();
  const posts = all.map((p) => ({ url: `${BASE}${routes.news}/${p.slug}`, lastModified: new Date(p.updated ?? p.date), priority: 0.6 }));
  // Faste sider får ingen lastModified: en dato, der skifter ved hvert deploy, lærer Google at ignorere feltet.
  // Undtagelse: nyhedsoversigten ændres, når der kommer et nyt indlæg.
  const newest = all[0] ? new Date(all[0].date) : undefined;
  return [
    ...pages.map((p) => ({
      url: `${BASE}${p.path === "/" ? "" : p.path}`,
      ...(p.path === routes.news && newest ? { lastModified: newest } : {}),
      priority: p.priority,
    })),
    ...posts,
  ];
}
