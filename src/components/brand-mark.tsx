import Image from "next/image";

/**
 * 四枚金属标。字标始终是 LurusTech。
 * 核 = 公司主标 + 环境里；裂 = 执行；金属 Z = 入口与账的展示标；
 * 平面 Z = 自助，也是 ≤32px 的唯一标（页眉、favicon）。
 * 原图是黑金属加金线。垫一块纸，深色模式不反相。
 */
export type BrandLine = "crystal" | "bolt" | "z-metal" | "z-flat";

const MARK_SRC: Record<BrandLine, string> = {
  crystal: "/images/brand/marks/crystal.png",
  bolt: "/images/brand/marks/bolt.png",
  "z-metal": "/images/brand/marks/z-metal.png",
  "z-flat": "/images/brand/marks/z-flat.png",
};

/** 有产品线的路径。方法、下载、博客不在表里。 */
export const MARK_BY_HREF: Record<string, BrandLine> = {
  "/witness": "crystal",
  "/memorus": "crystal",
  "/memorus/benchmarks": "crystal",
  "/kova": "bolt",
  "/forge": "bolt",
  "/hub": "z-metal",
  "/hub/pricing": "z-metal",
  "/lugo": "z-metal",
  "/switch": "z-flat",
  "/lux": "z-flat",
  "/founder": "z-flat",
  "/lucrum": "z-flat",
};

export function BrandMark({
  line,
  className = "h-7 w-7",
  label,
}: {
  line: BrandLine;
  className?: string;
  /** 旁边已有名称时留空。单独出现时写上这枚标叫什么。 */
  label?: string;
}) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center bg-[#F5F2E8] ${className}`}
    >
      <Image
        src={MARK_SRC[line]}
        alt={label ?? ""}
        fill
        sizes="144px"
        className="object-contain p-[7%]"
      />
    </span>
  );
}

export function BrandLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark line="z-flat" className="h-7 w-7" />
      <span className="font-display text-lg font-semibold tracking-[-0.02em] text-[var(--lt-ink)]">
        LurusTech
      </span>
    </span>
  );
}
