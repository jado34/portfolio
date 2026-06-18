import { useState } from 'react';
import { useRouter } from './Router';

export interface NeedChat {
  id: 'design-tokens' | 'high-performance' | 'optimization' | 'creative';
  prompt: string; // The user query choice
  replies: string[]; // BLAZE DESIGNS response bubbles
}

const chats: NeedChat[] = [
  {
    id: 'design-tokens',
    prompt: 'We need a consistent look and feel across our products',
    replies: [
      'We can set up a unified design system in Figma and connect it directly to your codebase.',
      'This ensures that changes to colors, buttons, or typography update everywhere automatically.'
    ]
  },
  {
    id: 'high-performance',
    prompt: 'We need to build a fast web application from scratch',
    replies: [
      'We can build a fast, clean website or dashboard from the ground up using React and TypeScript.',
      'We focus on writing clean, simple code so that the app loads instantly and works perfectly.'
    ]
  },
  {
    id: 'optimization',
    prompt: 'Our product needs to be faster and easier to use',
    replies: [
      'We can review your current layout to identify what is slow or confusing for your visitors.',
      'Then, we will refine the code and design to make it load fast and be simple to navigate.'
    ]
  },
  {
    id: 'creative',
    prompt: 'We need custom animations and interactive transitions',
    replies: [
      'We can add smooth visual effects and interactive animations using Framer Motion and GSAP.',
      'This makes your web experience feel modern, premium, and fun for people to interact with.'
    ]
  }
];

interface NeedsSelectorProps {
  activeNeed: string | null;
  onSelectNeed: (id: 'design-tokens' | 'high-performance' | 'optimization' | 'creative' | null) => void;
}

export default function NeedsSelector({ activeNeed, onSelectNeed }: NeedsSelectorProps) {
  const [currentChat, setCurrentChat] = useState<NeedChat | null>(
    chats.find(c => c.id === activeNeed) || null
  );

  const handleSelect = (chat: NeedChat) => {
    setCurrentChat(chat);
    onSelectNeed(chat.id);
  };

  const handleGoBack = () => {
    setCurrentChat(null);
    onSelectNeed(null);
  };

  const { navigate } = useRouter();

  const scrollToContact = () => {
    navigate('/contact');
  };

  return (
    <section id="services" style={{ padding: '8rem 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 992px) {
          .needs-selector-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .needs-quote-card {
            padding: 1.75rem !important;
          }
          .needs-quote-text {
            font-size: 1.05rem !important;
          }
          .needs-chat-ui {
            min-height: auto !important;
          }
          .needs-chat-title {
            font-size: 2rem !important;
          }
        }
      `}} />
      <div className="container needs-selector-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }}>

        {/* Left Column: Client Quote (Screenshot 2 styling) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          <div className="needs-quote-card" style={{
            background: '#EBF9FA',
            padding: '3rem',
            borderRadius: '24px',
            border: '1px solid rgba(11, 165, 189, 0.1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem'
          }}>
            {/* Quote Mark */}
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '8rem',
              color: '#0ba5bd',
              position: 'absolute',
              top: '-20px',
              left: '20px',
              lineHeight: '1',
              pointerEvents: 'none',
              opacity: 0.15
            }}>
              "
            </span>

            <p className="needs-quote-text" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.25rem',
              lineHeight: '1.7',
              color: 'var(--text-charcoal)',
              fontWeight: 400,
              zIndex: 1,
              marginTop: '2rem'
            }}>
              "It's not just the end result that Blaze offers, it's how they are embedded in the project to maximize the value offered in the shortest possible time."
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1 }}>
              <img
                src="/anu_tobi_avatar.png"
                alt="Mr Anu Tobi"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              />
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-charcoal)' }}>Mr Anu Tobi</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-grey)', fontFamily: 'var(--font-mono)' }}>CEO of Ziza Global Concept</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Conversational Chat UI (Screenshots 2 & 3 styling) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          <h3 className="needs-chat-title" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-charcoal)' }}>
            How can we help you?
          </h3>

          <div className="needs-chat-ui" style={{
            background: '#FAF8F5',
            border: '1.5px solid var(--border-light)',
            borderRadius: '24px',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            minHeight: '400px',
            justifyContent: 'space-between',
            boxShadow: '0 8px 32px rgba(18,18,18,0.015)'
          }}>

            {/* Conversations container */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>

              {currentChat === null ? (
                // Show Initial Options (User prompts to click)
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => handleSelect(chat)}
                      style={{
                        outline: 'none',
                        border: '1px solid var(--border-light)',
                        background: '#FFFFFF',
                        color: 'var(--text-charcoal)',
                        borderRadius: '16px',
                        padding: '1.25rem 1.5rem',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'var(--font-body)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        boxShadow: '0 2px 8px rgba(18,18,18,0.005)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#0ba5bd';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-light)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      {chat.prompt}
                    </button>
                  ))}
                </div>
              ) : (
                // Show Active Dialogue Flow
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>

                  {/* User query bubble (Left aligned, white, border) */}
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    fontSize: '14px',
                    color: 'var(--text-charcoal)',
                    fontFamily: 'var(--font-body)',
                    alignSelf: 'flex-start',
                    maxWidth: '85%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.01)'
                  }}>
                    {currentChat.prompt}
                  </div>

                  {/* System replies (Right aligned, cyan, white text) */}
                  {currentChat.replies.map((reply, index) => (
                    <div
                      key={index}
                      style={{
                        background: '#0ba5bd',
                        borderRadius: '16px',
                        padding: '1.25rem 1.5rem',
                        fontSize: '14px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        alignSelf: 'flex-end',
                        maxWidth: '85%',
                        lineHeight: '1.5',
                        boxShadow: '0 4px 12px rgba(11, 165, 189, 0.15)'
                      }}
                    >
                      {reply}
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* Conversation Actions */}
            {currentChat !== null && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '1.5rem',
                marginTop: '1rem'
              }}>
                <button
                  onClick={handleGoBack}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--text-grey)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  ‹ Go back
                </button>

                <button
                  onClick={scrollToContact}
                  style={{
                    background: 'var(--text-charcoal)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '100px',
                    padding: '0.8rem 1.8rem',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Let's work together
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
