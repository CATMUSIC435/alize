'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter } from 'next/font/google';
import { useUIStore } from '@/store/useUIStore';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '700'], display: 'swap' });

export function ScrollIndicator() {
  const t = useTranslations('Index');
  const isIntroComplete = useUIStore((state) => state.isIntroComplete);

  const { scrollYProgress } = useScroll();

  // Dynamic number representing scroll percentage (01 to 99)
  const scrollNumber = useTransform(scrollYProgress, (v) => {
    const percentage = Math.max(1, Math.min(99, Math.floor(v * 100)));
    return percentage.toString().padStart(2, '0');
  });

  const indicatorTop = useTransform(scrollYProgress, [0, 1], ['10px', 'calc(100% - 10px)']);

  const handleScrollDown = () => {
    if (typeof window === 'undefined') return;
    const target = window.innerHeight * 0.95;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.0 });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className={`pointer-events-none fixed bottom-8 left-4 z-50 flex flex-col items-center md:bottom-12 md:left-12 ${inter.className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isIntroComplete ? 1 : 0 }}
      transition={{ duration: 0.8, delay: isIntroComplete ? 0.35 : 0, ease: 'easeOut' }}
    >
      <div className="relative mb-4 h-[200px] w-8 md:h-[300px]">
        {/* Inactive line track */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-white/30" />
        {/* Active solid white line (GPU scaleY) */}
        <motion.div
          className="absolute top-0 left-1/2 w-[1px] -translate-x-1/2 origin-top bg-white"
          style={{ height: '100%', scaleY: scrollYProgress }}
        />
        {/* Numerical badge moving smoothly along the track */}
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-5 min-w-[20px] items-center justify-center rounded bg-[#0D2D40]/90 px-1 text-[10px] leading-none font-bold text-white drop-shadow-md md:text-xs"
          style={{ top: indicatorTop }}
        >
          {scrollNumber}
        </motion.span>
      </div>

      {/* Clickable Scroll Trigger */}
      <button
        type="button"
        onClick={handleScrollDown}
        aria-label={t('scroll')}
        className="pointer-events-auto flex cursor-pointer flex-col items-center transition-opacity hover:opacity-80 active:scale-95 focus:outline-none"
      >
        <div className="mb-4 flex h-20 items-center justify-center">
          <span className="rotate-90 text-[8px] font-bold tracking-[0.3em] whitespace-nowrap text-white uppercase drop-shadow-md md:text-[10px]">
            {t('scroll')}
          </span>
        </div>

        <motion.svg
          width="10"
          height="40"
          viewBox="0 0 10 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
          animate={{ y: [0, 15, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <path
            d="M5 0L5 38M5 38L1 34M5 38L9 34"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>
    </motion.div>
  );
}
