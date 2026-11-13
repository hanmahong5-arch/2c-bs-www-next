import type { MetadataRoute } from "next";
import { routesFor } from "@/lib/site-routes";
import { siteProfile } from "@/lib/site-profile";

export const dynamic = "force-dynamic";

/** 不写 lastModified。仓库里没有每页的真实修改日。 */
export function sitemapEntries(): MetadataRoute.Sitemap {
  const site = siteProfile();
  return routesFor(site.id).map((r) => ({
    url: `${site.siteUrl}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries();
}
