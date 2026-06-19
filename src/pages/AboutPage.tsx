import { Layout, Cpu, Settings, Code, Download } from 'lucide-react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';

export default function AboutPage() {
  const introRef = useScrollReveal<HTMLDivElement>();
  const capsRef = useStaggerReveal<HTMLDivElement>();

  return (
    <div style={{ background: 'var(--bg-paper)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '8rem' }}>
      <div className="container">

        {/* Intro */}
        <div ref={introRef} className="scroll-reveal" style={{ maxWidth: '950px', marginBottom: '5rem' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-rust)', fontWeight: 600 }}>
            ABOUT // THE ENGINEER
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
            lineHeight: '1.05',
            fontWeight: 800,
            color: 'var(--text-charcoal)',
            letterSpacing: '-0.02em',
            marginTop: '1rem',
            marginBottom: '2rem'
          }}>
            Obsessed with shipping software people actually use.
          </h1>
          <p style={{
            fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
            lineHeight: '1.75',
            color: 'var(--text-grey)',
            fontWeight: 300,
            fontFamily: 'var(--font-body)',
            maxWidth: '850px'
          }}>
            I am a seasoned Product Engineer & Systems Architect. Over the last 3+ years, I have collaborated with cross-functional teams to eliminate product friction, architect robust designs, and build high-performance frontend applications.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '5rem', alignItems: 'flex-start' }}>

          {/* Left Column: Image and statement */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
              position: 'relative',
              borderRadius: '24px',
              border: '1.5px solid var(--border-light)',
              overflow: 'hidden',
              boxShadow: '0 20px 48px rgba(18,18,18,0.02)',
              background: '#FFFFFF',
              padding: '12px'
            }}>
              <img
                src="/IMG-20260104-WA0052.jpg"
                alt="Anu Tobi"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  display: 'block',
                  filter: 'grayscale(15%) contrast(1.02)'
                }}
              />
            </div>

            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid var(--border-light)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(18,18,18,0.01)'
            }}>
              <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                Operational Principle
              </span>
              <p style={{ fontSize: '14px', color: 'var(--text-charcoal)', lineHeight: '1.6', fontWeight: 500, fontStyle: 'italic', margin: 0 }}>
                "The seams users feel in an application are the ones that quietly kill trust. Good engineering is invisible; it focuses on decision velocity and zero friction."
              </p>
            </div>

            {/* Tech Matrix Card */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid var(--border-light)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(18,18,18,0.01)'
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                Systems & Languages
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['TypeScript', 'JavaScript', 'React', 'Next.js', 'Figma', 'Framer', 'GSAP', 'Android Dev', 'iOS Dev', 'Design Systems', 'CSS Architecture', 'Systems Engineering'].map((tool) => (
                  <span
                    key={tool}
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-paper)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      color: 'var(--text-grey)'
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  HQ Location
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-charcoal)', fontWeight: 600, margin: 0 }}>
                  Lagos, Nigeria (WAT)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio and competency matrix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-charcoal)', letterSpacing: '-0.01em' }}>
                Product engineering is about decisions, not just pixels.
              </h2>
              <p style={{ color: 'var(--text-grey)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Over the last 3+ years, I have sat at the intersection of complex systems architecture and high-fidelity interface design. I do not treat design and development as separate phases. To me, they are a single continuous thought.
              </p>
              <p style={{ color: 'var(--text-grey)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                My focus is helping companies avoid the "leaky system" trap. When conversion drops or deals slip, it is rarely due to missing features; it is almost always due to fragmentations and context switching. I build clean, single-surface architectures that pass the 5-second decision test.
              </p>
              <p style={{ color: 'var(--text-grey)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                By establishing automated design token pipelines, building high-speed Web & Mobile client infrastructures, and keeping frontend applications lightweight, I ensure teams can build, test, and deploy features with zero alignment friction.
              </p>
            </div>

            {/* Matrix of capabilities */}
            <div ref={capsRef} className="about-caps-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { icon: <Layout size={18} />, title: 'Systems & Design Tokens', text: 'Architecting unified token pipelines linking design configurations directly to React/CSS variables.' },
                { icon: <Settings size={18} />, title: 'Zero-Friction Flows', text: 'Designing custom single-page user workspaces that minimize clicks and maximize action.' },
                { icon: <Cpu size={18} />, title: 'Senior Client Engineering', text: 'Crafting robust React/TypeScript architectures that scale cleanly without codebase bloat.' },
                { icon: <Code size={18} />, title: 'Premium Interaction', text: 'Developing highly immersive transitions, scroll triggers, and fluid motions with GSAP.' }
              ].map((cap, i) => (
                <div
                  key={i}
                  className="reveal-child"
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid var(--border-light)',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    boxShadow: '0 8px 24px rgba(18,18,18,0.01)'
                  }}
                >
                  <div style={{ color: 'var(--accent-rust)', marginBottom: '0.85rem' }}>{cap.icon}</div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '0.5rem', color: 'var(--text-charcoal)' }}>{cap.title}</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-grey)', lineHeight: '1.6', margin: 0 }}>{cap.text}</p>
                </div>
              ))}
            </div>
            {/* CV Download Button */}
            <a
              href="/Olawuwo Resume.pdf"
              download
              className="btn-editorial-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '1rem', width: 'fit-content' }}
            >
              <Download size={13} />
              Download CV
            </a>
          </div>
        </div>

        {/* ── HOW I WORK — Process Timeline ── */}
        <section style={{ marginTop: '7rem', paddingTop: '5rem', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ marginBottom: '4rem' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-rust)', fontWeight: 600 }}>
              PROCESS // HOW I WORK
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-charcoal)', letterSpacing: '-0.02em', marginTop: '0.75rem' }}>
              From first principles to shipped product.
            </h2>
          </div>

          <div className="process-timeline">
            {[
              {
                num: '01',
                title: 'Discover',
                text: 'User research, competitive landscape, and identifying the real friction point before touching any design tool.',
              },
              {
                num: '02',
                title: 'Define',
                text: 'Architecture decisions, design principles, and clear constraints. Good constraints produce focused solutions.',
              },
              {
                num: '03',
                title: 'Design',
                text: 'High-fidelity systems in Figma or Framer — design tokens, component libraries, and interactive prototypes.',
              },
              {
                num: '04',
                title: 'Build',
                text: 'Clean React / TypeScript code with performance-first architecture. No bloat, no alignment friction.',
              },
              {
                num: '05',
                title: 'Ship',
                text: 'Deploy, measure, iterate. The product is never done — it is continuously refined based on real usage.',
              },
            ].map((step) => (
              <div key={step.num} className="process-step">
                <div className="process-step-num">{step.num}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--text-charcoal)', marginBottom: '0.5rem' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-grey)', lineHeight: '1.65' }}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
