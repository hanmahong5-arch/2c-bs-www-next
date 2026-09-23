import Link from "next/link";

// brand-spec §4 长版：列顺序 产品 → 资源 → 公司 → 法务；
// 「公司」「法务」两列文案按规范逐字固定，不可改。
type FooterLink = { name: string; href: string };

const footerLinks: ReadonlyArray<{ title: string; links: readonly FooterLink[] }> = [
  {
    title: "产品",
    links: [
      { name: "见证 witness", href: "/witness" },
      { name: "kova", href: "/kova" },
      { name: "memorus", href: "/memorus" },
      { name: "hub", href: "/hub" },
    ],
  },
  {
    title: "资源",
    links: [
      { name: "docs", href: "https://docs.lurus.cn" },
      { name: "方法 approach", href: "/approach" },
      { name: "changelog", href: "/blog" },
    ],
  },
  {
    title: "公司",
    links: [
      { name: "About LurusTech", href: "/about" },
      { name: "Contact", href: "mailto:contact@lurus.cn" },
      { name: "Careers", href: "mailto:contact@lurus.cn?subject=Careers" },
    ],
  },
  {
    title: "法务",
    links: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Security & DPA", href: "mailto:contact@lurus.cn?subject=Security%20%26%20DPA" },
    ],
  },
];

const linkClass =
  "text-[13px] text-[var(--lt-ink)]/70 hover:text-[var(--lt-ink)] hover:underline underline-offset-4";

function FooterAnchor({ link }: { link: FooterLink }) {
  const external = link.href.startsWith("http");
  if (external || link.href.startsWith("mailto:")) {
    return (
      <a
        href={link.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={linkClass}
      >
        {link.name}
        {external && (
          <span aria-hidden="true" className="ml-0.5">
            ↗
          </span>
        )}
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClass}>
      {link.name}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-6">
      <div className="mx-auto max-w-5xl border-t border-[var(--lt-rule)] py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-base font-semibold text-[var(--lt-ink)]">
              LurusTech
            </p>
            <p className="mt-2 max-w-[22rem] text-[13px] leading-relaxed text-[var(--lt-ink)]/70">
              让客户自有环境里的 AI 系统，状态可核查、数据可恢复、改动有记录。
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {group.title}
              </h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <FooterAnchor link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--lt-rule)] pt-6 text-xs text-[var(--lt-ink)]/70">
          <p>&copy; {year} LurusTech. All rights reserved.</p>
          <p>Lurus Hub: Built on New API · AGPL-3.0.</p>

          {/* brand-spec §4.5 境内合规五件套 — 顺序固定: 公司全称 · ICP · 算法备案 / 四个《》链接 */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span>硅知睿智能科技（烟台）有限公司</span>
            <span aria-hidden="true">·</span>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--lt-ink)] hover:underline"
            >
              鲁ICP备2026000242号
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://beian.cac.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--lt-ink)] hover:underline"
            >
              算法备案（待取得）
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37060002001239"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--lt-ink)] hover:underline"
            >
              鲁公网安备37060002001239号
            </a>
          </div>
          {/* 四个《》链接 — 占位 ≥32px (§4.5) */}
          <div className="flex min-h-8 flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/terms" className="hover:text-[var(--lt-ink)] hover:underline">
              《用户协议》
            </Link>
            <Link href="/privacy" className="hover:text-[var(--lt-ink)] hover:underline">
              《隐私政策》
            </Link>
            <span className="opacity-60" title="内容上线前补充">
              《算法说明》
            </span>
            <a
              href="mailto:contact@lurus.cn?subject=侵权投诉"
              className="hover:text-[var(--lt-ink)] hover:underline"
            >
              《侵权投诉》
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
