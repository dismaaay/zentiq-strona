import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { legalLinks } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...legalLinks.map((l) => ({
      url: `${siteConfig.url}${l.href}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
