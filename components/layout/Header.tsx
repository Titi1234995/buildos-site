'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Product', href: '/product' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: '/docs' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface-900/80 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-brand-400">Build</span>OS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button size="sm">Book a Demo</Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-surface-800 px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-white/60">
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Button variant="ghost" size="md" className="w-full">Sign In</Button>
              <Button size="md" className="w-full">Book a Demo</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
