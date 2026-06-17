'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Play } from 'lucide-react';

interface AgentHeroProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
}

export function AgentHero({ title, subtitle, description, icon, color = '#00f0a0' }: AgentHeroProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full blur-[100px]" style={{ background: `${color}15` }} />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Badge variant="accent" className="mb-4">AI Agent</Badge>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
              {title}<br />
              <span className="text-white/40">{subtitle}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/50">{description}</p>
            <div className="mt-8 flex gap-4">
              <Button size="lg">Book a Demo <ArrowRight size={18} /></Button>
              <Button variant="secondary" size="lg"><Play size={18} /> Watch Video</Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8" style={{ boxShadow: `0 0 80px ${color}10` }}>
              <div style={{ color }}>{icon}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
