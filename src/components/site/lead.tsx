import type { ReactNode } from "react";

export interface LeadProps {
  children: ReactNode;
  className?: string;
}

/** 克制的引导段：一段话，限宽约 64 字符，次级墨色。 */
export function Lead({ children, className = "" }: LeadProps) {
  return (
    <p
      className={`max-w-[64ch] text-base leading-[1.8] text-[var(--color-text-secondary)] md:text-[1.0625rem] ${className}`}
    >
      {children}
    </p>
  );
}
