import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const posts: Record<string, { title: string; content: string[]; date: string; readTime: string; category: string; author: string }> = {
  'state-of-construction-tech-2026': {
    title: 'The State of Construction Technology 2026',
    date: '2026-06-15', readTime: '8 min', category: 'Industry Trends', author: 'BuildOS Team',
    content: [
      'The construction industry is at an inflection point. After decades of under-investment in technology, 2026 marks the year when AI agents and robotics move from pilot projects to mainstream adoption.',
      'Three forces are driving this transformation: the maturity of large language models, the dramatic reduction in hardware costs, and the critical labor shortage that shows no signs of abating.',
      'At BuildOS, we have deployed our platform across 15 pilot projects in 6 countries. The results are consistent: 22% reduction in costs, 30% faster delivery, and 40% improvement in productivity.',
      'The message is clear: the future of construction is intelligent, automated, and connected. And that future is here now.',
    ],
  },
  'how-ai-agents-cut-project-costs': {
    title: 'How AI Agents Cut Construction Costs by 22%',
    date: '2026-06-10', readTime: '12 min', category: 'Research', author: 'BuildOS Team',
    content: [
      'Our analysis of 15 pilot projects reveals a consistent pattern: AI agents reduce construction costs by an average of 22% across five key areas.',
      'The largest savings come from delay reduction (8%), followed by material waste reduction (6%), improved labor productivity (4%), better supply chain management (3%), and safety incident reduction (1%).',
    ],
  },
  'vision-agent-case-study': {
    title: 'Vision Agent: Real-Time Safety Monitoring in Action',
    date: '2026-06-05', readTime: '10 min', category: 'Case Study', author: 'BuildOS Team',
    content: [
      'A major European contractor deployed BuildOS Vision Agent across a $200M infrastructure project. The results exceeded expectations.',
      'In the first 3 months, the system detected 847 safety violations that would have been missed by manual inspection. 12 of these were classified as critical.',
    ],
  },
  'robotics-construction-2026': {
    title: 'The Robots Are Here: Construction Robotics in 2026',
    date: '2026-05-28', readTime: '7 min', category: 'Technology', author: 'BuildOS Team',
    content: [
      'The construction robotics market has reached $10B in 2026, growing at 35% year over year. Robots are no longer a novelty — they are a necessity.',
      'From autonomous bricklaying robots that work 5x faster than human masons to drones that survey entire sites in minutes, the range of available robots is expanding rapidly.',
    ],
  },
  'ai-planning-vs-traditional': {
    title: 'AI Planning vs. Traditional Scheduling',
    date: '2026-05-20', readTime: '9 min', category: 'Research', author: 'BuildOS Team',
    content: [
      'We conducted a controlled study comparing AI-generated construction schedules against those created by experienced human planners.',
      'Across 50 projects, the AI schedules were 4.4x more accurate in predicting task durations, and the AI was able to generate optimal re-schedules in 4 minutes vs. 2 days for human planners.',
    ],
  },
  'supply-chain-ai-predictions': {
    title: 'Predicting Supply Chain Delays with AI',
    date: '2026-05-15', readTime: '6 min', category: 'Technology', author: 'BuildOS Team',
    content: [
      'Supply chain disruptions are the #1 cause of construction delays. Our AI models can predict supplier delays with 87% accuracy, up to 2 weeks in advance.',
      'The model analyzes 40+ variables including weather, port congestion, historical supplier performance, and geopolitical risk factors.',
    ],
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div className="pt-24">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/blog" className="mb-8 flex items-center gap-2 text-sm text-white/40 hover:text-white">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <Badge variant="purple" className="mb-4">{post.category}</Badge>
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">{post.title}</h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-white/30">
          <span>{post.author}</span>
          <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
        </div>

        <div className="mt-12 space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-white/60">{paragraph}</p>
          ))}
        </div>

        <hr className="my-12 border-white/[0.06]" />

        <div className="text-center">
          <p className="text-sm text-white/30">Share this article</p>
          <div className="mt-4 flex justify-center gap-4">
            {['Twitter', 'LinkedIn', 'Email'].map((s) => (
              <Button key={s} variant="secondary" size="sm">{s}</Button>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
