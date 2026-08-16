const PANELS = [
  {
    title: 'Education',
    short: 'B.Tech CSE (AI & ML) student exploring Generative AI, Agentic AI, and practical Machine Learning.',
    full: 'Currently pursuing B.Tech in Computer Science (AI & ML) at Roorkee Institute of Technology. I am actively learning Generative AI, Agentic AI, Machine Learning, and the full-stack systems that make these ideas useful.',
    h: 'h-44',
    ty: '80px',
  },
  {
    title: 'Experience',
    short: 'Java Dev Intern @ RIT · Young Innovator @ Scaler School.',
    full: 'Java Developer Intern at Roorkee Institute of Technology — mastered OOP, JDBC. Young Innovator Intern at Scaler School of Technology — shipped 2 Chrome extensions (30+ users) and 3 AI chatbots handling 200+ weekly interactions.',
    h: 'h-52',
    ty: '60px',
    center: true,
  },
  {
    title: 'Projects',
    short: 'RideWait · AI Code Translator · NxtBuild · Half-Step India · SkillVerse.',
    full: 'RideWait: a crowdsourced transit tracker. AI Smart Code Translator: a Gemini-powered developer tool. NxtBuild: an AI web builder. Half-Step India: infrastructure monitoring. SkillVerse: peer-to-peer learning.',
    h: 'h-44',
    ty: '80px',
    right: true,
  },
];

