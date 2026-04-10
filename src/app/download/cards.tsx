"use client";

import { motion } from "framer-motion";

const apps = [
  {
    id: "switch",
    name: "Lurus Switch",
    tagline: "桌面 AI 网关",
    description:
      "一键切换 30+ AI 模型，本地加密存储密钥，OIDC 单点登录。你的 AI 模型管理中心。",
    features: [
      "OpenAI / Claude / Gemini 一键切换",
      "本地加密存储，离线可用",
      "社区 System Prompt 预设库",
      "OIDC 单点登录，团队共享配置",
    ],
    platforms: [
      { name: "Windows", href: "#", disabled: true },
      { name: "macOS", href: "#", disabled: true },
    ],
  },
  {
    id: "creator",
    name: "Lurus Creator",
    tagline: "AI 内容工厂",
    description:
      "视频下载 → AI 转录 → 内容改写 → 多平台发布。单 exe，零外部依赖。",
    features: [
      "yt-dlp 集成：全平台视频下载",
      "Whisper 转录：多语言语音转文字",
      "AI 改写：一键生成多平台适配内容",
      "批量处理：队列化任务管理",
    ],
    platforms: [
      { name: "Windows", href: "#", disabled: true },
      { name: "macOS", href: "#", disabled: true },
    ],
  },
];

export function DownloadCards() {
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
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {app.name}
                </h3>
                <p className="text-sm text-[var(--color-ochre)] mt-1">
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
                      <span className="text-[var(--color-ochre)] mt-0.5 shrink-0">
                        ›
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center gap-3 md:min-w-[200px]">
                {app.platforms.map((p) => (
                  <button
                    key={p.name}
                    disabled={p.disabled}
                    className="px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--color-ochre)]/50 transition-colors"
                  >
                    {p.disabled ? `${p.name} (即将发布)` : `下载 ${p.name} 版`}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
