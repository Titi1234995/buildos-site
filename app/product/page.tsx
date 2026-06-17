import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Camera, Calendar, Truck, FileText, Bot, ArrowRight } from 'lucide-react';

const agents = [
  { name: 'Vision Agent', desc: 'AI computer vision for real-time site monitoring, safety detection, and progress tracking.', icon: Camera, href: '/product/vision', color: '#00f0a0' },
  { name: 'Planning Agent', desc: 'Predictive scheduling with 95% delay accuracy and automated re-planning.', icon: Calendar, href: '/product/planning', color: '#7c5cfc' },
  { name: 'Supply Chain Agent', desc: 'End-to-end supply chain visibility with delay prediction and automated ordering.', icon: Truck, href: '/product/supply-chain', color: '#f04c4c' },
  { name: 'Document Agent', desc: 'AI that reads, extracts, and verifies every contract, permit, and standard.', icon: FileText, href: '/product/documents', color: '#ff9f1c' },
  { name: 'Robot Orchestrator', desc: 'Centralized control of every construction robot — any brand, any task.', icon: Bot, href: '/product/robots', color: '#06d6a0' },
];

export default function ProductPage() {
  return (
    <div className="pt-24">
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Badge variant="accent" className="mb-4">Platform</Badge>
          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            Five AI agents.<br />
            <span className="text-white/40">One platform.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Every agent is built to work independently or together, sharing data and insights to give you complete visibility and control over every project.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <a key={agent.name} href={agent.href} className="group">
                <Card className="flex h-full flex-col transition-all duration-300 group-hover:border-brand-400/30">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.04]" style={{ color: agent.color }}>
                    <agent.icon size={28} />
                  </div>
                  <h2 className="text-xl font-bold">{agent.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/40">{agent.desc}</p>
                  <div className="mt-6 flex items-center gap-1 text-sm font-medium text-brand-400">
                    Learn more <ArrowRight size={14} />
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
