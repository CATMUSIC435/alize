'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useUIStore } from '@/store/useUIStore';

const isHomePage = (path: string | null) => {
  if (!path || path === '/') return true;
  return /^\/[a-zA-Z]{2,5}\/?$/.test(path);
};

export function SmoothScroll(props: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isIntroComplete = useUIStore((state) => state.isIntroComplete);
  const setIsIntroComplete = useUIStore((state) => state.setIsIntroComplete);

  const isHome = isHomePage(pathname);

  // Non-home pages never require the intro loader - mark intro complete immediately
  useEffect(() => {
    if (!isHome && !isIntroComplete) {
      setIsIntroComplete(true);
    }
  }, [isHome, isIntroComplete, setIsIntroComplete]);

  useEffect(() => {
    // Prevent browser from restoring scroll position midway down the page on reload
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    // Only lock scroll initially if on the home page AND intro is not yet completed
    const currentIsHome = typeof window !== 'undefined' ? isHomePage(window.location.pathname) : true;
    if (currentIsHome && !useUIStore.getState().isIntroComplete) {
      lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenis.start();
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sync scroll lock with home intro state
  useEffect(() => {
    if (!lenisRef.current) return;

    if (!isHome || isIntroComplete) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenisRef.current.start();
    } else {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      lenisRef.current.stop();
    }
  }, [isHome, isIntroComplete]);

  // Reset scroll position on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{props.children}</>;
}
