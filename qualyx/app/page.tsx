import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ProblemSection from "@/components/problem-section";
import FeatureSection from "@/components/feature-section";
import PricingSection from "@/components/pricing-section";
import { FinalCta, Footer } from "@/components/final-cta-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e1e6e7] text-[#191919]">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeatureSection />
      <PricingSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
