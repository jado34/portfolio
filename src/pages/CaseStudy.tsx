import { useRouter, Link } from '../components/Router';
import { projects } from '../data/projects';
import ProjectVisual from '../components/ProjectVisual';
import { X, ArrowLeft } from 'lucide-react';

export default function CaseStudyPage() {
  const { currentPath } = useRouter();
  const projectId = currentPath.split('/').pop();
  const project = projects.find((p) => p.id === projectId);

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
      <div className="container">

        {/* Header Close Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2.5rem 0' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-grey)', letterSpacing: '0.05em' }}>
            <ArrowLeft size={14} /> Back to work index
          </Link>

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
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', margin: '3rem 0' }}>

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
        <div style={{
          background: project.gradient,
          borderRadius: '32px',
          border: '1px solid var(--border-light)',
          padding: (project.id === 'aunty-elewa' || project.id === 'real-estate-os') ? '4rem 2rem' : undefined,
          height: (project.id === 'aunty-elewa' || project.id === 'real-estate-os') ? 'auto' : '480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          margin: '4rem 0',
          boxShadow: '0 12px 48px rgba(18,18,18,0.03)'
        }}>
          {project.id === 'aunty-elewa' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '2.5rem',
              width: '100%',
              maxWidth: '1100px',
              padding: '1.5rem'
            }}>
              <img
                src="/elewa_screenshot_1.png"
                alt="Aunty Elewa Home Screen Mockup"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              />
              <img
                src="/elewa_screenshot_2.png"
                alt="Aunty Elewa Menu Category Mockup"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              />
              <img
                src="/elewa_screenshot_3.png"
                alt="Aunty Elewa Plate Builder Mockup"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              />
              <img
                src="/elewa_screenshot_4.png"
                alt="Aunty Elewa Checkout Screen Mockup"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              />
            </div>
          ) : project.id === 'real-estate-os' ? (
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1200px', padding: '1rem' }}>
              <img
                src="/re_macbook.jpeg"
                alt="MacBook Pro Operating System Mockup"
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 20px 48px rgba(18, 18, 18, 0.12)'
                }}
              />
              <img
                src="/re_ipad.jpeg"
                alt="iPad Broker Dashboard Mockup"
                style={{
                  width: '100%',
                  maxWidth: '350px',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 20px 48px rgba(18, 18, 18, 0.12)'
                }}
              />
              <img
                src="/re_s26_isometric.png"
                alt="Samsung S26 Isometric Mobile Mockup"
                style={{
                  width: '100%',
                  maxWidth: '220px',
                  height: 'auto',
                  filter: 'drop-shadow(0 20px 48px rgba(18, 18, 18, 0.08))'
                }}
              />
            </div>
          ) : (
            <ProjectVisual type={project.visualType} isHovered={true} />
          )}
        </div>

        {/* Detailed Case Study Sections (Real Estate OS specific) */}
        {project.id === 'real-estate-os' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem 6rem', margin: '6rem 0' }}>
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

            <div style={{ gridColumn: 'span 2', background: '#FFFFFF', border: '1.5px solid var(--border-light)', borderRadius: '24px', padding: '3rem', marginTop: '2rem', boxShadow: '0 8px 32px rgba(18,18,18,0.01)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-charcoal)' }}>WHAT IT MEANS FOR YOUR BUSINESS</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem 6rem', margin: '6rem 0' }}>
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

            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-rust)', letterSpacing: '0.05em' }}>THE GENTLE UPSELL</h4>
              <p style={{ color: 'var(--text-grey)', fontSize: '1rem', lineHeight: '1.75' }}>
                I added a "Pairs perfectly with your order" prompt in the cart suggesting fried plantain alongside Ewa Agoyin and chicken, or a cold drink to balance the heat. It is a soft, contextual recommendation, mimicking a waiter noticing what is missing from the table rather than a generic hard upsell banner.
              </p>
            </div>

            <div style={{ gridColumn: 'span 2', background: '#FFFFFF', border: '1.5px solid var(--border-light)', borderRadius: '24px', padding: '3rem', marginTop: '2rem', boxShadow: '0 8px 32px rgba(18,18,18,0.01)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-charcoal)' }}>BUSINESS & PRODUCT TRANSFORMATION</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                <div>
                  <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-charcoal)' }}>Zero Cart Shock</h5>
                  <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', lineHeight: '1.6' }}>Live additive pricing updates the total with every single choice, preventing cart abandonment due to unexpected totals.</p>
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-charcoal)' }}>90% Reduction in DM Overhead</h5>
                  <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', lineHeight: '1.6' }}>Replaces conversational back-and-forth for order configurations with a structured plate checkout that prints directly to the kitchen.</p>
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-charcoal)' }}>Office break optimization</h5>
                  <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', lineHeight: '1.6' }}>Saves office workers valuable break time by allowing complete food assembly and payments in under 45 seconds.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Large Editorial Quotation block from the client */}
        <div style={{
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
                : "Blaze Designs helped us build a consistent design language and a fast, responsive user interface. Our development team can now ship features faster with zero design alignment issues."
            }
          </p>
          <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text-grey)' }}>
            {project.id === 'real-estate-os'
              ? "— Managing Partner, Real Estate Operations Group"
              : project.id === 'aunty-elewa'
                ? "— CEO, Aunty Elewa Catering"
                : "— Product Lead, Design & Engineering Systems"
            }
          </span>
        </div>

        {/* Bottom CTA to contact */}
        <div style={{
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
    </div>
  );
}
