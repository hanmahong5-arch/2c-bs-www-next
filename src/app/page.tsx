import { Hero } from "@/components/hero";
import { TrustBand } from "@/components/trust-band";
import { QuickStart } from "@/components/quickstart";
import { CostCalculator } from "@/components/cost-calculator";
import { ArchitectureVisual } from "@/components/architecture-visual";
import { FeaturesShowcase } from "@/components/features-showcase";
import { Comparison } from "@/components/comparison";
import { ProductGrid } from "@/components/product-grid";
import { CTA } from "@/components/cta";
import { FloatingCTA } from "@/components/floating-cta";

// Section narrative — one clean arc:
// 1. Hero            — the promise: "一行代码，接入所有 AI" + real code
// 2. TrustBand       — evidence: key numbers + providers, static
// 3. QuickStart      — activation: 3 steps, live diff + first call result
// 4. Architecture    — proof: 45ms request trace shows it actually works
// 5. Features        — depth: 6 core capabilities explained
// 6. CostCalculator  — ROI: visitor enters their volume, math does the talking
// 7. Comparison      — decision: why not build it yourself? (机会成本双拳)
// 8. ProductGrid     — ecosystem: catalog + persona filter (浏览+导航双职能)
// 9. CTA             — conversion: start tonight, ship tomorrow

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <QuickStart />
      <ArchitectureVisual />
      <FeaturesShowcase />
      <CostCalculator />
      <Comparison />
      <ProductGrid />
      <CTA />
      <FloatingCTA />
    </>
  );
}
