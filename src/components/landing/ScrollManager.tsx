'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

export function ScrollManager() {
  const { scrollY } = useScroll();
  const setHeaderTheme = useUIStore((state) => state.setHeaderTheme);
  const heroThresholdRef = useRef(1200);

  useEffect(() => {
    const updateThreshold = () => {
      heroThresholdRef.current = window.innerHeight * 1.5;
    };
    updateThreshold();
    window.addEventListener('resize', updateThreshold, { passive: true });
    return () => window.removeEventListener('resize', updateThreshold);
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Only update Zustand store if there's an actual change to avoid unnecessary renders
    const isPastHero = latest > heroThresholdRef.current;
    const currentTheme = useUIStore.getState().headerTheme;

    if (isPastHero && currentTheme !== 'dark') {
      setHeaderTheme('dark');
    } else if (!isPastHero && currentTheme !== 'light') {
      setHeaderTheme('light');
    }
  });

  return null;
}
