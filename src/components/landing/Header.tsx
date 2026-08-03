'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CircularLogo } from './CircularLogo';
import { NavigationMenu } from './NavigationMenu';

export function Header({ alwaysDark }: { alwaysDark?: boolean }) {
  const [isDark, setIsDark] = useState(alwaysDark ?? false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle dark text when scrolling into the bright Second Section (approx 1.5x window height)
      if (window.scrollY > window.innerHeight * 1.5) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };

    let attached = false;
    if (!alwaysDark) {
      // Initial check
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      attached = true;
    }

    return () => {
      if (attached) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [alwaysDark]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.5, duration: 1, ease: 'easeOut' }}
      className={`pointer-events-none fixed top-0 left-0 z-50 flex w-full items-start justify-between p-4 transition-colors duration-700 md:p-8 ${isDark ? 'text-[#151926]' : 'text-white'}`}
    >
      {/* Left side: Logo */}
      <CircularLogo />

      {/* Right side: Navigation */}
      <NavigationMenu isDark={isDark} />
    </motion.header>
  );
}
