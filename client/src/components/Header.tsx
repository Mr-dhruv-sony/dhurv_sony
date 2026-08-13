import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0e27]/95 backdrop-blur-md border-b border-[#1f2937]'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #00d9ff, #7c3aed)' }}
          >
            DS
          </div>
          <span className="text-lg font-bold text-[#00d9ff] hidden sm:inline">Dhruv Sony</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {['about', 'projects', 'experience', 'skills', 'blog', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-[#e5e7eb] hover:text-[#00d9ff] transition-all duration-300 text-sm font-medium capitalize"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => scrollToSection('contact')}
            className="bg-[#00d9ff] text-[#0a0e27] hover:bg-[#7c3aed] hover:text-white transition-all duration-300 text-sm font-semibold"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </header>
  );
}


