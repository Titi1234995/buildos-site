'use client';

import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const metrics = [
  { value: 12_000_000_000_000, label: 'Total Addressable Market', prefix: '' },
  { value: 22, suffix: '%', label: 'Average Cost Reduction', prefix: '−' },
  { value: 5, label: 'AI Agents', prefix: '' },
  { value: 10_000, label: 'Projects in 5 Years', prefix: '' },
];

export function MetricsBand() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.02] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((m) => (
            <AnimatedCounter key={m.label} to={m.value} suffix={m.suffix} label={m.label} prefix={m.prefix} />
          ))}
        </div>
      </div>
    </section>
  );
}
