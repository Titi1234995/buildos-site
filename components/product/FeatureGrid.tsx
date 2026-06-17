'use client';

import { Card } from '@/components/ui/Card';

interface Feature {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

interface FeatureGridProps {
  title: string;
  subtitle: string;
  features: Feature[];
  columns?: 2 | 3;
}

export function FeatureGrid({ title, subtitle, features, columns = 3 }: FeatureGridProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-white/40">{subtitle}</p>
        </div>
        <div className={`grid gap-6 md:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}>
          {features.map((f) => (
            <Card key={f.title}>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/40">{f.description}</p>
              {f.metric && (
                <div className="mt-4 border-t border-white/[0.06] pt-4">
                  <div className="text-2xl font-bold text-brand-400">{f.metric}</div>
                  <div className="text-xs text-white/40">{f.metricLabel}</div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
