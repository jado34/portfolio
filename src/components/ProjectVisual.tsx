interface ProjectVisualProps {
  type: 'chart' | 'audio' | 'tokens' | 'audit';
  isHovered: boolean;
}

export default function ProjectVisual({ type, isHovered }: ProjectVisualProps) {
  if (type === 'tokens') {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          width: '80%',
          opacity: isHovered ? 1.0 : 0.8,
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'var(--transition-smooth)',
        }}
      >
        {[
          { name: 'paper', value: '#FAF8F5' },
          { name: 'charcoal', value: '#121212' },
          { name: 'rust', value: '#D05A3F' },
          { name: 'card', value: '#FDFDFB' },
          { name: 'cream-dark', value: '#F0EDE6' },
          { name: 'border', value: 'rgba(18,18,18,0.08)' },
        ].map((token) => (
          <div
            key={token.name}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              padding: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              transition: 'var(--transition-fast)'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '32px',
                borderRadius: '4px',
                background: token.value,
                border: token.name === 'paper' || token.name === 'card' ? '1px solid var(--border-light)' : 'none',
                marginBottom: '6px',
              }}
            />
            <span style={{ fontSize: '9px', display: 'block', color: 'var(--text-grey)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
              {token.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div
        style={{
          width: '80%',
          height: '70%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          transition: 'var(--transition-smooth)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        <svg viewBox="0 0 300 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {/* Grid lines */}
          <line x1="0" y1="20" x2="300" y2="20" stroke="var(--border-light)" strokeDasharray="3 3" />
          <line x1="0" y1="60" x2="300" y2="60" stroke="var(--border-light)" strokeDasharray="3 3" />
          <line x1="0" y1="100" x2="300" y2="100" stroke="var(--border-light)" strokeDasharray="3 3" />
          
          {/* Chart Line */}
          <path
            d="M 0 100 Q 50 30, 100 80 T 200 40 T 300 10"
            fill="none"
            stroke="var(--accent-rust)"
            strokeWidth="3.5"
            strokeDasharray={isHovered ? '0' : '800'}
            strokeDashoffset={isHovered ? '0' : '800'}
            style={{
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          
          {/* Active pointer dot */}
          <circle
            cx="200"
            cy="40"
            r={isHovered ? "6" : "0"}
            fill="var(--text-charcoal)"
            stroke="var(--bg-paper)"
            strokeWidth="2"
            style={{ transition: 'r 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>
          <span>00:00:00</span>
          <span>SPEED: 98.4fps</span>
          <span>LATENCY: 4.2ms</span>
        </div>
      </div>
    );
  }

  if (type === 'audio') {
    return (
      <div
        style={{
          width: '70%',
          height: '60%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'var(--transition-smooth)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        {Array.from({ length: 15 }).map((_, i) => {
          // Dynamic scale based on hover state and index
          const randomH = Math.sin(i * 0.5) * 25 + 35;
          const hoverH = isHovered ? (Math.sin(i * 0.8) * 35 + 45) : randomH;
          return (
            <div
              key={i}
              style={{
                width: '4px',
                height: `${hoverH}%`,
                background: isHovered ? 'var(--accent-rust)' : 'var(--text-charcoal)',
                borderRadius: '2px',
                transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s',
              }}
            />
          );
        })}
      </div>
    );
  }

  if (type === 'audit') {
    return (
      <div
        style={{
          width: '80%',
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '1.25rem',
          boxShadow: '0 4px 16px rgba(18, 18, 18, 0.02)',
          fontFamily: 'var(--font-mono)',
          transition: 'var(--transition-smooth)',
          transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-charcoal)' }}>CORE WEB VITALS</span>
          <span style={{ fontSize: '9px', padding: '2px 6px', background: '#EBF7EE', color: '#1B5E20', borderRadius: '4px', fontWeight: 600 }}>PASSED</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { label: 'LCP (Paint)', value: '0.82s', score: 'GOOD' },
            { label: 'FID (Delay)', value: '11ms', score: 'GOOD' },
            { label: 'CLS (Shift)', value: '0.012', score: 'GOOD' },
            { label: 'INP (Paint)', value: '38ms', score: 'GOOD' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-paper)',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '6px 10px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{stat.label}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-charcoal)', marginTop: '2px' }}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
