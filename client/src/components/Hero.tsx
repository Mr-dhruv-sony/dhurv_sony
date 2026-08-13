import { useEffect, useRef, useState } from 'react';
import AskDhruvChat from './AskDhruvChat';

// Boot lines typed in sequence
const BOOT_LINES = [
  '> initializing_portfolio',
  '> loading model: dhruv-kumar-sony.ai',
  '> status: ready',
];

const STATS = [
  { count: 80, label: '% Faster Code Porting' },
  { count: 100, label: '+ Commuters Served' },
  { count: 200, label: '+ Weekly AI Interactions' },
  { count: 6, label: 'Shipped AI Projects' },
];

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [bootText, setBootText] = useState('> initializing_portfolio');
  const [chatOpen, setChatOpen] = useState(false);
  const [counted, setCounted] = useState(false);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  // Three.js scene
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dynamically import Three.js
    import('three').then((THREE) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 9);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const coreGroup = new THREE.Group();
      const signalColor = 0x53d8c9;
      const amberColor = 0xf3a94e;

      [[2.0, signalColor, 0.9], [2.55, signalColor, 0.35], [3.15, amberColor, 0.16]].forEach(
        ([size, color, op]) => {
          const geo = new THREE.IcosahedronGeometry(size as number, 1);
          const mat = new THREE.MeshBasicMaterial({
            color: color as number,
            wireframe: true,
            transparent: true,
            opacity: op as number,
          });
          coreGroup.add(new THREE.Mesh(geo, mat));
        }
      );

      const coreDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshBasicMaterial({ color: signalColor })
      );
      coreGroup.add(coreDot);
      scene.add(coreGroup);

      const particleCount = window.innerWidth < 700 ? 220 : 420;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const r = 4.2 + Math.random() * 6.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: signalColor,
        size: 0.045,
        transparent: true,
        opacity: 0.55,
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      let targetRotX = 0, targetRotY = 0;
      const onMouseMove = (e: MouseEvent) => {
        targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.6;
        targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener('mousemove', onMouseMove);

      const onResize = () => {
        if (!mount.clientWidth) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', onResize);

      let rafId: number;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        coreGroup.rotation.y += 0.0022;
        coreGroup.rotation.x += 0.0009;
        coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.015;
        coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.015;
        particles.rotation.y -= 0.0007;
        particles.rotation.x += 0.0003;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        renderer.dispose();
      };
    });
  }, []);

  // Boot line typing
  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeLine = () => {
      const line = BOOT_LINES[lineIdx % BOOT_LINES.length];
      charIdx++;
      setBootText(line.slice(0, charIdx));
      if (charIdx < line.length) {
        timer = setTimeout(typeLine, 32);
      } else {
        timer = setTimeout(() => {
          lineIdx++;
          charIdx = 0;
          typeLine();
        }, 1400);
      }
    };
    typeLine();
    return () => clearTimeout(timer);
  }, []);

  // Stat counters
  useEffect(() => {
    if (counted) return;
    const el = document.getElementById('stats-row');
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setCounted(true);
      STATS.forEach((stat, idx) => {
        const dur = 1100;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const val = Math.round(stat.count * (1 - Math.pow(1 - p, 3)));
          setCounts((prev) => prev.map((v, i) => (i === idx ? val : v)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
      io.disconnect();
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [counted]);

  return (
    <>
      <section
        id="home"
        style={{
          minHeight: '100vh',
          padding: '0 60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          borderBottom: '1px solid var(--line-soft)',
        }}
      >
        {/* Three.js canvas */}
        <div
          ref={mountRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
          {/* Boot line */}
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12.5,
              color: 'var(--signal)',
              marginBottom: 26,
              minHeight: 20,
            }}
          >
            {bootText}
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 14,
                background: 'var(--signal)',
                marginLeft: 2,
                verticalAlign: 'middle',
              }}
              className="anim-blink"
            />
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: 'var(--disp)',
              fontWeight: 700,
              letterSpacing: '-.02em',
              fontSize: 'clamp(42px,7.2vw,86px)',
              lineHeight: 0.98,
              marginBottom: 22,
            }}
          >
            Dhruv Kumar
            <br />
            <span style={{ color: 'var(--signal)' }}>Sony</span>
          </h1>

          {/* Role */}
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'clamp(14px,2vw,18px)',
              color: 'var(--text-dim)',
              marginBottom: 34,
              letterSpacing: '.01em',
            }}
          >
            AI/ML Engineer{' '}
            <span style={{ color: 'var(--text-faint)', margin: '0 10px' }}>/</span>
            Full-Stack Developer{' '}
            <span style={{ color: 'var(--text-faint)', margin: '0 10px' }}>/</span>
            B.Tech (AI &amp; ML), 2028
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
            {['Generative AI Systems', 'Autonomous Agents', 'React 19 · Node.js', 'Gemini API · OpenAI API', 'MCP Servers'].map(
              (t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11.5,
                    letterSpacing: '.03em',
                    color: 'var(--text-dim)',
                    border: '1px solid var(--line)',
                    padding: '6px 12px',
                    borderRadius: 20,
                    background: 'var(--panel)',
                  }}
                >
                  {t}
                </span>
              )
            )}
          </div>

          {/* ── pszostak.pl style AI chat trigger ── */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              marginBottom: 32,
              maxWidth: 560,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setChatOpen(true)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 18px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--signal), var(--amber))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                ✦
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-faint)' }}>
                Ask me anything about Dhruv…
              </span>
            </button>
            <div
              style={{
                height: 1,
                background: 'var(--line-soft)',
                margin: '0 18px',
              }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '12px 18px' }}>
              {['Projects', 'Skills', 'Experience', 'Contact'].map((pill) => (
                <button
                  key={pill}
                  onClick={() => {
                    document.getElementById(pill.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: 'var(--text-faint)',
                    border: '1px solid var(--line)',
                    padding: '5px 12px',
                    borderRadius: 20,
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'border-color .2s, color .2s',
                  }}
                  onMouseEnter={(e) => {
                    const t = e.currentTarget;
                    t.style.borderColor = 'var(--signal)';
                    t.style.color = 'var(--signal)';
                  }}
                  onMouseLeave={(e) => {
                    const t = e.currentTarget;
                    t.style.borderColor = 'var(--line)';
                    t.style.color = 'var(--text-faint)';
                  }}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
            <a href="#projects" className="btn btn-primary">View Projects →</a>
            <button
              className="btn btn-ghost"
              onClick={() => setChatOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              ✦ Ask AI About Me
            </button>
          </div>

          {/* Stats */}
          <div
            id="stats-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              borderTop: '1px solid var(--line-soft)',
              maxWidth: 760,
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  paddingTop: 22,
                  borderRight: i < 3 ? '1px solid var(--line-soft)' : 'none',
                  paddingRight: 16,
                  paddingLeft: i > 0 ? 16 : 0,
                }}
              >
                <strong
                  style={{
                    fontFamily: 'var(--disp)',
                    fontSize: 'clamp(22px,2.6vw,30px)',
                    display: 'block',
                    color: 'var(--text)',
                  }}
                >
                  {counts[i]}
                </strong>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10.5,
                    color: 'var(--text-faint)',
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'var(--text-faint)',
            letterSpacing: '.08em',
          }}
        >
          <span>SCROLL</span>
          <span style={{ fontSize: 16 }}>↓</span>
        </div>
      </section>

      <AskDhruvChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
