import Link from "next/link";
import { ArrowTopRightOnSquareIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const footerLinks = [
  {
    title: "产品",
    links: [
      { name: "Lurus Hub", href: "/platform#hub" },
      { name: "Lucrum", href: "/lucrum" },
      { name: "Kova", href: "/kova" },
      { name: "Switch", href: "/download#switch" },
      { name: "Creator", href: "/download#creator" },
    ],
  },
  {
    title: "资源",
    links: [
      { name: "文档", href: "https://docs.lurus.cn", external: true },
      { name: "API 参考", href: "https://docs.lurus.cn/api", external: true },
      { name: "定价", href: "/pricing" },
      { name: "更新日志", href: "/blog" },
    ],
  },
  {
    title: "企业",
    links: [
      { name: "解决方案", href: "/solutions" },
      { name: "关于我们", href: "/about" },
      { name: "联系销售", href: "mailto:sales@lurus.cn" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Pre-footer CTA — last conversion moment before the visitor leaves */}
        <div className="relative rounded-2xl overflow-hidden mb-16 p-8 md:p-12 border border-[var(--color-border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ochre)]/6 via-transparent to-transparent" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-ochre)] opacity-[0.05] blur-[90px] pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="eyebrow mb-3">START NOW</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] headline-tight">
                今晚接入，明天上线
              </h2>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] max-w-md leading-relaxed">
                38 个模型，一个端点。<br />
                你的产品不该等待基础设施。
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[var(--color-text-muted)]">
                <span><span className="text-[var(--color-ochre)]">38</span> 个模型</span>
                <span className="w-px h-3 bg-[var(--color-border)] hidden sm:inline-block" />
                <span>p50 <span className="text-[var(--color-ochre)]">&lt;80ms</span></span>
                <span className="w-px h-3 bg-[var(--color-border)] hidden sm:inline-block" />
                <span>免费额度 <span className="text-[var(--color-ochre)]">$5</span> · 无需信用卡</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://api.lurus.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-gold text-black font-semibold text-sm hover:shadow-[0_0_30px_rgba(200,162,78,0.3)] transition-all duration-300"
              >
                免费注册
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="mailto:sales@lurus.cn?subject=Lurus%20企业方案咨询"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-sm hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface)] transition-all duration-300"
              >
                联系销售
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold text-gradient-gold">Lurus</span>
            <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              企业 AI 基础设施套件。
              <br />
              一个 API Key，38 个模型，
              <br />
              金融级计费，开箱即用。
            </p>

            {/* System status */}
            <a
              href="https://status.lurus.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-success)] transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
              </span>
              全系统正常运行
            </a>

            {/* Social links */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com/hanmahong5-arch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-ochre)] transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="mailto:contact@lurus.cn"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-ochre)] transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => {
                  const isExternal =
                    "external" in link && link.external;
                  const isMailto = link.href.startsWith("mailto:");

                  if (isExternal || isMailto) {
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          {...(isExternal
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                        >
                          {link.name}
                          {isExternal && (
                            <ArrowTopRightOnSquareIcon className="inline-block w-3 h-3 ml-1 opacity-40" />
                          )}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} Lurus. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--color-text-muted)]">
            <Link
              href="/privacy"
              className="hover:text-[var(--color-text-secondary)] transition-colors"
            >
              隐私政策
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--color-text-secondary)] transition-colors"
            >
              服务条款
            </Link>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-secondary)] transition-colors"
            >
              鲁ICP备2026000242号
            </a>
            <a
              href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37060002001239"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-secondary)] transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              鲁公网安备37060002001239号
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
