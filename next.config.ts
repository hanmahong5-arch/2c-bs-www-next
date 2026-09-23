import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    viewTransition: true,
  },
  // 2026-09 定位调整：自助网关叙事下线。旧地址永久指向新页面，外链与收藏不断。
  async redirects() {
    return [
      { source: "/platform", destination: "/hub", permanent: true },
      { source: "/pricing", destination: "/approach", permanent: true },
      { source: "/solutions", destination: "/approach", permanent: true },
    ];
  },
};

export default nextConfig;
