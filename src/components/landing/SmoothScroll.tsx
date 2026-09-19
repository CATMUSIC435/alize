'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { routing } from '@/libs/I18nRouting';
import { useUIStore } from '@/store/useUIStore';

const isHomePage = (path: string | null) => {
  if (!path || path === '/') return true;
  const cleanPath = path.replace(/\/+$/, '');
  return routing.locales.some((loc) => cleanPath === `/${loc}`);
};

export function SmoothScroll(props: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isIntroComplete = useUIStore((state) => state.isIntroComplete);
  const setIsIntroComplete = useUIStore((state) => state.setIsIntroComplete);

  const isHome = isHomePage(pathname);

  // Only skip intro if on non-home pages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isHome) {
        setIsIntroComplete(true);
      }
    }
  }, [isHome, setIsIntroComplete]);

  useEffect(() => {
    // Prevent browser from restoring scroll position midway down the page on reload
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
      autoRaf: true,
    });

    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Only lock scroll initially if on home page AND intro is not yet completed
    const currentIsHome = isHomePage(typeof window !== 'undefined' ? window.location.pathname : pathname);
    if (currentIsHome && !useUIStore.getState().isIntroComplete) {
      lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenis.start();
    }

    let resizeDebounceTimer: ReturnType<typeof setTimeout> | null = null;
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          if (resizeDebounceTimer) {
            clearTimeout(resizeDebounceTimer);
          }
          resizeDebounceTimer = setTimeout(() => {
            lenisRef.current?.resize();
          }, 150);
        })
      : null;

    if (resizeObserver && typeof document !== 'undefined') {
      resizeObserver.observe(document.body);
    }

    const resizeTimer = setTimeout(() => {
      lenisRef.current?.resize();
    }, 400);

    return () => {
      if (resizeDebounceTimer) {
        clearTimeout(resizeDebounceTimer);
      }
      clearTimeout(resizeTimer);
      resizeObserver?.disconnect();
      if (typeof window !== 'undefined') {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isHome]);

  // Sync scroll lock with home intro state
  useEffect(() => {
    if (!lenisRef.current) return;

    if (!isHome || isIntroComplete) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenisRef.current.start();
      lenisRef.current.resize();
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
      lenisRef.current.resize();
    }
    const timer = setTimeout(() => {
      lenisRef.current?.resize();
    }, 150);
    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return <>{props.children}</>;
}
