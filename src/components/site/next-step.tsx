import type { ReactNode } from "react";

export interface NextStepProps {
  children: ReactNode;
  className?: string;
}

/**
 * 转化页收束。文案仍由各页自写，结构统一，accept 门禁认「下一步」。
 */
export function NextStep({ children, className = "" }: NextStepProps) {
  return (
    <p className={`mt-4 text-sm leading-[1.7] text-[var(--color-text-muted)] ${className}`}>
      下一步：{children}
    </p>
  );
}
