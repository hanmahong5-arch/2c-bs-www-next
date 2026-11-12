import Link from "next/link";
import { BrandLockup } from "@/components/brand-mark";
import { CATALOG } from "@/lib/catalog";
import { siteProfile } from "@/lib/site-profile";

// 页脚：产品 → 资源 → 关于 → 法务。备案号跟当前面孔走，不挂 Careers、不挂未取得的算法备案。
type FooterLink = { name: string; href: string };

function footerLinks(
  email: string,
  profile: "personal" | "company",
): ReadonlyArray<{ title: string; links: readonly FooterLink[] }> {
  const legal = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Security & DPA", href: `mailto:${email}?subject=Security%20%26%20DPA` },
  ];
  const products: readonly FooterLink[] = [
    { name: "见证 witness", href: "/witness" },
    { name: "kova", href: "/kova" },
    { name: "forge", href: "/forge" },
    { name: "founder", href: "/founder" },
    { name: "lux", href: "/lux" },
    { name: "memorus", href: "/memorus" },
    { name: "hub", href: "/hub" },
    { name: "platform", href: "/lugo" },
    { name: "switch", href: "/switch" },
    { name: "lucrum", href: "/lucrum" },
  ];
  const resources: readonly FooterLink[] = [
    { name: "文档", href: "https://docs.lurus.cn" },
    { name: "方法 approach", href: "/approach" },
    { name: "changelog", href: "/blog" },
    { name: "下载", href: "/download" },
    { name: "Hub 价格", href: "/hub/pricing" },
  ];
  const about: readonly FooterLink[] =
    profile === "company"
      ? [
          { name: "公司", href: "/about" },
          { name: "文档", href: "https://docs.lurus.cn" },
          { name: "写信", href: `mailto:${email}` },
        ]
      : [
          { name: "About", href: "/about" },
          { name: "Contact", href: `mailto:${email}` },
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
          <p>&copy; {year} LurusTech. All rights reserved.</p>
          {site.id === "personal" ? <p>Lurus Hub: Built on New API · AGPL-3.0.</p> : null}

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
                    className="hover:text-[var(--lt-ink)] hover:underline"
                  >
                    {item.label}
                  </a>
                </span>
              ))}
            </div>
          ) : null}
          <div className="flex min-h-8 flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/terms" className="hover:text-[var(--lt-ink)] hover:underline">
              《用户协议》
            </Link>
            <Link href="/privacy" className="hover:text-[var(--lt-ink)] hover:underline">
              《隐私政策》
            </Link>
            <a
              href={`mailto:${site.contactEmail}?subject=侵权投诉`}
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
