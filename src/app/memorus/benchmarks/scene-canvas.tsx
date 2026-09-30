"use client";

// 检索场景的三维增强层。初始渲染只输出 children（二维 SVG 占位），SSR 与首帧一致。
// 进入视口（rootMargin 200px）后才动态加载 three 与 scene-data.json（各自独立的懒加载 chunk，
// 不进页面初始负载）；WebGL 不可用或加载失败一律保持 SVG，不报错。
// 交互：指针拖拽旋转、方向键旋转、「重置视角」按钮；滚轮不缩放（不劫持页面滚动）。
// 按需渲染：只在交互 / 尺寸 / 主题变化时画一帧，不跑常驻循环。
// 减少动态效果：不做惯性与过渡，旋转只随输入即时变化。

import { useEffect, useRef, useState, type ReactNode } from "react";
import type * as THREE from "three";

type ThreeNS = typeof THREE;
type SceneData = typeof import("./scene-data.json");

// 与 scene-projection.tsx 的色板保持一致（此文件不能引它，否则 JSON 会进首屏 chunk）
const PALETTE = [
  "#4E79A7",
  "#59A14F",
  "#B07AA1",
  "#3FA7A0",
  "#8C8C8C",
  "#7A8CD6",
  "#9C755F",
  "#84A03A",
  "#6FA8DC",
  "#A98FC9",
];

const DEFAULT_THETA = 0.5;
const DEFAULT_PHI = 1.3;
const BASE_RADIUS = 3.6;
const FOV = 40;
const PHI_MIN = 0.15;
const PHI_MAX = Math.PI - 0.15;
const KEY_STEP = 0.12;

interface SceneApi {
  reset: () => void;
}

/** 探测 WebGL2（three 新版只支持它）；探测用的上下文立即释放。 */
function hasWebGL2(): boolean {
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** 运行时从 CSS 变量取色，亮暗色由 <html class="dark"> 决定。 */
function readTheme() {
  const cs = getComputedStyle(document.documentElement);
  const pick = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
  return {
    ink: pick("--lt-ink", "#14130F"),
    accent: pick("--lt-accent", "#FF5D1F"),
    rule: pick("--lt-rule", "#D6D2C2"),
    muted: pick("--color-text-muted", "#6B6860"),
    paper: pick("--lt-paper", "#F5F2E8"),
  };
}

const VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uScale;
  uniform float uMinPx;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(aSize * uScale / (-mv.z), uMinPx);
  }
`;

// 颜色以 sRGB 原值直接输出（不走线性转换），与 CSS 里同一色值一致
const FRAG = /* glsl */ `
  uniform float uAlpha;
  uniform float uFill;
  uniform float uRingW;
  uniform vec3 uRing;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float outer = 1.0 - smoothstep(0.45, 0.5, d);
    float ring = uRingW > 0.0 ? smoothstep(0.5 - uRingW - 0.04, 0.5 - uRingW, d) : 0.0;
    float a = outer * uAlpha;
    if (uFill < 0.5) a *= ring;
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(vColor, uRing, ring), a);
  }
