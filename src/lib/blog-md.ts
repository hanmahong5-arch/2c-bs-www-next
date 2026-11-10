import { updates, type ChangelogEntry } from "@/app/blog/updates-data";

const PAGE = "https://www.lurus.cn/blog";

function entryBlock(entry: ChangelogEntry): string {
  return `## ${entry.title}

日期：${entry.date}

${entry.desc}

标记：${entry.tags.join("、")}`;
}

/**
 * /blog 的纯文本孪生。
 * 条目只用 updates 里的原文，不改写，也不把当时的说法写成现状。
 */
export function renderBlogMarkdown(): string {
  return `# 更新日志

网页：${PAGE}

订阅源：${PAGE}/rss.xml

条目保留当时的原文，其中的活动与说法以当时为准，不代表现状。

${updates.map(entryBlock).join("\n\n")}
`;
}
