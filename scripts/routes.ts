/**
 * 站点公开路由清单 — smoke (scripts/smoke.ts) 与 mobile 走查
 * (scripts/check-mobile.ts) 的单一真源。新增页面时只改这里,两处自测自动覆盖。
 * 已 301 重定向的旧地址(/platform /pricing /solutions)不列入。
 */
export const ROUTES = [
  "/",
  "/witness",
  "/kova",
  "/memorus",
  "/memorus/benchmarks",
  "/hub",
  "/approach",
  "/lucrum",
  "/switch",
  "/download",
  "/about",
  "/blog",
  "/privacy",
  "/terms",
];
