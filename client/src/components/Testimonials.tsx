import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mentor at Scaler School of Technology',
    role: 'Program Director',
    content: 'Dhruv demonstrated exceptional problem-solving skills and leadership during the Young Innovator program. He successfully delivered multiple projects and showed strong growth in AI/ML engineering.',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    id: 2,
    name: 'Project Collaborator',
    role: 'Full-Stack Developer',
    content: 'Working with Dhruv on RaidWait was a great experience. His ability to optimize code and implement real-time systems is impressive. Highly recommended for any AI/ML or backend engineering role.',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    id: 3,
    name: 'Technical Lead at Roorkee Institute',
    role: 'Java Development Mentor',
    content: 'Dhruv mastered Core Java concepts quickly and delivered production-quality code. His understanding of JDBC and backend integration was outstanding for an intern.',
    rating: 5,
    avatar: '👨‍🏫',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#0a0e27] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#e5e7eb] mb-4">
            What Others <span className="text-[#00d9ff]">Say</span>
          </h2>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
            Feedback from mentors, collaborators, and team members who have worked with me on various projects.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-[#111827] border border-[#1f2937] rounded-lg p-6 hover:border-[#7c3aed] transition-all duration-300 hover:shadow-lg hover:shadow-[#7c3aed]/20 slide-up"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#e5e7eb] mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#1f2937]">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="text-[#e5e7eb] font-semibold">{testimonial.name}</p>
                  <p className="text-[#9ca3af] text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LinkedIn CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#00d9ff]/10 to-[#7c3aed]/10 border border-[#1f2937] rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-[#e5e7eb] mb-2">
            See More Recommendations
          </h3>
          <p className="text-[#9ca3af] mb-6">
            Connect with me on LinkedIn to see full recommendations and endorsements from colleagues and mentors.
          </p>
          <a
            href="https://linkedin.com/in/mr-dhruv-soni/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00d9ff] text-[#0a0e27] rounded-lg font-semibold hover:bg-[#7c3aed] transition-all duration-300"
          >
            View LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  );
}
