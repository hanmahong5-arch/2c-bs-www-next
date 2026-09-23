import type { ReactNode } from "react";

export type EvidenceStatus = "ok" | "warn" | "stale" | "unknown";

export interface EvidenceLineProps {
  /** 组件名，如 "platform-core" */
  name: string;
  /** 版本；null/省略时显示 "—"，传 "?" 表示版本未知 */
  version?: string | null;
  status: EvidenceStatus;
  /** 状态文案，默认按 status：正常 / 注意 / 陈旧 / 未知 */
  label?: string;
  /** 证据来源说明，如 "版本来自服务自报 · 健康来自自省实证" */
  source: ReactNode;
  /** 时效，如 "12 秒前"；可省略 */
  age?: string;
  className?: string;
}

const DOT: Record<EvidenceStatus, { glyph: string; color: string; text: string }> = {
  ok: { glyph: "●", color: "text-[var(--lt-ok)]", text: "正常" },
  warn: { glyph: "●", color: "text-[var(--lt-warn)]", text: "注意" },
  stale: { glyph: "◐", color: "text-[var(--lt-warn)]", text: "陈旧" },
  unknown: { glyph: "○", color: "text-[var(--color-text-muted)]", text: "未知" },
};

/**
 * 一行等宽「证据行」：组件名 / 版本 / 状态点 / 证据来源 / 时效。
 * 宽屏一行排开；窄屏在字段之间折行（名称与版本不拆开）。
 */
export function EvidenceLine({
  name,
  version,
  status,
  label,
  source,
  age,
  className = "",
}: EvidenceLineProps) {
  const dot = DOT[status];
  return (
    <p
      className={`flex flex-wrap items-baseline gap-x-3 gap-y-0.5 font-mono text-[12.5px] leading-6 text-[var(--lt-ink)] ${className}`}
    >
      <span className="whitespace-nowrap">
        <span className="font-medium">{name}</span>
        <span className="ml-3 text-[var(--color-text-muted)]">{version ?? "—"}</span>
      </span>
      <span className="whitespace-nowrap">
        <span aria-hidden="true" className={dot.color}>
          {dot.glyph}
        </span>{" "}
        {label ?? dot.text}
      </span>
      <span className="text-[var(--color-text-secondary)]">
        <span aria-hidden="true" className="hidden text-[var(--color-text-muted)] sm:inline">
          ·{" "}
        </span>
        {source}
      </span>
      {age && (
        <span className="whitespace-nowrap text-[var(--color-text-muted)]">
          <span aria-hidden="true" className="hidden sm:inline">· </span>
          {age}
        </span>
      )}
    </p>
  );
}

export interface EvidenceListProps {
  children: ReactNode;
  /** 列表下方的一行小注，如 "示例" */
  caption?: ReactNode;
  className?: string;
}

/** 多条证据行的容器：上下细线、行间细线，像一张打印出来的记录。 */
export function EvidenceList({ children, caption, className = "" }: EvidenceListProps) {
  return (
    <figure className={className}>
      <div className="divide-y divide-[var(--lt-rule)] border-y border-[var(--lt-rule)] [&>*]:py-2.5">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 font-mono text-[11px] text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
