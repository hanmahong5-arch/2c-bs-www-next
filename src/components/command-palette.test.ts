import { expect, test } from "bun:test";
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
