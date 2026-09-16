'use client';

import { useAnimationFrame } from 'framer-motion';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useUIStore } from '@/store/useUIStore';

export function SmoothScroll(props: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isIntroComplete = useUIStore((state) => state.isIntroComplete);

  useEffect(() => {
    // Prevent browser from restoring scroll position midway down the page on reload
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }

    const lenis = new Lenis({
      duration: 1.2, // Buttery smooth duration
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, 
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Initially stop scrolling until intro finishes
    if (!useUIStore.getState().isIntroComplete) {
      lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenis.destroy();
    };
  }, []);

  // Sync scroll lock with isIntroComplete state
  useEffect(() => {
    if (!lenisRef.current) return;

    if (isIntroComplete) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenisRef.current.start();
    } else {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      lenisRef.current.stop();
    }
  }, [isIntroComplete]);

  // Sync Lenis with Framer Motion's internal render loop to eliminate 1-frame scroll jitter
  useAnimationFrame((time) => {
    if (lenisRef.current) {
      lenisRef.current.raf(time);
    }
  });

  // Reset scroll position on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{props.children}</>;
}
