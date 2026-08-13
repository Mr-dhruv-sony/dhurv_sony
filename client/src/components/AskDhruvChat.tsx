import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const SUGGESTED = [
  'What projects has Dhruv built?',
  'What are his AI skills?',
  'Where can I hire him?',
  'What experience does he have?',
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AskDhruvChat({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (messages.length === 0) {
        setMessages([
          {
            role: 'ai',
            content:
              "Hi! I'm Dhruv's AI assistant. Ask me anything about his skills, projects, experience, or how to reach him.",
          },
        ]);
      }
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role === 'user' ? 'user' : 'model', content: m.content }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', content: data.reply || data.error || 'Something went wrong.' }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Network error. Please reach out to Dhruv directly at mr.dhruvsony@gmail.com!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10,13,18,.85)',
        backdropFilter: 'blur(8px)',
        padding: 24,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(83,216,201,.1), 0 32px 80px rgba(0,0,0,.6)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--signal), var(--amber))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: 'var(--ink)',
                fontWeight: 700,
              }}
            >
              ✦
            </div>
            <div>
              <div style={{ fontFamily: 'var(--disp)', fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
                Ask About Dhruv
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--signal)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--signal)', display: 'inline-block' }} />
                Powered by Gemini AI
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--line)',
              color: 'var(--text-faint)',
              width: 30,
              height: 30,
              borderRadius: 6,
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color .2s, color .2s',
            }}
            onMouseEnter={(e) => { const t = e.currentTarget; t.style.borderColor = 'var(--signal)'; t.style.color = 'var(--signal)'; }}
            onMouseLeave={(e) => { const t = e.currentTarget; t.style.borderColor = 'var(--line)'; t.style.color = 'var(--text-faint)'; }}
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }} className="scrollbar-hide">
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {m.role === 'ai' && (
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--signal), var(--amber))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--ink)', fontWeight: 700, alignSelf: 'flex-end',
                }}>✦</div>
              )}
              <div
                style={{
                  maxWidth: '78%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: m.role === 'user' ? 'var(--signal)' : 'var(--panel-2)',
                  border: m.role === 'user' ? 'none' : '1px solid var(--line)',
                  color: m.role === 'user' ? 'var(--ink)' : 'var(--text)',
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  fontFamily: m.role === 'user' ? 'var(--mono)' : 'var(--body)',
                }}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, var(--signal), var(--amber))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--ink)', fontWeight: 700, alignSelf: 'flex-end',
              }}>✦</div>
              <div style={{
                padding: '10px 16px', borderRadius: '12px 12px 12px 2px',
                background: 'var(--panel-2)', border: '1px solid var(--line)',
                display: 'flex', gap: 5, alignItems: 'center',
              }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} style={{
                    width: 6, height: 6, borderRadius: '50%', background: 'var(--text-faint)',
                    animation: 'pulse-dot 1.2s ease-in-out infinite',
                    animationDelay: `${d * 0.2}s`,
                    display: 'inline-block',
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested (only if no user messages yet) */}
        {messages.filter((m) => m.role === 'user').length === 0 && (
          <div style={{ padding: '0 20px 12px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--text-dim)',
                  border: '1px solid var(--line)',
                  padding: '6px 12px',
                  borderRadius: 20,
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'border-color .2s, color .2s',
                }}
                onMouseEnter={(e) => { const t = e.currentTarget; t.style.borderColor = 'var(--signal)'; t.style.color = 'var(--signal)'; }}
                onMouseLeave={(e) => { const t = e.currentTarget; t.style.borderColor = 'var(--line)'; t.style.color = 'var(--text-dim)'; }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--line)', display: 'flex', gap: 10 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
            placeholder="Ask anything about Dhruv…"
            style={{
              flex: 1,
              background: 'var(--panel-2)',
              border: '1px solid var(--line)',
              borderRadius: 8,
              padding: '10px 14px',
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: 'var(--text)',
              outline: 'none',
              transition: 'border-color .2s',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--signal)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; }}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{
              background: loading || !input.trim() ? 'var(--signal-dim)' : 'var(--signal)',
              color: 'var(--ink)',
              border: 'none',
              borderRadius: 8,
              padding: '10px 18px',
              fontFamily: 'var(--mono)',
              fontSize: 12,
              fontWeight: 600,
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              transition: 'background .2s',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
