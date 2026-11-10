import { updates, type ChangelogEntry } from "@/app/blog/updates-data";

const SITE = "https://www.lurus.cn";
const FEED_URL = `${SITE}/blog/rss.xml`;
const BLOG_URL = `${SITE}/blog`;

const CHANNEL_DESCRIPTION =
  "过往的更新记录，按时间倒序。条目保留当时的原文，其中的活动与说法以当时为准，不代表现状。";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** 与数组下标无关。新条目插到头部时，旧条目的 guid 不变。 */
export function changelogGuid(entry: ChangelogEntry): string {
  return `lurus-changelog-${entry.date}-${entry.title}`;
}

// "YYYY-MM" → RFC-822 pubDate（该月 1 号）。月粒度是 changelog 的真实精度。
function pubDate(ym: string): string {
  return new Date(`${ym}-01T08:00:00+08:00`).toUTCString();
}

/**
 * /blog/rss.xml。条目只用 updates 里的原文。
 * 每条链到该月锚点；guid 用日期加标题，不用数组下标。
 */
export function renderChangelogRss(entries: readonly ChangelogEntry[] = updates): string {
  const items = entries
    .map((entry) => {
      const cats = entry.tags.map((tag) => `<category>${esc(tag)}</category>`).join("");
      return `    <item>
      <title>${esc(entry.title)}</title>
      <link>${BLOG_URL}#${esc(entry.date)}</link>
      <guid isPermaLink="false">${esc(changelogGuid(entry))}</guid>
      <pubDate>${pubDate(entry.date)}</pubDate>
      <description>${esc(entry.desc)}</description>
      ${cats}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LurusTech 更新日志</title>
    <link>${BLOG_URL}</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <description>${esc(CHANNEL_DESCRIPTION)}</description>
    <language>zh-CN</language>
${items}
  </channel>
</rss>
`;
}
