const ACHIEVEMENTS = [
  'Deployed a live production web application (RaidWait), used by real commuters across multiple cities.',
  'Conceived and deployed 3 intelligent Discord bots serving 200+ weekly interactions, freeing 5+ hours of manual moderation per week.',
  'Selected as Young Innovator at Scaler School of Technology; led 4 cross-functional engineering projects in a 3-month accelerated programme.',
  'Consistent academic performer in the B.Tech AI/ML programme at Roorkee Institute of Technology.',
];

const CERTS = [
  { org: 'Make.com', label: 'End-to-End Automation Workflows' },
  { org: 'Prompt-Driven Pipelines', label: 'Hands-On AI Workflow Development' },
  { org: 'NCL', label: 'National Coding League, Competitive Programming' },
  { org: 'NxtWave', label: 'Static Website Development Certification' },
];

const LEAD = [
  {
    title: 'E-Cell Member',
    desc: 'Organised 5+ entrepreneurship events (100+ attendees each); coordinated B-Plan contests & Ideathons end to end.',
  },
  {
    title: 'Freelance Creator',
    desc: 'Produced 50+ visual pieces (+30% engagement) and content strategies for 3+ brands (+25% reach).',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="sec">
      <div className="eyebrow">05 / Record</div>
      <h2 className="sec-title reveal">Achievements &amp; certifications</h2>

      {/* Achievement grid */}
      <div
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          background: 'var(--line-soft)',
          border: '1px solid var(--line-soft)',
          marginBottom: 60,
        }}
      >
        {ACHIEVEMENTS.map((ach, i) => (
          <div
            key={i}
            style={{
              background: 'var(--panel)',
              padding: '26px 28px',
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontFamily: 'var(--mono)', color: 'var(--signal)', fontSize: 13, paddingTop: 2 }}>→</span>
            <p style={{ color: 'var(--text-dim)', fontSize: 14.5 }}>{ach}</p>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 56 }}>
        {CERTS.map((c, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--text-dim)',
              border: '1px solid var(--line)',
              padding: '10px 16px',
              borderRadius: 20,
            }}
          >
            <strong style={{ color: 'var(--amber)', fontWeight: 500 }}>{c.org}</strong>
            {' — '}
            {c.label}
          </span>
        ))}
      </div>

      {/* Leadership */}
      <div
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          background: 'var(--line-soft)',
          border: '1px solid var(--line-soft)',
        }}
      >
        {LEAD.map((l, i) => (
          <div key={i} style={{ background: 'var(--panel)', padding: '28px 30px' }}>
            <h4 style={{ fontFamily: 'var(--disp)', fontSize: 16, marginBottom: 10, color: 'var(--text)' }}>{l.title}</h4>
            <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>{l.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          #achievements .reveal > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
