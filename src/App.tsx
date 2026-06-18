import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

// Routing & Components
import { RouterProvider, Route, Link, useRouter } from './components/Router';
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import CaseStudyPage from './pages/CaseStudy';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Magnetic from './components/Magnetic';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lagosTime, setLagosTime] = useState('');
  const { currentPath } = useRouter();

  // Lagos Clock Dynamic Update
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Africa/Lagos',
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setLagosTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '90px',
        zIndex: 1000,
        background: 'rgba(250, 248, 245, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1.5px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-charcoal)',
          }}
        >
          BLAZE DESIGNS.
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '3.5rem' }}>
          <ul style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-only">
            <li>
              <Link to="/" className="nav-item" style={{ color: currentPath === '/' ? 'var(--text-charcoal)' : undefined }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="nav-item" style={{ color: currentPath.startsWith('/services') ? 'var(--text-charcoal)' : undefined }}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-item" style={{ color: currentPath.startsWith('/about') ? 'var(--text-charcoal)' : undefined }}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-item" style={{ color: currentPath.startsWith('/contact') ? 'var(--text-charcoal)' : undefined }}>
                Contact
              </Link>
            </li>
          </ul>

          {/* LAGOS LOCAL TIME (WAT) */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--border-light)', paddingLeft: '2.5rem', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-grey)' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
            <span>LAGOS WAT: {lagosTime || '00:00:00'}</span>
          </div>

          <div className="desktop-only">
            <Magnetic>
              <Link to="/contact" className="btn-editorial" style={{ fontSize: '11px', padding: '0.65rem 1.6rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                INQUIRE ↗
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-charcoal)', cursor: 'pointer', outline: 'none' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '90px',
            left: 0,
            width: '100vw',
            height: 'calc(100vh - 90px)',
            background: 'var(--bg-paper)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            padding: '2.5rem',
            gap: '2rem',
            borderTop: '1px solid var(--border-light)'
          }}
        >
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '28px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            <li>
              <Link to="/" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/services" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            </li>
            <li>
              <Link to="/about" className="nav-item" onClick={() => setMobileMenuOpen(false)}>About</Link>
            </li>
            <li>
              <Link to="/contact" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-editorial" style={{ width: 'fit-content', marginTop: '2rem' }}>
            INQUIRE ↗
          </Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-light)',
        padding: '4rem 0',
        background: 'var(--bg-paper)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em' }}>
            BLAZE DESIGNS.
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '12px', fontFamily: 'var(--font-mono)' }}>
            © 2026. Made with structural design code.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <Magnetic strength={0.25}>
            <a href="https://github.com/jado34" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-grey)' }}>
              GitHub
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a href="https://www.linkedin.com/in/olawuwo-david-565245266/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-grey)' }}>
              LinkedIn
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a href="https://x.com/Blaze_Runnerr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-grey)' }}>
              X
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a href="mailto:designsbyblaze1@gmail.com" style={{ color: 'var(--text-grey)' }}>
              Email
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <RouterProvider>
      {/* Visual Overlay texture */}
      <div className="noise-overlay" />

      {/* Static Header Shell */}
      <Header />

      {/* Route Handlers rendering specific views */}
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/services">
        <ServicesPage />
      </Route>

      <Route path="/work">
        <CaseStudyPage />
      </Route>

      <Route path="/about">
        <AboutPage />
      </Route>

      <Route path="/contact">
        <ContactPage />
      </Route>

      {/* Static Footer Shell */}
      <Footer />
    </RouterProvider>
  );
}
