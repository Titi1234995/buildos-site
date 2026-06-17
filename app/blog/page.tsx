import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    slug: 'state-of-construction-tech-2026',
    title: 'The State of Construction Technology 2026',
    excerpt: 'AI agents, robotics, and digital twins are finally transforming the $12T construction industry. Here\'s what you need to know.',
    date: '2026-06-15',
    readTime: '8 min',
    category: 'Industry Trends',
    author: 'BuildOS Team',
  },
  {
    slug: 'how-ai-agents-cut-project-costs',
    title: 'How AI Agents Cut Construction Costs by 22%',
    excerpt: 'Real data from 15 pilot projects shows how AI agents reduce waste, prevent delays, and improve safety on every site.',
    date: '2026-06-10',
    readTime: '12 min',
    category: 'Research',
    author: 'BuildOS Team',
  },
  {
    slug: 'vision-agent-case-study',
    title: 'Vision Agent: Real-Time Safety Monitoring in Action',
    excerpt: 'How a major contractor reduced safety incidents by 73% using AI computer vision on a $200M infrastructure project.',
    date: '2026-06-05',
    readTime: '10 min',
    category: 'Case Study',
    author: 'BuildOS Team',
  },
  {
    slug: 'robotics-construction-2026',
    title: 'The Robots Are Here: Construction Robotics in 2026',
    excerpt: 'From bricklaying bots to autonomous drones — the robotics revolution in construction is happening faster than expected.',
    date: '2026-05-28',
    readTime: '7 min',
    category: 'Technology',
    author: 'BuildOS Team',
  },
  {
    slug: 'ai-planning-vs-traditional',
    title: 'AI Planning vs. Traditional Scheduling: A Comparison',
    excerpt: 'We compared AI-generated schedules against human planners on 50 real projects. The results were surprising.',
    date: '2026-05-20',
    readTime: '9 min',
    category: 'Research',
    author: 'BuildOS Team',
  },
  {
    slug: 'supply-chain-ai-predictions',
    title: 'Predicting Supply Chain Delays with AI',
    excerpt: 'How machine learning models can predict supplier delays 2 weeks in advance with 87% accuracy.',
    date: '2026-05-15',
    readTime: '6 min',
    category: 'Technology',
    author: 'BuildOS Team',
  },
];

const categories = ['All', 'Industry Trends', 'Research', 'Case Study', 'Technology'];

export default function BlogPage() {
  return (
    <div className="pt-24">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Badge variant="purple" className="mb-4">Blog</Badge>
          <h1 className="text-5xl font-black tracking-tight md:text-6xl">
            Insights for the<br />
            <span className="text-white/40">future of construction</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/40">
            Stories, research, and guides from the team building the OS for the world&apos;s largest industry.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  cat === 'All'
                    ? 'border-brand-400 bg-brand-400/10 text-brand-400'
                    : 'border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="flex h-full flex-col">
                  <div className="mb-4 aspect-video rounded-lg bg-gradient-to-br from-surface-700 to-surface-800" />
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    <span className="rounded-full bg-brand-400/10 px-2 py-1 text-brand-400">{post.category}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold group-hover:text-brand-400 transition-colors">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/40">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-white/30">{post.author}</span>
                    <span className="flex items-center gap-1 text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
