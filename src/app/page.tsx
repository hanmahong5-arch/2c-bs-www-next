import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { TrustBand } from "@/components/trust-band";
import { Scenarios } from "@/components/scenarios";
import { QuickStart } from "@/components/quickstart";
import { CostCalculator } from "@/components/cost-calculator";
import { CTA } from "@/components/cta";
import { FloatingCTA } from "@/components/floating-cta";

// 折叠线以下的重型 framer-motion/SVG 组件按需分包 — 仍 SSR 出首屏 HTML（利于 SEO/无 JS
// 首绘），但客户端不再把它们和 Hero 一起打进首屏必执行 JS bundle。
const ArchitectureVisual = dynamic(() =>
  import("@/components/architecture-visual").then((m) => m.ArchitectureVisual)
);
const FeaturesShowcase = dynamic(() =>
  import("@/components/features-showcase").then((m) => m.FeaturesShowcase)
);
const Comparison = dynamic(() =>
  import("@/components/comparison").then((m) => m.Comparison)
);
const ProductGrid = dynamic(() =>
  import("@/components/product-grid").then((m) => m.ProductGrid)
);

// Section narrative — attention arc (承诺→证据→认同→上手→对比→算账→原理→深度→生态→转化):
//  1. Hero            — the promise: "一行代码，接入所有 AI" + 单一主 CTA
//  2. TrustBand       — evidence: key numbers (真源口径) + providers, static
//  3. Scenarios       — recognition: 三类客户各自的处境→动作→结果 (场景认同钩子)
//  4. QuickStart      — activation: 3 steps, live diff + first call result
//  5. Comparison      — decision: 趁认同+上手后的意图峰值, 给"机会成本"决策依据
//  6. CostCalculator  — ROI: 紧接对比, 访客用自己的量亲自算账收口
//  7. Architecture    — proof: 45ms request trace + 审计记录 (IT 视角, 深度证明降权后段)
//  8. Features        — depth: Lugo 五项能力系统呈现
//  9. ProductGrid     — ecosystem: catalog + persona filter (默认 saas-dev)
// 10. CTA             — conversion: start tonight, ship tomorrow

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <Scenarios />
      <QuickStart />
      <Comparison />
      <CostCalculator />
      <ArchitectureVisual />
      <FeaturesShowcase />
      <ProductGrid />
      <CTA />
      <FloatingCTA />
    </>
  );
}
