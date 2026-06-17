import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 2500);
      return;
    }

    setSubmitStatus('sending');
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', project: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <div style={{ background: 'var(--bg-paper)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '8rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
        
        {/* Left Column info */}
        <div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-rust)', fontWeight: 600 }}>
            DISCUSS PROJECT
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: '1.05',
            fontWeight: 800,
            color: 'var(--text-charcoal)',
            letterSpacing: '-0.02em',
            marginTop: '1rem',
            marginBottom: '2.5rem'
          }}>
            Let's build something with taste.
          </h1>
          <p style={{ color: 'var(--text-grey)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '3.5rem', fontWeight: 300 }}>
            Whether you want to build a new design system in Figma, develop a fast web app, or build a mobile application, I would love to chat and see how we can work together.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-muted)', width: '80px' }}>Inquiries</span>
              <a href="mailto:designsbyblaze1@gmail.com" style={{ fontSize: '15px', fontWeight: 600, borderBottom: '1px solid var(--text-charcoal)', paddingBottom: '2px' }}>
                designsbyblaze1@gmail.com
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-muted)', width: '80px' }}>HQ Location</span>
              <span style={{ fontSize: '15px', color: 'var(--text-charcoal)', fontWeight: 500 }}>Lagos, Nigeria 🇳🇬</span>
            </div>
          </div>
        </div>

        {/* Right Column Form container */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '3rem', boxShadow: '0 8px 32px rgba(18,18,18,0.015)' }}>
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-grey)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe"
                className="editorial-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-grey)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. john@company.com"
                className="editorial-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-grey)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Project Focus</label>
              <input
                type="text"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                placeholder="e.g. Building a mobile app, designing a website"
                className="editorial-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-grey)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us a little bit about what you want to build..."
                className="editorial-input"
                style={{ minHeight: '100px', resize: 'none' }}
              />
            </div>

            <button
              type="submit"
              className="btn-editorial"
              style={{
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                height: '52px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: submitStatus === 'success' ? '#10b981' : submitStatus === 'error' ? '#ef4444' : undefined,
                borderColor: submitStatus === 'success' || submitStatus === 'error' ? 'transparent' : undefined,
              }}
              disabled={submitStatus === 'sending'}
            >
              {submitStatus === 'idle' && 'SEND MESSAGE ❯'}
              {submitStatus === 'sending' && 'SENDING MESSAGE...'}
              {submitStatus === 'success' && 'MESSAGE SENT ✓'}
              {submitStatus === 'error' && 'FILL REQUIRED FIELDS ⚠'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
