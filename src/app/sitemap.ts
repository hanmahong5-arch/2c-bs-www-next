import type { MetadataRoute } from "next";
import { routesFor } from "@/lib/site-routes";
import { siteProfile } from "@/lib/site-profile";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = siteProfile();
  const now = new Date();
  return routesFor(site.id).map((r) => ({
    url: `${site.siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
