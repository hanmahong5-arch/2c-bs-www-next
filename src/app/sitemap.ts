import type { MetadataRoute } from "next";
import { SITE_ROUTES } from "@/lib/site-routes";

const BASE_URL = "https://www.lurus.cn";

/**
 * 不写 lastModified。仓库里没有每页的真实修改日，
 * 用生成时刻会把没改过的页面标成刚刚更新。
 */
export function sitemapEntries(): MetadataRoute.Sitemap {
  return SITE_ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries();
}
