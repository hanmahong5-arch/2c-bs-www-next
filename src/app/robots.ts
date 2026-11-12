import type { MetadataRoute } from "next";
import { siteProfile } from "@/lib/site-profile";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const site = siteProfile();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/api/", "/astryx-lab"],
    },
    sitemap: `${site.siteUrl}/sitemap.xml`,
    host: site.siteUrl,
  };
}
