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
 *                 evidenceCaption? = "示例", note? })
 *   产品页顶部，内含页面唯一的 <h1>：名称 + 成熟度 chip + 一句话 + 可选小注 + 可选证据样例。
 *   用了它的页面不要再自己写 <h1>。
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
