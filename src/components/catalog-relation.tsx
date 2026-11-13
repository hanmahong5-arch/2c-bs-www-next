import Link from "next/link";
import { headers } from "next/headers";
import { COMPANY_GROUPS, catalogItem } from "@/lib/catalog";
import { siteProfile } from "@/lib/site-profile";

/**
 * 公司站在构件页顶部重复目录里的那一句，避免点进去又变成另一份销售页。
 * 路径由 proxy 写入 x-lurus-path。没有这个头时不显示，页面本身照常。
 */
export async function CatalogRelation() {
  if (siteProfile().id !== "company") return null;
  const path = (await headers()).get("x-lurus-path") ?? "";
  const item = catalogItem(path);
  if (!item) return null;
  const group = COMPANY_GROUPS.find((entry) => entry.hrefs.includes(item.href));
  return (
    <div className="border-b border-[var(--lt-rule)] px-6">
      <div className="mx-auto max-w-5xl py-6">
        <p className="flex flex-wrap items-baseline gap-x-3 text-sm leading-[1.7] text-[var(--color-text-secondary)]">
          <Link
            href="/#layers"
            className="font-mono text-[11px] tracking-[0.16em] text-[var(--lt-accent)]"
          >
            {group?.title ?? "构件"}
          </Link>
          <span>{item.relation}</span>
        </p>
        <dl className="mt-6 grid gap-x-12 gap-y-5 sm:grid-cols-2">
          {item.sheet.map((row) => (
            <div key={row.label} className="max-w-[28rem]">
              <dt className="font-mono text-[11px] tracking-[0.14em] text-[var(--color-text-muted)]">
                {row.label}
              </dt>
              <dd className="mt-1 text-[15px] leading-[1.65] text-[var(--color-text-secondary)]">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
