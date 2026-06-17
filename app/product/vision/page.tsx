import { AgentHero } from '@/components/product/AgentHero';
import { FeatureGrid } from '@/components/product/FeatureGrid';
import { TechStack } from '@/components/product/TechStack';
import { CTAProduct } from '@/components/product/CTAProduct';
import { Camera, ScanLine, Shield, BarChart3, Eye, Video } from 'lucide-react';

const hero = {
  title: 'Vision Agent',
  subtitle: 'See everything, everywhere, every time',
  description: 'AI-powered computer vision that monitors every corner of your construction site in real time. Detect safety violations, track progress, and catch errors before they cost millions.',
  icon: <Camera size={96} strokeWidth={1.5} />,
};

const features = [
  { title: 'Real-Time Detection', description: 'YOLOv11-powered detection of 50+ object classes: workers, equipment, materials, safety gear. Updates every 5 seconds.', metric: '98.5%', metricLabel: 'Detection Accuracy' },
  { title: 'Safety Monitoring', description: 'Automatic detection of PPE violations, unauthorized zone entry, unsafe worker behavior. Instant alerts to site supervisors.', metric: '73%', metricLabel: 'Fewer Safety Incidents' },
  { title: 'Progress Tracking', description: 'Daily progress % compared to BIM schedule. Automated reports with photographic evidence. Early warning when进度 falls behind.' },
  { title: 'Quality Control', description: 'Detect cracks, misalignments, exposed rebar, and other quality issues from camera feeds. Historical comparison across dates.' },
  { title: 'Drone Integration', description: 'Autonomous drone patrols on scheduled routes. 360° site coverage. Thermal imaging for equipment monitoring.', metric: '10x', metricLabel: 'Faster Site Surveys' },
  { title: 'Analytics Dashboard', description: 'All site metrics in one place. Trends over time. Exportable reports for stakeholders. API access for custom integrations.' },
];

const techStack = [
  { name: 'YOLOv11', category: 'Edge Detection', description: 'NVIDIA Jetson Orin optimized. 2-5ms inference. 50+ custom classes.' },
  { name: 'SAM 2 (Meta)', category: 'Segmentation', description: 'Pixel-perfect segmentation for precise progress measurement.' },
  { name: 'Claude 3.5 Sonnet', category: 'Scene Analysis', description: 'Cloud-based scene understanding and report generation.' },
  { name: 'DeepSORT', category: 'Tracking', description: 'Multi-object tracking across camera feeds for worker/equipment location.' },
  { name: 'DINOv2', category: 'Features', description: 'Visual embeddings for similarity search and anomaly detection.' },
  { name: 'NVIDIA Jetson', category: 'Hardware', description: 'Orin NX (100 TOPS) for edge inference. 15W power consumption.' },
];

export default function VisionPage() {
  return (
    <>
      <AgentHero {...hero} />
      <FeatureGrid title="Everything you can see" subtitle="From bird&apos;s-eye site overview to microscopic defect detection." features={features} columns={3} />
      <TechStack items={techStack} />
      <CTAProduct agentName="Vision Agent" />
    </>
  );
}