`;

/** 释放渲染器并交还 WebGL 上下文（浏览器对同时存在的上下文数有上限）。 */
function releaseRenderer(renderer: THREE.WebGLRenderer) {
  renderer.dispose();
  renderer.forceContextLoss();
  renderer.domElement.remove();
}

/** 建渲染器并接管 host；建场景中途抛错时先释放渲染器再抛出。 */
function mountScene(
  T: ThreeNS,
  data: SceneData,
  host: HTMLElement,
  tip: HTMLElement,
): { api: SceneApi; teardown: () => void } {
  const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%;";
  host.appendChild(renderer.domElement);
  try {
    return buildScene(T, data, host, tip, renderer);
  } catch (e) {
    releaseRenderer(renderer);
    throw e;
  }
}

/**
 * 搭建场景。返回卸载函数与对外接口。
 * 所有 three 对象都在这里创建，卸载时统一 dispose。
 */
function buildScene(
  T: ThreeNS,
  data: SceneData,
  host: HTMLElement,
  tip: HTMLElement,
  renderer: THREE.WebGLRenderer,
): { api: SceneApi; teardown: () => void } {
  const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
  const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(FOV, 1, 0.1, 50);

  // ---- 数据 → 几何 ----
  const points = data.points as number[][];
  const evidenceIdx = new Set<number>();
  data.sessions.forEach((s, i) => {
    if (s.evidence) evidenceIdx.add(i);
  });

  const paletteRgb = PALETTE.map((hex) => {
    const c = new T.Color(hex);
    const out = { r: 0, g: 0, b: 0 };
    c.getRGB(out, T.SRGBColorSpace);
    return out;
  });
  const toRgb = (css: string) => {
    const out = { r: 0, g: 0, b: 0 };
    new T.Color(css).getRGB(out, T.SRGBColorSpace);
    return out;
  };

  const otherPos: number[] = [];
  const otherCol: number[] = [];
  const evPos: number[] = [];
  for (const [x, y, z, si] of points) {
    if (evidenceIdx.has(si)) {
      evPos.push(x, y, z);
    } else {
      otherPos.push(x, y, z);
      const c = paletteRgb[si % PALETTE.length];
      otherCol.push(c.r, c.g, c.b);
    }
  }

  const uniformsBase = () => ({
    uScale: { value: 1 },
    uMinPx: { value: 3 },
  });
  const makeMaterial = (opts: { alpha: number; fill: number; ringW: number; transparent: boolean }) =>
    new T.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: opts.transparent,
      depthWrite: !opts.transparent,
      uniforms: {
        ...uniformsBase(),
        uAlpha: { value: opts.alpha },
        uFill: { value: opts.fill },
        uRingW: { value: opts.ringW },
        uRing: { value: new T.Vector3(0, 0, 0) },
      },
    });

  const makePoints = (pos: number[], col: number[], size: number, mat: THREE.ShaderMaterial) => {
    const g = new T.BufferGeometry();
    g.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
    g.setAttribute("aColor", new T.Float32BufferAttribute(col, 3));
    g.setAttribute("aSize", new T.Float32BufferAttribute(new Array(pos.length / 3).fill(size), 1));
    const p = new T.Points(g, mat);
    p.frustumCulled = false;
    return p;
  };

  const otherMat = makeMaterial({ alpha: 0.6, fill: 1, ringW: 0, transparent: true });
  const evMat = makeMaterial({ alpha: 1, fill: 1, ringW: 0.14, transparent: false });
  const hitMat = makeMaterial({ alpha: 1, fill: 0, ringW: 0.07, transparent: true });
  hitMat.depthTest = false;

  const otherPts = makePoints(otherPos, otherCol, 0.032, otherMat);
  const evCol: number[] = new Array(evPos.length).fill(0);
  const evPts = makePoints(evPos, evCol, 0.072, evMat);
  // 前 10 命中：空心环套在命中点上，非证据命中也能看到
  const hitPos: number[] = [];
  data.hits.forEach((h) => hitPos.push(...points[h.point].slice(0, 3)));
  const hitPts = makePoints(hitPos, new Array(hitPos.length).fill(0), 0.11, hitMat);
  otherPts.renderOrder = 1;
  evPts.renderOrder = 2;
  hitPts.renderOrder = 3;
  scene.add(otherPts, evPts, hitPts);

  // 问题：小八面体 + 边线，位于问题向量的投影位置
  const [qx, qy, qz] = data.query;
  const octaGeo = new T.OctahedronGeometry(0.075);
  const octaMat = new T.MeshBasicMaterial({ color: 0x000000 });
  const octa = new T.Mesh(octaGeo, octaMat);
  octa.position.set(qx, qy, qz);
  const octaEdgeGeo = new T.EdgesGeometry(octaGeo);
  const octaEdgeMat = new T.LineBasicMaterial({ color: 0xffffff });
  const octaEdges = new T.LineSegments(octaEdgeGeo, octaEdgeMat);
  octaEdges.position.copy(octa.position);
  scene.add(octa, octaEdges);

  // 问题 → 前 10 命中：证据命中实线，非证据命中虚线
  const solidPos: number[] = [];
  const dashPos: number[] = [];
  for (const h of data.hits) {
    const target = h.evidence ? solidPos : dashPos;
    target.push(qx, qy, qz, ...points[h.point].slice(0, 3));
  }
  const solidGeo = new T.BufferGeometry();
  solidGeo.setAttribute("position", new T.Float32BufferAttribute(solidPos, 3));
  const solidMat = new T.LineBasicMaterial({ color: 0x000000 });
  const solidLines = new T.LineSegments(solidGeo, solidMat);
  const dashGeo = new T.BufferGeometry();
  dashGeo.setAttribute("position", new T.Float32BufferAttribute(dashPos, 3));
  const dashMat = new T.LineDashedMaterial({ color: 0x000000, dashSize: 0.05, gapSize: 0.04 });
  const dashLines = new T.LineSegments(dashGeo, dashMat);
  dashLines.computeLineDistances();
  scene.add(solidLines, dashLines);

  // 淡包围盒：只示意坐标范围
  const boxGeo = new T.EdgesGeometry(new T.BoxGeometry(2, 2, 2));
  const boxMat = new T.LineBasicMaterial({ color: 0x000000 });
  const box = new T.LineSegments(boxGeo, boxMat);
  scene.add(box);

  // ---- 主题着色（亮暗切换时重跑）----
  const applyTheme = () => {
    const th = readTheme();
    const ink = toRgb(th.ink);
    const accent = toRgb(th.accent);
    (evMat.uniforms.uRing.value as THREE.Vector3).set(ink.r, ink.g, ink.b);
    (hitMat.uniforms.uRing.value as THREE.Vector3).set(ink.r, ink.g, ink.b);
    const col = evPts.geometry.getAttribute("aColor") as THREE.BufferAttribute;
    for (let i = 0; i < col.count; i++) col.setXYZ(i, accent.r, accent.g, accent.b);
    col.needsUpdate = true;
    octaMat.color.set(th.ink);
    octaEdgeMat.color.set(th.paper);
    solidMat.color.set(th.ink);
    dashMat.color.set(th.muted);
    boxMat.color.set(th.rule);
  };
  applyTheme();

  // ---- 相机（球坐标轨道）----
  let theta = DEFAULT_THETA;
  let phi = DEFAULT_PHI;
  let radius = BASE_RADIUS;
  let vTheta = 0;
  let vPhi = 0;
  let width = 1;
  let height = 1;

  const placeCamera = () => {
    camera.position.set(
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.cos(theta),
    );
    camera.lookAt(0, 0, 0);
  };

  let raf = 0;
  const draw = () => {
    raf = 0;
    // 惯性只在松手后、且允许动态效果时存在（速度只在非 reduced-motion 下记录）；每帧衰减，足够小即停
    if (!dragging && (Math.abs(vTheta) > 1e-4 || Math.abs(vPhi) > 1e-4)) {
      theta += vTheta;
      phi = Math.min(PHI_MAX, Math.max(PHI_MIN, phi + vPhi));
      vTheta *= 0.9;
      vPhi *= 0.9;
      schedule();
    }
    placeCamera();
    renderer.render(scene, camera);
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(draw);
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    renderer.setPixelRatio(dpr());
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // 竖向更窄的容器拉远相机，保证整个包围盒可见
    radius = BASE_RADIUS / Math.min(1, camera.aspect);
    camera.updateProjectionMatrix();
    const scale = (height * dpr()) / (2 * Math.tan((FOV * Math.PI) / 360));
    for (const m of [otherMat, evMat, hitMat]) {
      m.uniforms.uScale.value = scale;
      m.uniforms.uMinPx.value = 3 * dpr();
    }
    schedule();
  };

  // ---- 交互 ----
  const rotate = (dTheta: number, dPhi: number) => {
    theta += dTheta;
    phi = Math.min(PHI_MAX, Math.max(PHI_MIN, phi + dPhi));
    schedule();
  };
  const stopInertia = () => {
    vTheta = 0;
    vPhi = 0;
  };

  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let lastMove = 0;
  const RAD_PER_PX = 0.008;

  const hideTip = () => {
    tip.style.display = "none";
  };
  const updateTip = (clientX: number, clientY: number) => {
    const rect = host.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const v = new T.Vector3();
    let best = -1;
    let bestD = 14 * 14;
    data.hits.forEach((h, i) => {
      v.set(points[h.point][0], points[h.point][1], points[h.point][2]).project(camera);
      const sx = ((v.x + 1) / 2) * width;
      const sy = ((1 - v.y) / 2) * height;
      const d2 = (sx - px) ** 2 + (sy - py) ** 2;
      if (d2 < bestD) {
        bestD = d2;
        best = i;
      }
    });
    if (best < 0) return hideTip();
    const h = data.hits[best];
    tip.textContent = `第 ${h.rank} 名 · 分数 ${h.score.toFixed(3)}${h.evidence ? " · 证据会话" : ""}`;
    tip.style.display = "block";
    const tw = tip.offsetWidth;
    const x = Math.min(Math.max(px + 10, 4), Math.max(4, width - tw - 4));
    const y = Math.min(Math.max(py - 30, 4), Math.max(4, height - 28));
    tip.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    lastMove = performance.now();
    stopInertia();
    hideTip();
    host.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) {
      if (e.pointerType === "mouse") updateTip(e.clientX, e.clientY);
      return;
    }
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    lastMove = performance.now();
    // 拖右 → 场景随手向右转，即相机方位角减小
    const dTheta = -dx * RAD_PER_PX;
    const dPhi = -dy * RAD_PER_PX;
    if (!reducedMq.matches) {
      vTheta = dTheta;
      vPhi = dPhi;
    }
    rotate(dTheta, dPhi);
  };
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    // 松手时若停顿过久、或用户要求减少动态效果，则不留惯性
    if (reducedMq.matches || performance.now() - lastMove > 80) stopInertia();
    else schedule();
  };
  const onPointerLeave = () => hideTip();
  const onKeyDown = (e: KeyboardEvent) => {
    let handled = true;
    stopInertia();
    switch (e.key) {
      case "ArrowLeft":
        rotate(-KEY_STEP, 0);
        break;
      case "ArrowRight":
        rotate(KEY_STEP, 0);
        break;
      case "ArrowUp":
        rotate(0, -KEY_STEP);
        break;
      case "ArrowDown":
        rotate(0, KEY_STEP);
        break;
      case "Home":
        reset();
        break;
      default:
        handled = false;
    }
    if (handled) e.preventDefault();
  };

  const reset = () => {
    stopInertia();
    theta = DEFAULT_THETA;
    phi = DEFAULT_PHI;
    schedule();
  };

  host.addEventListener("pointerdown", onPointerDown);
  host.addEventListener("pointermove", onPointerMove);
  host.addEventListener("pointerup", endDrag);
  host.addEventListener("pointercancel", endDrag);
  host.addEventListener("pointerleave", onPointerLeave);
  host.addEventListener("keydown", onKeyDown);

  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const mo = new MutationObserver(() => {
    applyTheme();
    schedule();
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  const onDprChange = () => resize();
  window.addEventListener("resize", onDprChange);

  resize();
  placeCamera();
  renderer.render(scene, camera); // 同步画首帧，调用方随后再隐藏 SVG 占位

  const teardown = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    host.removeEventListener("pointerdown", onPointerDown);
    host.removeEventListener("pointermove", onPointerMove);
    host.removeEventListener("pointerup", endDrag);
    host.removeEventListener("pointercancel", endDrag);
    host.removeEventListener("pointerleave", onPointerLeave);
    host.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("resize", onDprChange);
    ro.disconnect();
    mo.disconnect();
    for (const g of [otherPts.geometry, evPts.geometry, hitPts.geometry, octaGeo, octaEdgeGeo, solidGeo, dashGeo, boxGeo]) {
      g.dispose();
    }
    for (const m of [otherMat, evMat, hitMat, octaMat, octaEdgeMat, solidMat, dashMat, boxMat]) {
      m.dispose();
    }
    releaseRenderer(renderer);
  };

  return { api: { reset }, teardown };
}

export function SceneCanvas({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<SceneApi | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const tip = tipRef.current;
    if (!host || !tip || typeof IntersectionObserver === "undefined") return;

    let disposed = false;
    let teardown: (() => void) | undefined;

    const start = async () => {
      if (!hasWebGL2()) return; // 保持 SVG
      try {
        const [T, mod] = await Promise.all([import("three"), import("./scene-data.json")]);
        if (disposed) return;
        const mounted = mountScene(T, mod.default, host, tip);
        teardown = mounted.teardown;
        apiRef.current = mounted.api;
        setActive(true); // 首帧已画好，再隐藏 SVG 占位
      } catch {
        // 加载或建场景失败：保持 SVG，不报错
        teardown?.();
        teardown = undefined;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void start();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(host);

    return () => {
      disposed = true;
      io.disconnect();
      teardown?.();
      apiRef.current = null;
    };
  }, []);

  return (
    <div className="absolute inset-0">
      {/* SVG 占位：SSR 即在 HTML 里；三维场景就绪后隐藏（canvas 为 aria-hidden，文字等价物在题目卡与命中列表） */}
      <div className={active ? "hidden" : "absolute inset-0"}>{children}</div>

      {/* 画布挂载点：就绪后才可聚焦、才接管指针；竖向滑动与双指缩放仍归页面（pan-y pinch-zoom），横向拖拽旋转 */}
      <div
        ref={hostRef}
        role={active ? "group" : undefined}
        aria-label={active ? "三维检索场景：拖拽或用方向键旋转视角，Home 键重置。文字版见下方命中列表。" : undefined}
        tabIndex={active ? 0 : undefined}
        className={`absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--lt-accent)] ${
          active ? "cursor-grab touch-pan-y touch-pinch-zoom active:cursor-grabbing" : "pointer-events-none"
        }`}
      />

      <div
        ref={tipRef}
        aria-hidden="true"
        style={{ display: "none" }}
        className="pointer-events-none absolute left-0 top-0 whitespace-nowrap border border-[var(--lt-rule)] bg-[var(--lt-paper)] px-2 py-1 font-mono text-[11px] text-[var(--lt-ink)]"
      />

      {active ? (
        <>
          <p className="pointer-events-none absolute bottom-2 left-2 bg-[var(--lt-paper)] px-1.5 py-0.5 font-mono text-[11px] text-[var(--color-text-muted)]">
            拖拽 / 方向键旋转
          </p>
          <button
            type="button"
            onClick={() => apiRef.current?.reset()}
            className="absolute bottom-2 right-2 inline-flex min-h-11 min-w-11 items-center justify-center border border-[var(--lt-rule)] bg-[var(--lt-paper)] px-3 font-mono text-[11px] text-[var(--lt-ink)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--lt-accent)]"
          >
            重置视角
          </button>
        </>
      ) : null}
    </div>
  );
}
