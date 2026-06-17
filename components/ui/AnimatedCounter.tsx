'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  label?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
  label,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, from, to, duration]);

  const display = (() => {
    if (to >= 1_000_000_000) return `${prefix}$${(count / 1_000_000_000).toFixed(1)}T${suffix}`;
    if (to >= 1_000_000) return `${prefix}$${(count / 1_000_000).toFixed(1)}M${suffix}`;
    if (to >= 1_000) return `${prefix}${(count / 1_000).toFixed(0)}K${suffix}`;
    return `${prefix}${Math.round(count)}${suffix}`;
  })();

  return (
    <div ref={ref} className="text-center">
      <div className={cn('bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-4xl font-extrabold text-transparent leading-none md:text-5xl', className)}>
        {display}
      </div>
      {label && <div className="mt-1 text-sm text-white/50">{label}</div>}
    </div>
  );
}
