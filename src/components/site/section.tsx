import type { ReactNode } from "react";

export interface SectionProps {
  /** 锚点 id（同时设置 scroll-margin，避开吸顶导航） */
  id?: string;
  children: ReactNode;
  /** 正文栏宽度：prose ≈ 68 字符（默认）；wide 用于证据行、索引表等需要横向空间的块 */
  width?: "prose" | "wide";
  /** 顶部是否画一条细分隔线（默认 true） */
  rule?: boolean;
  /** 指向本区块标题元素的 id，供读屏器把 section 识别为具名区域 */
  labelledBy?: string;
  className?: string;
}

const widthMap = {
  prose: "max-w-[44rem]",
  wide: "max-w-5xl",
} as const;

/** 页面区块：左对齐、窄栏、大留白、可选顶部细线。纯服务端组件，无动效。 */
export function Section({
  id,
  children,
  width = "prose",
  rule = true,
  labelledBy,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-20 px-6 ${className}`}
    >
      <div
        className={`mx-auto max-w-5xl py-16 md:py-24 ${
          rule ? "border-t border-[var(--lt-rule)]" : ""
        }`}
      >
        <div className={widthMap[width]}>{children}</div>
      </div>
    </section>
  );
}
