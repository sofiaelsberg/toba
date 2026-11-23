import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

/** Kun produktionen må indekseres – preview-deploys på Vercel holdes ude af Google. */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV;
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
