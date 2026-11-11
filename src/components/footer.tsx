import Link from "next/link";
import { BrandLockup } from "@/components/brand-mark";

// 个人项目站页脚：产品 → 资源 → 关于 → 法务。
// 以个人备案现实为准（本仓无 brand-spec.md）；不挂 Careers、不挂未取得的算法备案。
type FooterLink = { name: string; href: string };

const footerLinks: ReadonlyArray<{ title: string; links: readonly FooterLink[] }> = [
  {
    title: "产品",
    links: [
      { name: "见证 witness", href: "/witness" },
      { name: "kova", href: "/kova" },
      { name: "forge", href: "/forge" },
      { name: "founder", href: "/founder" },
      { name: "lux", href: "/lux" },
      { name: "memorus", href: "/memorus" },
      { name: "hub", href: "/hub" },
      { name: "lugo", href: "/lugo" },
      { name: "switch", href: "/switch" },
    ],
  },
  {
    title: "资源",
    links: [
      { name: "docs", href: "https://docs.lurus.cn" },
      { name: "方法 approach", href: "/approach" },
      { name: "changelog", href: "/blog" },
      { name: "下载", href: "/download" },
      { name: "Hub 价格", href: "/hub/pricing" },
    ],
  },
  {
    title: "关于",
    links: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "mailto:contact@lurus.cn" },
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
            <BrandLockup className="[&>span]:text-base" />
            <p className="mt-3 max-w-[22rem] text-[13px] leading-relaxed text-[var(--lt-ink)]/70">
              个人项目站：工具与底座，状态写明证据，备份只认真恢复。
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

          {/* 境内合规：只挂已取得的备案号，不公示个人姓名。见 doc/ops/company-domain-cutover.md */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
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
              href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37060002001239"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--lt-ink)] hover:underline"
            >
              鲁公网安备37060002001239号
            </a>
          </div>
          <div className="flex min-h-8 flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/terms" className="hover:text-[var(--lt-ink)] hover:underline">
              《用户协议》
            </Link>
            <Link href="/privacy" className="hover:text-[var(--lt-ink)] hover:underline">
              《隐私政策》
            </Link>
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
