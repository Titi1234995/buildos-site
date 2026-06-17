import { AgentHero } from '@/components/product/AgentHero';
import { FeatureGrid } from '@/components/product/FeatureGrid';
import { TechStack } from '@/components/product/TechStack';
import { CTAProduct } from '@/components/product/CTAProduct';
import { Truck, Package, AlertTriangle, TrendingUp, FileText, Globe } from 'lucide-react';

const hero = {
  title: 'Supply Chain Agent',
  subtitle: 'Never run out of materials again',
  description: 'Real-time tracking of every supplier, every delivery, every risk. AI predicts delays before they happen and automatically finds alternatives.',
  icon: <Truck size={96} strokeWidth={1.5} />,
};

const features = [
  { title: 'Real-Time Tracking', description: 'Track every order from PO to delivery. Automatic ETA updates. Carrier and port monitoring.', metric: '15%', metricLabel: 'Fewer Stockouts' },
  { title: 'Delay Prediction', description: 'ML models predict supplier delays 2 weeks in advance. 87% accuracy. Automatic escalation when risk >70%.', metric: '87%', metricLabel: 'Delay Prediction Accuracy' },
  { title: 'Automated Ordering', description: 'Smart reorder points based on consumption rate and lead time. Auto-generate POs when stock is low.' },
  { title: 'Supplier Intelligence', description: 'Supplier scorecards: on-time rate, quality, price trend. Alternative supplier suggestions.', metric: '12%', metricLabel: 'Procurement Savings' },
  { title: 'Document Parsing', description: 'AI reads invoices, bills of lading, and certificates. Extracts key data automatically. Multilingual support.', metric: '20x', metricLabel: 'Faster Document Processing' },
  { title: 'Risk Monitoring', description: 'Real-time alerts: weather, port strikes, factory closures. Geopolitical risk scoring for each supplier.' },
];

const techStack = [
  { name: 'TimesFM (Google)', category: 'Time Series', description: 'Predictive model for delivery time forecasting.' },
  { name: 'Mistral Large 3', category: 'Document Parsing', description: 'Multilingual document extraction for global supply chains.' },
  { name: 'Claude Opus 4', category: 'Decision Making', description: 'Strategic procurement decisions and supplier negotiation.' },
  { name: 'Prophet (Meta)', category: 'Trend Analysis', description: 'Demand forecasting and consumption pattern detection.' },
  { name: 'Qdrant', category: 'Vector Search', description: 'Similarity search across supplier catalogs and specifications.' },
  { name: 'Apache Kafka', category: 'Event Streaming', description: 'Real-time event processing for delivery status updates.' },
];

export default function SupplyChainPage() {
  return (
    <>
      <AgentHero {...hero} />
      <FeatureGrid title="Full supply chain visibility" subtitle="From raw materials to delivered-on-site." features={features} columns={3} />
      <TechStack items={techStack} />
      <CTAProduct agentName="Supply Chain Agent" />
    </>
  );
}
