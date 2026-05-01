"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { CommandPaletteTrigger } from "./command-palette";

const nav = [
  { name: "Platform", href: "/platform" },
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
                {item.external && <ExternalArrow />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
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
            href="https://api.lurus.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-5 py-2 rounded-lg bg-gradient-gold text-black font-semibold hover:shadow-[0_0_20px_rgba(200,162,78,0.25)] transition-all duration-300"
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
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
