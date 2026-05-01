"use client";

import { useCallback, useEffect, useState, useMemo, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  KeyIcon,
} from "@heroicons/react/24/outline";

type Item = {
  label: string;
  href: string;
  hint?: string;
  external?: boolean;
  Icon: typeof HomeIcon;
};

type Group = { section: string; items: Item[] };

const GROUPS: Group[] = [
  {
    section: "导航",
    items: [
      { label: "首页", href: "/", Icon: HomeIcon },
      { label: "Platform — 企业 AI 基础设施", href: "/platform", Icon: CubeTransparentIcon },
      { label: "Lucrum — AI 量化交易", href: "/lucrum", Icon: ChartBarIcon },
      { label: "Kova — Agent 执行引擎", href: "/kova", Icon: WrenchScrewdriverIcon },
      { label: "定价", href: "/pricing", Icon: CurrencyYenIcon },
      { label: "下载桌面端", href: "/download", Icon: CloudArrowDownIcon },
      { label: "博客", href: "/blog", Icon: DocumentTextIcon },
    ],
  },
  {
    section: "外部",
    items: [
      { label: "API 文档", href: "https://docs.lurus.cn", external: true, Icon: DocumentTextIcon, hint: "docs.lurus.cn" },
      { label: "API Console — 获取 Key", href: "https://api.lurus.cn", external: true, Icon: KeyIcon, hint: "api.lurus.cn" },
      { label: "GitHub", href: "https://github.com/hanmahong5-arch", external: true, Icon: CodeBracketIcon },
      { label: "联系我们", href: "/about#contact", Icon: EnvelopeIcon },
    ],
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Single close path: reset query + active index alongside open=false.
  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  // ⌘K / Ctrl+K toggle, ESC to close.
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
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closePalette]);

  // Flatten + filter
  const filteredFlat = useMemo(() => {
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
  }, [query]);

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
        } else {
          router.push(sel.item.href);
        }
        closePalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filteredFlat, activeIdx, router, closePalette]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[16vh] px-4"
          onClick={closePalette}
        >
          <motion.div
            initial={{ y: -16, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -8, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[600px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 60px rgba(200,162,78,0.06)" }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-ochre)]/70 font-mono text-sm">⌘</span>
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                placeholder="搜索页面、产品、文档..."
                className="flex-1 bg-transparent outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] text-sm"
              />
              <kbd className="text-[10px] font-mono px-2 py-1 rounded bg-[var(--background)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                ESC
              </kbd>
            </div>

            {/* Results list */}
            <div className="max-h-[50vh] overflow-y-auto py-2">
              {filteredFlat.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <p className="text-sm text-[var(--color-text-muted)]">没有匹配项</p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]/60">试试输入产品名或页面名</p>
                </div>
              ) : (
                GROUPS.map((g) => {
                  const itemsInGroup = filteredFlat.filter((f) => f.group === g.section);
                  if (itemsInGroup.length === 0) return null;
                  return (
                    <div key={g.section} className="mb-1">
                      <div className="px-5 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]/70">
                        {g.section}
                      </div>
                      {itemsInGroup.map(({ item, flatIdx }) => {
                        const isActive = activeIdx === flatIdx;
                        const Icon = item.Icon;
                        const handleClick = closePalette;
                        const className = `flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                          isActive
                            ? "bg-[var(--color-ochre)]/12 text-[var(--color-text-primary)]"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-ochre)]/8"
                        }`;
                        const inner = (
                          <>
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[var(--color-ochre)]" : "text-[var(--color-text-muted)]"}`} />
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.hint && (
                              <span className="text-[10px] font-mono text-[var(--color-text-muted)]/60 truncate">{item.hint}</span>
                            )}
                            {item.external && (
                              <span className="text-[10px] font-mono text-[var(--color-text-muted)]/70">↗</span>
                            )}
                          </>
                        );
                        return item.external ? (
                          <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick}
                            onMouseEnter={() => setActiveIdx(flatIdx)}
                            className={className}
                          >
                            {inner}
                          </a>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleClick}
                            onMouseEnter={() => setActiveIdx(flatIdx)}
                            className={className}
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
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3 border-t border-[var(--color-border)] text-[10px] font-mono text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--color-border)]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--color-border)]">↓</kbd>
                选择
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--color-border)]">↵</kbd>
                打开
              </span>
              <span className="ml-auto text-[var(--color-ochre)]/60">Lurus ⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// SSR-safe platform detection — useSyncExternalStore avoids setState-in-effect.
function getIsMac() {
  return typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
}
const noopSubscribe = () => () => {};

// Trigger button — drop into Header.
export function CommandPaletteTrigger() {
  const isMac = useSyncExternalStore(noopSubscribe, getIsMac, () => false);

  const handleClick = () => {
    // Synthesize a ⌘K keypress to reuse the same handler as the keyboard shortcut.
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <button
      onClick={handleClick}
      aria-label="打开命令面板"
      className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-ochre)]/30 hover:bg-[var(--color-surface)] transition-all text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
    >
      <span>搜索</span>
      <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--color-border)]">
        {isMac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
}
