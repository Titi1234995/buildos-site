import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — BuildOS',
  description: 'Insights, research, and guides on AI and robotics in construction.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
