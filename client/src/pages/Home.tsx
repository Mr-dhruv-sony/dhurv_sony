import { useState } from 'react';
import Preloader from '@/components/Preloader';
import SideNav from '@/components/SideNav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import { useRevealObserver } from '@/hooks/useRevealObserver';

export default function Home() {
  const [entered, setEntered] = useState(false);
  useRevealObserver();

  return (
    <>
      {/* Preloader gate */}
      {!entered && <Preloader onEnter={() => setEntered(true)} />}

      {/* Noise film grain overlay */}
      <div className="noise" />

      {/* Main layout: sidebar + main */}
      <div className="site-wrap" style={{ opacity: entered ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <SideNav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </main>
      </div>
    </>
  );
}
