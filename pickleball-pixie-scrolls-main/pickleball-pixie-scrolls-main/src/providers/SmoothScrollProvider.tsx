
import { ReactNode, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical', // using orientation instead of direction
      gestureOrientation: 'vertical', // using gestureOrientation instead of direction
      smoothWheel: true,
      touchMultiplier: 2,
      // Removed the incorrect 'smoothTouch' property
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation frame loop
    requestAnimationFrame(raf);
    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
};
