import { useEffect } from 'react';

/**
 * One-time Intersection Observer that adds `.in` class to every `.reveal` element
 * when it enters the viewport. Import and call this hook from a top-level component.
 */
export function useRevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
