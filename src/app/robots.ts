import type { MetadataRoute } from "next";

/** Kun produktionen må indekseres – preview-deploys på Vercel holdes ude af Google. */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV;
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://www.tobaadvice.com/sitemap.xml" };
}
