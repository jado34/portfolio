import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { transitionTriggerRef } from './Router';

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const label = labelRef.current;
    if (!overlay || !panel || !label) return;

    // Initial state: panel tucked below viewport
    gsap.set(panel, { yPercent: 100 });
    gsap.set(label, { opacity: 0, y: 20 });

    // Register the trigger so Router.navigate() can call this
    transitionTriggerRef.trigger = (targetPath: string) => {
      const commitNav = (window as unknown as Record<string, unknown>).__blazeCommitNav as ((path: string) => void) | undefined;

      const tl = gsap.timeline();

      // Phase 1: Panel sweeps UP — covers the screen
      tl.to(panel, {
        yPercent: 0,
        duration: 0.55,
        ease: 'power3.inOut',
      });

      // Phase 2: Show label
      tl.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.1');

      // Phase 3: Hold briefly, then commit the actual navigation
      tl.call(() => {
        if (commitNav) commitNav(targetPath);
      }, [], '+=0.18');

      // Phase 4: Fade label out
      tl.to(label, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
      }, '+=0.05');

      // Phase 5: Panel sweeps back DOWN — reveals new page
      tl.to(panel, {
        yPercent: -100,
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => {
          // Reset panel position so it's ready for next navigation
          gsap.set(panel, { yPercent: 100 });
        },
      });
    };

    return () => {
      transitionTriggerRef.trigger = null;
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {/* Branding label shown mid-transition */}
        <div
          ref={labelRef}
          style={{
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#FAF8F5',
              letterSpacing: '-0.02em',
            }}
          >
            BLAZE DESIGNS.
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'rgba(250,248,245,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginTop: '8px',
            }}
          >
            ⚡ Product Engineer
          </div>
        </div>
      </div>
    </div>
  );
}
