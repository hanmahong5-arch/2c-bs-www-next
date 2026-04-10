"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const nav = [
  { name: "Platform", href: "/platform" },
  { name: "Lucrum", href: "/lucrum" },
  { name: "Kova", href: "/kova" },
  { name: "定价", href: "/pricing" },
  { name: "下载", href: "/download" },
  { name: "文档", href: "https://docs.lurus.cn", external: true },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--background)]/85 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gradient-gold tracking-tight">
            Lurus
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
                {item.external && (
                  <span className="inline-block ml-1 opacity-40 text-[10px]">
                    ↗
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://api.lurus.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors px-3 py-2"
          >
            控制台
            <span className="inline-block ml-1 opacity-40 text-[10px]">↗</span>
          </a>
          <a
            href="https://auth.lurus.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-5 py-2 rounded-lg bg-gradient-gold text-black font-medium hover:opacity-90 transition-opacity"
          >
            登录
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

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-[var(--color-border)] bg-[var(--background)] px-6 py-4 space-y-1">
          {nav.map((item) => {
            const isActive =
              !item.external && pathname.startsWith(item.href) && item.href !== "/";

            return (
              <Link
                key={item.name}
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
                {item.external && (
                  <span className="inline-block ml-1 opacity-40 text-[10px]">
                    ↗
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[var(--color-border)] mt-3 flex gap-3">
            <a
              href="https://auth.lurus.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm px-4 py-2.5 rounded-lg bg-gradient-gold text-black font-medium"
            >
              登录
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
