/**
 * 站点共享基础组件（全部为服务端组件，无 "use client"，无 JS 动效）。
 * 用法：import { Section, Eyebrow, ... } from "@/components/site";
 *
 * Section({ id?, children, width?: "prose" | "wide" = "prose", rule?: boolean = true,
 *           labelledBy?, className? })
 *   页面区块。左对齐，外框 max-w-5xl + px-6；正文栏 prose≈44rem / wide=整宽；
 *   rule=true 在区块顶部画一条细线。
 *
 * Eyebrow({ children, as?: "p" | "span" | "div" = "p", id?, className? })
 *   小号等宽大写标签（11px，tracking 0.16em，muted）。
 *
 * Lead({ children, className? })
 *   引导段，限宽约 64 字符，次级墨色，行高 1.8。
 *
 * EvidenceLine({ name, version?: string | null, status: "ok" | "warn" | "stale" | "unknown",
 *                label?, source: ReactNode, age?, className? })
 *   一行等宽证据行：名称 / 版本（null 或省略→"—"，未知传 "?"）/ 状态点 / 来源说明 / 时效。
 *   label 默认：ok=正常 warn=注意 stale=陈旧 unknown=未知。窄屏在字段间折行。
 *
 * EvidenceList({ children, caption?, className? })
 *   多条 EvidenceLine 的容器（上下细线 + 行间细线），caption 为下方小注（如「示例」）。
 *
 * Disclosure({ summary: ReactNode, children, defaultOpen?, id?, className? })
 *   原生 <details> 渐进展开，顶细线 + 小箭头，键盘可用。连续多个时最后一个自动补底线。
 *
 * MaturityChip({ level: Maturity, className? })
 *   Maturity = "设计中" | "早期试点" | "内部生产使用" | "开源"（只允许这四个）。
 *
 * ProductHeader({ name, tagline, maturity, eyebrow? = "构件", evidence?: EvidenceLineProps,
 *                 evidenceCaption? = "示例", note?, access?: AccessStationProps })
 *   产品页顶部，内含页面唯一的 <h1>：名称 + 成熟度 chip + 一句话 + 可选小注 + 可选接入站 + 可选证据样例。
 *   用了它的页面不要再自己写 <h1>。
 *
 * IntakeBrief({ className? })
 *   首信清单：复用 ScopeSplit，列出第一封邮件要写清的范围与不包含项，附成熟度小注。
 *
 * LedgerRow({ href, label, meta, className? })
 *   一行 1px 发丝链接：标签、附注、↗。无填充、无阴影、无圆角、无光晕。
 *
 * RestoreReceipt({ input?, className? })
 *   恢复演练回执的留空样子：发丝栏位，加 ScopeSplit 写明回执记录什么、不声称什么。
 *
 * EvidenceReport({ input?, className? })
 *   月度证据报告的留空样子：发丝栏位，加 ScopeSplit 写明报告写下什么、不声称什么。
 *
 * NewWindowNote({ arrow?: boolean = false })
 *   外链已 target=_blank 时的读屏说明「（新窗口打开）」。arrow 为真时另给眼睛一个隐藏箭头。
 *
 * AccessStation({ actions, nextStep, className? })
 *   产品接入站：主 CTA 组 + 「下一步」说明。可单独用，或经 ProductHeader.access 挂首屏。
 */
export { Section, type SectionProps } from "./section";
export { Eyebrow, type EyebrowProps } from "./eyebrow";
export { Lead, type LeadProps } from "./lead";
export {
  EvidenceLine,
  EvidenceList,
  type EvidenceLineProps,
  type EvidenceListProps,
  type EvidenceStatus,
} from "./evidence-line";
export { Disclosure, type DisclosureProps } from "./disclosure";
export {
  MaturityChip,
  MATURITY_LEVELS,
  type Maturity,
  type MaturityChipProps,
} from "./maturity-chip";
export { ProductHeader, type ProductHeaderProps } from "./product-header";
export { Lineage, type LineageProps, type LineageFact } from "./lineage";
export { ScopeSplit, type ScopeSplitProps } from "./scope-split";
export { NextStep, type NextStepProps } from "./next-step";
export { IntakeBrief, type IntakeBriefProps } from "./intake-brief";
export { LedgerRow, type LedgerRowProps } from "./ledger-row";
export { RestoreReceipt, type RestoreReceiptProps } from "./restore-receipt";
export { EvidenceReport, type EvidenceReportProps } from "./evidence-report";
export { NewWindowNote, NEW_WINDOW_LABEL } from "./new-window-note";
export {
  AccessStation,
  type AccessAction,
  type AccessStationProps,
} from "./access-station";
