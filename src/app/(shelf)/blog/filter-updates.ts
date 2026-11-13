type Tagged = { tags: readonly string[] };

/**
 * 日志标记筛选。
 * 空标记（null / undefined / ""）返回全部；未知标记返回空列表；已知标记只留带该标记的条目。
 */
export function filterUpdates<T extends Tagged>(updates: readonly T[], tag: string | null | undefined): T[] {
  if (tag == null || tag === "") return updates.slice();
  if (!updates.some((entry) => entry.tags.includes(tag))) return [];
  return updates.filter((entry) => entry.tags.includes(tag));
}
