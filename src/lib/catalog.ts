/**
 * 公司站公开页的唯一名单。页眉不逐条展开，首页、页脚、404、命令面板都从这里取。
 * 个人项目站的 LURUS / URUS / RUS 地图不走这份分组。
 */
import type { BrandLine } from "@/components/brand-mark";
import { MARK_BY_HREF } from "@/components/brand-mark";
import type { Maturity } from "@/components/site/maturity-chip";

export type CatalogItem = {
  href: string;
  name: string;
  maturity?: Maturity;
  /** 这一页和受托运维合同的关系。一句。 */
  relation: string;
};

export const CATALOG: readonly CatalogItem[] = [
  {
    href: "/witness",
    name: "见证",
    maturity: "早期试点",
    relation: "月报里的状态从只读采集和外部探测来。试点只在我们自己的环境。",
  },
  {
    href: "/memorus",
    name: "Memorus",
    maturity: "早期试点",
    relation: "记忆留在调用方。分数不写成交付承诺。",
  },
  {
    href: "/memorus/benchmarks",
    name: "Memorus 基准",
    relation: "公开报告里的数字，口径写在报告上。",
  },
  {
    href: "/approach",
    name: "方法",
    relation: "验收怎么写。费用写进合同，不在这里报价。",
  },
  {
    href: "/kova",
    name: "Kova",
    maturity: "早期试点",
    relation: "持久执行。外部客户流量还没接，不单独卖。",
  },
  {
    href: "/forge",
    name: "Forge",
    maturity: "内部生产使用",
    relation: "内部工作流。不是自助开通。",
  },
  {
    href: "/hub",
    name: "Hub",
    maturity: "内部生产使用",
    relation: "我们自己在用的网关。受托运维不把客户流量改接到这里。",
  },
  {
    href: "/lugo",
    name: "Platform",
    maturity: "内部生产使用",
    relation: "同集团的账号与钱包。不是单独售卖的 SaaS。",
  },
  {
    href: "/hub/pricing",
    name: "Hub 价格",
    relation: "按量单价读自 Hub。读不到就空着，不写一份旧价。",
  },
  {
    href: "/switch",
    name: "Switch",
    maturity: "早期试点",
    relation: "桌面启动器，自己上手。不是把系统交给我们。",
  },
  {
    href: "/lux",
    name: "Lux",
    maturity: "早期试点",
    relation: "编码命令行，只走公司网关。现在的入口是写信。",
  },
  {
    href: "/download",
    name: "下载",
    relation: "安装包入口。",
  },
  {
    href: "/founder",
    name: "Founder",
    relation: "内部获客桌面。不对外分发。",
  },
  {
    href: "/lucrum",
    name: "Lucrum",
    relation: "模拟盘。冻结维护，页面不写收益。",
  },
  {
    href: "/blog",
    name: "更新日志",
    relation: "工程日志，不是客户故事。",
  },
];

export const COMPANY_GROUPS: readonly {
  id: string;
  mark: BrandLine;
  title: string;
  line: string;
  hrefs: readonly string[];
}[] = [
  {
    id: "observe",
    mark: "crystal",
    title: "观测",
    line: "月报里的状态和上下文从这里来。这不是另一份合同。",
    hrefs: ["/witness", "/memorus", "/memorus/benchmarks", "/approach"],
  },
  {
    id: "execute",
    mark: "bolt",
    title: "执行",
    line: "写操作前人批、崩溃后续跑，今天仍多由独立脚本完成。",
    hrefs: ["/kova", "/forge"],
  },
  {
    id: "account",
    mark: "z-metal",
    title: "入口与账",
    line: "我们自己的网关和账号。装进客户环境是另一回事，不在这份合同的价目里。",
    hrefs: ["/hub", "/lugo", "/hub/pricing"],
  },
  {
    id: "self",
    mark: "z-flat",
    title: "自己上手",
    line: "已经在用的人自己打开。",
    hrefs: ["/switch", "/lux", "/download"],
  },
  {
    id: "aside",
    mark: "z-flat",
    title: "不进合同",
    line: "内部工具、冻结的模拟盘、公开日志。",
    hrefs: ["/founder", "/lucrum", "/blog"],
  },
];

export function catalogItem(href: string): CatalogItem | undefined {
  return CATALOG.find((entry) => entry.href === href);
}

export function itemsIn(hrefs: readonly string[]): readonly CatalogItem[] {
  return hrefs.map((href) => {
    const item = catalogItem(href);
    if (!item) throw new Error(`catalog missing ${href}`);
    return item;
  });
}

export function catalogMark(href: string): BrandLine {
  return MARK_BY_HREF[href] ?? "z-flat";
}
