import type { HTMLAttributes, CSSProperties } from 'react';

interface LottieAnimationProps extends HTMLAttributes<HTMLDivElement> {
  type: 'rocket' | 'search' | 'collaboration' | 'laptop';
  autoplay?: boolean;
  loop?: boolean;
  style?: CSSProperties;
}

export default function LottieAnimation({ type, style, ...props }: LottieAnimationProps) {
  const renderFallbackSVG = () => {
    if (type === 'laptop') {
      return (
        <svg viewBox="0 0 120 100" style={{ width: '100%', height: '100%' }}>
          {/* Notebook base */}
          <rect x="15" y="15" width="90" height="60" rx="8" fill="#D05A3F" stroke="var(--text-charcoal)" strokeWidth="3.5" />
          {/* screen */}
          <rect x="23" y="23" width="74" height="44" rx="4" fill="#FAF8F5" stroke="var(--text-charcoal)" strokeWidth="3" />
          {/* Keyboard base */}
          <path d="M 5 75 L 115 75 Q 115 88 95 88 L 25 88 Q 5 88 5 75 Z" fill="#F0EDE6" stroke="var(--text-charcoal)" strokeWidth="3.5" />
          {/* smiling face inside laptop screen */}
          <circle cx="50" cy="40" r="3.5" fill="var(--text-charcoal)" />
          <circle cx="70" cy="40" r="3.5" fill="var(--text-charcoal)" />
          <path d="M 53 49 Q 60 56 67 49" fill="none" stroke="var(--text-charcoal)" strokeWidth="3" strokeLinecap="round" />
          {/* star pops */}
          <path d="M 95 12 L 98 18 L 105 19 L 100 24 L 101 30 L 95 27 L 89 30 L 90 24 L 85 19 L 92 18 Z" fill="#F4D35E" stroke="var(--text-charcoal)" strokeWidth="2" />
        </svg>
      );
    }

    if (type === 'rocket') {
      return (
        <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%' }}>
          <circle cx="60" cy="60" r="50" fill="#FAF3EE" stroke="var(--border-light)" strokeWidth="1" />
          {/* Rocket body */}
          <path d="M 60 25 C 70 45 70 75 68 85 L 52 85 C 50 75 50 45 60 25 Z" fill="#FFFFFF" stroke="var(--text-charcoal)" strokeWidth="3" />
          {/* Tip and fins */}
          <path d="M 57 28 C 59 25 61 25 63 28 L 60 25 Z" fill="var(--accent-rust)" stroke="var(--text-charcoal)" strokeWidth="3" />
          <path d="M 50 75 L 42 85 L 50 85 Z" fill="var(--accent-rust)" stroke="var(--text-charcoal)" strokeWidth="3" />
          <path d="M 70 75 L 78 85 L 70 85 Z" fill="var(--accent-rust)" stroke="var(--text-charcoal)" strokeWidth="3" />
          {/* Window */}
          <circle cx="60" cy="50" r="6" fill="#EBF9FA" stroke="var(--text-charcoal)" strokeWidth="2.5" />
          {/* Thrust flame (animated) */}
          <path className="svg-thrust" d="M 55 90 Q 60 108 65 90 Z" fill="#0ba5bd" stroke="var(--text-charcoal)" strokeWidth="2" />
          {/* stars */}
          <circle cx="35" cy="40" r="2" fill="var(--text-charcoal)" />
          <circle cx="85" cy="35" r="3" fill="var(--accent-rust)" />
        </svg>
      );
    }

    if (type === 'search') {
      return (
        <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%' }}>
          <circle cx="60" cy="60" r="50" fill="#EBF9FA" stroke="var(--border-light)" strokeWidth="1" />
          {/* Binoculars */}
          <rect x="35" y="45" width="22" height="35" rx="6" fill="#FFFFFF" stroke="var(--text-charcoal)" strokeWidth="3" />
          <rect x="63" y="45" width="22" height="35" rx="6" fill="#FFFFFF" stroke="var(--text-charcoal)" strokeWidth="3" />
          <rect x="52" y="55" width="16" height="8" rx="2" fill="var(--accent-rust)" stroke="var(--text-charcoal)" strokeWidth="2.5" />
          {/* lenses */}
          <circle cx="46" cy="45" r="7" fill="#0ba5bd" stroke="var(--text-charcoal)" strokeWidth="2.5" />
          <circle cx="74" cy="45" r="7" fill="#0ba5bd" stroke="var(--text-charcoal)" strokeWidth="2.5" />
          {/* questions bubbles */}
          <circle cx="95" cy="40" r="8" fill="#FFFFFF" stroke="var(--text-charcoal)" strokeWidth="2" />
          <text x="95" y="44" fontFamily="var(--font-display)" fontSize="10" fontWeight="800" textAnchor="middle">?</text>
        </svg>
      );
    }

    if (type === 'collaboration') {
      return (
        <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%' }}>
          <circle cx="60" cy="60" r="50" fill="#FAF8F5" stroke="var(--border-light)" strokeWidth="1" />
          {/* Rotating gears representation */}
          <circle className="svg-gear-1" cx="50" cy="50" r="18" fill="#F0EDE6" stroke="var(--text-charcoal)" strokeWidth="3" strokeDasharray="6 4" />
          <circle className="svg-gear-2" cx="76" cy="74" r="14" fill="var(--accent-rust)" stroke="var(--text-charcoal)" strokeWidth="3" strokeDasharray="5 3" />
          <circle cx="50" cy="50" r="5" fill="#FFFFFF" stroke="var(--text-charcoal)" strokeWidth="2" />
          <circle cx="76" cy="74" r="4" fill="#FFFFFF" stroke="var(--text-charcoal)" strokeWidth="2" />
          {/* waving lines */}
          <path d="M 20 85 Q 40 75 60 85 T 100 85" fill="none" stroke="#0ba5bd" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      {...props}
    >
      {renderFallbackSVG()}
    </div>
  );
}
