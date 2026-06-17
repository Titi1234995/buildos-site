'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
          Ready to transform<br />
          <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
            your next project?
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/40">
          Join the leading contractors who are already using BuildOS to deliver projects on time and under budget.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="xl">
            Book a Demo <ArrowRight size={20} />
          </Button>
          <Button variant="ghost" size="xl">
            Calculate Your ROI →
          </Button>
        </div>
        <p className="mt-4 text-sm text-white/30">No commitment required. Free pilot program available.</p>
      </div>
    </section>
  );
}
