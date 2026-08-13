export default function Contact() {
  return (
    <section id="contact" className="sec" style={{ paddingBottom: 0 }}>
      <div className="eyebrow">06 / Contact</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--disp)',
            fontWeight: 700,
            fontSize: 'clamp(34px,5.6vw,64px)',
            letterSpacing: '-.02em',
            marginBottom: 24,
            maxWidth: 760,
            color: 'var(--text)',
          }}
        >
          Building something with AI at the core?{' '}
          <span style={{ color: 'var(--signal)' }}>Let&apos;s talk.</span>
        </h2>
        <p className="sec-desc reveal" style={{ marginBottom: 40 }}>
          Open to AI/ML engineering roles, full-stack opportunities, and interesting collaborations.
        </p>

        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 80 }}>
          <a href="mailto:mr.dhruvsony@gmail.com" className="btn btn-primary">
            mr.dhruvsony@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/mr-dhruv-soni/" target="_blank" rel="noopener" className="btn btn-ghost">
            LinkedIn ↗
          </a>
          <a href="https://github.com/Mr-dhruv-sony" target="_blank" rel="noopener" className="btn btn-ghost">
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: '26px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--mono)',
          fontSize: 11.5,
          color: 'var(--text-faint)',
          flexWrap: 'wrap',
          gap: 10,
          borderTop: '1px solid var(--line-soft)',
        }}
      >
        <span>© 2026 Dhruv Kumar Sony · Patna, Bihar, India</span>
        <span>Designed &amp; built with React 19 + Gemini AI</span>
      </footer>
    </section>
  );
}

