'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

interface CTAProductProps {
  agentName: string;
}

export function CTAProduct({ agentName }: CTAProductProps) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/5 blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Ready to deploy <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">{agentName}</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/40">
          See how {agentName} can transform your construction projects.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="xl">Book a Demo <ArrowRight size={20} /></Button>
          <Button variant="ghost" size="xl">Calculate Your ROI →</Button>
        </div>
      </div>
    </section>
  );
}
