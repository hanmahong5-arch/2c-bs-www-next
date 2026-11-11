"use client";

import { useState } from "react";
import { ASOF_EVENTS, ASOF_VIEWS, type AsOfEvent } from "./product-data";

// 示例时间轴：纯前端、手写数据，不连任何接口。
// 切换一段，标出这一段的说法；更早的划掉，更晚的用次级色。
// 只有颜色过渡，motion-reduce 下关闭；答案区 aria-live 让读屏器读出新答案。

type EventState = "valid" | "superseded" | "future";

const STATE_LABEL: Record<EventState, string> = {
  valid: "标出的这一段",
  superseded: "更早的说法",
  future: "更晚的说法",
};

/** 值的样式：成立=墨色；之后被改=删除线；尚未发生=次级色。不用透明度，保证文字对比度。
 *  成立那一条的顶线、以及原文左侧的线，也用墨色。赭石在纸面上只有 2.74:1。 */
const VALUE_CLASS: Record<EventState, string> = {
  valid: "text-[var(--lt-ink)]",
  superseded: "text-[var(--color-text-secondary)] line-through decoration-[var(--color-text-muted)]",
  future: "text-[var(--color-text-muted)]",
};

function stateOf(index: number, validIndex: number): EventState {
  if (index === validIndex) return "valid";
  return index < validIndex ? "superseded" : "future";
}

export function AsOfDemo() {
  const [viewKey, setViewKey] = useState(ASOF_VIEWS[0].key);
  const view = ASOF_VIEWS.find((v) => v.key === viewKey) ?? ASOF_VIEWS[0];
  const validIndex = ASOF_EVENTS.findIndex((e) => e.key === view.eventKey);
  const valid: AsOfEvent = ASOF_EVENTS[validIndex];

  return (
    <figure className="border-y border-[var(--lt-rule)] py-8">
      {/* 问句 + 时点切换 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-[1.0625rem] text-[var(--lt-ink)]">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">示例</span>
          项目预算先后的说法
        </p>
        <div role="group" aria-label="看时间轴上的哪一段" className="flex flex-wrap gap-2">
          {ASOF_VIEWS.map((v) => {
            const active = v.key === view.key;
            return (
              <button
                key={v.key}
                type="button"
                aria-pressed={active}
                onClick={() => setViewKey(v.key)}
                className={`inline-flex min-h-11 items-center border px-4 font-mono text-[13px] transition-colors duration-200 motion-reduce:transition-none focus-ink ${
                  active
                    ? "border-[var(--lt-ink)] bg-[var(--lt-ink)] text-[var(--lt-paper)]"
                    : "border-[var(--color-text-muted)] text-[var(--lt-ink)] hover:border-[var(--lt-ink)]"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 时间轴 */}
      <ol aria-label="示例时间轴" className="mt-8 grid gap-3 sm:grid-cols-3">
        {ASOF_EVENTS.map((e, i) => {
          const state = stateOf(i, validIndex);
          return (
            <li
              key={e.key}
              className={`border-t-2 pt-3 transition-colors duration-200 motion-reduce:transition-none ${
                state === "valid" ? "border-[var(--lt-ink)]" : "border-[var(--lt-rule)]"
              }`}
            >
              <p className="font-mono text-[11px] text-[var(--color-text-muted)]">
                {e.month} · {e.date}
              </p>
              <p className={`mt-1 font-display text-lg font-semibold ${VALUE_CLASS[state]}`}>预算 {e.value}</p>
              <p className="mt-1 font-mono text-[11px] text-[var(--color-text-secondary)]">{STATE_LABEL[state]}</p>
            </li>
          );
        })}
      </ol>

      {/* 答案 + 当时成立的原文 */}
      <div aria-live="polite" className="mt-8 grid gap-6 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">标出的这一段</p>
          <p className="mt-2 font-display text-[2.25rem] font-semibold leading-none tracking-[-0.02em] tabular-nums text-[var(--lt-ink)]">
            {valid.value}
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">这一段的原话</p>
          <blockquote className="mt-2 border-l-2 border-[var(--lt-ink)] pl-4 text-[1.0625rem] leading-[1.7] text-[var(--lt-ink)]">
            「{valid.quote}」
          </blockquote>
          <p className="mt-2 font-mono text-[11px] text-[var(--color-text-secondary)]">
            {valid.date} · {valid.source}
          </p>
        </div>
      </div>

      <figcaption className="mt-6 font-mono text-[11px] text-[var(--color-text-muted)]">
        示例时间轴，不连接任何接口。旧记忆标成已被取代，检索时排在后面。
      </figcaption>
    </figure>
  );
}
