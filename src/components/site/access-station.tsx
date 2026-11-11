import type { ReactNode } from "react";
import Link from "next/link";

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

/** 带锚点或邮箱的动作整页打开。跨页锚点若走站内跳转，目标段还在加载时会停在页首。 */
export function stationOpensAsDocument(href: string) {
  return href.startsWith("mailto:") || href.includes("#");
}

function ActionLink({ action }: { action: AccessAction }) {
  const className = action.primary ? "btn-primary" : "btn-secondary";
  if (action.external || stationOpensAsDocument(action.href)) {
    const newWindow = Boolean(action.external) && !stationOpensAsDocument(action.href);
    return (
      <a
        href={action.href}
        {...(newWindow ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={className}
      >
        {action.label}
        {newWindow ? (
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
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        {actions.map((action) => (
          <ActionLink key={`${action.href}:${action.label}`} action={action} />
        ))}
      </div>
      <p className="mt-4 max-w-[44rem] text-sm leading-[1.7] text-[var(--color-text-muted)]">
        下一步：{nextStep}
      </p>
    </div>
  );
}
