import { expect, test } from "bun:test";
import { updates } from "@/app/blog/updates-data";
import { changelogAnchor } from "@/lib/changelog-rss";
import { filterPaletteItems } from "./command-palette";

const ANCHORS = [
  { query: "回执", href: "/approach#receipt", label: "方法 — 回执" },
  { query: "演练", href: "/witness#restore", label: "见证 — 演练" },
  { query: "月报", href: "/witness#report", label: "见证 — 月报" },
] as const;

test("llms.txt is one plain full document", () => {
  const hits = filterPaletteItems("llms").filter((row) => row.item.href === "/llms.txt");
  expect(hits).toHaveLength(1);
  expect(hits[0]?.item.plain).toBe(true);
  expect(hits[0]?.item.external).toBeUndefined();
});

test("buyer words find the three in-app anchors without plain document navigation", () => {
  for (const { query, href, label } of ANCHORS) {
    const hits = filterPaletteItems(query).filter((row) => row.item.href === href);
    expect(hits).toHaveLength(1);
    expect(hits[0]?.item.label).toBe(label);
    expect(hits[0]?.item.plain).toBeUndefined();
    expect(hits[0]?.item.external).toBeUndefined();
  }
});

test("the five newest changelog rows open that entry, not the top of the log", () => {
  const newest = updates.slice(0, 5);
  const hrefs = newest.map((entry) => {
    const hits = filterPaletteItems(entry.title).filter((row) => row.item.label === entry.title);
    expect(hits).toHaveLength(1);
    expect(hits[0]?.item.href).toBe(`/blog#${changelogAnchor(entry)}`);
    expect(hits[0]?.item.plain).toBeUndefined();
    expect(hits[0]?.group).toBe("更新");
    return hits[0]?.item.href;
  });
  expect(new Set(hrefs).size).toBe(newest.length);
});