export default function About() {
  return (
    <section id="about" className="sec">
      <div className="eyebrow">01 / About</div>
      <h2 className="sec-title reveal">Systems that learn, and interfaces people can trust.</h2>

      {/* Row 1: Name card + Rising panels */}
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, marginBottom: 12 }}>

        {/* Name card */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--panel) 0%, var(--panel-2) 100%)',
            border: '1px solid var(--line)',
            borderRadius: 16,
            padding: '32px 28px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Radial glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(circle at center, rgba(83,216,201,0.12) 0%, transparent 70%)',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {['DHRUV', 'SONY'].map((word) => (
              <div
                key={word}
                style={{
                  fontFamily: 'var(--disp)',
                  fontSize: 'clamp(28px,3vw,42px)',
                  fontWeight: 900,
                  letterSpacing: '-.02em',
                  lineHeight: 1.05,
                  background: 'linear-gradient(to bottom, var(--text) 0%, var(--text-faint) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {word}
              </div>
            ))}
            <div style={{ height: 1, width: 40, background: 'rgba(83,216,201,0.3)', margin: '10px auto 8px' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '.2em' }}>
              AI · ML · Full-Stack
            </span>
          </div>
        </div>

        {/* Rising panels */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--panel) 0%, var(--panel-2) 100%)',
            border: '1px solid var(--line)',
            borderRadius: 16,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 180,
          }}
          className="group"
        >
          {/* Dot pattern */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, var(--text) 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }} />
          {/* Hover hint */}
          <div style={{
            position: 'absolute', top: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 30, pointerEvents: 'none',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '.2em', color: 'rgba(83,216,201,0.5)', textTransform: 'uppercase', background: 'rgba(16,21,28,0.6)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: 20, border: '1px solid rgba(83,216,201,0.1)' }}>
              Hover cards to read more
            </span>
          </div>
          {/* Three rising cards */}
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', padding: '0 8px', overflow: 'hidden', borderRadius: 16 }}>
            {PANELS.map((panel, i) => (
              <div
                key={panel.title}
                style={{
                  width: i === 1 ? '40%' : '30%',
                  height: i === 1 ? 208 : 176,
                  background: 'var(--ink)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderBottom: 'none',
                  borderRadius: '10px 10px 0 0',
                  padding: i === 1 ? '16px 14px' : '12px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  boxShadow: '0 -5px 30px rgba(0,0,0,0.4)',
                  marginLeft: i === 2 ? -20 : 0,
                  marginRight: i === 0 ? -20 : 0,
                  zIndex: i === 1 ? 20 : 10,
                  transform: `translateY(${panel.ty})`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'box-shadow .3s ease, border-color .3s ease',
                  textAlign: panel.right ? 'right' : panel.center ? 'center' : 'left',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 -5px 35px rgba(83,216,201,0.25)';
                  e.currentTarget.style.borderColor = 'rgba(83,216,201,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 -5px 30px rgba(0,0,0,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                {/* Top accent */}
                <div style={{ position: 'absolute', top: 0, left: '25%', right: '25%', height: 1, background: 'linear-gradient(to right, transparent, rgba(83,216,201,0.5), transparent)' }} />
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    {panel.title}
                  </span>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, color: 'var(--text-faint)', marginTop: 8, lineHeight: 1.5 }}>
                    {panel.short}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Mindset + Photo + Craft */}
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>

        {/* Mindset card */}
        <div
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 16,
            padding: '24px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Mindset</h3>
            <div style={{ width: 32, height: 2, background: 'var(--signal)', borderRadius: 2, marginBottom: 12 }} />
            <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>
              <strong style={{ color: 'var(--text)' }}>Building more than software.</strong> My passion for AI
              provides the <strong style={{ color: 'var(--text)' }}>discipline and focus</strong> I need to grow.
            </p>
          </div>
          {/* Hobby image */}
          <div style={{ borderRadius: 10, overflow: 'hidden', position: 'relative', height: 130 }}>
            <img
              src="/hobby.jpg"
              alt="Coding setup"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(10,13,18,.9), transparent)',
              padding: '12px 10px 8px',
            }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '.12em' }}>
                LATE-NIGHT BUILDS
              </span>
            </div>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>
            <strong style={{ color: 'var(--text)' }}>Mastering the craft of AI</strong> is my path to{' '}
            <strong style={{ color: 'var(--text)' }}>excellence</strong>.
          </p>
        </div>

        {/* Photo + Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Portrait */}
          <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', position: 'relative', minHeight: 260, padding: 10, background: 'var(--panel)', border: '1px solid var(--line)' }}>
            <img
              src="/man-with-glasses-purple-background-with-picture-man-with-glasses-his-face_1221953-80174.avif"
              alt="Tech developer character representing Dhruv Kumar Sony"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', borderRadius: 10, display: 'block' }}
            />
          </div>
          {/* Location */}
          <div
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              padding: '16px 18px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(83,216,201,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ fontFamily: 'var(--disp)', fontSize: 18, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.01em', position: 'relative' }}>
              PATNA, BIHAR
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-faint)', marginTop: 2 }}>
              25.5941° N, 85.1376° E &nbsp;·&nbsp; GMT+5:30
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 6px var(--signal)', display: 'inline-block' }} className="anim-pulse-dot" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--signal)' }}>Open to remote collaboration</span>
            </div>
          </div>
        </div>

        {/* Craft card */}
        <div
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 16,
            padding: '24px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Craft</h3>
            <div style={{ width: 32, height: 2, background: 'var(--signal)', borderRadius: 2, marginBottom: 12 }} />
            <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>
              Building scalable <strong style={{ color: 'var(--text)' }}>AI agents, GenAI tools, ML experiments, web apps &amp; automations</strong>.
            </p>
            <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 8 }}>
              I understand what advantages modern tech can provide, helping me advise on the solutions a business
              actually needs.
            </p>
          </div>

          {/* Tech scrolling strip */}
          <div style={{ position: 'relative', overflow: 'hidden', padding: '8px 0', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, var(--panel), transparent)', zIndex: 1 }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, var(--panel), transparent)', zIndex: 1 }} />
            <div style={{ display: 'flex', gap: 16, animation: 'marquee 14s linear infinite', whiteSpace: 'nowrap' }}>
              {['GEN AI', 'AGENTS', 'ML', 'PYTHON', 'GEMINI', 'RAG', 'REACT', 'TS', 'NODE', 'MONGO', 'GEN AI', 'AGENTS', 'ML', 'PYTHON', 'GEMINI', 'RAG'].map((t, i) => (
                <span key={i} style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-faint)', letterSpacing: '.08em' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>
            Active hackathon competitor &amp; AI tinkerer. Open to collaborating on meaningful projects.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 6px var(--signal)', display: 'inline-block' }} className="anim-pulse-dot" />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--signal)' }}>Open to collaboration &amp; freelance</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .reveal > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}



