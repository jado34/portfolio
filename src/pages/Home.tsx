import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectVisual from '../components/ProjectVisual';
import { Link, useRouter } from '../components/Router';
import { Layout, Cpu, Settings, Code } from 'lucide-react';



export default function HomePage() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredCollageIdx, setHoveredCollageIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { navigate } = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredCollageIdx(null);
  };

  // Stagger items into left and right columns for asymmetric grid rhythm
  const leftColProjects = projects.filter((_, i) => i % 2 === 0);
  const rightColProjects = projects.filter((_, i) => i % 2 !== 0);

  return (
    <div style={{ background: 'var(--bg-paper)' }}>

      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          paddingTop: '150px',
          paddingBottom: '30px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="container" style={{ width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border-light)', borderRadius: '100px', padding: '6px 16px', background: '#FFFFFF', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-rust)' }} />
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-grey)', fontFamily: 'var(--font-mono)' }}>
              AVAILABLE GLOBAL · Lagos, Nigeria
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              lineHeight: '0.9',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-charcoal)',
              marginBottom: '2.5rem',
            }}
          >
            DESIGNING & BUILDING<br />
            DIGITAL EXPERIENCES
          </h1>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '2rem' }}>
            <Link to="/services" className="btn-editorial">
              OUR SERVICES
            </Link>
            <Link to="/contact" className="btn-editorial-ghost">
              DISCUSS PROJECT ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Overlapping Showcase Collage Section ──────── */}
      <section
        className="collage-showcase-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          borderBottom: '1px solid var(--border-light)',
          padding: '4rem 0',
          background: 'var(--bg-paper)',
          position: 'relative',
          overflow: 'hidden',
          height: '750px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float-slow-1 {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          @keyframes float-slow-2 {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          @keyframes float-slow-3 {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          .collage-item-float-1 { animation: float-slow-1 8s ease-in-out infinite; }
          .collage-item-float-2 { animation: float-slow-2 10s ease-in-out infinite; }
          .collage-item-float-3 { animation: float-slow-3 12s ease-in-out infinite; }

          @media (max-width: 768px) {
            .collage-showcase-container {
              height: 500px !important;
              padding: 2rem 0 !important;
            }
            .collage-item-macbook {
              left: 2% !important;
              top: 15% !important;
              width: 200px !important;
            }
            .collage-item-ipad {
              left: 35% !important;
              top: 5% !important;
              width: 170px !important;
            }
            .collage-item-iphone17 {
              right: 2% !important;
              top: 12% !important;
              width: 130px !important;
            }
            .collage-item-wallet {
              left: 25% !important;
              top: 52% !important;
              width: 110px !important;
            }
            .collage-item-class9 {
              left: 65% !important;
              top: 48% !important;
              width: 140px !important;
            }
            .collage-item-isometric {
              left: 2% !important;
              top: 60% !important;
              width: 100px !important;
            }
            .collage-item-groceries {
              left: 45% !important;
              top: 54% !important;
              width: 110px !important;
            }
            .collage-cursor-tag {
              display: none !important;
            }
          }
        `}} />

        <div style={{ position: 'relative', width: '100%', maxWidth: '1440px', height: '100%' }}>
          {/* Cursors */}
          {[
            { name: 'Raquel', color: '#10b981', x: '26%', top: '22%', angle: -5 },
            { name: 'Mar', color: '#f59e0b', x: '58%', top: '16%', angle: 12 },
            { name: 'Tobi', color: '#3b82f6', x: '82%', top: '32%', angle: -8 }
          ].map((c, i) => (
            <div
              key={`c-${i}`}
              className="collage-cursor-tag"
              style={{
                position: 'absolute',
                left: c.x,
                top: c.top,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                zIndex: 20,
                pointerEvents: 'none',
                transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
                transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px) rotate(${c.angle}deg)`,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
                <path d="M4.5 3V17.5L9.2 12.8L15 21L18.5 18.5L13 10.5L19.5 10.5L4.5 3Z" fill={c.color} stroke="#FFFFFF" strokeWidth="1.5" />
              </svg>
              <div style={{
                background: c.color,
                color: '#FFFFFF',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '6px',
                marginTop: '2px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
              }}>
                {c.name}
              </div>
            </div>
          ))}

          {/* Collage Mockup Items */}
          {[
            { id: 0, className: 'collage-item-macbook', src: '/re_macbook.jpeg', style: { left: '4%', top: '12%', width: '430px' }, rotate: -5, borderRadius: '16px', factor: 12, zIndex: 5 },
            { id: 1, className: 'collage-item-ipad', src: '/re_ipad.jpeg', style: { left: '38%', top: '4%', width: '380px' }, rotate: 3, borderRadius: '20px', factor: -8, zIndex: 6 },
            { id: 2, className: 'collage-item-iphone17', src: '/iphone17_mockup.jpeg', style: { right: '4%', top: '10%', width: '290px' }, rotate: 6, borderRadius: '28px', factor: 16, zIndex: 9 },
            { id: 4, className: 'collage-item-wallet', src: '/s26_mockup.png', style: { left: '26%', top: '42%', width: '220px' }, rotate: 8, isContain: true, factor: 8, zIndex: 15 },
            { id: 6, className: 'collage-item-class9', src: '/class_9.png', style: { left: '70%', top: '36%', width: '320px' }, rotate: -2, isContain: true, factor: 22, zIndex: 12 },
            { id: 7, className: 'collage-item-isometric', src: '/s26_isometric.png', style: { left: '4%', top: '52%', width: '220px' }, rotate: -15, isContain: true, factor: -10, zIndex: 6 },
            { id: 8, className: 'collage-item-groceries', src: '/groceries_1.png', style: { left: '48%', top: '44%', width: '260px' }, rotate: -4, borderRadius: '16px', factor: -12, zIndex: 10 }
          ].map((item, index) => {
            const isHovered = hoveredCollageIdx === index;
            const currentZIndex = isHovered ? 30 : item.zIndex;
            const baseScale = isHovered ? 1.05 : 1.0;
            const baseRotate = item.rotate;

            return (
              <div
                key={item.id}
                className={`collage-item-float-${(index % 3) + 1} ${item.className}`}
                style={{
                  position: 'absolute',
                  ...item.style,
                  zIndex: currentZIndex,
                }}
              >
                <div
                  onMouseEnter={() => setHoveredCollageIdx(index)}
                  style={{
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                    transform: `translate(${mousePos.x * item.factor}px, ${mousePos.y * item.factor}px) scale(${baseScale}) rotate(${baseRotate}deg)`,
                    boxShadow: isHovered
                      ? '0 30px 60px rgba(0, 0, 0, 0.25)'
                      : item.isContain
                        ? 'none'
                        : '0 15px 35px rgba(18, 18, 18, 0.05)',
                    borderRadius: item.isContain ? '0' : item.borderRadius || '20px',
                  }}
                >
                  <img
                    src={item.src}
                    alt={`Showcase item ${index}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: item.isContain ? 'contain' : 'cover',
                      borderRadius: item.isContain ? '0' : item.borderRadius || '20px',
                      filter: item.isContain
                        ? 'drop-shadow(0 15px 30px rgba(18, 18, 18, 0.12))'
                        : 'none',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Work Section (Asymmetric Grid) ───────────────────────── */}
      <section
        id="work"
        style={{
          padding: '8rem 0',
          borderTop: '1px solid var(--border-light)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-rust)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                Case Studies
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '0.5rem', fontWeight: 700 }}>
                SELECTED PROJECTS
              </h2>
            </div>
          </div>

          <div className="asymmetric-grid">

            {/* Left Column Stagger */}
            <div className="asymmetric-col-left" style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
              {leftColProjects.map((p) => (
                <div
                  key={p.id}
                  className="editorial-card"
                  onClick={() => navigate('/work/' + p.id)}
                  onMouseEnter={() => setHoveredProject(p.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: '340px',
                      background: p.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid var(--border-light)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Tags overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      display: 'flex',
                      gap: '6px',
                      zIndex: 2
                    }}>
                      {p.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '9px',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            background: 'rgba(250, 248, 245, 0.92)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '100px',
                            padding: '4px 12px',
                            color: 'var(--text-charcoal)',
                            backdropFilter: 'blur(4px)',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {p.id === 'aunty-elewa' ? (
                      <img
                        src="/elewa_screenshot_1.png"
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: hoveredProject === p.id ? 'scale(1.05)' : 'scale(1)',
                          transition: 'var(--transition-smooth)'
                        }}
                      />
                    ) : p.id === 'greenlume' ? (
                      <img
                        src="/greenlume_10.jpg"
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: hoveredProject === p.id ? 'scale(1.05)' : 'scale(1)',
                          transition: 'var(--transition-smooth)'
                        }}
                      />
                    ) : p.id === 'real-estate-os' ? (
                      <img
                        src="/re_macbook.jpeg"
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: hoveredProject === p.id ? 'scale(1.05)' : 'scale(1)',
                          transition: 'var(--transition-smooth)'
                        }}
                      />
                    ) : (
                      <ProjectVisual type={p.visualType} isHovered={hoveredProject === p.id} />
                    )}
                  </div>
                  <div style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-grey)', fontWeight: 500 }}>
                        {p.role} · {p.year}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 700 }}>
                      {p.title}
                    </h3>
                    <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column Stagger */}
            <div className="asymmetric-col-right" style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
              {rightColProjects.map((p) => (
                <div
                  key={p.id}
                  className="editorial-card"
                  onClick={() => navigate('/work/' + p.id)}
                  onMouseEnter={() => setHoveredProject(p.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: '340px',
                      background: p.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid var(--border-light)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      display: 'flex',
                      gap: '6px',
                      zIndex: 2
                    }}>
                      {p.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '9px',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            background: 'rgba(250, 248, 245, 0.92)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '100px',
                            padding: '4px 12px',
                            color: 'var(--text-charcoal)',
                            backdropFilter: 'blur(4px)',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {p.id === 'aunty-elewa' ? (
                      <img
                        src="/elewa_screenshot_1.png"
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: hoveredProject === p.id ? 'scale(1.05)' : 'scale(1)',
                          transition: 'var(--transition-smooth)'
                        }}
                      />
                    ) : p.id === 'greenlume' ? (
                      <img
                        src="/greenlume_10.jpg"
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: hoveredProject === p.id ? 'scale(1.05)' : 'scale(1)',
                          transition: 'var(--transition-smooth)'
                        }}
                      />
                    ) : p.id === 'real-estate-os' ? (
                      <img
                        src="/re_macbook.jpeg"
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: hoveredProject === p.id ? 'scale(1.05)' : 'scale(1)',
                          transition: 'var(--transition-smooth)'
                        }}
                      />
                    ) : (
                      <ProjectVisual type={p.visualType} isHovered={hoveredProject === p.id} />
                    )}
                  </div>
                  <div style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-grey)', fontWeight: 500 }}>
                        {p.role} · {p.year}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 700 }}>
                      {p.title}
                    </h3>
                    <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── Philosophy Overview Credentials Section ────────────────── */}
      <section style={{ padding: '8rem 0', background: '#FFFFFF' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '6rem' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-rust)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
              Philosophy & Focus
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', lineHeight: 1.1, marginTop: '1rem', marginBottom: '2.5rem', fontWeight: 700 }}>
              CREATING BEAUTIFUL DESIGNS AND SOLID CODE
            </h2>
            <p style={{ color: 'var(--text-grey)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', fontWeight: 300 }}>
              Under the banner of **BLAZE DESIGNS**, I focus on creating interfaces that are not only beautiful but also highly functional. By balancing user-centric design with clean, reliable code, I make sure the products I build deliver great user experiences and run smoothly.
            </p>
            <p style={{ color: 'var(--text-grey)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', fontWeight: 300 }}>
              I believe a great product must both look good and perform well. Whether designing layouts in Figma or coding in TypeScript, JavaScript, and HTML/CSS, I pay close attention to the details to ensure every layout is responsive, fast, and easy to use.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {[
                { icon: <Layout size={20} />, title: 'Product Designer Design', text: 'Designing clean, interactive interfaces using Figma and Framer that put users first.' },
                { icon: <Cpu size={20} />, title: 'Frontend Development', text: 'Building fast, responsive web apps using modern tools like React, TypeScript, and CSS/HTML.' },
                { icon: <Settings size={20} />, title: 'Mobile App Development', text: 'Developing clean and functional mobile applications with modern features.' },
                { icon: <Code size={20} />, title: 'Interactions & Motion', text: 'Adding smooth transitions, interactive animations, and responsive elements that bring websites to life.' }
              ].map((cap, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-paper)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '12px',
                    padding: '1.75rem'
                  }}
                >
                  <div style={{ color: 'var(--text-charcoal)', marginBottom: '1rem' }}>{cap.icon}</div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>{cap.title}</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-grey)', lineHeight: '1.6' }}>{cap.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Waving Hand CTA Section (Screenshot 4 style) ──────────── */}
      <section
        style={{
          background: '#080a0c',
          color: '#FFFFFF',
          padding: '8rem 0',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}>
          <div className="waving-hand" style={{ fontSize: '4rem', lineHeight: '1' }}>👋</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: '1.05',
              maxWidth: '700px',
              margin: '0 auto 1.5rem auto',
              letterSpacing: '-0.02em',
            }}
          >
            Ready to move forward?<br />Let's work together!
          </h2>
          <Link to="/contact" className="btn-editorial" style={{ background: '#0ba5bd', color: '#FFFFFF', border: 'none', boxShadow: '0 8px 24px rgba(11, 165, 189, 0.3)' }}>
            Contact us
          </Link>
        </div>
      </section>

    </div>
  );
}
