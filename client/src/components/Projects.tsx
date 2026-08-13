import { useEffect, useRef } from 'react';

type Project = {
  num: string;
  title: string;
  sub: string;
  bullets: string[];
  link: string;
  stack: string[];
};

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'RideWait',
    sub: 'Crowdsourced real-time transit tracker · PWA',
    bullets: [
      'Turns passenger reports into live bus locations and practical arrival estimates.',
      'A lightweight, zero-install PWA designed to work across cities without depending on a government transport API.',
    ],
    link: 'https://github.com/Mr-dhruv-sony/Ride_wait',
    stack: ['React', 'TypeScript', 'Vite', 'PWA'],
  },
  {
    num: '02',
    title: 'AI Smart Code Translator',
    sub: 'Gemini-powered developer tool · full-stack web app',
    bullets: [
      'Translates, analyzes, and explains programs across C, C++, C#, Java, and Python with Google Gemini AI.',
      'Uses React/Vite, Express, MongoDB, JWT authentication, Google OAuth, and Monaco Editor.',
    ],
    link: 'https://github.com/Mr-dhruv-sony/AI-Powered-Smart-Code-Translator',
    stack: ['Gemini AI', 'React', 'Express', 'MongoDB', 'Monaco'],
  },
  {
    num: '03',
    title: 'NxtBuild',
    sub: 'Agentic AI web app builder · natural language to code',
    bullets: [
      'Generates complete HTML/CSS/JavaScript apps from a chat prompt with Gemini AI and a live preview.',
      'Includes iterative chat refinement, version history, project sharing, and a React + Express + MongoDB stack.',
    ],
    link: 'https://github.com/Mr-dhruv-sony/Nxtbuild',
    stack: ['Agentic AI', 'Gemini', 'React', 'Express', 'MongoDB'],
  },
  {
    num: '04',
    title: 'Half-Step India',
    sub: 'Proactive public infrastructure monitoring platform',
    bullets: [
      'Scores the gradual health of roads, lights, water lines, and public assets before failure.',
      'Combines live dashboards, a Leaflet asset map, threshold alerts, work orders, reports, and role-based access.',
    ],
    link: 'https://github.com/Mr-dhruv-sony/Half-Step-India',
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Leaflet'],
  },
  {
    num: '05',
    title: 'Grievance Hero AI',
    sub: 'AI-assisted consumer complaint drafting and guidance',
    bullets: [
      'Uses Gemini to draft professional complaints, extract key metadata, and provide bilingual consumer-rights guidance.',
      'Explores practical AI assistants with loading states, error handling, and a focused TypeScript interface.',
    ],
    link: 'https://github.com/Mr-dhruv-sony/grievance-hero-ai',
    stack: ['Gemini AI', 'TypeScript', 'AI Assistant', 'Civic Tech'],
  },
  {
    num: '06',
    title: 'Boston House Price Prediction',
    sub: 'Machine learning regression pipeline',
    bullets: [
      'Built a reproducible housing-price regression workflow using a synthetic Boston-style dataset.',
      'Covers preprocessing, feature scaling, model comparison, evaluation, and visual outputs with scikit-learn.',
    ],
    link: 'https://github.com/Mr-dhruv-sony/Boston_Housing',
    stack: ['Python', 'Machine Learning', 'scikit-learn', 'Pandas'],
  },
  {
    num: '07',
    title: 'Handwritten Digit Recognizer',
    sub: 'CNN image classification project · MNIST',
    bullets: [
      'Trains a convolutional neural network to recognize handwritten digits from the MNIST dataset.',
      'Includes a small interactive app and a path toward exporting the model for mobile use.',
    ],
    link: 'https://github.com/Mr-dhruv-sony/Handwritten-digit-recognizer',
    stack: ['Python', 'CNN', 'TensorFlow', 'MNIST'],
  },
  {
    num: '08',
    title: 'Spam Email Classifier',
    sub: 'Classical NLP classification pipeline',
    bullets: [
      'Classifies spam messages using TF-IDF text features and compares Multinomial Naive Bayes with Linear SVM.',
      'Includes training, evaluation, saved models, a comparison chart, and a command-line prediction flow.',
    ],
    link: 'https://github.com/Mr-dhruv-sony/Spam-Email-Classifier',
    stack: ['Python', 'NLP', 'TF-IDF', 'Naive Bayes', 'SVM'],
  },
  {
    num: '09',
    title: 'SkillVerse',
    sub: 'Peer-to-peer learning and skill exchange platform',
    bullets: [
      'Matches students on complementary skills so they can teach, learn, and exchange knowledge without paywalls.',
      'Explores credits, curated resources, community learning, and a Gemini-assisted workflow in a Firebase app.',
    ],
    link: 'https://github.com/Mr-dhruv-sony/skillverse-07',
    stack: ['React', 'TypeScript', 'Firebase', 'Gemini AI', 'Matching'],
  },
];

function TiltCard({ project }: { project: Project }) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const wrap = inner.parentElement;
    if (!wrap) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      inner.style.transform = `rotateX(${(py - 0.5) * -8}deg) rotateY(${(px - 0.5) * 10}deg) translateZ(6px)`;
      inner.style.setProperty('--gx', `${px * 100}%`);
      inner.style.setProperty('--gy', `${py * 100}%`);
    };
    const onLeave = () => { inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)'; };
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="tilt">
      <div
        ref={innerRef}
        className="tilt-inner"
        style={{
          background: 'var(--panel)',
          padding: 38,
          display: 'grid',
          gridTemplateColumns: '80px 1fr 260px',
          gap: 32,
          border: '1px solid var(--line-soft)',
          transition: 'background .25s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--panel-2)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--panel)'; }}
      >
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)' }}>{project.num}</div>
        <div>
          <h3 style={{ fontFamily: 'var(--disp)', fontSize: 24, fontWeight: 600, marginBottom: 4, color: 'var(--text)' }}>
            {project.title}
          </h3>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--signal)', marginBottom: 16, letterSpacing: '.02em' }}>
            {project.sub}
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
            {project.bullets.map((bullet) => (
              <li key={bullet} style={{ color: 'var(--text-dim)', fontSize: 14.5, paddingLeft: 16, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--text-faint)' }}>—</span>
                {bullet}
              </li>
            ))}
          </ul>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--text)', borderBottom: '1px solid var(--signal)', paddingBottom: 2, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color .2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--signal)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
          >
            Open repository ↗
          </a>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignContent: 'flex-start' }}>
          {project.stack.map((stackItem) => <span key={stackItem} className="chip" style={{ fontSize: 10.5 }}>{stackItem}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="sec">
      <div className="eyebrow">04 / Projects</div>
      <h2 className="sec-title reveal">Selected work</h2>
      <p className="sec-desc reveal">
        Public builds spanning Generative AI, Agentic AI, Machine Learning, civic technology, developer tools, and community learning.
      </p>
      <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {PROJECTS.map((project) => <TiltCard key={project.num} project={project} />)}
      </div>
      <div className="reveal" style={{ marginTop: 28 }}>
        <a href="https://github.com/Mr-dhruv-sony?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          Explore all repositories on GitHub ↗
        </a>
      </div>
      <style>{`@media (max-width: 900px) { .tilt-inner[style*="grid-template-columns"] { grid-template-columns: 1fr !important; gap: 16px !important; } }`}</style>
    </section>
  );
}
