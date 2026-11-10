import { updates, type ChangelogEntry } from "@/app/blog/updates-data";

const SITE = "https://www.lurus.cn";
export const CHANGELOG_FEED_PATH = "/blog/rss.xml";
export const CHANGELOG_FEED_TITLE = "LurusTech 更新日志";
export const LLMS_INDEX_PATH = "/llms.txt";
export const LLMS_INDEX_TITLE = "LurusTech 站点索引";
const FEED_URL = `${SITE}${CHANGELOG_FEED_PATH}`;
const BLOG_URL = `${SITE}/blog`;

/** 全站 <link rel="alternate">。页面若自己写 alternates，须整份带上，否则会把根上的订阅源和站点索引盖掉。 */
export function changelogFeedTypes() {
  return {
    "application/rss+xml": [
      {
        url: CHANGELOG_FEED_PATH,
        title: CHANGELOG_FEED_TITLE,
      },
    ],
    "text/plain": [
      {
        url: LLMS_INDEX_PATH,
        title: LLMS_INDEX_TITLE,
      },
    ],
  };
}

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

/** 页面锚点。同一月有多条时也不能共用。只含小写十六进制，方便写进 URL。 */
export function changelogAnchor(entry: ChangelogEntry): string {
  const s = `${entry.date}\n${entry.title}`;
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h, 33) ^ s.charCodeAt(i);
  }
  return `e${(h >>> 0).toString(16).padStart(8, "0")}`;
}

// "YYYY-MM" → RFC-822 pubDate（该月 1 号）。月粒度是 changelog 的真实精度。
function pubDate(ym: string): string {
  return new Date(`${ym}-01T08:00:00+08:00`).toUTCString();
}

/**
 * /blog/rss.xml。条目只用 updates 里的原文。
 * 每条链到自己的锚点，不共用月份；guid 用日期加标题，不用数组下标。
 */
export function renderChangelogRss(entries: readonly ChangelogEntry[] = updates): string {
  const items = entries
    .map((entry) => {
      const cats = entry.tags.map((tag) => `<category>${esc(tag)}</category>`).join("");
      return `    <item>
      <title>${esc(entry.title)}</title>
      <link>${BLOG_URL}#${changelogAnchor(entry)}</link>
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
    <title>${esc(CHANGELOG_FEED_TITLE)}</title>
    <link>${BLOG_URL}</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <description>${esc(CHANNEL_DESCRIPTION)}</description>
    <language>zh-CN</language>
${items}
  </channel>
</rss>
`;
}
