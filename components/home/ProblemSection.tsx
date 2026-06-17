'use client';

import { Badge } from '@/components/ui/Badge';
import { Card, CardNumber } from '@/components/ui/Card';

const problems = [
  { number: '80%', label: 'of projects exceed budget', desc: 'Average overrun: 28% of initial budget. $1.6 trillion wasted every year.' },
  { number: '2.5M', label: 'unfilled jobs globally', desc: 'Skilled labor crisis across the G20. No replacement for retiring workers.' },
  { number: '40%', label: 'of time spent on admin', desc: 'Excel, PDFs, email. Field teams lose 2 days per week on paperwork.' },
  { number: '1/5', label: 'companies use AI', desc: 'The least digitized industry. Under 5% of IT budget goes to innovation.' },
];

export function ProblemSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <Badge variant="red" className="mb-4">The Problem</Badge>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Construction is the only<br />
            <span className="text-white/40">industry going backwards</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            Productivity has fallen 15% over 50 years. Every other sector has doubled or tripled.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <Card key={p.label} className="text-center">
              <CardNumber>{p.number}</CardNumber>
              <h3 className="mt-3 text-lg font-semibold">{p.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/40">{p.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
