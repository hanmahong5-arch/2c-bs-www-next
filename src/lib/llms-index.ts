const ORIGIN = "https://www.lurus.cn";

const ENTRIES = [
  {
    path: "/hub/pricing.md",
    title: "Hub 公开单价",
    note: "与网页同一份公开单价；读不到接口时只写暂时读不到，不留旧价。",
  },
  {
    path: "/approach.md",
    title: "方法纯文本",
    note: "首信、交付范围、空白回执、月报字段；不代替合同，不是价目。",
  },
  {
    path: "/blog.md",
    title: "更新日志",
    note: "更新日志原文；这些记录不代表现状。",
  },
  {
    path: "/approach#intake",
    title: "首信",
    note: "第一封邮件要写的环境、现有系统、目标、接入方式；不报价，不收集密码。",
  },
  {
    path: "/approach#receipt",
    title: "演练回执",
    note: "演练回执字段留空；不写可用率，不写客户名，不是合同。",
  },
  {
    path: "/witness#report",
    title: "月报",
    note: "月报五栏留空；不写可用率，不代替演练回执。",
  },
] as const;

const PRODUCTS = [
  {
    path: "/forge",
    title: "Forge",
    note: "可视化工作流编排壳；崩溃恢复交给 Kova。现网可打开看编排面，不是自助注册的公开产品。成熟度：内部生产使用。",
  },
  {
    path: "/founder",
    title: "Founder · 获客桌面",
    note: "公司内部获客桌面，默认不对外部自助分发。无公网安装包时不挂下载。成熟度：早期试点。",
  },
  {
    path: "/lux",
    title: "Lux",
    note: "编码 Agent 命令行，只走公司网关，不是桌面 GUI，也没有公开安装命令。成熟度：早期试点。",
  },
  {
    path: "/switch",
    title: "Switch",
    note: "桌面 AI CLI 管家：配置、本地网关、MCP 与快照。目前只有 Windows 版经过启动验证。成熟度：早期试点。",
  },
] as const;

/**
 * `/llms.txt` 里给采购与模型看的六行。
 * `public/llms.txt` 手写同一行；请求时不生成文件。
 */
export function llmsIndexLines(): readonly string[] {
  return ENTRIES.map((entry) => `- [${entry.title}](${ORIGIN}${entry.path}): ${entry.note}`);
}

/** 构件段里补上已经有页面的四条。可核对入口仍是上面六行。 */
export function llmsProductLines(): readonly string[] {
  return PRODUCTS.map((entry) => `- [${entry.title}](${ORIGIN}${entry.path}): ${entry.note}`);
}

export function llmsIndexPaths(): readonly string[] {
  return ENTRIES.map((entry) => entry.path);
}
