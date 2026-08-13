import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Building Production-Ready AI Systems: Lessons from RaidWait',
    excerpt: 'Explore how we engineered a real-time transit tracking system serving 100+ users with sub-minute ETAs. Dive into optimization techniques, caching strategies, and handling real-world data challenges.',
    date: 'Aug 10, 2026',
    category: 'AI/ML',
    readTime: '8 min read',
    tags: ['AI', 'Real-time Systems', 'Optimization'],
  },
  {
    id: 2,
    title: 'Leveraging Google Gemini AI for Code Translation: A Deep Dive',
    excerpt: 'Learn how to build intelligent code translation tools using Google Gemini AI. We cover prompt engineering, handling multiple programming languages, and caching API responses for 60% cost reduction.',
    date: 'Aug 5, 2026',
    category: 'AI Engineering',
    readTime: '10 min read',
    tags: ['Gemini AI', 'Code Translation', 'API Design'],
  },
  {
    id: 3,
    title: 'No-Code AI Web Builders: The Future of Development',
    excerpt: 'Discover how NxtBuild converts natural language commands into deployable web pages in under 10 seconds. Explore multi-turn AI conversations, sandbox security, and the future of low-code platforms.',
    date: 'Jul 28, 2026',
    category: 'AI/ML',
    readTime: '12 min read',
    tags: ['No-Code', 'Generative AI', 'Web Development'],
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-[#0a0e27] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#e5e7eb] mb-4">
            Latest <span className="text-[#00d9ff]">Articles</span>
          </h2>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
            Insights on AI/ML engineering, system design, and building intelligent applications at scale.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-[#111827] border border-[#1f2937] rounded-lg p-6 hover:border-[#00d9ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#00d9ff]/20 flex flex-col slide-up"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-[#00d9ff]/10 text-[#00d9ff] border border-[#00d9ff]/30">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#e5e7eb] mb-3 hover:text-[#00d9ff] transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[#9ca3af] mb-4 flex-grow line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1f2937]">
                <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00d9ff] group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button className="bg-[#00d9ff] text-[#0a0e27] hover:bg-[#7c3aed] font-semibold px-8 py-3">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
