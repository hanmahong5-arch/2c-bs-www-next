import type { ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
  /** 渲染成的元素，默认 p；作为区块标题的一部分时可用 span */
  as?: "p" | "span" | "div";
  id?: string;
  className?: string;
}

/** 小号等宽大写标签：区块的位置信息，不是内容本身。 */
export function Eyebrow({ children, as: Tag = "p", id, className = "" }: EyebrowProps) {
  return (
    <Tag
      id={id}
      className={`font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)] ${className}`}
    >
      {children}
    </Tag>
  );
}
