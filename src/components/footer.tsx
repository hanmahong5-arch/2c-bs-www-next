import Link from "next/link";
import { BrandLockup } from "@/components/brand-mark";
import { NewWindowNote } from "@/components/site/new-window-note";
import { CATALOG } from "@/lib/catalog";
import { siteProfile } from "@/lib/site-profile";

// 页脚：产品 → 资源 → 关于 → 法务。备案号跟当前面孔走，不挂 Careers、不挂未取得的算法备案。
type FooterLink = { name: string; href: string };

function footerLinks(
  email: string,
  profile: "personal" | "company",
): ReadonlyArray<{ title: string; links: readonly FooterLink[] }> {
  const legal = [
    { name: "服务条款", href: "/terms" },
    { name: "隐私政策", href: "/privacy" },
    { name: "安全问题", href: `mailto:${email}?subject=%E5%AE%89%E5%85%A8%E9%97%AE%E9%A2%98` },
  ];
  const products: readonly FooterLink[] = [
    { name: "见证", href: "/witness" },
    { name: "Kova", href: "/kova" },
    { name: "Forge", href: "/forge" },
    { name: "Founder", href: "/founder" },
    { name: "Lux", href: "/lux" },
    { name: "Memorus", href: "/memorus" },
    { name: "Hub", href: "/hub" },
    { name: "Lugo", href: "/lugo" },
    { name: "Switch", href: "/switch" },
  ];
  const resources: readonly FooterLink[] = [
    { name: "文档", href: "https://docs.lurus.cn" },
    { name: "方法", href: "/approach" },
    { name: "更新日志", href: "/blog" },
    { name: "下载", href: "/download" },
    { name: "Hub 按量价格", href: "/hub/pricing" },
  ];
  const about: readonly FooterLink[] =
    profile === "company"
      ? [
          { name: "公司", href: "/about" },
          { name: "文档", href: "https://docs.lurus.cn" },
          { name: "写信", href: `mailto:${email}` },
        ]
      : [
          { name: "关于", href: "/about" },
          { name: "联系", href: `mailto:${email}` },
        ];
  if (profile === "company") {
    return [
      { title: "构件", links: CATALOG.map((item) => ({ name: item.name, href: item.href })) },
      { title: "关于", links: about },
      { title: "法务", links: legal },
    ];
  }
  return [
    { title: "产品", links: products },
    { title: "资源", links: resources },
    { title: "关于", links: about },
    { title: "法务", links: legal },
  ];
}

const linkClass =
  "focus-ink text-[13px] text-[var(--lt-ink)]/70 hover:text-[var(--lt-ink)] hover:underline underline-offset-4";

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
        {external ? <NewWindowNote arrow /> : null}
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
  const site = siteProfile();
  const year = new Date().getFullYear();
  const groups = footerLinks(site.contactEmail, site.id);
  return (
    <footer className="px-6">
      <div className="mx-auto max-w-5xl border-t border-[var(--lt-rule)] py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <BrandLockup className="[&>span]:text-base" />
            <p className="mt-3 max-w-[22rem] text-[13px] leading-relaxed text-[var(--lt-ink)]/70">
              {site.footerBlurb}
            </p>
          </div>

          {groups.map((group) => (
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
          <p>&copy; {year} LurusTech。保留所有权利。</p>
          {site.id === "personal" ? <p>Lurus Hub 基于开源 New API，AGPLv3。</p> : null}

          {/* 只挂当前面孔已取得的备案号。公司号未下发时这一行不出现。 */}
          {site.beian.length > 0 ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {site.beian.map((item, i) => (
                <span key={item.label} className="inline-flex items-center gap-x-3">
                  {i > 0 ? <span aria-hidden="true">·</span> : null}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ink hover:text-[var(--lt-ink)] hover:underline"
                  >
                    {item.label}
                    <NewWindowNote />
                  </a>
                </span>
              ))}
            </div>
          ) : null}
          <div className="flex min-h-8 flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/terms" className="focus-ink hover:text-[var(--lt-ink)] hover:underline">
              《服务条款》
            </Link>
            <Link href="/privacy" className="focus-ink hover:text-[var(--lt-ink)] hover:underline">
              《隐私政策》
            </Link>
            <a
              href={`mailto:${site.contactEmail}?subject=侵权投诉`}
              className="focus-ink hover:text-[var(--lt-ink)] hover:underline"
            >
              《侵权投诉》
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
