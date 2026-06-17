'use client';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Observer',
    price: '$500',
    desc: 'Per project / month. Get visibility into your sites.',
    features: ['Real-time site monitoring', 'Basic safety alerts', 'Weekly progress reports', '1 project included'],
  },
  {
    name: 'Optimizer',
    price: '$4,000',
    desc: 'Per project / month. AI-powered optimization.',
    popular: true,
    features: ['Everything in Observer', 'Predictive planning AI', 'Supply chain tracking', 'Document parsing', '5 projects included'],
  },
  {
    name: 'Autonomous',
    price: '$15,000',
    desc: 'Per project / month. Full automation with robots.',
    features: ['Everything in Optimizer', 'Robot orchestration', 'Multi-project portfolio', 'API access', 'Custom integrations', 'Dedicated support'],
  },
];

export function PricingPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <Badge variant="amber" className="mb-4">Pricing</Badge>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Simple, transparent<br />
            <span className="text-white/40">project-based pricing</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col ${tier.popular ? 'border-brand-400/30 bg-brand-400/[0.03]' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-400 px-4 py-1 text-xs font-semibold text-black">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-black">{tier.price}</span>
                  <span className="text-sm text-white/40">/mo</span>
                </div>
                <p className="mt-2 text-sm text-white/40">{tier.desc}</p>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check size={16} className="mt-0.5 text-brand-400" />
                    <span className="text-white/60">{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={tier.popular ? 'primary' : 'secondary'} size="lg" className="w-full">
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-white/40">
            Enterprise plans available for large portfolios.{' '}
            <a href="/contact" className="font-medium text-brand-400 hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
}
