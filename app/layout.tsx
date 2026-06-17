import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'BuildOS — The AI Operating System for Construction',
  description: 'Cut construction costs by 22% and deliver 30% faster with AI agents and robotics.',
  openGraph: {
    title: 'BuildOS — AI for Construction',
    description: 'The first AI agent + robotics platform for the $12 trillion construction industry.',
    url: 'https://buildos.io',
    siteName: 'BuildOS',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'BuildOS', description: 'AI agents for construction.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
