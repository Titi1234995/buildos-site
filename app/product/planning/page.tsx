import { AgentHero } from '@/components/product/AgentHero';
import { FeatureGrid } from '@/components/product/FeatureGrid';
import { TechStack } from '@/components/product/TechStack';
import { CTAProduct } from '@/components/product/CTAProduct';
import { Calendar, GitBranch, TrendingDown, Clock, BarChart, Route } from 'lucide-react';

const hero = {
  title: 'Planning Agent',
  subtitle: 'Never miss a deadline again',
  description: 'AI-powered scheduling that predicts delays with 95% accuracy, optimizes resource allocation, and automatically adjusts plans when reality diverges from the schedule.',
  icon: <Calendar size={96} strokeWidth={1.5} />,
};

const features = [
  { title: 'Predictive Scheduling', description: 'GNN-based dependency modeling. Monte Carlo simulations for realistic timelines. Confidence intervals for every milestone.', metric: '95%', metricLabel: 'Delay Prediction Accuracy' },
  { title: 'Critical Path Analysis', description: 'Real-time identification of critical path. Automatic flagging of tasks at risk. What-if scenario simulation.', metric: '4.4x', metricLabel: 'Better than Human Planners' },
  { title: 'Resource Optimization', description: 'Optimal allocation of workers, equipment, and materials across tasks. Conflict detection for shared resources.' },
  { title: 'Weather Integration', description: '14-day weather forecast integrated into scheduling. Automatic re-planning for weather-impacted tasks.' },
  { title: 'Reactive Re-Planning', description: 'When delays occur, automatically generates 3 recovery scenarios with cost/benefit analysis.', metric: '720x', metricLabel: 'Faster than Manual Re-Planning' },
  { title: 'Progress Analytics', description: 'Compare planned vs actual for every work package. Earned Value Management (EVM) metrics. Trend analysis.' },
];

const techStack = [
  { name: 'Graph Neural Network', category: 'Dependency Modeling', description: 'PyTorch Geometric. Models task dependencies as learnable graphs.' },
  { name: 'PPO (RL)', category: 'Optimization', description: 'Reinforcement learning for optimal resource allocation decisions.' },
  { name: 'Claude Opus 4', category: 'Reasoning', description: 'Deep reasoning for scenario analysis and recovery planning.' },
  { name: 'GPT-5', category: 'Optimization', description: 'Multi-constraint optimization solver for schedule compression.' },
  { name: 'LangGraph', category: 'Orchestration', description: 'Manages planning workflow: data → prediction → optimization → recommendation.' },
  { name: 'TimescaleDB', category: 'Storage', description: 'Time-series database for schedule history and trend analysis.' },
];

export default function PlanningPage() {
  return (
    <>
      <AgentHero {...hero} />
      <FeatureGrid title="Plan with confidence" subtitle="From predictive scheduling to automated recovery." features={features} columns={3} />
      <TechStack items={techStack} />
      <CTAProduct agentName="Planning Agent" />
    </>
  );
}
