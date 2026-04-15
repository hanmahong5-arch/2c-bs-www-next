"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CodeBracketIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ComputerDesktopIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

const apps = [
  {
    id: "switch",
    name: "Lurus Switch",
    tagline: "你的 AI 遥控器",
    description:
      "像电视遥控器切换频道一样——一个界面切换 30+ AI 模型。本地加密，离线可用，OIDC 单点登录。",
    features: [
      "OpenAI / Claude / Gemini / DeepSeek 一键切换",
      "本地 AES-256 加密存储，密钥不离开你的电脑",
      "社区 System Prompt 预设库，开箱即用",
      "OIDC 单点登录，团队配置云端同步",
    ],
    tech: "Go + TypeScript (Wails)",
    progress: [
      { label: "核心架构", done: true },
      { label: "模型管理", done: true },
      { label: "加密存储", done: true },
      { label: "预设库", done: false },
      { label: "公开测试", done: false },
    ],
    github: "https://github.com/hanmahong5-arch/2c-gui-switch",
    betaEmail: "beta-switch@lurus.cn",
  },
  {
    id: "creator",
    name: "Lurus Creator",
    tagline: "你的内容流水线",
    description:
      "视频进去，多平台内容出来——像工厂传送带一样高效。下载、转录、改写、发布，一气呵成。",
    features: [
      "yt-dlp 集成：全平台视频下载，支持 1000+ 站点",
      "Whisper 转录：多语言语音转文字，离线可用",
      "AI 改写：一键生成小红书 / 公众号 / Twitter 适配内容",
      "批量队列：拖入文件夹，自动排队处理",
    ],
    tech: "Go + TypeScript (Wails)",
    progress: [
      { label: "视频下载", done: true },
      { label: "AI 转录", done: true },
      { label: "内容改写", done: false },
      { label: "批量处理", done: false },
      { label: "公开测试", done: false },
    ],
    github: "https://github.com/hanmahong5-arch/2c-gui-creator",
    betaEmail: "beta-creator@lurus.cn",
  },
];

function ProgressBar({ progress }: { progress: { label: string; done: boolean }[] }) {
  const doneCount = progress.filter((p) => p.done).length;
  const pct = Math.round((doneCount / progress.length) * 100);

  return (
    <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-medium">
          开发进度
        </span>
        <span className="text-xs font-mono text-[var(--color-ochre)]">{pct}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full bg-gradient-gold"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Milestones */}
      <div className="flex flex-wrap gap-2">
        {progress.map((p) => (
          <span
            key={p.label}
            className={`text-[11px] px-2.5 py-1 rounded-full border ${
              p.done
                ? "border-[var(--color-success)]/20 text-[var(--color-success)] bg-[var(--color-success)]/5"
                : "border-[var(--color-border)] text-[var(--color-text-muted)]"
            }`}
          >
            {p.done && <CheckCircleIcon className="inline w-3 h-3 mr-1 -mt-0.5" />}
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function BetaSignup({ appName, email }: { appName: string; email: string }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/20"
      >
        <CheckCircleIcon className="w-5 h-5 text-[var(--color-success)]" />
        <span className="text-sm text-[var(--color-success)]">已发送申请邮件</span>
      </motion.div>
    );
  }

  return (
    <a
      href={`mailto:${email}?subject=${encodeURIComponent(`${appName} 内测申请`)}&body=${encodeURIComponent(`你好，我想申请 ${appName} 的内测资格。\n\n我的使用场景：\n\n`)}`}
      onClick={() => setTimeout(() => setSubmitted(true), 500)}
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-gold text-black font-medium text-sm hover:shadow-[0_0_30px_rgba(200,162,78,0.3)] transition-all duration-300"
    >
      <EnvelopeIcon className="w-4 h-4" />
      申请内测
    </a>
  );
}

export function DownloadCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-5xl px-6 space-y-8">
        {apps.map((app, i) => (
          <motion.div
            key={app.id}
            id={app.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-8 md:p-10 scroll-mt-20"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {app.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-ochre)]/10 text-[var(--color-ochre)] font-medium">
                    内测中
                  </span>
                </div>
                <p className="text-sm text-[var(--color-ochre)]">
                  {app.tagline}
                </p>
                <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                  {app.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {app.features.map((f) => (
                    <li
                      key={f}
                      className="text-sm text-[var(--color-text-muted)] flex items-start gap-2"
                    >
                      <CheckCircleIcon className="w-4 h-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Tech stack pill */}
                <div className="mt-4 flex items-center gap-2">
                  <CommandLineIcon className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {app.tech}
                  </span>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex flex-col justify-center gap-3 lg:min-w-[220px]">
                {/* Beta signup */}
                <BetaSignup appName={app.name} email={app.betaEmail} />

                {/* GitHub source */}
                <a
                  href={app.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-sm hover:border-[var(--color-ochre)]/50 hover:bg-[var(--color-surface)] transition-all"
                >
                  <CodeBracketIcon className="w-4 h-4" />
                  查看源码
                </a>

                {/* Expand progress */}
                <button
                  onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] text-sm hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all cursor-pointer"
                >
                  <ComputerDesktopIcon className="w-4 h-4" />
                  {expanded === app.id ? "收起进度" : "查看开发进度"}
                </button>
              </div>
            </div>

            {/* Expandable progress section */}
            <AnimatePresence>
              {expanded === app.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ProgressBar progress={app.progress} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-4"
        >
          <p className="text-sm text-[var(--color-text-muted)]">
            所有桌面工具开源开发，代码公开透明。
            <a
              href="https://github.com/hanmahong5-arch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ochre)] hover:underline ml-1"
            >
              访问 GitHub 组织
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
