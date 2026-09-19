'use client';

import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
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

  const percentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const topHeight = useMotionTemplate`calc(${percentage}% - ${percentage} * 0.48px)`;

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
      <div className="mb-4 flex h-[200px] w-8 flex-col items-center md:h-[300px]">
        <motion.div className="w-[1px] shrink-0 bg-white" style={{ height: topHeight }} />
        <motion.span className="my-4 flex h-[16px] shrink-0 items-center justify-center text-[10px] leading-none font-bold text-white drop-shadow-md md:text-xs">
          {scrollNumber}
        </motion.span>
        <div className="w-[1px] grow bg-white/30" />
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
