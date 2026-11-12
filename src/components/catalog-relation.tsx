import Link from "next/link";
import { headers } from "next/headers";
import { catalogItem } from "@/lib/catalog";
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
  return (
    <div className="border-b border-[var(--lt-rule)] px-6">
      <p className="mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-3 py-3 text-sm leading-[1.7] text-[var(--color-text-secondary)]">
        <Link
          href="/#layers"
          className="font-mono text-[11px] tracking-[0.16em] text-[var(--lt-accent)]"
        >
          构件
        </Link>
        <span>{item.relation}</span>
      </p>
    </div>
  );
}
