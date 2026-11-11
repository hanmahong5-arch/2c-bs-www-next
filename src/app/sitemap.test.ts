import { expect, test } from "bun:test";
import { SITE_ROUTES } from "@/lib/site-routes";
import { sitemapEntries } from "./sitemap";

test("sitemap lists every public route and does not stamp a fresh lastmod", () => {
  const entries = sitemapEntries();
  expect(entries).toHaveLength(SITE_ROUTES.length);
  for (const route of SITE_ROUTES) {
    expect(entries.some((entry) => entry.url === `https://www.lurus.cn${route.path}`)).toBe(true);
  }
  for (const entry of entries) {
    expect(entry.lastModified).toBeUndefined();
    expect(entry.url.startsWith("https://www.lurus.cn")).toBe(true);
  }
});
