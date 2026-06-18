import { useState } from 'react';
import NeedsSelector from '../components/NeedsSelector';
import LottieAnimation from '../components/LottieAnimation';
import { Link } from '../components/Router';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface ProcessSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
  textColor: string;
  lottieType: 'rocket' | 'search' | 'collaboration';
}

const slides: ProcessSlide[] = [
  {
    id: 1,
    title: 'Exploration',
    subtitle: 'The start of a solid foundation',
    description: 'I start by understanding the big picture of your project. i sketch out ideas and organize the structure so you have a clear foundation before designing or writing any code.',
    bgColor: '#FFB7B2', // Gusta pinkish card background
    textColor: 'var(--text-charcoal)',
    lottieType: 'rocket'
  },
  {
    id: 2,
    title: 'Discovery',
    subtitle: 'Research and insights',
    description: 'I research your market and users to understand exactly what features are needed. This step helps us build the right product and avoid wasting time on things that do not add value.',
    bgColor: '#FFE5B4', // Gusta light peach background
    textColor: 'var(--text-charcoal)',
    lottieType: 'search'
  },
  {
    id: 3,
    title: 'Our approach',
    subtitle: 'A flexible path to value',
    description: 'Every project is unique. I adapt my design and development workflow to fit your team and timeline. I work closely with you through regular feedback loops to ensure the final product matches your exact expectations.',
    bgColor: '#E29578', // Gusta rust background
    textColor: '#FFFFFF',
    lottieType: 'collaboration'
  }
];

export default function ServicesPage() {
  const [activeNeed, setActiveNeed] = useState<'design-tokens' | 'high-performance' | 'optimization' | 'creative' | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlideIndex];

  return (
    <div style={{ background: 'var(--bg-paper)', minHeight: '100vh', paddingTop: '90px' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 640px) {
          .services-page-header-section { padding: 2rem 0 !important; }
          .services-page-header-section .services-info-bar { margin-bottom: 2rem !important; }
          .services-process-section { padding: 4rem 0 !important; }
        }
      `}} />

      {/* ─── Page Header / Title (Screenshot 1 & 2 layout) ────────── */}
      <section className="services-page-header-section" style={{ padding: '4rem 0', position: 'relative' }}>
        <div className="container" style={{ position: 'relative' }}>

          {/* Top services nav header info */}
          <div className="services-info-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-grey)' }}>
              Services / My Matrix
            </span>
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

          <div className="services-header-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'flex-end' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: '1.05',
              fontWeight: 800,
              color: 'var(--text-charcoal)',
              letterSpacing: '-0.02em',
              maxWidth: '850px'
            }}>
              I design and build clean websites and mobile applications that help your business grow.
            </h1>

            {/* Smiling laptop Lottie/SVG widget (Screenshot 1 bottom right illustration) */}
            <div className="services-laptop-widget" style={{ width: '160px', height: '140px', justifySelf: 'flex-end' }}>
              <LottieAnimation type="laptop" />
            </div>
          </div>

        </div>
      </section>

      {/* ─── Conversational chatbot NeedsSelector (Screenshots 2 & 3) ─── */}
      <NeedsSelector activeNeed={activeNeed} onSelectNeed={(id) => setActiveNeed(id)} />

      {/* ─── Process Slides Carousel Section (Screenshots 3, 4, 5) ──────── */}
      <section className="services-process-section" style={{ padding: '8rem 0', background: 'var(--bg-paper)' }}>
        <div className="container">

          <div className="services-process-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
                HOW I WORK
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-charcoal)', marginTop: '0.5rem' }}>
                My product design process
              </h2>
            </div>
            {/* Carousel navigation controls */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handlePrevSlide}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--border-light)',
                  background: '#FFFFFF',
                  color: 'var(--text-charcoal)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-fast)'
                }}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={handleNextSlide}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--border-light)',
                  background: '#FFFFFF',
                  color: 'var(--text-charcoal)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-fast)'
                }}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Active slide card */}
          <div className="services-slide-card" style={{
            background: activeSlide.bgColor,
            color: activeSlide.textColor,
            borderRadius: '32px',
            padding: '4rem',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '6rem',
            alignItems: 'center',
            minHeight: '450px',
            boxShadow: '0 12px 48px rgba(18, 18, 18, 0.05)',
            transition: 'var(--transition-smooth)'
          }}>

            {/* Slide info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {activeSlide.title}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', lineHeight: '1.1', fontWeight: 800 }}>
                {activeSlide.subtitle}
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.95, fontWeight: 300 }}>
                {activeSlide.description}
              </p>
            </div>

            {/* Slide Lottie/SVG Animation */}
            <div className="services-slide-animation" style={{
              width: '100%',
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <LottieAnimation type={activeSlide.lottieType} style={{ width: '260px', height: '260px' }} />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
