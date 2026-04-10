import Link from "next/link";

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold text-gradient-gold">Lurus</span>
            <p className="mt-3 text-sm text-[var(--color-text-muted)] max-w-xs">
              企业 AI 基础设施套件。
              <br />
              开箱即用，金融级可靠。
            </p>
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
                            <span className="inline-block ml-1 opacity-40 text-[10px]">
                              ↗
                            </span>
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
          <div className="flex gap-6 text-xs text-[var(--color-text-muted)]">
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
            <span>ICP备案号</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
