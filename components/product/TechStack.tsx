'use client';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface TechItem {
  name: string;
  category: string;
  description: string;
}

interface TechStackProps {
  items: TechItem[];
}

export function TechStack({ items }: TechStackProps) {
  const grouped = items.reduce<Record<string, TechItem[]>>((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <section className="border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Badge variant="purple" className="mb-4">Technology Stack</Badge>
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Built on <span className="text-white/40">proven AI</span></h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([category, techs]) => (
            <div key={category}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-400">{category}</h3>
              <div className="space-y-3">
                {techs.map((t) => (
                  <Card key={t.name} hover={false}>
                    <div className="font-semibold">{t.name}</div>
                    <div className="mt-1 text-sm text-white/40">{t.description}</div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
