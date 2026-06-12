import { Hero } from "@/components/hero";
import { TrustBand } from "@/components/trust-band";
import { Scenarios } from "@/components/scenarios";
import { QuickStart } from "@/components/quickstart";
import { CostCalculator } from "@/components/cost-calculator";
import { ArchitectureVisual } from "@/components/architecture-visual";
import { FeaturesShowcase } from "@/components/features-showcase";
import { Comparison } from "@/components/comparison";
import { ProductGrid } from "@/components/product-grid";
import { CTA } from "@/components/cta";
import { FloatingCTA } from "@/components/floating-cta";

// Section narrative — attention arc (承诺→证据→认同→上手→原理→深度→对比→算账→生态→转化):
//  1. Hero            — the promise: "一行代码，接入所有 AI" + dev/IT 双钩子 + Agent tertiary
//  2. TrustBand       — evidence: key numbers (真源口径) + providers, static
//  3. Scenarios       — recognition: 三类客户各自的处境→动作→结果 (场景认同钩子)
//  4. QuickStart      — activation: 3 steps, live diff + first call result
//  5. Architecture    — proof: 45ms request trace + 审计记录 (IT 视角)
//  6. Features        — depth: 6 core capabilities explained
//  7. Comparison      — decision: 自建人月清单 vs 一次接入 (机会成本立认知)
//  8. CostCalculator  — ROI: 紧接对比, 访客用自己的量亲自算账收口
//  9. ProductGrid     — ecosystem: catalog + persona filter (默认 saas-dev)
// 10. CTA             — conversion: start tonight, ship tomorrow

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <Scenarios />
      <QuickStart />
      <ArchitectureVisual />
      <FeaturesShowcase />
      <Comparison />
      <CostCalculator />
      <ProductGrid />
      <CTA />
      <FloatingCTA />
    </>
  );
}
