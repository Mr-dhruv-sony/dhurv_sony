const EXPERIENCE = [
  {
    when: 'Jun — Jul 2025',
    role: 'Java Developer Intern',
    org: 'Roorkee Institute of Technology — Roorkee, Uttarakhand',
    bullets: [
      'Mastered Core Java across 4 OOP pillars through 20+ hands-on exercises, then engineered JDBC connectivity for 3+ modules — trimming boilerplate by ~35%.',
      'Delivered end-to-end integration connecting 2 frontend interfaces to backend logic, eliminating data-handling errors during internal testing.',
    ],
  },
  {
    when: 'Apr — Jul 2024',
    role: 'Young Innovator Intern',
    org: 'Scaler School of Technology — Bengaluru, Karnataka',
    bullets: [
      'Shipped 2 Chrome extensions (30+ users, ~25% task reduction) and 3 intelligent chatbots handling 200+ weekly interactions, saving 5+ hrs/week.',
      'Channelled ML growth strategies into 2 startup briefs and led 4 cross-functional projects across a 3-month programme, boosting pitch reach by 40%.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="sec">
      <div className="eyebrow">03 / Experience</div>
      <h2 className="sec-title reveal">Where I&apos;ve built</h2>

      <div className="reveal" style={{ maxWidth: 820 }}>
        {EXPERIENCE.map((exp, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '150px 1fr',
              gap: 34,
              paddingBottom: i < EXPERIENCE.length - 1 ? 56 : 0,
            }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)', paddingTop: 3 }}>
              {exp.when}
            </div>
            <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: 28, position: 'relative' }}>
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: -5,
                  top: 5,
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: 'var(--signal)',
                  boxShadow: '0 0 0 4px rgba(83,216,201,.15)',
                }}
              />
              <h4 style={{ fontFamily: 'var(--disp)', fontSize: 19, fontWeight: 600, marginBottom: 2, color: 'var(--text)' }}>
                {exp.role}
              </h4>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--signal)', marginBottom: 14 }}>
                {exp.org}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ color: 'var(--text-dim)', fontSize: 14.5, paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--text-faint)' }}>—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          #experience .reveal > div { grid-template-columns: 1fr !important; gap: 10px !important; }
        }
      `}</style>
    </section>
  );
}
