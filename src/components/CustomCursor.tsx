import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'hover' | 'link' | 'image';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [label, setLabel] = useState('');

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Smooth ring follow loop
    const animate = () => {
      const lerpFactor = 0.12; // slightly crisper follow for smaller ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId.current);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest('a, button, [data-cursor]') as HTMLElement | null;

      if (!closest) {
        setCursorState('default');
        setLabel('');
        return;
      }

      const dataCursor = closest.getAttribute('data-cursor');
      if (dataCursor) {
        setCursorState('hover');
        setLabel(dataCursor);
        return;
      }

      // Contextual labels based on element type
      const tag = closest.tagName.toLowerCase();
      if (tag === 'button') {
        setCursorState('hover');
        setLabel('CLICK');
      } else if (tag === 'a') {
        const href = closest.getAttribute('href') || '';
        if (href.startsWith('mailto')) {
          setCursorState('hover');
          setLabel('EMAIL');
        } else if (href.startsWith('http')) {
          setCursorState('hover');
          setLabel('OPEN ↗');
        } else {
          setCursorState('link');
          setLabel('VIEW');
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const to = e.relatedTarget as HTMLElement | null;
      if (!to || to === document.documentElement) return;
      const closest = (e.target as HTMLElement).closest('a, button, [data-cursor]');
      const newClosest = to.closest?.('a, button, [data-cursor]');
      if (closest && !newClosest) {
        setCursorState('default');
        setLabel('');
      }
    };

    const onMouseDown = () => {
      if (dotRef.current) dotRef.current.classList.add('cursor-dot--click');
      if (ringRef.current) ringRef.current.classList.add('cursor-ring--click');
    };

    const onMouseUp = () => {
      if (dotRef.current) dotRef.current.classList.remove('cursor-dot--click');
      if (ringRef.current) ringRef.current.classList.remove('cursor-ring--click');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const isHovered = cursorState === 'hover' || cursorState === 'link';

  return (
    <>
      {/* Outer lagging ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovered ? 'cursor-ring--hovered' : ''}`}
        aria-hidden="true"
      >
        {isHovered && label && (
          <span ref={labelRef} className="cursor-label">
            {label}
          </span>
        )}
      </div>

      {/* Inner instant dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovered ? 'cursor-dot--hovered' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
