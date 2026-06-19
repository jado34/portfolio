import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string) => void;
  isTransitioning: boolean;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Expose a ref that PageTransition can attach its trigger to
export const transitionTriggerRef = {
  trigger: null as ((path: string) => void) | null,
};

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to === window.location.pathname) return;

    // If a page transition is registered, delegate to it
    if (transitionTriggerRef.trigger) {
      transitionTriggerRef.trigger(to);
    } else {
      // Fallback: instant navigation
      window.history.pushState(null, '', to);
      setCurrentPath(to);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const commitNavigation = useCallback((to: string) => {
    window.history.pushState(null, '', to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate, isTransitioning }}>
      {/* Attach commitNavigation so PageTransition can call it mid-animation */}
      {typeof window !== 'undefined' &&
        ((window as unknown as Record<string, unknown>).__blazeCommitNav = commitNavigation)}
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Link({ to, children, className, style, onClick }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
    if (onClick) {
      onClick();
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
}

interface RouteProps {
  path: string;
  children: ReactNode;
  exact?: boolean;
}

export function Route({ path, children, exact = false }: RouteProps) {
  const { currentPath } = useRouter();

  const match = exact
    ? currentPath === path
    : currentPath.startsWith(path);

  if (!match) return null;

  return <>{children}</>;
}
