import { Github, GitBranch, Star, Code2 } from 'lucide-react';

export default function GitHubStats() {
  return (
    <section className="py-20 bg-[#111827] relative overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#e5e7eb] mb-4">
            GitHub <span className="text-[#00d9ff]">Activity</span>
          </h2>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
            Consistent contributions to open-source and personal projects. Explore my work on GitHub.
          </p>
        </div>

        {/* GitHub Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Code2,
              label: 'Public Repositories',
              value: '21',
              color: '#00d9ff',
            },
            {
              icon: Star,
              label: 'Stars Received',
              value: '25+',
              color: '#7c3aed',
            },
            {
              icon: GitBranch,
              label: 'Active Projects',
              value: '15',
              color: '#10b981',
            },
            {
              icon: Github,
              label: 'Total Commits',
              value: '500+',
              color: '#06b6d4',
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#0a0e27] border border-[#1f2937] rounded-lg p-6 hover:border-[#00d9ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#00d9ff]/20 slide-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${stat.color}20`,
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{
                      color: stat.color,
                    }}
                  />
                </div>
                <p className="text-[#9ca3af] text-sm mb-2">{stat.label}</p>
                <p
                  className="text-3xl font-bold"
                  style={{
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* GitHub Embed */}
        <div className="bg-[#0a0e27] border border-[#1f2937] rounded-lg p-8 text-center">
          <p className="text-[#9ca3af] mb-6">
            View my complete GitHub profile and explore all my projects, contributions, and open-source work.
          </p>
          <a
            href="https://github.com/Mr-dhruv-sony"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00d9ff] text-[#0a0e27] rounded-lg font-semibold hover:bg-[#7c3aed] transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            Visit GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
