"use client";

import { useCallback, useEffect, useState, useMemo, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HomeIcon,
  CubeTransparentIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  CurrencyYenIcon,
  CloudArrowDownIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import { updates } from "@/app/blog/updates-data";
import { changelogAnchor } from "@/lib/changelog-rss";
import { NewWindowNote } from "@/components/site/new-window-note";

type Item = {
  label: string;
  href: string;
  hint?: string;
  external?: boolean;
  /** text/markdown route：整页请求，不走 App Router。 */
  plain?: boolean;
  Icon: typeof HomeIcon;
};

type Group = { section: string; items: Item[] };

/** Header 触发按钮与键盘快捷键共用：勿再合成 KeyboardEvent（Windows 上只带 metaKey 打不开）。 */
export const OPEN_COMMAND_PALETTE = "lurus:open-command-palette";

export function openCommandPalette(target: { dispatchEvent(event: Event): boolean } = window) {
  target.dispatchEvent(new Event(OPEN_COMMAND_PALETTE));
}

/** 窄屏目录里的搜索：先收起目录，再打开同一块面板。 */
export function openPaletteFromMenu(
  close: () => void,
  target: { dispatchEvent(event: Event): boolean } = window,
) {
  close();
  openCommandPalette(target);
}

const GROUPS: Group[] = [
  {
    section: "导航",
    items: [
      { label: "首页", href: "/", Icon: HomeIcon },
      { label: "见证 — 状态可核查", href: "/witness", hint: "早期试点", Icon: CubeTransparentIcon },
      { label: "见证 — 演练", href: "/witness#restore", hint: "只认真恢复", Icon: CubeTransparentIcon },
      { label: "见证 — 月报", href: "/witness#report", hint: "月度证据报告", Icon: DocumentTextIcon },
      { label: "Kova — 持久执行引擎", href: "/kova", hint: "早期试点", Icon: WrenchScrewdriverIcon },
      { label: "Forge — 工作流编排壳", href: "/forge", hint: "内部生产使用", Icon: WrenchScrewdriverIcon },
      { label: "Founder — 获客桌面（内部）", href: "/founder", hint: "早期试点", Icon: MegaphoneIcon },
      { label: "Lux — 编码 Agent CLI", href: "/lux", hint: "早期试点", Icon: CommandLineIcon },
      { label: "Memorus — AI 记忆引擎", href: "/memorus", hint: "早期试点", Icon: ChartBarIcon },
      { label: "Memorus 公开基准报告", href: "/memorus/benchmarks", Icon: DocumentTextIcon },
      { label: "Hub — 私有 LLM 网关", href: "/hub", hint: "内部生产使用", Icon: CloudArrowDownIcon },
      { label: "Hub 按量价格", href: "/hub/pricing", hint: "与扣费同源", Icon: CurrencyYenIcon },
      { label: "Lugo — 账号与计费", href: "/lugo", hint: "内部生产使用", Icon: CurrencyYenIcon },
      { label: "Switch — AI CLI 管理器", href: "/switch", hint: "早期试点", Icon: CloudArrowDownIcon },
      { label: "方法", href: "/approach", Icon: WrenchScrewdriverIcon },
      { label: "方法 — 首信清单", href: "/approach#intake", Icon: EnvelopeIcon },
      { label: "方法 — 交付范围", href: "/approach#delivery", hint: "包含 / 不包含", Icon: WrenchScrewdriverIcon },
      { label: "方法 — 回执", href: "/approach#receipt", hint: "演练之后", Icon: DocumentTextIcon },
      { label: "更新日志", href: "/blog", Icon: DocumentTextIcon },
      { label: "Lucrum", href: "/lucrum", hint: "回测，不报收益", Icon: ChartBarIcon },
      { label: "关于", href: "/about", Icon: EnvelopeIcon },
    ],
  },
  {
    section: "更新",
    items: updates.slice(0, 5).map((entry) => ({
      label: entry.title,
      href: `/blog#${changelogAnchor(entry)}`,
      hint: entry.date,
      Icon: DocumentTextIcon,
    })),
  },
  {
    section: "资源",
    items: [
      { label: "下载", href: "/download", Icon: CloudArrowDownIcon },
      { label: "Hub 价目纯文本", href: "/hub/pricing.md", hint: "text/markdown", plain: true, Icon: DocumentTextIcon },
      { label: "方法纯文本", href: "/approach.md", hint: "text/markdown", plain: true, Icon: DocumentTextIcon },
      { label: "日志纯文本", href: "/blog.md", hint: "text/markdown", plain: true, Icon: DocumentTextIcon },
      { label: "站点索引 llms.txt", href: "/llms.txt", hint: "text/plain", plain: true, Icon: DocumentTextIcon },
      { label: "API 文档", href: "https://docs.lurus.cn", external: true, Icon: DocumentTextIcon, hint: "docs.lurus.cn" },
      { label: "GitHub", href: "https://github.com/hanmahong5-arch", external: true, Icon: CodeBracketIcon },
      { label: "联系我们", href: "/about#contact", Icon: EnvelopeIcon },
    ],
  },
];

/** 铺在同一张纸上：发丝线，无圆角，无投影。 */
export const PALETTE_SCRIM_CLASS =
  "fixed inset-0 z-[100] flex items-start justify-center bg-[var(--lt-ink)]/20 px-4 pt-[16vh]";
export const PALETTE_PANEL_CLASS =
  "w-full max-w-[600px] overflow-hidden border border-[var(--lt-rule)] bg-[var(--lt-paper)]";
export const PALETTE_SEARCH_LABEL = "搜索页面、产品、文档";

/** 系统要求减少动态时，面板直接出现，不淡入、不位移。 */
export function paletteMotion(reduced: boolean) {
  if (reduced) {
    return {
      scrim: {
        initial: false as const,
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      },
      panel: {
        initial: false as const,
        animate: { y: 0, opacity: 1 },
        exit: { y: 0, opacity: 1 },
        transition: { duration: 0 },
      },
    };
  }
  return {
    scrim: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 },
    },
    panel: {
      initial: { y: -8, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -4, opacity: 0 },
      transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };
}

