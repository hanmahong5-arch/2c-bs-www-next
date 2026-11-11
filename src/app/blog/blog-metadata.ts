import type { Metadata } from "next";
import { changelogFeedTypes } from "@/lib/changelog-rss";

const CANONICAL = "/blog";

/**
 * 已知标记和整份日志都指向 /blog：筛选是同一份日志的视图。
 * 未知标记的正文是「没有这个标记」，不能再声称它就是整份日志。
 * 这种地址不收录，规范地址写成它自己。
 */
export function blogPageMetadata(tag: string | null | undefined, matchCount: number): Metadata {
  const unknown = tag != null && tag !== "" && matchCount === 0;
  return {
    title: "更新日志",
    description: "LurusTech 过往的产品更新记录，按时间倒序。",
    alternates: {
      canonical: unknown ? `${CANONICAL}?tag=${encodeURIComponent(tag)}` : CANONICAL,
      types: changelogFeedTypes(),
    },
    ...(unknown ? { robots: { index: false, follow: true } } : {}),
  };
}
