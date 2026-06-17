import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
}

export function Card({ className, glow = false, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300',
        hover && 'hover:border-brand-400/20 hover:-translate-y-0.5',
        glow && 'shadow-lg shadow-brand-400/5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardNumber({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-4xl font-extrabold text-transparent leading-none">
      {children}
    </div>
  );
}