type InertNode = {
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
  parentElement: { children: ArrayLike<InertNode> } | null;
};

/**
 * 面板打开时，同一层的页面不能再被点到或读到。
 * 已经是 inert 的节点不动，关掉面板时只收回这次加上的。
 */
export function inertSiblings(keep: InertNode): () => void {
  const parent = keep.parentElement;
  if (!parent) return () => {};
  const touched: InertNode[] = [];
  for (const child of Array.from(parent.children)) {
    if (child === keep || child.hasAttribute("inert")) continue;
    child.setAttribute("inert", "");
    touched.push(child);
  }
  return () => {
    for (const el of touched) el.removeAttribute("inert");
  };
}

/** 当前行用一条 2px 墨色左边线，不用填充块。赭石在纸面上只有 2.74:1。 */
export function paletteRowClass(active: boolean) {
  return `flex cursor-pointer items-center gap-3 border-l-2 px-5 py-2.5 text-sm ${
    active
      ? "border-[var(--lt-ink)] text-[var(--lt-ink)]"
      : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--lt-ink)]"
  }`;
}

/** 当前行的图标用墨色。没选中时用已经量过的灰色。 */
export function paletteIconClass(active: boolean) {
  return `h-4 w-4 shrink-0 ${active ? "text-[var(--lt-ink)]" : "text-[var(--color-text-muted)]"}`;
}

export const PALETTE_LIST_ID = "palette-list";

export function paletteOptionId(index: number) {
  return `palette-opt-${index}`;
}

/** 搜索框要报出的当前行。没有这一行时不指。 */
export function paletteActiveDescendant(index: number, count: number) {
  if (count <= 0 || index < 0 || index >= count) return undefined;
  return paletteOptionId(index);
}

