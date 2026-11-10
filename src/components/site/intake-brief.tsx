import {
  CONTACT_EMAIL,
  INTAKE_EXCLUDED,
  INTAKE_INCLUDED,
  INTAKE_NOTE,
  intakeMailto,
} from "@/lib/engagement-intake";
import { ScopeSplit } from "./scope-split";

export interface IntakeBriefProps {
  className?: string;
}

const linkClass =
  "text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]";

/**
 * 首信清单。复用 ScopeSplit 的细线两列，不另做卡片。
 * 邮件草稿是普通链接，正文只有四项占位。
 */
export function IntakeBrief({ className = "" }: IntakeBriefProps) {
  return (
    <div className={className}>
      <ScopeSplit included={INTAKE_INCLUDED} excluded={INTAKE_EXCLUDED} />
      <p className="mt-8 max-w-[64ch] text-[13px] leading-[1.7] text-[var(--color-text-muted)]">
        {INTAKE_NOTE}
      </p>
      <p className="mt-6 text-[15px] leading-[1.7]">
        <a href={intakeMailto()} className={linkClass}>
          起草邮件给 {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
}
