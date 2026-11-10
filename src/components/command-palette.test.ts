import { expect, test } from "bun:test";
import { updates } from "@/app/blog/updates-data";
import { changelogAnchor } from "@/lib/changelog-rss";
import {
  filterPaletteItems,
  inertSiblings,
  PALETTE_PANEL_CLASS,
  PALETTE_SCRIM_CLASS,
  PALETTE_SEARCH_LABEL,
  paletteRowClass,
  paletteOptionId,
  paletteActiveDescendant,
  scrollPaletteOptionIntoView,
  OPEN_COMMAND_PALETTE,
  openPaletteFromMenu,
  paletteMotion,
  paletteShortcut,
} from "./command-palette";

const ANCHORS = [
  { query: "回执", href: "/approach#receipt", label: "方法 — 回执" },
  { query: "演练", href: "/witness#restore", label: "见证 — 演练" },
  { query: "月报", href: "/witness#report", label: "见证 — 月报" },
] as const;

test("the palette sits on the same paper as the page", () => {
  expect(PALETTE_PANEL_CLASS).toContain("bg-[var(--lt-paper)]");
  expect(PALETTE_PANEL_CLASS).toContain("border-[var(--lt-rule)]");
  expect(PALETTE_PANEL_CLASS).not.toContain("rounded");
  expect(PALETTE_SCRIM_CLASS).toContain("bg-[var(--lt-ink)]/20");
  expect(PALETTE_SCRIM_CLASS).not.toContain("bg-black");
  expect(PALETTE_SCRIM_CLASS).not.toContain("backdrop-blur");
  expect(paletteRowClass(true)).toContain("border-[var(--lt-accent)]");
  expect(paletteRowClass(true)).not.toContain("rounded");
  expect(paletteRowClass(false)).toContain("border-transparent");
  expect(PALETTE_SEARCH_LABEL).toBe("搜索页面、产品、文档");
});

test("an open palette makes the rest of that layer inert and leaves prior inert nodes", () => {
  function node(inert = false) {
    const attrs = new Set(inert ? ["inert"] : []);
    return {
      parentElement: null as { children: ReturnType<typeof node>[] } | null,
      hasAttribute: (name: string) => attrs.has(name),
      setAttribute: (name: string) => {
        attrs.add(name);
      },
      removeAttribute: (name: string) => {
        attrs.delete(name);
      },
    };
  }
  const header = node();
  const main = node();
  const footer = node(true);
  const scrim = node();
  const parent = { children: [header, main, footer, scrim] };
  for (const child of parent.children) child.parentElement = parent;

  const release = inertSiblings(scrim);
  expect(header.hasAttribute("inert")).toBe(true);
  expect(main.hasAttribute("inert")).toBe(true);
  expect(scrim.hasAttribute("inert")).toBe(false);
  expect(footer.hasAttribute("inert")).toBe(true);
  release();
  expect(header.hasAttribute("inert")).toBe(false);
  expect(main.hasAttribute("inert")).toBe(false);
  expect(footer.hasAttribute("inert")).toBe(true);
});

test("the selected palette row scrolls into the list and a missing row does not", () => {
  const seen: Array<{ id: string; block: string }> = [];
  const root = {
    getElementById(id: string) {
      if (id !== "palette-opt-3") return null;
      return {
        scrollIntoView(opts: { block: "nearest" }) {
          seen.push({ id, block: opts.block });
        },
      };
    },
  };
  expect(paletteOptionId(3)).toBe("palette-opt-3");
  scrollPaletteOptionIntoView(3, root);
  scrollPaletteOptionIntoView(-1, root);
  scrollPaletteOptionIntoView(9, root);
  expect(seen).toEqual([{ id: "palette-opt-3", block: "nearest" }]);
});

test("the search box names the selected row and names nothing when that row is missing", () => {
  expect(paletteActiveDescendant(0, 4)).toBe(paletteOptionId(0));
  expect(paletteActiveDescendant(3, 4)).toBe("palette-opt-3");
  expect(paletteActiveDescendant(-1, 4)).toBeUndefined();
  expect(paletteActiveDescendant(4, 4)).toBeUndefined();
  expect(paletteActiveDescendant(0, 0)).toBeUndefined();
});

test("mobile search closes the menu and then opens the same palette", () => {
  const order: string[] = [];
  const target = {
    dispatchEvent(event: Event) {
      order.push(event.type);
      return true;
    },
  };
  openPaletteFromMenu(() => {
    order.push("close");
  }, target);
  expect(order).toEqual(["close", OPEN_COMMAND_PALETTE]);
});

test("reduced motion shows the palette in place", () => {
  const still = paletteMotion(true);
  expect(still.scrim.initial).toBe(false);
  expect(still.scrim.transition.duration).toBe(0);
  expect(still.panel.initial).toBe(false);
  expect(still.panel.animate).toEqual({ y: 0, opacity: 1 });
  expect(still.panel.exit).toEqual({ y: 0, opacity: 1 });
  expect(still.panel.transition.duration).toBe(0);
  const moving = paletteMotion(false);
  expect(moving.scrim.transition.duration).toBe(0.15);
  expect(moving.panel.initial).toEqual({ y: -8, opacity: 0 });
  expect(moving.panel.transition.duration).toBe(0.18);
});

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

test("the log itself is named 更新日志, the same name as the page", () => {
  const hits = filterPaletteItems("更新日志").filter((row) => row.item.href === "/blog");
  expect(hits).toHaveLength(1);
  expect(hits[0]?.item.label).toBe("更新日志");
  expect(hits[0]?.group).toBe("导航");
  expect(filterPaletteItems("博客").some((row) => row.item.href === "/blog")).toBe(false);
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

test("the shortcut matches the key that opens the palette", () => {
  expect(paletteShortcut(true)).toBe("⌘K");
  expect(paletteShortcut(false)).toBe("Ctrl+K");
});
