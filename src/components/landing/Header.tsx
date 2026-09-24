'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { useUIStore } from '@/store/useUIStore';
import { NavigationMenu } from './NavigationMenu';

export function Header(props: { alwaysDark?: boolean }) {
  const headerTheme = useUIStore((state) => state.headerTheme);
  const isIntroComplete = useUIStore((state) => state.isIntroComplete);
  const isDark = props.alwaysDark ?? headerTheme === 'dark';
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      const heroVideo = typeof document !== 'undefined'
        ? (document.querySelector('video[src*="Continuum"]') as HTMLVideoElement | null)
        : null;
      if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});
      }
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: props.alwaysDark || isIntroComplete ? 1 : 0,
        y: props.alwaysDark || isIntroComplete ? 0 : -20,
      }}
      transition={{
        duration: 0.8,
        delay: props.alwaysDark ? 0 : 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`pointer-events-none fixed top-0 left-0 z-50 flex w-full items-start justify-between p-4 transition-colors duration-700 md:p-8 ${isDark ? 'text-[#151926]' : 'text-white'}`}
    >
      {/* Left side: Logo */}
      <div className="pointer-events-auto ml-2 md:ml-4">
        <Link
          href="/"
          prefetch={false}
          onClick={handleLogoClick}
          aria-label="Home"
          className="block transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo-alize.png"
            alt="Alize Logo"
            width={80}
            height={160}
            priority
            loading="eager"
            style={{ height: 'auto' }}
            className="h-auto w-12 max-w-[48px] object-contain md:w-16 md:max-w-[64px] lg:w-20 lg:max-w-[80px]"
          />
        </Link>
      </div>

      {/* Right side: Navigation */}
      <NavigationMenu isDark={isDark} />
    </motion.header>
  );
}
