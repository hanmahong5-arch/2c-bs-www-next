"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { CommandPaletteTrigger } from "./command-palette";
import { HUB_CONSOLE_URL } from "@/lib/links";
import { track } from "@/lib/track";

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
      onClick={() => setDarkMode(!dark)}
      aria-label={dark ? "切换到浅色模式" : "切换到深色模式"}
      className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
    >
      {dark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
    </button>
  );
}

const nav = [
  { name: "Lugo", href: "/platform" },
  { name: "Lucrum", href: "/lucrum" },
  { name: "Kova", href: "/kova" },
  { name: "定价", href: "/pricing" },
  { name: "下载", href: "/download" },
  { name: "文档", href: "https://docs.lurus.cn", external: true },
];

function ExternalArrow() {
  return (
    <ArrowTopRightOnSquareIcon className="inline-block w-3 h-3 ml-1 opacity-40" />
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--background)]/85 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gradient-gold tracking-tight">
            LurusTech
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const isActive =
              !item.external && pathname.startsWith(item.href) && item.href !== "/";

            return (
              <Link
                key={item.name}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`text-sm transition-colors px-3 py-2 rounded-lg ${
                  isActive
                    ? "text-[var(--color-ochre)] bg-[var(--color-ochre)]/5"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                }`}
              >
                {item.name}
                {item.external && <ExternalArrow />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <CommandPaletteTrigger />
          <a
            href="https://auth.lurus.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors px-3 py-2"
          >
            登录
          </a>
          <a
            href={HUB_CONSOLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("cta_click", { id: "header" })}
            className="text-sm px-5 py-2 rounded-lg bg-[var(--lt-accent)] text-white font-semibold hover:bg-[var(--color-ochre-dark)] transition-all duration-300"
          >
            免费开始
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile nav — animated */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-[var(--color-border)] bg-[var(--background)]"
          >
            <div className="px-6 py-4 space-y-1">
              {nav.map((item, i) => {
                const isActive =
                  !item.external && pathname.startsWith(item.href) && item.href !== "/";

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`block text-sm px-3 py-2.5 rounded-lg ${
                        isActive
                          ? "text-[var(--color-ochre)] bg-[var(--color-ochre)]/5"
                          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                      }`}
                    >
                      {item.name}
                      {item.external && <ExternalArrow />}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-3 border-t border-[var(--color-border)] mt-3 flex items-center gap-3">
                <a
                  href="https://auth.lurus.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-sm px-4 py-2.5 rounded-lg bg-gradient-gold text-black font-medium"
                >
                  登录
                </a>
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
