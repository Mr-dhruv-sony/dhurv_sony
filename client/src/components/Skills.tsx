import { useEffect, useRef } from 'react';

const SKILLS = [
  { n: 'Generative AI', label: 'GEN AI', ai: true },
  { n: 'Google Gemini AI', label: 'GEMINI', ai: true },
  { n: 'OpenAI APIs', label: 'OPENAI', ai: true },
  { n: 'Agentic AI', label: 'AGENTS', ai: true },
  { n: 'AI Agents', label: 'AI AGENTS', ai: true },
  { n: 'MCP Servers', label: 'MCP', ai: true },
  { n: 'RAG & Prompt Engineering', label: 'RAG', ai: true },
  { n: 'Make.com', label: 'MAKE', ai: true },
  { n: 'Discord Bot Dev', label: 'DISCORD', ai: true },
  { n: 'Python', icon: 'devicon-python-plain colored' },
  { n: 'Java', icon: 'devicon-java-plain colored' },
  { n: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { n: 'TypeScript', icon: 'devicon-typescript-plain colored' },
  { n: 'React 19', icon: 'devicon-react-original colored' },
  { n: 'Next.js', icon: 'devicon-nextjs-original' },
  { n: 'HTML5', icon: 'devicon-html5-plain colored' },
  { n: 'CSS3', icon: 'devicon-css3-plain colored' },
  { n: 'Node.js', icon: 'devicon-nodejs-plain colored' },
  { n: 'Express.js', icon: 'devicon-express-original' },
  { n: 'RESTful APIs', label: 'REST' },
  { n: 'JWT Auth', label: 'JWT' },
  { n: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
  { n: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
  { n: 'Git / GitHub', icon: 'devicon-github-original' },
  { n: 'Data Structures', label: 'DSA' },
  { n: 'Algorithms', label: 'ALGO' },
  { n: 'OOP', label: 'OOP' },
  { n: 'DBMS', label: 'DBMS' },
  { n: 'Machine Learning', label: 'ML', ai: true },
  { n: 'Model Evaluation', label: 'EVAL', ai: true },
  { n: 'Mongoose', label: 'MNGS' },
  { n: 'Axios', label: 'AXIOS' },
  { n: 'JDBC', label: 'JDBC' },
];

export default function Skills() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const core = coreRef.current;
    if (!wrap || !core) return;

    const R = Math.min(225, Math.max(155, wrap.clientWidth * 0.28));
    const N = SKILLS.length;
    const golden = Math.PI * (3 - Math.sqrt(5));

    // Build points on sphere surface (Fibonacci)
    type Point = {
      base: { x: number; y: number; z: number };
      ai: boolean;
      hovered: boolean;
      el: HTMLElement;
    };

    const points: Point[] = SKILLS.map((s, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const rY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const el = document.createElement('div');
      el.style.cssText = `
        position:absolute; top:0; left:0; width:60px; height:60px;
        display:flex; align-items:center; justify-content:center;
        border-radius:16px; backdrop-filter:blur(8px);
        background:${s.ai ? 'rgba(83,216,201,.07)' : 'var(--panel-2)'};
        border:1px solid ${s.ai ? 'rgba(83,216,201,.35)' : 'var(--line)'};
        box-shadow:0 10px 24px -12px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.025) inset;
        transform:translate(-50%,-50%);
        will-change:transform,opacity;
        pointer-events:auto;
        cursor:pointer;
        transition:border-color .2s ease, background .2s ease;
      `;
      el.setAttribute('data-label', s.n);

      if ('icon' in s && s.icon) {
        const icon = document.createElement('i');
        icon.className = s.icon;
        icon.style.fontSize = '26px';
        el.appendChild(icon);
      } else {
        const span = document.createElement('span');
        span.textContent = (s as { label: string }).label;
        span.style.cssText = `font-family:var(--mono); font-size:12px; font-weight:600; letter-spacing:.02em; color:${s.ai ? 'var(--signal)' : 'var(--text-dim)'};`;
        el.appendChild(span);
      }

      // Tooltip
      const tip = document.createElement('div');
      tip.textContent = s.n;
      tip.style.cssText = `
        position:absolute; bottom:120%; left:50%; transform:translateX(-50%);
        background:var(--panel); border:1px solid var(--line); padding:5px 10px; border-radius:5px;
        font-family:var(--mono); font-size:10.5px; color:var(--text); white-space:nowrap;
        opacity:0; pointer-events:none; transition:opacity .15s ease; z-index:99999;
      `;
      el.appendChild(tip);

      const point: Point = {
        base: { x: Math.cos(theta) * rY * R, y: y * R, z: Math.sin(theta) * rY * R },
        ai: !!s.ai,
        hovered: false,
        el,
      };

      el.addEventListener('mouseenter', () => {
        point.hovered = true;
        tip.style.opacity = '1';
        el.style.borderColor = 'var(--signal)';
        el.style.background = 'var(--panel)';
      });
      el.addEventListener('mouseleave', () => {
        point.hovered = false;
        tip.style.opacity = '0';
        el.style.borderColor = s.ai ? 'rgba(83,216,201,.35)' : 'var(--line)';
        el.style.background = s.ai ? 'rgba(83,216,201,.07)' : 'var(--panel-2)';
      });

      core.appendChild(el);
      return point;
    });

    // Drag state
    let angleY = 0, angleX = 0.15;
    let dragging = false, lastX = 0, lastY = 0;
    let velY = 0.0022, velX = 0;

    const pointerDown = (x: number, y: number) => { dragging = true; lastX = x; lastY = y; wrap.style.cursor = 'grabbing'; };
    const pointerMove = (x: number, y: number) => {
      if (!dragging) return;
      const dx = x - lastX, dy = y - lastY;
      angleY += dx * 0.006; angleX += dy * 0.006;
      angleX = Math.max(-1.2, Math.min(1.2, angleX));
      velY = dx * 0.0006; velX = dy * 0.0006;
      lastX = x; lastY = y;
    };
    const pointerUp = () => { dragging = false; wrap.style.cursor = 'grab'; };

    const onMouseDown = (e: MouseEvent) => pointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => pointerMove(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => { const t = e.touches[0]; if (t) pointerDown(t.clientX, t.clientY); };
    const onTouchMove = (e: TouchEvent) => { const t = e.touches[0]; if (t) pointerMove(t.clientX, t.clientY); };
    wrap.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', pointerUp);
    wrap.addEventListener('touchstart', onTouchStart, { passive: true });
    wrap.addEventListener('touchmove', onTouchMove, { passive: true });
    wrap.addEventListener('touchend', pointerUp);

    const perspective = 560;
    let rafId: number;

    const render = () => {
      rafId = requestAnimationFrame(render);
      if (!dragging) {
        angleY += velY; angleX += velX;
        velY += (0.0022 - velY) * 0.02;
        velX += (0 - velX) * 0.04;
        angleX = Math.max(-1.2, Math.min(1.2, angleX));
      }
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);

      points.forEach((p) => {
        let { x, y, z } = p.base;
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const scale = perspective / (perspective - z2);
        const sx = x1 * scale, sy = y1 * scale;
        const depth = (z2 + R) / (2 * R);
        const opacity = 0.28 + depth * 0.72;

        p.el.style.transform = `translate(-50%,-50%) translate(${sx}px,${sy}px) scale(${(0.72 + depth * 0.5).toFixed(3)})`;
        p.el.style.opacity = opacity.toFixed(2);
        p.el.style.filter = `brightness(${(0.72 + depth * 0.42).toFixed(2)}) drop-shadow(0 0 ${Math.round(4 + depth * 10)}px ${p.ai ? 'rgba(83,216,201,.34)' : 'rgba(120,160,190,.12)'})`;
        p.el.style.zIndex = p.hovered ? '99999' : String(Math.round(z2 + 1000));
      });
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', pointerUp);
      wrap.removeEventListener('mousedown', onMouseDown);
      wrap.removeEventListener('touchstart', onTouchStart);
      wrap.removeEventListener('touchmove', onTouchMove);
      while (core.firstChild) core.removeChild(core.firstChild);
    };
  }, []);

  return (
    <section id="skills" className="sec">
      <div className="eyebrow">02 / Capabilities</div>
      <h2 className="sec-title reveal">Toolkit</h2>
      <p className="sec-desc reveal">
        The stack I reach for when a model needs to become a product — drag the sphere to explore.
      </p>

      <div
        className="reveal"
        style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 56, alignItems: 'center' }}
      >
        <div>
          {/* Globe */}
          <div
            ref={wrapRef}
            style={{
              position: 'relative',
              height: 560,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'none',
              borderRadius: 20,
              overflow: 'hidden',
              background: 'radial-gradient(circle at 50% 42%, #131b28 0%, var(--ink) 72%)',
            }}
          >
            {/* Dot grid */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1.4px)',
                backgroundSize: '24px 24px',
                WebkitMaskImage: 'radial-gradient(circle at 50% 46%, #000 46%, transparent 72%)',
                maskImage: 'radial-gradient(circle at 50% 46%, #000 46%, transparent 72%)',
                opacity: 0.6,
              }}
            />
            {/* Layered globe atmosphere */}
            <div style={{ position: 'absolute', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(83,216,201,.16), rgba(83,216,201,0) 68%)', pointerEvents: 'none', filter: 'blur(2px)' }} />
            <div style={{ position: 'absolute', width: 430, height: 250, border: '1px solid rgba(83,216,201,.22)', borderRadius: '50%', transform: 'rotate(-18deg)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: 320, height: 320, border: '1px solid var(--line-soft)', borderRadius: '50%', boxShadow: '0 0 50px rgba(83,216,201,.08), inset 0 0 40px rgba(83,216,201,.06)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: 190, height: 190, border: '1px dashed rgba(83,216,201,.2)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', zIndex: 1, padding: '8px 12px', borderRadius: 99, border: '1px solid rgba(83,216,201,.28)', background: 'rgba(8,14,20,.72)', color: 'var(--signal)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', pointerEvents: 'none', boxShadow: '0 0 24px rgba(83,216,201,.12)' }}>Learning in public</div>
            {/* Tag core */}
            <div ref={coreRef} style={{ position: 'relative', width: 0, height: 0, zIndex: 2 }} />
          </div>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: 'var(--text-faint)',
              textAlign: 'center',
              marginTop: 8,
              letterSpacing: '.03em',
            }}
          >
            Drag to rotate · auto-spins on release
          </p>
        </div>

        {/* Side legend */}
        <div>
          <h3 style={{ fontFamily: 'var(--disp)', fontSize: 17, fontWeight: 600, marginBottom: 14, color: 'var(--text)' }}>
            AI-first toolkit, always evolving
          </h3>
          <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 22 }}>
            Cyan-lit tags are the AI learning layer — Generative AI, Agentic AI, ML, Gemini, OpenAI, RAG, and MCP — supported by
            the full-stack foundation that ships it.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { sw: 'ai', label: 'AI & Automation' },
              { sw: 'default', label: 'Languages · Frontend · Backend · Data · CS Fundamentals' },
            ].map(({ sw, label }) => (
              <div
                key={sw}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  color: 'var(--text-dim)',
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: sw === 'ai' ? 'var(--signal)' : 'var(--text-faint)',
                    boxShadow: sw === 'ai' ? '0 0 8px var(--signal)' : 'none',
                  }}
                />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #skills .reveal > div { grid-template-columns: 1fr !important; gap: 34px !important; }
        }
      `}</style>
    </section>
  );
}


