import { INTAKE_EXCLUDED, INTAKE_INCLUDED, INTAKE_NOTE } from "@/lib/engagement-intake";
import { ScopeSplit } from "./scope-split";

export interface IntakeBriefProps {
  className?: string;
}

/**
 * 首信清单。复用 ScopeSplit 的细线两列，不另做卡片。
 * 第一封邮件的入口由页面上的 LedgerRow 承接，不在这里再放一条链接。
 */
export function IntakeBrief({ className = "" }: IntakeBriefProps) {
  return (
    <div className={className}>
      <ScopeSplit included={INTAKE_INCLUDED} excluded={INTAKE_EXCLUDED} />
      <p className="mt-8 max-w-[64ch] text-[13px] leading-[1.7] text-[var(--color-text-muted)]">
        {INTAKE_NOTE}
      </p>
    </div>
  );
}
