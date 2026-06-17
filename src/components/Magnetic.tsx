import { useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactElement;
  strength?: number;
}

export default function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Magnetic pull translation
      gsap.to(container, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      // Return with a spring bounce effect
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: 'elastic.out(1.1, 0.4)',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={containerRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
