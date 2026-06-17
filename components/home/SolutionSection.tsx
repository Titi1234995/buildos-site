'use client';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Camera, Calendar, Truck, FileText, Bot, LayoutDashboard } from 'lucide-react';

const agents = [
  { icon: Camera, name: 'Vision Agent', desc: 'Cameras + drones analyze the site in real time. Error detection, progress tracking, automated safety.', color: '#00f0a0' },
  { icon: Calendar, name: 'Planning Agent', desc: 'AI-powered scheduling with 95% delay prediction accuracy.', color: '#7c5cfc' },
  { icon: Truck, name: 'Supply Agent', desc: 'Real-time supplier tracking, logistics optimization, automated ordering.', color: '#f04c4c' },
  { icon: FileText, name: 'Document Agent', desc: 'Contracts, permits, standards parsed, summarized, and verified by AI.', color: '#ff9f1c' },
  { icon: Bot, name: 'Robot Orchestrator', desc: 'Centralized control of all construction robots — any brand, any task.', color: '#06d6a0' },
  { icon: LayoutDashboard, name: 'Unified Dashboard', desc: 'Every metric, every project, one screen. Real-time visibility.', color: '#00f0a0' },
];

export function SolutionSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <Badge className="mb-4">The Solution</Badge>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Five AI agents,<br />
            <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
              one unified platform
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.name} className="group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]" style={{ color: agent.color }}>
                <agent.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold">{agent.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/40">{agent.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
