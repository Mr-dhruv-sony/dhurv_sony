import { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onEnter: () => void;
}

const labels = [
  'booting neural core…',
  'loading model weights…',
  'compiling render graph…',
  'calibrating interface…',
];

export default function Preloader({ onEnter }: PreloaderProps) {
  const [pct, setPct] = useState(0);
  const [label, setLabel] = useState(labels[0]);
  const [showEnter, setShowEnter] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { setTimeout(onEnter, 300); return; }

    let cur = 0;
    timerRef.current = setInterval(() => {
      cur += Math.floor(Math.random() * 9) + 4;
      if (cur >= 100) {
        cur = 100;
        clearInterval(timerRef.current!);
        setLabel('ready.');
        setShowEnter(true);
      } else {
        setLabel(labels[Math.floor((cur / 100) * labels.length) % labels.length]);
      }
      setPct(cur);
    }, 140);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [onEnter]);

  const handleEnter = () => {
    setDone(true);
    setTimeout(onEnter, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-700 ${done ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background: 'var(--ink)' }}
    >
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          letterSpacing: '.18em',
          color: 'var(--text-faint)',
          marginBottom: 38,
          textTransform: 'uppercase',
        }}
      >
        DHRUV KUMAR SONY · PORTFOLIO
      </div>

      <div
        style={{
          fontFamily: 'var(--disp)',
          fontSize: 'clamp(48px,10vw,110px)',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1,
          letterSpacing: '-.02em',
        }}
      >
        {pct}
        <span style={{ color: 'var(--signal)', fontSize: '.4em', verticalAlign: 'top', marginLeft: 4 }}>%</span>
      </div>

      <div
        style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)', marginTop: 18, letterSpacing: '.04em' }}
      >
        {label}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 'min(320px,60vw)',
          height: 1,
          background: 'var(--line)',
          marginTop: 34,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${pct}%`,
            background: 'var(--signal)',
            boxShadow: '0 0 12px var(--signal)',
            transition: 'width .1s linear',
          }}
        />
      </div>

      {/* Enter button */}
      <button
        onClick={handleEnter}
        style={{
          marginTop: 44,
          fontFamily: 'var(--mono)',
          fontSize: 12.5,
          letterSpacing: '.05em',
          color: 'var(--ink)',
          background: 'var(--signal)',
          border: 'none',
          padding: '14px 30px',
          borderRadius: 2,
          cursor: 'pointer',
          opacity: showEnter ? 1 : 0,
          transform: showEnter ? 'translateY(0)' : 'translateY(10px)',
          pointerEvents: showEnter ? 'auto' : 'none',
          transition: 'opacity .5s ease, transform .5s ease, box-shadow .25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 24px rgba(83,216,201,.4)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
        }}
      >
        Enter Portfolio →
      </button>
    </div>
  );
}
