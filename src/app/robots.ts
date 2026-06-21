import type { MetadataRoute } from "next";

const BASE_URL = "https://www.lurus.cn";

// 公司站全站开放抓取；登录页与 API 路由无 SEO 价值，明确排除。
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
