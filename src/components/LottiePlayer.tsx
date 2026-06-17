import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottiePlayerProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

export default function LottiePlayer({ animationData, loop = true, autoplay = true, style }: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      animationData,
    });

    return () => {
      anim.destroy();
    };
  }, [animationData, loop, autoplay]);

  return <div ref={containerRef} style={style} />;
}
