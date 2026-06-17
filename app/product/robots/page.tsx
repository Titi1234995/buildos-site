import { AgentHero } from '@/components/product/AgentHero';
import { FeatureGrid } from '@/components/product/FeatureGrid';
import { TechStack } from '@/components/product/TechStack';
import { CTAProduct } from '@/components/product/CTAProduct';
import { Bot, Cpu, Radio, ShieldCheck, Cog, Network } from 'lucide-react';

const hero = {
  title: 'Robot Orchestrator',
  subtitle: 'One interface to control every robot',
  description: 'Centralized control of all construction robots — regardless of manufacturer. Coordinate fleets, monitor safety, and optimize productivity from a single dashboard.',
  icon: <Bot size={96} strokeWidth={1.5} />,
};

const features = [
  { title: 'Multi-Brand Control', description: 'Unified API for Boston Dynamics Spot, DJI drones, Dusty Robotics, Built Robotics, and more. Add any robot in minutes.', metric: '10+', metricLabel: 'Robot Brands Supported' },
  { title: 'Fleet Coordination', description: 'Intelligent task allocation across robot teams. Conflict-free zone management. Battery-aware scheduling.', metric: '35%', metricLabel: 'Higher Fleet Productivity' },
  { title: 'Safety-First Design', description: '5-layer safety stack: hardware e-stop → safety PLC → ROS2 → AI monitor → human supervisor. No single point of failure.' },
  { title: 'Digital Twin', description: 'Simulate robot operations before deployment. NVIDIA Isaac-powered digital twin of your site. What-if scenario testing.', metric: '99.9%', metricLabel: 'Safety Uptime' },
  { title: 'Real-Time Monitoring', description: 'Live dashboard: robot positions, battery levels, task status, alerts. Any device, anywhere.', metric: '10ms', metricLabel: 'Control Loop Latency' },
  { title: 'Autonomous Mode', description: 'Pre-programmed mission sequences. Autonomous navigation with dynamic obstacle avoidance. Human supervision only.', metric: '85%', metricLabel: 'Tasks Fully Autonomous' },
];

const techStack = [
  { name: 'ROS2', category: 'Robot OS', description: 'Industry-standard robot operating system for real-time control.' },
  { name: 'Claude Haiku', category: 'Edge AI', description: 'Ultra-low latency safety decisions on the edge (<200ms).' },
  { name: 'Claude Opus 4', category: 'Planning', description: 'Multi-robot mission planning and conflict resolution.' },
  { name: 'NVIDIA Isaac Sim', category: 'Simulation', description: 'Digital twin environment for mission simulation and validation.' },
  { name: 'Gemini 2 Pro', category: 'Video Analysis', description: 'Real-time video streaming analysis for obstacle detection.' },
  { name: 'Safety PLC', category: 'Hardware', description: 'Independent safety controller. IEC 61508 SIL 3 certified.' },
];

export default function RobotsPage() {
  return (
    <>
      <AgentHero {...hero} />
      <FeatureGrid title="Command your robot fleet" subtitle="From single robot control to autonomous fleet coordination." features={features} columns={3} />
      <TechStack items={techStack} />
      <CTAProduct agentName="Robot Orchestrator" />
    </>
  );
}
