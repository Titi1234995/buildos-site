import { Hero } from '@/components/home/Hero';
import { MetricsBand } from '@/components/home/MetricsBand';
import { ProblemSection } from '@/components/home/ProblemSection';
import { SolutionSection } from '@/components/home/SolutionSection';
import { DemoSection } from '@/components/home/DemoSection';
import { PricingPreview } from '@/components/home/PricingPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsBand />
      <ProblemSection />
      <SolutionSection />
      <DemoSection />
      <PricingPreview />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
