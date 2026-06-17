'use client';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-24">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-brand-400/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <Badge variant="accent" className="mb-6 animate-fade-in">
          Now in Private Beta
        </Badge>

        <h1 className="animate-slide-up text-5xl font-black leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          The OS for the world&apos;s{' '}
          <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
            largest industry
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-slide-up text-lg leading-relaxed text-white/50 md:text-xl" style={{ animationDelay: '0.1s' }}>
          BuildOS brings AI agents and robotics to every construction site.
          Cut costs by <span className="font-semibold text-brand-400">22%</span>.
          Deliver <span className="font-semibold text-brand-400">30% faster</span>.
        </p>

        <div className="mt-10 flex animate-slide-up items-center justify-center gap-4" style={{ animationDelay: '0.2s' }}>
          <Button size="xl">
            Book a Demo <ArrowRight size={20} />
          </Button>
          <Button variant="secondary" size="xl">
            <Play size={20} /> See It in Action
          </Button>
        </div>

        {/* Social proof */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/30">
            Trusted by industry leaders
          </p>
          <div className="flex items-center justify-center gap-10 opacity-40">
            {['VINCI', 'BECHTEL', 'SKANSKA', 'BOUYGUES', 'EIFFAGE'].map((name) => (
              <span key={name} className="text-lg font-bold tracking-tight text-white/60">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
