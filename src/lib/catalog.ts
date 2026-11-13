/**
 * 公司站公开页的唯一名单。页眉不逐条展开，首页、页脚、404、命令面板都从这里取。
 * 个人项目站的 LURUS / URUS / RUS 地图不走这份分组。
 */
import type { BrandLine } from "@/components/brand-mark";
import { MARK_BY_HREF } from "@/components/brand-mark";
import type { Maturity } from "@/components/site/maturity-chip";

export type SpecRow = { label: string; value: string };

export type CatalogItem = {
  href: string;
  name: string;
  maturity?: Maturity;
  /** 目录里的一行。短，不写完整段。 */
  relation: string;
  /** 页上的中间颗粒度。标识、依赖、边界。 */
  sheet: readonly SpecRow[];
};

export const CATALOG: readonly CatalogItem[] = [
  {
    href: "/witness",
    name: "见证",
    maturity: "早期试点",
    relation: "月报状态的来源。不单列。",
    sheet: [
      { label: "标识", value: "观测 · 早期试点" },
      { label: "形态", value: "只读采集。外部探测。写接口返回 501" },
      { label: "现状", value: "试点在自有环境" },
      { label: "边界", value: "缺样记「未采样」。推断不写成正常" },
      { label: "合同", value: "月报里的状态从这里来" },
    ],
  },
  {
    href: "/memorus",
    name: "Memorus",
    maturity: "早期试点",
    relation: "记忆在调用方。分数不是承诺。",
    sheet: [
      { label: "标识", value: "观测 · 早期试点" },
      { label: "形态", value: "调用方挂接的类型槽。自由文本不作为默认口径" },
      { label: "现状", value: "Rust 重写在预发。生产流量仍在旧服务" },
      { label: "分发", value: "CLI、Python、Node、WASM 未发布" },
      { label: "接口", value: "docs.lurus.cn/memx/" },
      { label: "合同", value: "基准分不写成交付承诺" },
    ],
  },
  {
    href: "/memorus/benchmarks",
    name: "Memorus 基准",
    relation: "数字以报告页为准。",
    sheet: [
      { label: "标识", value: "观测 · 报告" },
      { label: "现状", value: "同一口径。数字不在营销页另写一份" },
      { label: "边界", value: "未跑的模型不外推" },
      { label: "合同", value: "公开口径。不是交付承诺" },
    ],
  },
  {
    href: "/approach",
    name: "方法",
    relation: "验收口径。此页不报价。",
    sheet: [
      { label: "标识", value: "方法" },
      { label: "形态", value: "范围、阶段、判据、交接" },
      { label: "判据", value: "真恢复之后逐表对行数。证据强度。未采样" },
      { label: "现状", value: "写前审批仍在建设" },
      { label: "合同", value: "费用在合同里" },
    ],
  },
  {
    href: "/kova",
    name: "Kova",
    maturity: "早期试点",
    relation: "持久执行。无外部客户流量。不单卖。",
    sheet: [
      { label: "标识", value: "执行 · 早期试点" },
      { label: "形态", value: "嵌入式库。单节点文件 WAL" },
      { label: "依赖", value: "调用方以 path 引入。未上 crates.io" },
      { label: "同层", value: "Forge 编排。Lumen 回放。Lumen 无独立页" },
      { label: "边界", value: "无外部客户流量。不保证恰好一次" },
      { label: "合同", value: "不单卖。写前审批仍在建设。崩溃续跑在库内，directive 边界至少一次" },
    ],
  },
  {
    href: "/forge",
    name: "Forge",
    maturity: "内部生产使用",
    relation: "内部工作流。不自助开通。",
    sheet: [
      { label: "标识", value: "执行 · 内部生产使用" },
      { label: "形态", value: "内部 MCP 工作流画布" },
      { label: "依赖", value: "耐久等待、耐久重试、耐久 agent 运行经 HTTP 交给 Kova。其余在 Forge 后端" },
      { label: "分发", value: "仓库私有。高级能力默认关闭" },
      { label: "合同", value: "不自助开通" },
    ],
  },
  {
    href: "/hub",
    name: "Hub",
    maturity: "内部生产使用",
    relation: "自有网关。客户流量不改接至此。",
    sheet: [
      { label: "标识", value: "入口 · 内部生产使用" },
      { label: "形态", value: "多租户模型网关。自有产品在用" },
      { label: "现状", value: "生产入口 hub.lurus.cn。控制台在本仓" },
      { label: "依赖", value: "统一账单开关默认关" },
      { label: "合同", value: "客户流量不改接到此" },
    ],
  },
  {
    href: "/lugo",
    name: "Platform",
    maturity: "内部生产使用",
    relation: "兄弟产品的账号与钱包。不是对外 SaaS。",
    sheet: [
      { label: "标识", value: "账 · 内部生产使用" },
      { label: "形态", value: "账号与钱包。一套部署，identity.lurus.cn" },
      { label: "现状", value: "2026-07-17 起能力面冻结。钱路除外" },
      { label: "单位", value: "代码中的记账单位是 LB" },
      { label: "合同", value: "不是对外售卖的 SaaS" },
    ],
  },
  {
    href: "/hub/pricing",
    name: "Hub 价格",
    relation: "单价读自 Hub。读不到就空着。",
    sheet: [
      { label: "标识", value: "价目" },
      { label: "现状", value: "单价读自 /api/v1/models。与扣费同一套单价" },
      { label: "边界", value: "读不到则留空。不写死旧价" },
      { label: "合同", value: "此页不报价目以外的费用" },
    ],
  },
  {
    href: "/switch",
    name: "Switch",
    maturity: "早期试点",
    relation: "桌面启动器。自行打开。",
    sheet: [
      { label: "标识", value: "自助 · 早期试点" },
      { label: "形态", value: "Wails v2。四模式 Personal、Reseller、Enterprise、EndUser" },
      { label: "现状", value: "Windows 有启动自检。macOS 与 Linux 只验证能编译" },
      { label: "依赖", value: "四种模式都连 Hub" },
      { label: "合同", value: "自行打开。不是把系统交出来" },
    ],
  },
  {
    href: "/lux",
    name: "Lux",
    maturity: "早期试点",
    relation: "编码命令行。只走公司网关。",
    sheet: [
      { label: "标识", value: "自助 · 早期试点" },
      { label: "形态", value: "私有命令行 @lurus/lux" },
      { label: "依赖", value: "只走公司网关" },
      { label: "分发", value: "无公开安装页" },
      { label: "合同", value: "入口是来信" },
    ],
  },
  {
    href: "/download",
    name: "下载",
    relation: "已发布安装包的入口。",
    sheet: [
      { label: "标识", value: "自助" },
      { label: "形态", value: "安装包入口" },
      { label: "现状", value: "在维护的桌面客户端是 Switch。Windows 经过启动验证" },
      { label: "合同", value: "自行打开" },
    ],
  },
  {
    href: "/founder",
    name: "Founder",
    relation: "内部获客桌面。不对外分发。",
    sheet: [
      { label: "标识", value: "内部" },
      { label: "形态", value: "获客桌面。本机进程" },
      { label: "分发", value: "无公网清单则没有安装按钮" },
      { label: "合同", value: "不对外分发" },
    ],
  },
  {
    href: "/lucrum",
    name: "Lucrum",
    relation: "模拟盘。冻结。不写收益。",
    sheet: [
      { label: "标识", value: "冻结" },
      { label: "形态", value: "A 股策略描述与回测。仅模拟盘" },
      { label: "现状", value: "不在主动开发。只做修复与运维" },
      { label: "边界", value: "不写收益。无真实券商账户" },
      { label: "合同", value: "不进合同" },
    ],
  },
  {
    href: "/blog",
    name: "更新日志",
    relation: "工程日志。不是客户故事。",
    sheet: [
      { label: "标识", value: "日志" },
      { label: "形态", value: "按时间倒序的工程记录" },
      { label: "边界", value: "条目保留原文" },
      { label: "合同", value: "不是客户故事" },
    ],
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
    line: "状态与上下文。不另立合同。",
    hrefs: ["/witness", "/memorus", "/memorus/benchmarks", "/approach"],
  },
  {
    id: "execute",
    mark: "bolt",
    title: "执行",
    line: "崩溃续跑在库内。写前审批仍在建设。其余写操作仍是独立脚本。",
    hrefs: ["/kova", "/forge"],
  },
  {
    id: "account",
    mark: "z-metal",
    title: "入口与账",
    line: "自有网关与账号。不在价目内。",
    hrefs: ["/hub", "/lugo", "/hub/pricing"],
  },
  {
    id: "self",
    mark: "z-flat",
    title: "自己上手",
    line: "已在使用则自行打开。",
    hrefs: ["/switch", "/lux", "/download"],
  },
  {
    id: "aside",
    mark: "z-flat",
    title: "不进合同",
    line: "内部、冻结、日志。",
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
