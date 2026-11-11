"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore, useEffect, useRef } from "react";
import { CommandPaletteTrigger, MobilePaletteButton } from "@/components/command-palette";
import { BrandLockup } from "@/components/brand-mark";
import { NewWindowNote } from "@/components/site/new-window-note";
import { themeColor } from "@/lib/theme-chrome";

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
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", themeColor(next));
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
      className={`p-2 font-mono text-[11px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--lt-ink)] ${focusInk}`}
    >
      <span aria-hidden="true">{dark ? "○" : "●"}</span>
    </button>
  );
}

type NavItem = { name: string; href: string; external?: boolean };

const nav: readonly NavItem[] = [
  { name: "Switch", href: "/switch" },
  { name: "见证", href: "/witness" },
  { name: "Kova", href: "/kova" },
  { name: "Memorus", href: "/memorus" },
  { name: "Hub", href: "/hub" },
  { name: "Lugo", href: "/lugo" },
  { name: "方法", href: "/approach" },
  { name: "文档", href: "https://docs.lurus.cn", external: true },
];

const focusInk = "focus-ink";

/** 当前页用 2px 墨色下划线。赭石在纸面上只有 2.74:1，不够当当前位置。 */
export function navTone(active: boolean) {
  return active
    ? "text-[var(--lt-ink)] underline decoration-[var(--lt-ink)] decoration-2 underline-offset-[6px]"
    : "text-[var(--color-text-secondary)] hover:text-[var(--lt-ink)]";
}

/** 目录开着时，Esc 把它收起。 */
export function escapeClosesMenu(open: boolean, key: string) {
  return open && key === "Escape";
}

/** 目录开着且地址变了，把它收起。同一地址不收。 */
export function pathClosesMenu(open: boolean, previousPath: string, pathname: string) {
  return open && previousPath !== pathname;
}

export function closeMenuFromEscape(open: boolean, key: string, close: () => void, focus: () => void) {
  if (!escapeClosesMenu(open, key)) return;
  close();
  focus();
}

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
  const tone = navTone(active);
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} ${tone} ${focusInk}`}
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
      className={`${className} ${tone} ${focusInk}`}
    >
      {item.name}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // 地址变了就在这次渲染里收起目录。effect 里同步 setState 会连环渲染，lint 不过。
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (pathClosesMenu(open, menuPath, pathname)) setOpen(false);
  }
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isActive = (item: NavItem) =>
    !item.external &&
    !!pathname &&
    (pathname === item.href || pathname.startsWith(`${item.href}/`));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      closeMenuFromEscape(
        open,
        e.key,
        () => setOpen(false),
        () => menuButtonRef.current?.focus(),
      );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--lt-rule)] bg-[var(--lt-paper)]">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="LurusTech 个人项目站首页"
          onClick={() => setOpen(false)}
          className={`inline-flex items-center ${focusInk}`}
        >
          <BrandLockup />
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

        <div className="hidden items-center gap-4 md:flex">
          <CommandPaletteTrigger />
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--lt-ink)] ${focusInk}`}
          >
            登录
            <NewWindowNote />
          </a>
          <ThemeToggle />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className={`p-2 text-sm text-[var(--color-text-secondary)] md:hidden ${focusInk}`}
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
            <div className="flex items-center gap-4">
              <MobilePaletteButton onOpen={() => setOpen(false)} />
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`text-xs text-[var(--color-text-muted)] ${focusInk}`}
              >
                登录
                <NewWindowNote />
              </a>
            </div>
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
