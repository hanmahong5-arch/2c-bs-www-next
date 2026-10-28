import type { MetadataRoute } from "next";
import { SITE_ROUTES } from "@/lib/site-routes";

const BASE_URL = "https://www.lurus.cn";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return SITE_ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