/** 当前行滚进列表视野。负下标或还没有这一行时不动。 */
export function scrollPaletteOptionIntoView(
  index: number,
  root: { getElementById(id: string): { scrollIntoView(opts: { block: "nearest" }): void } | null },
) {
  if (index < 0) return;
  root.getElementById(paletteOptionId(index))?.scrollIntoView({ block: "nearest" });
}

/** 命令面板的过滤。空查询返回全部；命中 label 或 hint，大小写不敏感。 */
export function filterPaletteItems(query: string) {
  const q = query.trim().toLowerCase();
  const out: { group: string; item: Item; flatIdx: number }[] = [];
  let idx = 0;
  for (const g of GROUPS) {
    for (const item of g.items) {
      if (!q || item.label.toLowerCase().includes(q) || item.hint?.toLowerCase().includes(q)) {
        out.push({ group: g.section, item, flatIdx: idx++ });
      }
    }
  }
  return out;
}

/** 面板上写的快捷键，与真正打开它的键相同。 */
export function paletteShortcut(isMac: boolean) {
  return isMac ? "⌘K" : "Ctrl+K";
}

// SSR-safe platform detection — useSyncExternalStore avoids setState-in-effect.
function getIsMac() {
  return typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
}
const noopSubscribe = () => () => {};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const enter = paletteMotion(useReducedMotion() === true);
  const shortcut = paletteShortcut(useSyncExternalStore(noopSubscribe, getIsMac, () => false));

  // Single close path: reset query + active index alongside open=false.
  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  // ⌘K / Ctrl+K toggle, ESC to close；Header 按钮经自定义事件打开。
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) closePalette();
        else setOpen(true);
      } else if (e.key === "Escape" && open) {
        closePalette();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE, onOpen);
    };
  }, [open, closePalette]);

  const groups = GROUPS;
  const filteredFlat = useMemo(() => filterPaletteItems(query), [query]);

  // Arrow navigation + Enter
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, filteredFlat.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const sel = filteredFlat[activeIdx];
        if (!sel) return;
        if (sel.item.external) {
          window.open(sel.item.href, "_blank", "noopener,noreferrer");
        } else if (sel.item.plain) {
          window.location.assign(sel.item.href);
        } else {
          router.push(sel.item.href);
        }
        closePalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filteredFlat, activeIdx, router, closePalette]);

  // 键盘选中的行留在列表里，不滚出半屏的结果区。
  useEffect(() => {
    if (!open) return;
    scrollPaletteOptionIntoView(activeIdx, document);
  }, [open, activeIdx, filteredFlat]);

  // Tab 在面板两端折返。同一层的页面标成 inert，读屏和点击都进不来。
  useEffect(() => {
    if (!open) return;
    const scrim = panelRef.current?.parentElement ?? null;
    const release = scrim ? inertSiblings(scrim) : () => {};
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      release();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          {...enter.scrim}
          className={PALETTE_SCRIM_CLASS}
          onClick={closePalette}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="命令面板"
            {...enter.panel}
            onClick={(e) => e.stopPropagation()}
            className={PALETTE_PANEL_CLASS}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-[var(--lt-rule)] px-5 py-4">
              <span className="font-mono text-sm text-[var(--color-text-muted)]">{shortcut}</span>
              <input
                ref={inputRef}
                autoFocus
                role="combobox"
                aria-expanded="true"
                aria-controls={PALETTE_LIST_ID}
                aria-autocomplete="list"
                aria-activedescendant={paletteActiveDescendant(activeIdx, filteredFlat.length)}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                placeholder={`${PALETTE_SEARCH_LABEL}...`}
                aria-label={PALETTE_SEARCH_LABEL}
                className="focus-ink flex-1 bg-transparent text-sm text-[var(--lt-ink)] placeholder:text-[var(--color-text-muted)]"
              />
              <kbd className="border border-[var(--color-text-muted)] bg-[var(--lt-paper)] px-2 py-1 font-mono text-[10px] text-[var(--color-text-muted)]">
                ESC
              </kbd>
            </div>

            {/* Results list */}
            <div
              id={PALETTE_LIST_ID}
              role="listbox"
              aria-label="搜索结果"
              className="max-h-[50vh] overflow-y-auto py-2"
            >
              {filteredFlat.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <p className="text-sm text-[var(--color-text-muted)]">没有匹配项</p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">试试输入产品名或页面名</p>
                </div>
              ) : (
                groups.map((g) => {
                  const itemsInGroup = filteredFlat.filter((f) => f.group === g.section);
                  if (itemsInGroup.length === 0) return null;
                  return (
                    <div key={g.section} className="mb-1">
                      <div className="px-5 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                        {g.section}
                      </div>
                      {itemsInGroup.map(({ item, flatIdx }) => {
                        const isActive = activeIdx === flatIdx;
                        const Icon = item.Icon;
                        const handleClick = closePalette;
                        const className = paletteRowClass(isActive);
                        const rowProps = {
                          id: paletteOptionId(flatIdx),
                          role: "option" as const,
                          "aria-selected": isActive,
                          onClick: handleClick,
                          onMouseEnter: () => setActiveIdx(flatIdx),
                          className,
                        };
                        const inner = (
                          <>
                            <Icon className={paletteIconClass(isActive)} />
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.hint && (
                              <span className="text-[10px] font-mono text-[var(--color-text-muted)] truncate">{item.hint}</span>
                            )}
                            {item.external && (
                              <span aria-hidden="true" className="text-[10px] font-mono text-[var(--color-text-muted)]">
                                ↗
                              </span>
                            )}
                            {item.external ? <NewWindowNote /> : null}
                          </>
                        );
                        if (item.external) {
                          return (
                            <a
                              key={`${item.href}:${item.label}`}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              {...rowProps}
                            >
                              {inner}
                            </a>
                          );
                        }
                        if (item.plain) {
                          return (
                            <a
                              key={`${item.href}:${item.label}`}
                              href={item.href}
                              {...rowProps}
                            >
                              {inner}
                            </a>
                          );
                        }
                        return (
                          <Link
                            key={`${item.href}:${item.label}`}
                            href={item.href}
                            {...rowProps}
                          >
                            {inner}
                          </Link>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--lt-rule)] px-5 py-3 font-mono text-[10px] text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1.5">
                <kbd className="border border-[var(--color-text-muted)] bg-[var(--lt-paper)] px-1.5 py-0.5">↑</kbd>
                <kbd className="border border-[var(--color-text-muted)] bg-[var(--lt-paper)] px-1.5 py-0.5">↓</kbd>
                选择
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="border border-[var(--color-text-muted)] bg-[var(--lt-paper)] px-1.5 py-0.5">↵</kbd>
                打开
              </span>
              <span className="ml-auto">Lurus {shortcut}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** 桌面顶栏触发；与键盘快捷键同开命令面板。 */
export function CommandPaletteTrigger() {
  const isMac = useSyncExternalStore(noopSubscribe, getIsMac, () => false);

  return (
    <button
      type="button"
      onClick={() => openCommandPalette()}
      aria-label="打开命令面板"
      className={`hidden items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--lt-ink)] focus-ink md:inline-flex`}
    >
      <span>搜索</span>
      <kbd className="font-mono text-[10px] tracking-tight text-[var(--color-text-muted)]">
        {paletteShortcut(isMac)}
      </kbd>
    </button>
  );
}

/** 窄屏目录里的搜索。不写快捷键，目录收起后再打开面板。 */
export function MobilePaletteButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={() => openPaletteFromMenu(onOpen)}
      aria-label="打开命令面板"
      className="focus-ink text-xs text-[var(--color-text-muted)]"
    >
      搜索
    </button>
  );
}
