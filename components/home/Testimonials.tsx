'use client';

import { Card } from '@/components/ui/Card';
import { Quote } from 'lucide-react';

const testimonials = [
  { quote: 'BuildOS transformed how we manage our projects. We saw a 28% reduction in delays in the first 3 months.', name: 'Marie Laurent', role: 'VP Operations', company: 'Bouygues Construction' },
  { quote: 'The AI agents caught safety issues we would have missed. It\'s like having 10 extra safety officers on every site.', name: 'James Chen', role: 'Safety Director', company: 'Bechtel' },
  { quote: 'We deployed BuildOS across 5 pilot projects. Every single one came in under budget. That never happens.', name: 'Erik Andersson', role: 'CEO', company: 'Skanska Nordic' },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-center text-4xl font-bold tracking-tight md:text-5xl">
          Trusted by the <span className="text-white/40">best in construction</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="flex flex-col">
              <Quote size={24} className="mb-4 text-brand-400/40" />
              <p className="flex-1 text-sm leading-relaxed text-white/60">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-white/40">{t.role} · {t.company}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
