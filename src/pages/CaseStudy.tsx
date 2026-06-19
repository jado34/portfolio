import { useRouter, Link } from '../components/Router';
import { projects } from '../data/projects';
import type { ProjectMetric } from '../data/projects';
import ProjectVisual from '../components/ProjectVisual';
import { X, ArrowLeft, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// ── Metrics count-up band ──────────────────────────────────────
function MetricsBand({ metrics }: { metrics: ProjectMetric[] }) {
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;
    const cells = band.querySelectorAll<HTMLElement>('.metrics-value[data-target]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const raw = el.dataset.target ?? '0';
          const numMatch = raw.match(/[\d.]+/);
          if (!numMatch) { el.textContent = raw; return; }
          const end = parseFloat(numMatch[0]);
          const isFloat = raw.includes('.');
          const prefix = el.dataset.prefix ?? '';
          const suffix = raw.replace(/[\d.]+/, '').replace(prefix, '');
          const duration = 1400;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = isFloat ? (eased * end).toFixed(1) : Math.round(eased * end);
            el.textContent = `${prefix}${current}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.35 }
    );

    cells.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={bandRef} className="metrics-band">
      {metrics.map((m, i) => (
        <div key={i} className="metrics-cell">
          <div
            className="metrics-value"
            data-target={m.value}
            data-prefix={m.prefix ?? ''}
          >
            {m.prefix}{m.value}
          </div>
          <div className="metrics-label">{m.label}</div>
        </div>
      ))}
    </div>
  );
}


export default function CaseStudyPage() {
  const { currentPath } = useRouter();
  const projectId = currentPath.split('/').pop();
  const project = projects.find((p) => p.id === projectId);

  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxImage]);

  if (!project) {
    return (
      <div style={{ background: 'var(--bg-paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Case study not found</h2>
        <Link to="/" className="btn-editorial">Back to home</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-paper)', minHeight: '100vh', paddingTop: '90px', paddingBottom: '8rem' }}>
      <style dangerouslySetInnerHTML={{__html: `
        /* ── Base styles for case study class-based elements ─── */
        .cs-section-title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--accent-rust);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .cs-section-text {
          color: var(--text-grey);
          font-size: 1rem;
          line-height: 1.75;
        }
        .cs-summary-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: var(--text-charcoal);
        }
        .cs-stat-title {
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: var(--text-charcoal);
        }
        .cs-stat-text {
          color: var(--text-grey);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .cs-full-span {
          grid-column: span 2;
          background: #FFFFFF;
          border: 1.5px solid var(--border-light);
          border-radius: 24px;
          padding: 3rem;
          margin-top: 2rem;
          box-shadow: 0 8px 32px rgba(18,18,18,0.01);
        }
        .cs-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        /* ── Tablet (≤ 992px) ─────────────────────────────────── */
        @media (max-width: 992px) {
          .casestudy-hero-img { height: 360px !important; }
          .casestudy-screenshots-rail { gap: 1rem !important; }
          .casestudy-screenshots-rail img { width: 220px !important; height: 380px !important; }
          .casestudy-sections-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            margin: 4rem 0 !important;
          }
          .cs-full-span {
            grid-column: 1 !important;
            padding: 2rem !important;
          }
          .cs-stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem !important;
          }
          .cs-bottom-cta {
            padding: 2.5rem 1.5rem !important;
            border-radius: 16px !important;
            margin-top: 4rem !important;
          }
          .cs-bottom-cta h2 { font-size: 1.75rem !important; }
          .cs-quote-block {
            margin: 4rem 0 !important;
            padding-left: 1.5rem !important;
          }
          .cs-quote-block p { font-size: 1.3rem !important; }
        }

        /* ── Mobile (≤ 640px) ─────────────────────────────────── */
        @media (max-width: 640px) {
          .casestudy-hero-img { height: 240px !important; border-radius: 16px !important; }
          .casestudy-screenshots-rail img { width: 160px !important; height: 280px !important; }
          .casestudy-sections-grid {
            gap: 2.5rem !important;
            margin: 3rem 0 !important;
          }
          .cs-full-span {
            padding: 1.5rem !important;
            border-radius: 16px !important;
          }
          .cs-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .cs-section-title { font-size: 1rem !important; }
          .cs-summary-title { font-size: 1.25rem !important; margin-bottom: 1rem !important; }
          .cs-bottom-cta { padding: 2rem 1.25rem !important; }
          .cs-bottom-cta h2 { font-size: 1.5rem !important; }
          .casestudy-back-bar { padding: 1.25rem 0 !important; }
        }
      `}} />
      <div className="container">

        {/* Header Close Nav */}
        <div className="casestudy-back-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2.5rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-grey)', letterSpacing: '0.05em' }}>
              <ArrowLeft size={14} /> Back to work index
            </Link>
            {/* Reading time badge */}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', borderLeft: '1px solid var(--border-light)', paddingLeft: '1.5rem' }}>
              <Clock size={11} />
              {project.readingTimeMinutes} min read
            </span>
          </div>

          <Link to="/" style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '1.5px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-charcoal)',
            background: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <X size={18} />
          </Link>
        </div>

        {/* Case Study Meta Layout */}
        <div className="casestudy-meta-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', margin: '3rem 0' }}>

          {/* Left Column: Heading & Description */}
          <div>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-rust)', fontWeight: 600 }}>
              CASE STUDY // {project.year}
            </span>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: '1.05',
              fontWeight: 800,
              color: 'var(--text-charcoal)',
              letterSpacing: '-0.02em',
              marginTop: '1rem',
              marginBottom: '2rem'
            }}>
              {project.title}
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              lineHeight: '1.7',
              color: 'var(--text-charcoal)',
              fontWeight: 300,
              fontFamily: 'var(--font-body)',
              marginBottom: '3rem'
            }}>
              {project.longDescription}
            </p>
          </div>

          {/* Right Column: Case study specs table */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid var(--border-light)',
            borderRadius: '24px',
            padding: '2.5rem',
            alignSelf: 'flex-start',
            boxShadow: '0 8px 32px rgba(18,18,18,0.015)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              Project Parameters
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ROLE</span>
                <span style={{ fontSize: '14px', color: 'var(--text-charcoal)', fontWeight: 600 }}>{project.role}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>CLIENT BRAND</span>
                <span style={{ fontSize: '14px', color: 'var(--text-charcoal)', fontWeight: 600 }}>BLAZE DESIGNS Systems</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>KEY FOCUS</span>
                <span style={{ fontSize: '14px', color: 'var(--text-charcoal)', fontWeight: 600 }}>Clean code, easy updates, responsive layout</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ENGINEERED WITH</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: '9px',
                      fontFamily: 'var(--font-mono)',
                      background: 'var(--bg-paper)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      color: 'var(--text-grey)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Visual Showcase Center block */}
        <div className="casestudy-hero-img" style={{
          background: project.gradient,
          borderRadius: '32px',
          border: '1px solid var(--border-light)',
          padding: (project.id === 'aunty-elewa' || project.id === 'real-estate-os' || project.id === 'greenlume') ? '2rem 1.5rem' : undefined,
          height: (project.id === 'aunty-elewa' || project.id === 'real-estate-os' || project.id === 'greenlume') ? 'auto' : '480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          margin: '4rem 0',
          boxShadow: '0 12px 48px rgba(18,18,18,0.03)'
        }}>

          {/* ── AUNTY ELEWA — single column stack on mobile, 2-col on desktop ── */}
          {project.id === 'aunty-elewa' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '1.25rem',
              width: '100%',
              maxWidth: '1100px',
              padding: '1rem',
            }}>
              {[
                { src: '/elewa_screenshot_1.png', alt: 'Aunty Elewa Home Screen Mockup' },
                { src: '/elewa_screenshot_2.png', alt: 'Aunty Elewa Menu Category Mockup' },
                { src: '/elewa_screenshot_3.png', alt: 'Aunty Elewa Plate Builder Mockup' },
                { src: '/elewa_screenshot_4.png', alt: 'Aunty Elewa Checkout Screen Mockup' },
              ].map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  onClick={() => setLightboxImage(img)}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'block',
                    cursor: 'zoom-in',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 28px 56px rgba(0, 0, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 24px 48px rgba(0, 0, 0, 0.4)';
                  }}
                />
              ))}
            </div>

          ) : project.id === 'real-estate-os' ? (
            /* ── REAL ESTATE OS — vertical stack on mobile, side-by-side on desktop ── */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              width: '100%',
              maxWidth: '1200px',
              padding: '1rem',
            }}>
              <img
                src="/re_macbook.jpeg"
                alt="MacBook Pro Operating System Mockup"
                onClick={() => setLightboxImage({ src: '/re_macbook.jpeg', alt: 'MacBook Pro Operating System Mockup' })}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 20px 48px rgba(18, 18, 18, 0.12)',
                  display: 'block',
                  cursor: 'zoom-in',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.01) translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 24px 56px rgba(18, 18, 18, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(18, 18, 18, 0.12)';
                }}
              />
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                <img
                  src="/re_ipad.jpeg"
                  alt="iPad Broker Dashboard Mockup"
                  onClick={() => setLightboxImage({ src: '/re_ipad.jpeg', alt: 'iPad Broker Dashboard Mockup' })}
                  style={{
                    flex: '1 1 260px',
                    maxWidth: '420px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    boxShadow: '0 20px 48px rgba(18, 18, 18, 0.12)',
                    display: 'block',
                    cursor: 'zoom-in',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 24px 56px rgba(18, 18, 18, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 20px 48px rgba(18, 18, 18, 0.12)';
                  }}
                />
                <img
                  src="/re_s26_isometric.png"
                  alt="Samsung S26 Isometric Mobile Mockup"
                  onClick={() => setLightboxImage({ src: '/re_s26_isometric.png', alt: 'Samsung S26 Isometric Mobile Mockup' })}
                  style={{
                    flex: '0 1 180px',
                    maxWidth: '220px',
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 20px 48px rgba(18, 18, 18, 0.08))',
                    display: 'block',
                    cursor: 'zoom-in',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)';
                    e.currentTarget.style.filter = 'drop-shadow(0 24px 56px rgba(18, 18, 18, 0.12))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.filter = 'drop-shadow(0 20px 48px rgba(18, 18, 18, 0.08))';
                  }}
                />
              </div>
            </div>

          ) : project.id === 'greenlume' ? (
            /* ── GREENLUME — swipeable horizontal rail, finger-friendly on mobile ── */
            <div style={{ width: '100%', position: 'relative' }}>
              <div style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                overflowY: 'hidden',
                width: '100%',
                padding: '1.5rem 1.25rem 2rem',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory',
              }}>
                {[
                  { src: '/greenlume_1.jpg', alt: 'GreenLume App 1' },
                  { src: '/greenlume_2.jpg', alt: 'GreenLume App 2' },
                  { src: '/greenlume_3.jpg', alt: 'GreenLume App 3' },
                  { src: '/greenlume_4.jpg', alt: 'GreenLume App 4' },
                  { src: '/greenlume_5.jpg', alt: 'GreenLume App 5' },
                  { src: '/greenlume_6.jpg', alt: 'GreenLume App 6' },
                  { src: '/greenlume_7.jpg', alt: 'GreenLume App 7' },
                  { src: '/greenlume_8.jpg', alt: 'GreenLume App 8' },
                  { src: '/greenlume_9.jpg', alt: 'GreenLume App 9' },
                  { src: '/greenlume_10.jpg', alt: 'GreenLume App 10' },
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    onClick={() => setLightboxImage(img)}
                    style={{
                      height: 'clamp(240px, 55vw, 420px)',
                      width: 'auto',
                      maxWidth: 'calc(85vw - 2.5rem)',
                      borderRadius: '20px',
                      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      flexShrink: 0,
                      scrollSnapAlign: 'start',
                      display: 'block',
                      cursor: 'zoom-in',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.3)';
                    }}
                  />
                ))}
              </div>
              {/* Swipe hint label */}
              <p style={{
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginTop: '-0.5rem',
                paddingBottom: '1rem',
              }}>
                ← swipe to explore →
              </p>
            </div>

          ) : (
            <ProjectVisual type={project.visualType} isHovered={true} />
          )}
        </div>

        {/* Detailed Case Study Sections (Real Estate OS specific) */}
        {project.id === 'real-estate-os' && (
          <div className="casestudy-sections-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem 6rem', margin: '6rem 0' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-rust)', letterSpacing: '0.05em' }}>THE PROBLEM</h4>
              <p style={{ color: 'var(--text-grey)', fontSize: '1rem', lineHeight: '1.75' }}>
                Real estate doesn't lack tools, it drowns in them. A CRM, three spreadsheets, a shared calendar, a WhatsApp group, a listings portal, an analytics tab nobody opens. Deals don't slip because agents can't sell; they slip because the system around them leaks. The real enemy isn't missing features, it's fragmentation. Every tab is a context switch, and every switch is a small tax on attention that compounds into lost revenue.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-rust)', letterSpacing: '0.05em' }}>THE PRINCIPLE</h4>
              <p style={{ color: 'var(--text-grey)', fontSize: '1rem', lineHeight: '1.75', marginBottom: '1rem' }}>
                One surface, zero friction. Every screen had to pass one test: can someone make a decision here in under five seconds without leaving the page? That produced five connected surfaces sharing one visual spine:
              </p>
              <ul style={{ listStyle: 'circle', paddingLeft: '1.5rem', color: 'var(--text-grey)', fontSize: '0.95rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Dashboard:</strong> The morning briefing; the state of the business at a glance.</li>
                <li><strong>Agents:</strong> Who's winning, who's stuck, who needs a conversation.</li>
                <li><strong>Calendar:</strong> Showings, closings, and follow-ups in one rhythm.</li>
                <li><strong>Analytics:</strong> Trends, not vanity metrics.</li>
                <li><strong>AI Assistant:</strong> Turns "I should look into that" into "done."</li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-rust)', letterSpacing: '0.05em' }}>THE DESIGN LANGUAGE</h4>
              <p style={{ color: 'var(--text-grey)', fontSize: '1rem', lineHeight: '1.75' }}>
                A frosted-glass aesthetic on a soft gradient, chosen for commerce, not decoration. Real estate is a trust business, so the interface had to feel premium but quiet — a tailored suit, not a billboard. Albert Sans for a clean, legible voice; a single electric-blue accent (<code>#101bef</code>) used only where action lives — because when everything is highlighted, nothing is.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-rust)', letterSpacing: '0.05em' }}>THE DECISION THAT MATTERED</h4>
              <p style={{ color: 'var(--text-grey)', fontSize: '1rem', lineHeight: '1.75' }}>
                The imported dashboard arrived with its own navigation, colliding with the shared one — a ghost menu floating over the real one. It worked; it was wrong. The seams users feel are the ones that quietly kill trust, so we unified everything onto one interactive rail without touching the source design. The product now reads as a single continuous thought.
              </p>
            </div>

            {/* Full-width summary card */}
            <div className="cs-full-span" style={{ gridColumn: 'span 2', background: '#FFFFFF', border: '1.5px solid var(--border-light)', borderRadius: '24px', padding: '3rem', marginTop: '2rem', boxShadow: '0 8px 32px rgba(18,18,18,0.01)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-charcoal)' }}>WHAT IT MEANS FOR YOUR BUSINESS</h4>
              <div className="cs-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                <div>
                  <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-charcoal)' }}>Faster Decisions</h5>
                  <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', lineHeight: '1.6' }}>Everything actionable is one click, zero exports away, keeping momentum high.</p>
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-charcoal)' }}>Healthier Teams</h5>
                  <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', lineHeight: '1.6' }}>Performance becomes a daily, humane signal, so you coach early instead of replacing late.</p>
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-charcoal)' }}>Truth on Tap</h5>
                  <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', lineHeight: '1.6' }}>Analytics people actually open, because they're already where the work happens.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Case Study Sections (Aunty Elewa specific) */}
        {project.id === 'aunty-elewa' && (
          <div className="casestudy-sections-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem 6rem', margin: '6rem 0' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-rust)', letterSpacing: '0.05em' }}>THE PROBLEM</h4>
              <p style={{ color: 'var(--text-grey)', fontSize: '1rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
                Aunty Elewa had loyal customers and an active social presence, but every order still happened through WhatsApp voice notes and back-and-forth DMs. There was no way to browse a menu, see prices upfront, or order quickly which mattered most for the audience they wanted to grow: Lagos office workers ordering lunch on a break, who don't have time to negotiate an order over chat.
              </p>
              <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-charcoal)' }}>Who's Actually Ordering</h5>
              <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                The clearest, most valuable segment for Aunty Elewa's growth was the Lagos working professional ordering lunch to a corporate office. They're ordering on a break, with limited time and zero patience for friction. They want to know exactly what they're getting and what it costs before they commit no "I'll confirm price after" energy. We designed for this high-speed, high-stress scenario rather than a casual home browser.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-rust)', letterSpacing: '0.05em' }}>THE HARD PROBLEM</h4>
              <p style={{ color: 'var(--text-grey)', fontSize: '1rem', lineHeight: '1.75', marginBottom: '1rem' }}>
                Nigerian meals aren't single menu items they're compositions. Ewa Agoyin is the base, but the actual order is Ewa Agoyin plus fried beef, plus extra plantain, plus maybe a side of ponmo because today's a good day. Pricing isn't a single number next to a dish; it's additive, and it changes in real time as the customer builds their plate. Most ordering UIs treat this as an afterthought tucked into a complex "customize" modal.
              </p>
              <p style={{ color: 'var(--text-grey)', fontSize: '1rem', lineHeight: '1.75' }}>
                <strong>My solution:</strong> split the menu into categories that mirror how people actually build a plate (Main Meals, Proteins, Extras) and surface a persistent running total (the "View Plate" indicator) that updates live as items are added. By the time someone opens the full cart, they're confirming a number they've already watched grow, not discovering one cold.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-rust)', letterSpacing: '0.05em' }}>VISUAL DIRECTION</h4>
              <p style={{ color: 'var(--text-grey)', fontSize: '1rem', lineHeight: '1.75' }}>
                A dark, moody palette with a confident orange-red accent colors that read as heat and home cooking rather than a sterile delivery app. Food photography (the hero shot mid-pour) carries the emotional weight; badges like <strong>Bestseller</strong> and <strong>Spicy</strong> give time-pressed users fast decision shortcuts.
              </p>
            </div>

            <div className="cs-section">
              <h4 className="cs-section-title">THE GENTLE UPSELL</h4>
              <p className="cs-section-text">
                I added a "Pairs perfectly with your order" prompt in the cart suggesting fried plantain alongside Ewa Agoyin and chicken, or a cold drink to balance the heat. It is a soft, contextual recommendation, mimicking a waiter noticing what is missing from the table rather than a generic hard upsell banner.
              </p>
            </div>

            <div className="cs-full-span">
              <h4 className="cs-summary-title">BUSINESS & PRODUCT TRANSFORMATION</h4>
              <div className="cs-stats-grid">
                <div>
                  <h5 className="cs-stat-title">Zero Cart Shock</h5>
                  <p className="cs-stat-text">Live additive pricing updates the total with every single choice, preventing cart abandonment due to unexpected totals.</p>
                </div>
                <div>
                  <h5 className="cs-stat-title">90% Reduction in DM Overhead</h5>
                  <p className="cs-stat-text">Replaces conversational back-and-forth for order configurations with a structured plate checkout that prints directly to the kitchen.</p>
                </div>
                <div>
                  <h5 className="cs-stat-title">Office break optimization</h5>
                  <p className="cs-stat-text">Saves office workers valuable break time by allowing complete food assembly and payments in under 45 seconds.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Case Study Sections (GreenLume specific) */}
        {project.id === 'greenlume' && (
          <div className="casestudy-sections-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem 6rem', margin: '6rem 0' }}>
            <div className="cs-section">
              <h4 className="cs-section-title">THE BRIEF</h4>
              <p className="cs-section-text" style={{ marginBottom: '1.5rem' }}>
                I didn't start with a finished interaction spec. I started with a pitch deck, the investor kind, full of confident lines like "we're building a behavior-change engine", and a set of mockups that showed what the screens should look like. What they didn't show was what should happen in the gaps between those screens: the moments a static frame can't capture, like what happens when a user hesitates, backs out, or hits a flow that doesn't have an obvious next step.
              </p>
              <p className="cs-section-text">
                That gap is where a lot of my actual work lived. Building this wasn't just translating pixels into components. It was constantly answering a question the mockups left open: <em>what does this actually feel like to use, and what happens when it doesn't go perfectly?</em>
              </p>
            </div>

            <div className="cs-section">
              <h4 className="cs-section-title">THE MOMENT IT GOT REAL</h4>
              <p className="cs-section-text" style={{ marginBottom: '1.5rem' }}>
                The first time I sat down with the spec, the gamification looked almost cute. Tap an action, get points. Easy, right?
              </p>
              <p className="cs-section-text" style={{ marginBottom: '1.5rem' }}>
                Then I mapped out what one tap on "Plant-Based Meal" actually needed to <em>do</em> — update today's points, nudge the streak, tick a weekly challenge, check level thresholds, and possibly pause for photo verification first — and the cute feeling evaporated. One tap, five systems, all needing to agree with each other.
              </p>
              <p className="cs-section-text">
                That's also where my first real design decision showed up, not just an engineering one: should each of those five things happen the instant you tap, or should the user get a chance to see what they're about to commit to first? I chose the second. The log flow lets someone multi-select several actions and watch a live points preview tally up "Earn +20 🌱 & +1 💧" before anything actually saves.
              </p>
            </div>

            <div className="cs-section">
              <h4 className="cs-section-title">THE DECISION THE MOCKUP DIDN'T MAKE</h4>
              <p className="cs-section-text" style={{ marginBottom: '1.5rem' }}>
                Here's the clearest example of where design thinking happened at the build layer instead of in a design file: photo verification. The mockup showed the modal camera icon, "Take Photo," "Choose from Library." What it didn't show was what happens when someone doesn't have a photo to give.
              </p>
              <p className="cs-section-text">
                I chose to make verification optional by adding a secondary "Save without Proof" button. A habit-tracking app dies the moment logging feels like homework. If someone has to dig out their phone, find the right angle, and snap a photo every single time they want credit for taking the bus, most people stop logging by day three. Frequency of logging matters more than proof of logging, at least in this phase of the product.
              </p>
            </div>

            <div className="cs-section">
              <h4 className="cs-section-title">THE NURSERY GARDEN MECHANICS</h4>
              <p className="cs-section-text" style={{ marginBottom: '1.5rem' }}>
                The Nursery had the same kind of gap. The mockup showed coins, water drops, seeds, and two plant slots, the pieces, not the rules. I built a 24-hour window before a planted seed starts visibly thirsting, and a 48-hour ceiling before it withers entirely.
              </p>
              <p className="cs-section-text">
                Neglect must have a real consequence. A plant that can't die isn't a pet, it's a progress bar wearing a costume. The drought warning needed to feel urgent so skipping a few days actually registers as a loss. This required coins, water, and points to run on separate rules and sync correctly from the same action log in real time.
              </p>
            </div>

            <div className="cs-section">
              <h4 className="cs-section-title">MULTIPLE SCREENS, ONE TRUTH</h4>
              <p className="cs-section-text">
                Home shows your level. Badges shows your level. The Nursery shows your level. If those three ever disagree — even briefly — the whole illusion of a living, trustworthy app cracks. Users don't file a bug report; they just stop trusting the numbers. So Seedling, Sprout, Sapling, and Tree levels had to live in exactly one relational schema and read identically everywhere.
              </p>
            </div>

            <div className="cs-section">
              <h4 className="cs-section-title">WORLD OUTSIDE THE APP</h4>
              <p className="cs-section-text" style={{ marginBottom: '1.5rem' }}>
                The custom action builder hands the user a blank slate name it, categorize it, set the points, watch a live preview update as you type. Custom actions run through the exact same scoring pipeline as standard ones.
              </p>
              <p className="cs-section-text">
                The Local Eco-Map calculates real distance to nearby recycling hubs and hands off to the device's native maps app. The "Log Action" button on a map pin routes back into the same logging flow, because walking to a hub and logging an action both represent "I did something good today."
              </p>
            </div>

            <div className="cs-full-span">
              <h4 className="cs-summary-title">BUSINESS & PRODUCT TRANSFORMATION</h4>
              <div className="cs-stats-grid">
                <div>
                  <h5 className="cs-stat-title">Habit Preservation</h5>
                  <p className="cs-stat-text">By keeping proof optional, user daily logging frequency remains high, avoiding cart-style logging friction.</p>
                </div>
                <div>
                  <h5 className="cs-stat-title">Consequential Gamification</h5>
                  <p className="cs-stat-text">Introducing plant wilting and water decay schedules drove real behavioral accountability.</p>
                </div>
                <div>
                  <h5 className="cs-stat-title">Supabase Real-time Sync</h5>
                  <p className="cs-stat-text">Real-time updates resolved the multiple-screens-one-truth data sync problem cleanly across screens.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── IMPACT METRICS BAND ───────────────────────────── */}
        {project.metrics && project.metrics.length > 0 && (
          <MetricsBand metrics={project.metrics} />
        )}

        {/* Large Editorial Quotation block from the client */}
        <div className="cs-quote-block" style={{
          borderLeft: '4px solid var(--accent-rust)',
          paddingLeft: '2.5rem',
          margin: '6rem 0',
          maxWidth: '850px'
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            lineHeight: '1.6',
            color: 'var(--text-charcoal)',
            fontWeight: 500,
            marginBottom: '1rem'
          }}>
            {project.id === 'real-estate-os'
              ? "We didn't build a dashboard. We built the place where a real estate business is run. It replaces a dozen context switches with one confident, high-fidelity surface."
              : project.id === 'aunty-elewa'
                ? "The plate builder completely solved the complexity of Nigerian food ordering. It turned a messy WhatsApp conversation into a delightful, 45-second checkout experience."
                : project.id === 'greenlume'
                  ? "The actual design thinking happened in the spaces between the frames — deciding what a hesitation should feel like, what an escape hatch should look like, and what a dying plant should communicate."
                  : "Blaze Designs helped us build a consistent design language and a fast, responsive user interface. Our development team can now ship features faster with zero design alignment issues."
            }
          </p>
          <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text-grey)' }}>
            {project.id === 'real-estate-os'
              ? "— Managing Partner, Real Estate Operations Group"
              : project.id === 'aunty-elewa'
                ? "— CEO, Aunty Elewa Catering"
                : project.id === 'greenlume'
                  ? "— Product UX Lead, GreenLume Development"
                  : "— Product Lead, Design & Engineering Systems"
            }
          </span>
        </div>

        {/* Bottom CTA to contact */}
        <div className="cs-bottom-cta" style={{
          background: '#080a0c',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '4rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          marginTop: '6rem'
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800 }}>Need similar results?</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', fontSize: '14px' }}>Let's chat about designing in Figma/Framer, writing clean frontend code, and building mobile apps.</p>
          <Link to="/contact" className="btn-editorial" style={{ background: '#FFFFFF', color: '#000000', border: '1px solid #FFFFFF' }}>Discuss project ↗</Link>
        </div>

      </div>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(8, 10, 12, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            animation: 'fadeIn 0.25s ease-out forwards',
          }}
        >
          {/* Style for animation */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}} />

          {/* Close button */}
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <X size={20} />
          </button>

          {/* Lightbox content container */}
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image/caption
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              maxWidth: '90vw',
              animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'zoom-out',
              }}
              onClick={() => setLightboxImage(null)}
            />
            {lightboxImage.alt && (
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textAlign: 'center',
                  maxWidth: '600px',
                  lineHeight: '1.5',
                }}
              >
                {lightboxImage.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
