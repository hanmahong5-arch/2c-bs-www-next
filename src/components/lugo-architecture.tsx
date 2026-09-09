// Lugo 平台架构图 —— 由 diagram-design skill 生成，颜色与字体已接线到站点 CSS 变量，
// 因此**一张图自动跟随明暗主题**，不需要维护 light/dark 两份。
// 图内每个节点都有事实出处（lurus.yaml 的 capabilities/product_groups 段与 2l-svc-platform/README.md）；
// 供应商层刻意用能力档位而非厂商商品名表述，与首页 architecture-visual 口径一致。
// 要改图请回到 skill 重新生成再跑一遍本转换，不要手改下面这段 SVG。

const LUGO_ARCH_SVG = `<svg viewBox="0 0 1020 720" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lugo-arch-title lugo-arch-desc">
  <title id="lugo-arch-title">Lugo 平台架构</title>
  <desc id="lugo-arch-desc">架构图展示下游产品经 Lugo Platform Core 完成身份与计费,经 LLM 网关直连模型供应商;Platform Core 同时联动 AI 记忆引擎、多通道通知与智能进销存三项内部能力。</desc>
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="var(--color-text-secondary)"/></marker>
    <marker id="arrow-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="var(--color-accent)"/></marker>
    <marker id="arrow-link" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="var(--lt-accent-2)"/></marker>
  </defs>

  <rect width="100%" height="100%" fill="var(--background)"/>

  <!-- Zone: Lugo platform services (bg -> zone -> arrows -> nodes) -->
  <rect x="40" y="144" width="940" height="328" rx="8"
        fill="color-mix(in srgb, var(--color-text-primary) 2.0%, transparent)" stroke="color-mix(in srgb, var(--color-text-primary) 10.0%, transparent)" stroke-width="0.8"/>
  <rect x="64" y="148" width="88" height="16" rx="2" fill="var(--background)"/>
  <text x="108" y="160" fill="color-mix(in srgb, var(--color-text-primary) 40.0%, transparent)" font-size="12" font-weight="500"
        font-family="var(--font-sans)" text-anchor="middle">Lugo 平台服务</text>

  <!-- Arrows (drawn before nodes) -->
  <path d="M 470,104 H 188 Q 180,104 180,112 V 176" fill="none" stroke="var(--color-text-secondary)" stroke-width="1.2" marker-end="url(#arrow)"/>
  <path d="M 550,104 H 832 Q 840,104 840,112 V 176" fill="none" stroke="var(--lt-accent-2)" stroke-width="1.2" marker-end="url(#arrow-link)"/>
  <path d="M 280,208 H 740" fill="none" stroke="var(--color-text-secondary)" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
  <path d="M 840,240 V 528" fill="none" stroke="var(--lt-accent-2)" stroke-width="1.2" marker-end="url(#arrow-link)"/>
  <path d="M 110,240 V 332 Q 110,340 118,340 H 172 Q 180,340 180,348 V 384" fill="none" stroke="var(--color-text-secondary)" stroke-width="1.2" marker-end="url(#arrow)"/>
  <path d="M 160,240 V 292 Q 160,300 168,300 H 396 Q 404,300 404,308 V 384" fill="none" stroke="var(--color-text-secondary)" stroke-width="1.2" marker-end="url(#arrow)"/>
  <path d="M 250,240 V 252 Q 250,260 258,260 H 620 Q 628,260 628,268 V 384" fill="none" stroke="var(--color-text-secondary)" stroke-width="1.2" marker-end="url(#arrow)"/>

  <!-- Arrow labels -->
  <rect x="302" y="80" width="56" height="16" rx="2" fill="var(--background)"/>
  <text x="330" y="92" fill="var(--color-text-secondary)" font-size="12" font-weight="500" font-family="var(--font-sans)" text-anchor="middle">身份·计费</text>

  <rect x="663" y="80" width="56" height="16" rx="2" fill="var(--background)"/>
  <text x="691" y="92" fill="var(--lt-accent-2)" font-size="12" font-weight="500" font-family="var(--font-sans)" text-anchor="middle">直连调用</text>

  <rect x="482" y="184" width="56" height="16" rx="2" fill="var(--background)"/>
  <text x="510" y="196" fill="var(--color-text-secondary)" font-size="12" font-weight="500" font-family="var(--font-sans)" text-anchor="middle">签发令牌</text>

  <rect x="850" y="376" width="56" height="16" rx="2" fill="var(--background)"/>
  <text x="878" y="388" fill="var(--lt-accent-2)" font-size="12" font-weight="500" font-family="var(--font-sans)" text-anchor="middle">路由分发</text>

  <!-- Node: 下游产品 (input) -->
  <rect x="410" y="40" width="200" height="64" rx="6" fill="var(--background)"/>
  <rect x="410" y="40" width="200" height="64" rx="6" fill="color-mix(in srgb, var(--color-text-secondary) 10.0%, transparent)" stroke="var(--color-text-muted)" stroke-width="1"/>
  <rect x="418" y="46" width="32" height="12" rx="2" fill="transparent" stroke="color-mix(in srgb, var(--color-text-muted) 40.0%, transparent)" stroke-width="0.8"/>
  <text x="434" y="55" fill="var(--color-text-muted)" font-size="7" font-family="var(--font-mono)" text-anchor="middle" letter-spacing="0.08em">APP</text>
  <text x="510" y="78" fill="var(--color-text-primary)" font-size="12" font-weight="600" font-family="var(--font-sans)" text-anchor="middle">下游产品接入</text>
  <text x="510" y="94" fill="var(--color-text-muted)" font-size="9" font-family="var(--font-mono)" text-anchor="middle">lucrum · switch · +3</text>

  <!-- Node: Lugo Platform Core (FOCAL) -->
  <rect x="80" y="176" width="200" height="64" rx="6" fill="var(--background)"/>
  <rect x="80" y="176" width="200" height="64" rx="6" fill="color-mix(in srgb, var(--color-accent) 8.0%, transparent)" stroke="var(--color-accent)" stroke-width="1"/>
  <rect x="88" y="182" width="32" height="12" rx="2" fill="transparent" stroke="color-mix(in srgb, var(--color-accent) 40.0%, transparent)" stroke-width="0.8"/>
  <text x="104" y="191" fill="var(--color-accent)" font-size="7" font-family="var(--font-mono)" text-anchor="middle" letter-spacing="0.08em">COR</text>
  <text x="180" y="214" fill="var(--color-text-primary)" font-size="12" font-weight="600" font-family="var(--font-sans)" text-anchor="middle">Lugo Platform Core</text>
  <text x="180" y="230" fill="var(--color-text-muted)" font-size="9" font-family="var(--font-mono)" text-anchor="middle">identity.lurus.cn</text>

  <!-- Node: LLM 网关 (FOCAL) -->
  <rect x="740" y="176" width="200" height="64" rx="6" fill="var(--background)"/>
  <rect x="740" y="176" width="200" height="64" rx="6" fill="color-mix(in srgb, var(--color-accent) 8.0%, transparent)" stroke="var(--color-accent)" stroke-width="1"/>
  <rect x="748" y="182" width="32" height="12" rx="2" fill="transparent" stroke="color-mix(in srgb, var(--color-accent) 40.0%, transparent)" stroke-width="0.8"/>
  <text x="764" y="191" fill="var(--color-accent)" font-size="7" font-family="var(--font-mono)" text-anchor="middle" letter-spacing="0.08em">API</text>
  <text x="840" y="214" fill="var(--color-text-primary)" font-size="12" font-weight="600" font-family="var(--font-sans)" text-anchor="middle">LLM 网关 (newapi)</text>
  <text x="840" y="230" fill="var(--color-text-muted)" font-size="9" font-family="var(--font-mono)" text-anchor="middle">newapi.lurus.cn</text>

  <!-- Node: AI 记忆引擎 (store) -->
  <rect x="80" y="384" width="200" height="64" rx="6" fill="var(--background)"/>
  <rect x="80" y="384" width="200" height="64" rx="6" fill="color-mix(in srgb, var(--color-text-primary) 5.0%, transparent)" stroke="var(--color-text-secondary)" stroke-width="1"/>
  <rect x="88" y="390" width="32" height="12" rx="2" fill="transparent" stroke="color-mix(in srgb, var(--color-text-secondary) 40.0%, transparent)" stroke-width="0.8"/>
  <text x="104" y="399" fill="var(--color-text-secondary)" font-size="7" font-family="var(--font-mono)" text-anchor="middle" letter-spacing="0.08em">MEM</text>
  <text x="180" y="422" fill="var(--color-text-primary)" font-size="12" font-weight="600" font-family="var(--font-sans)" text-anchor="middle">AI 记忆引擎</text>
  <text x="180" y="438" fill="var(--color-text-muted)" font-size="9" font-family="var(--font-mono)" text-anchor="middle">memorus · :8880</text>

  <!-- Node: 多通道通知 (store) -->
  <rect x="304" y="384" width="200" height="64" rx="6" fill="var(--background)"/>
  <rect x="304" y="384" width="200" height="64" rx="6" fill="color-mix(in srgb, var(--color-text-primary) 5.0%, transparent)" stroke="var(--color-text-secondary)" stroke-width="1"/>
  <rect x="312" y="390" width="32" height="12" rx="2" fill="transparent" stroke="color-mix(in srgb, var(--color-text-secondary) 40.0%, transparent)" stroke-width="0.8"/>
  <text x="328" y="399" fill="var(--color-text-secondary)" font-size="7" font-family="var(--font-mono)" text-anchor="middle" letter-spacing="0.08em">NTF</text>
  <text x="404" y="422" fill="var(--color-text-primary)" font-size="12" font-weight="600" font-family="var(--font-sans)" text-anchor="middle">多通道通知</text>
  <text x="404" y="438" fill="var(--color-text-muted)" font-size="9" font-family="var(--font-mono)" text-anchor="middle">WS · Email · FCM</text>

  <!-- Node: 智能进销存 (store) -->
  <rect x="528" y="384" width="200" height="64" rx="6" fill="var(--background)"/>
  <rect x="528" y="384" width="200" height="64" rx="6" fill="color-mix(in srgb, var(--color-text-primary) 5.0%, transparent)" stroke="var(--color-text-secondary)" stroke-width="1"/>
  <rect x="536" y="390" width="32" height="12" rx="2" fill="transparent" stroke="color-mix(in srgb, var(--color-text-secondary) 40.0%, transparent)" stroke-width="0.8"/>
  <text x="552" y="399" fill="var(--color-text-secondary)" font-size="7" font-family="var(--font-mono)" text-anchor="middle" letter-spacing="0.08em">PSI</text>
  <text x="628" y="422" fill="var(--color-text-primary)" font-size="12" font-weight="600" font-family="var(--font-sans)" text-anchor="middle">智能进销存</text>
  <text x="628" y="438" fill="var(--color-text-muted)" font-size="9" font-family="var(--font-mono)" text-anchor="middle">tally.lurus.cn</text>

  <!-- Node: 模型供应商 (external) -->
  <rect x="720" y="528" width="240" height="64" rx="6" fill="var(--background)"/>
  <rect x="720" y="528" width="240" height="64" rx="6" fill="color-mix(in srgb, var(--color-text-primary) 3.0%, transparent)" stroke="color-mix(in srgb, var(--color-text-primary) 30.0%, transparent)" stroke-width="1"/>
  <rect x="728" y="534" width="32" height="12" rx="2" fill="transparent" stroke="color-mix(in srgb, var(--color-text-primary) 30.0%, transparent)" stroke-width="0.8"/>
  <text x="744" y="543" fill="color-mix(in srgb, var(--color-text-primary) 55.0%, transparent)" font-size="7" font-family="var(--font-mono)" text-anchor="middle" letter-spacing="0.08em">EXT</text>
  <text x="840" y="566" fill="var(--color-text-primary)" font-size="12" font-weight="600" font-family="var(--font-sans)" text-anchor="middle">模型供应商</text>
  <text x="840" y="582" fill="var(--color-text-muted)" font-size="9" font-family="var(--font-mono)" text-anchor="middle">旗舰/推理/性价比/轻量 · 30+</text>

  <!-- Legend strip -->
  <line x1="40" y1="616" x2="980" y2="616" stroke="color-mix(in srgb, var(--color-text-primary) 12.0%, transparent)" stroke-width="0.8"/>
  <text x="40" y="634" fill="var(--color-text-secondary)" font-size="8" font-family="var(--font-mono)" letter-spacing="0.18em">LEGEND</text>

  <rect x="40" y="650" width="14" height="10" rx="2" fill="color-mix(in srgb, var(--color-accent) 8.0%, transparent)" stroke="var(--color-accent)" stroke-width="1"/>
  <text x="60" y="659" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">核心枢纽</text>

  <rect x="180" y="650" width="14" height="10" rx="2" fill="color-mix(in srgb, var(--color-text-primary) 5.0%, transparent)" stroke="var(--color-text-secondary)" stroke-width="1"/>
  <text x="200" y="659" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">平台内部服务</text>

  <rect x="340" y="650" width="14" height="10" rx="2" fill="color-mix(in srgb, var(--color-text-secondary) 10.0%, transparent)" stroke="var(--color-text-muted)" stroke-width="1"/>
  <text x="360" y="659" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">下游产品</text>

  <rect x="480" y="650" width="14" height="10" rx="2" fill="color-mix(in srgb, var(--color-text-primary) 3.0%, transparent)" stroke="color-mix(in srgb, var(--color-text-primary) 30.0%, transparent)" stroke-width="1"/>
  <text x="500" y="659" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">外部供应商</text>

  <line x1="640" y1="655" x2="668" y2="655" stroke="var(--color-text-secondary)" stroke-width="1.2" marker-end="url(#arrow)"/>
  <text x="676" y="659" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">内部调用</text>

  <line x1="800" y1="655" x2="828" y2="655" stroke="var(--lt-accent-2)" stroke-width="1.2" marker-end="url(#arrow-link)"/>
  <text x="836" y="659" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">直连 API</text>

  <line x1="40" y1="678" x2="68" y2="678" stroke="var(--color-text-secondary)" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
  <text x="76" y="682" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">凭据签发</text>
</svg>`;

export function LugoArchitecture() {
  return (
    <div
      className="w-full [&>svg]:w-full [&>svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: LUGO_ARCH_SVG }}
    />
  );
}
