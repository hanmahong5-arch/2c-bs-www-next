import type { ReactNode } from "react";
import Link from "next/link";
import { frameCompanyAccess } from "@/lib/company-access";
import { siteProfile } from "@/lib/site-profile";

/** 产品接入站上的一条动作：站内路径或外链（登录 / 文档 / 控制台）。 */
export type AccessAction = {
  label: string;
  href: string;
  /** 主路径用 primary；其余 secondary。同一站最多一个 primary。 */
  primary?: boolean;
  /** http(s) / mailto 外链；站内路径走 Next Link。 */
  external?: boolean;
};

export type AccessStationProps = {
  actions: readonly AccessAction[];
  /** 「下一步：…」诚实路径说明；转换页验收会扫「下一步」。 */
  nextStep: ReactNode;
  className?: string;
};

function ActionLink({ action }: { action: AccessAction }) {
  const className = action.primary ? "btn-primary" : "btn-secondary";
  if (action.external || action.href.startsWith("mailto:") || action.href.startsWith("#")) {
    return (
      <a
        href={action.href}
        {...(action.external && !action.href.startsWith("mailto:") && !action.href.startsWith("#")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={className}
      >
        {action.label}
        {action.external && !action.href.startsWith("mailto:") ? (
          <>
            <span aria-hidden="true">↗</span>
            <span className="sr-only">（新窗口打开）</span>
          </>
        ) : null}
      </a>
    );
  }
  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

/**
 * 产品接入站：首屏可见的主路径 CTA + 「下一步」说明。
 * 无动效、服务端组件；挂在 ProductHeader 内或独立区块均可。
 */
export function AccessStation({ actions, nextStep, className }: AccessStationProps) {
  if (actions.length === 0) return null;
  const site = siteProfile();
  const shown =
    site.id === "company"
      ? frameCompanyAccess(actions, {
          label: site.homeActions[0]?.label ?? "写信",
          href: site.homeActions[0]?.href ?? `mailto:${site.contactEmail}`,
        })
      : actions;
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        {shown.map((action) => (
          <ActionLink key={`${action.href}:${action.label}`} action={action} />
        ))}
      </div>
      <p className="mt-4 max-w-[44rem] text-sm leading-[1.7] text-[var(--color-text-muted)]">
        下一步：{nextStep}
      </p>
    </div>
  );
}
