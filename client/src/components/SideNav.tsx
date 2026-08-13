import { useState, useEffect } from 'react';

const navItems = [
  { idx: '00', label: 'Home', href: '#home' },
  { idx: '01', label: 'About', href: '#about' },
  { idx: '02', label: 'Skills', href: '#skills' },
  { idx: '03', label: 'Experience', href: '#experience' },
  { idx: '04', label: 'Projects', href: '#projects' },
  { idx: '05', label: 'Achievements', href: '#achievements' },
  { idx: '06', label: 'Contact', href: '#contact' },
];

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const closeNav = () => setOpen(false);

  const handleNavClick = (href: string) => {
    closeNav();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="navtoggle"
        aria-label="Toggle navigation"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'none',
          position: 'fixed',
          top: 18,
          right: 18,
          zIndex: 40,
          width: 42,
          height: 42,
          border: '1px solid var(--line)',
          background: 'var(--panel)',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
        }}
      >
        <span
          style={{
            display: 'block',
            width: 18,
            height: 1,
            background: 'var(--text)',
            position: 'relative',
          }}
        />
      </button>

      {/* Scrim */}
      {open && (
        <div
          onClick={closeNav}
          style={{
            display: 'block',
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.55)',
            zIndex: 15,
          }}
        />
      )}

      {/* Side nav */}
      <aside
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          borderRight: '1px solid var(--line-soft)',
          padding: '28px 26px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 20,
          background: 'var(--ink)',
        }}
      >
        <div>
          {/* Brand */}
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '.06em', color: 'var(--text-dim)' }}>
            <strong style={{ color: 'var(--text)', fontWeight: 600 }}>DK</strong>/SONY
          </div>

          {/* Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 10,
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: 'var(--signal)',
              letterSpacing: '.04em',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--signal)',
                boxShadow: '0 0 8px var(--signal)',
                display: 'inline-block',
              }}
              className="anim-pulse-dot"
            />
            AVAILABLE FOR ROLES
          </div>

          {/* Nav links */}
          <nav style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {navItems.map(({ idx, label, href }) => {
              const isActive = active === href.replace('#', '');
              return (
                <a
                  key={idx}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 13,
                    color: isActive ? 'var(--text)' : 'var(--text-faint)',
                    padding: '9px 0 9px 12px',
                    borderLeft: `2px solid ${isActive ? 'var(--signal)' : 'transparent'}`,
                    transition: 'color .2s ease, border-color .2s ease',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 11, color: isActive ? 'var(--signal)' : 'var(--text-faint)' }}>
                    {idx}
                  </span>
                  {label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Compact status card */}
        <div
          style={{
            border: '1px solid rgba(83,216,201,.2)',
            borderRadius: 14,
            padding: '14px 14px 13px',
            background: 'linear-gradient(145deg, rgba(83,216,201,.08), rgba(255,255,255,.02))',
            boxShadow: '0 14px 35px rgba(0,0,0,.18)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--signal)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
            <span className="anim-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 8px var(--signal)' }} />
            Learning in public
          </div>
          <div style={{ marginTop: 10, fontFamily: 'var(--disp)', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>AI / ML builder</div>
          <div style={{ marginTop: 5, fontFamily: 'var(--mono)', fontSize: 10.5, lineHeight: 1.5, color: 'var(--text-faint)' }}>GenAI · Agents · ML · Full-stack</div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .navtoggle { display: flex !important; }
          aside {
            position: fixed !important;
            top: 0; left: 0;
            width: 78%; max-width: 300px;
            height: 100vh;
            transform: ${open ? 'translateX(0)' : 'translateX(-100%)'};
            transition: transform .35s ease;
            box-shadow: 20px 0 40px rgba(0,0,0,.5);
          }
        }
      `}</style>
    </>
  );
}

