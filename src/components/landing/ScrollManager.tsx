'use client';

import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

export function ScrollManager() {
  const { scrollY } = useScroll();
  const setHeaderTheme = useUIStore((state) => state.setHeaderTheme);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Only update Zustand store if there's an actual change to avoid unnecessary renders
    const isPastHero = latest > window.innerHeight * 1.5;
    const currentTheme = useUIStore.getState().headerTheme;

    if (isPastHero && currentTheme !== 'dark') {
      setHeaderTheme('dark');
    } else if (!isPastHero && currentTheme !== 'light') {
      setHeaderTheme('light');
    }
  });

  return null;
}
