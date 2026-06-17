import { AgentHero } from '@/components/product/AgentHero';
import { FeatureGrid } from '@/components/product/FeatureGrid';
import { TechStack } from '@/components/product/TechStack';
import { CTAProduct } from '@/components/product/CTAProduct';
import { FileText, Search, CheckCircle, FileOutput, Shield, Languages } from 'lucide-react';

const hero = {
  title: 'Document Agent',
  subtitle: 'AI that reads every contract, permit, and standard',
  description: 'Extract, analyze, and verify every document in your project. From contract clauses to safety permits — nothing gets missed.',
  icon: <FileText size={96} strokeWidth={1.5} />,
};

const features = [
  { title: 'Contract Intelligence', description: 'Extract 30+ fields from any construction contract. Flag risky clauses. Compare against standards.', metric: '97%', metricLabel: 'Extraction Accuracy' },
  { title: 'Compliance Verification', description: 'Auto-check documents against OSHA, ISO 9001, ISO 14001, and local regulations. Expiry tracking.', metric: '60x', metricLabel: 'Faster Than Manual Review' },
  { title: 'Permit Management', description: 'Track all permits, licenses, and certificates. Automatic renewal reminders. Status dashboard.', metric: '100%', metricLabel: 'Permit Compliance' },
  { title: 'RAG Search', description: 'Ask questions about any document in natural language. "What is the liquidated damages clause?" — instant answer.' },
  { title: 'Multi-Language', description: 'Parse documents in 15+ languages. Cross-language comparison. Translation included.', metric: '15+', metricLabel: 'Languages Supported' },
  { title: 'Report Generation', description: 'Auto-generate daily reports, meeting minutes, and progress documentation. Custom templates.', metric: '80x', metricLabel: 'Faster Reporting' },
];

const techStack = [
  { name: 'Claude 3.5 Sonnet', category: 'Document Parsing', description: 'Vision + text for complex documents with tables and signatures.' },
  { name: 'Llama 4 (Fine-Tuned)', category: 'Extraction', description: 'Custom fine-tuned for construction contracts. 20x cheaper than API.' },
  { name: 'Qdrant', category: 'Vector Database', description: 'Self-hosted RAG pipeline. Documents stored as searchable vectors.' },
  { name: 'LlamaIndex', category: 'RAG Framework', description: 'Advanced retrieval-augmented generation for document Q&A.' },
  { name: 'Tesseract OCR', category: 'Text Extraction', description: 'OCR for scanned documents and photos of contracts.' },
  { name: 'Nous Hermes 4', category: 'Fast Extraction', description: 'Lightweight model for high-volume standardized extraction.' },
];

export default function DocumentsPage() {
  return (
    <>
      <AgentHero {...hero} />
      <FeatureGrid title="Your documents, supercharged" subtitle="From contract signing to project closeout — AI handles the paperwork." features={features} columns={3} />
      <TechStack items={techStack} />
      <CTAProduct agentName="Document Agent" />
    </>
  );
}
