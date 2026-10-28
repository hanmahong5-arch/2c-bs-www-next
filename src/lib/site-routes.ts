/**
 * 站点公开路由单一真源。
 * scripts/smoke · check-mobile · accept 与 sitemap / lighthouse 只消费这里。
 * 已 301 的旧地址（/platform /pricing /solutions）不列入。
 */
import type { MetadataRoute } from "next";

export type SiteRoute = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

export const SITE_ROUTES: readonly SiteRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/witness", changeFrequency: "monthly", priority: 0.9 },
  { path: "/kova", changeFrequency: "monthly", priority: 0.9 },
  { path: "/memorus", changeFrequency: "monthly", priority: 0.9 },
  { path: "/memorus/benchmarks", changeFrequency: "monthly", priority: 0.8 },
  { path: "/hub", changeFrequency: "monthly", priority: 0.9 },
  { path: "/hub/pricing", changeFrequency: "daily", priority: 0.8 },
  { path: "/lugo", changeFrequency: "monthly", priority: 0.9 },
  { path: "/approach", changeFrequency: "monthly", priority: 0.9 },
  { path: "/lucrum", changeFrequency: "yearly", priority: 0.3 },
  { path: "/switch", changeFrequency: "weekly", priority: 0.8 },
  { path: "/download", changeFrequency: "monthly", priority: 0.5 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
] as const;

/** 路径列表（smoke / mobile / accept） */
export const ROUTES: readonly string[] = SITE_ROUTES.map((r) => r.path);

/** 转化页：须含「下一步」 */
export const CONVERSION_ROUTES = [
  "/witness",
  "/kova",
  "/approach",
  "/lugo",
  "/download",
  "/hub",
  "/hub/pricing",
  "/memorus",
  "/switch",
] as const;
