'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Play } from 'lucide-react';

export function DemoSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <Badge variant="purple" className="mb-4">See It in Action</Badge>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            See what BuildOS<br />
            <span className="text-white/40">can do for your projects</span>
          </h2>
        </div>

        <div className="group relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-800">
          {/* Dashboard mockup */}
          <div className="aspect-video bg-gradient-to-br from-surface-700 via-surface-800 to-surface-900 p-6">
            {/* Simulated dashboard UI */}
            <div className="flex gap-4">
              <div className="flex-1 space-y-3">
                <div className="h-4 w-32 rounded-full bg-white/5" />
                <div className="h-32 rounded-xl bg-brand-400/5 border border-brand-400/10" />
                <div className="flex gap-3">
                  <div className="h-20 flex-1 rounded-lg bg-white/[0.03]" />
                  <div className="h-20 flex-1 rounded-lg bg-white/[0.03]" />
                  <div className="h-20 flex-1 rounded-lg bg-white/[0.03]" />
                </div>
              </div>
              <div className="w-64 space-y-3">
                <div className="h-4 w-24 rounded-full bg-white/5" />
                <div className="space-y-2">
                  <div className="h-10 rounded-lg bg-red-500/5 border border-red-500/10" />
                  <div className="h-10 rounded-lg bg-amber-500/5 border border-amber-500/10" />
                  <div className="h-10 rounded-lg bg-emerald-500/5 border border-emerald-500/10" />
                </div>
              </div>
            </div>
          </div>

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Play size={32} className="ml-1 text-white" />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="secondary" size="lg">
            <Play size={18} /> Watch Full Demo (3 min)
          </Button>
        </div>
      </div>
    </section>
  );
}
