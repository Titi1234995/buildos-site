import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products — BuildOS',
  description: 'Explore BuildOS AI agents: Vision, Planning, Supply Chain, Document, and Robot Orchestrator.',
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
