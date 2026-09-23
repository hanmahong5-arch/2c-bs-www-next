"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

// 深色模式切换 — 初始态由 layout.tsx 的 beforeInteractive script 同步应用在 <html>
// 上。用 useSyncExternalStore（而非 effect 里 setState）读回当前值，SSR 快照固定为
// false（浅色），避免 hydration 期间的多余渲染与 mismatch 警告。
const themeListeners = new Set<() => void>();
function getDarkSnapshot() {
  return document.documentElement.classList.contains("dark");
}
function getServerDarkSnapshot() {
  return false;
}
function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
}
function setDarkMode(next: boolean) {
  document.documentElement.classList.toggle("dark", next);
  try {
    localStorage.setItem("theme", next ? "dark" : "light");
  } catch {
    // 隐私模式等场景下 localStorage 不可用，静默降级为仅本次会话生效
  }
  themeListeners.forEach((l) => l());
}

function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeTheme, getDarkSnapshot, getServerDarkSnapshot);
  return (
    <button
      type="button"
      onClick={() => setDarkMode(!dark)}
      aria-label={dark ? "切换到浅色模式" : "切换到深色模式"}
      className="p-2 font-mono text-[11px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--lt-ink)]"
    >
      <span aria-hidden="true">{dark ? "○" : "●"}</span>
    </button>
  );
}

type NavItem = { name: string; href: string; external?: boolean };

const nav: readonly NavItem[] = [
  { name: "见证", href: "/witness" },
  { name: "Kova", href: "/kova" },
  { name: "Memorus", href: "/memorus" },
  { name: "Hub", href: "/hub" },
  { name: "方法", href: "/approach" },
  { name: "文档", href: "https://docs.lurus.cn", external: true },
];

const LOGIN_URL = "https://identity.lurus.cn";

function NavLink({
  item,
  active,
  onNavigate,
  className,
}: {
  item: NavItem;
  active: boolean;
  onNavigate?: () => void;
  className: string;
}) {
  const tone = active
    ? "text-[var(--lt-ink)] underline decoration-[var(--lt-accent)] decoration-2 underline-offset-[6px]"
    : "text-[var(--color-text-secondary)] hover:text-[var(--lt-ink)]";
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} ${tone}`}
      >
        {item.name}
        <span aria-hidden="true" className="ml-0.5 text-[var(--color-text-muted)]">
          ↗
        </span>
        <span className="sr-only">（新窗口打开）</span>
      </a>
    );
  }
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`${className} ${tone}`}
    >
      {item.name}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (item: NavItem) =>
    !item.external && (pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--lt-rule)] bg-[var(--lt-paper)]/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-[-0.02em] text-[var(--lt-ink)]"
        >
          LurusTech
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={isActive(item)}
              className="text-sm transition-colors"
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--lt-ink)]"
          >
            登录
          </a>
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="p-2 text-sm text-[var(--color-text-secondary)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "关闭" : "目录"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="主导航"
          className="border-t border-[var(--lt-rule)] bg-[var(--lt-paper)] md:hidden"
        >
          <ul className="mx-auto max-w-5xl px-6 py-2">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-[var(--lt-rule)] last:border-b-0">
                <NavLink
                  item={item}
                  active={isActive(item)}
                  onNavigate={() => setOpen(false)}
                  className="block py-3 text-[15px]"
                />
              </li>
            ))}
          </ul>
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 pb-4">
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-text-muted)]"
            >
              登录
            </a>
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
