'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'], display: 'swap' });

// Helper component for staggered letter animations
const AnimatedText = (props: {
  text: string;
  delay?: number;
  className?: string;
}) => (
  <motion.span
    className={`inline-flex ${props.className ?? ''}`}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: props.delay ?? 0 },
      },
    }}
  >
    {/* eslint-disable-next-line unicorn/prefer-spread */}
    {props.text.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={{
          hidden: { opacity: 0, y: 35, rotate: 6 },
          visible: {
            opacity: 1,
            y: 0,
            rotate: 0,
            transition: { duration: 1.1, ease: [0.2, 0.65, 0.3, 0.9] },
          },
        }}
        className="inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </motion.span>
);

export function TypographyOverlay() {
  const t = useTranslations('Index');
  const isIntroComplete = useUIStore((state) => state.isIntroComplete);
  const heroMode = useUIStore((state) => state.heroMode);
  const setHeroMode = useUIStore((state) => state.setHeroMode);

  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 220], [1, 0]);

  // Slow automated cycle between Day and Night
  useEffect(() => {
    if (!isIntroComplete) return;

    const timer = setInterval(() => {
      setHeroMode(useUIStore.getState().heroMode === 'day' ? 'night' : 'day');
    }, 7500);

    return () => clearInterval(timer);
  }, [isIntroComplete, setHeroMode]);

  return (
    <motion.div
      style={{ opacity: scrollOpacity }}
      className={`pointer-events-none relative flex h-[100vh] w-full flex-col items-center justify-center ${playfair.className}`}
    >
      {/* Central Layout Container */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
        {/* Main Title */}
        <h1 className="flex flex-col items-center text-center text-white">
          <span className="text-4xl leading-none font-normal tracking-[0.2em] drop-shadow-md md:text-7xl">
            <AnimatedText text="ERA" delay={2.4} />
          </span>
          <span
            className="mt-2 flex justify-center text-[2.75rem] leading-none tracking-tight drop-shadow-md sm:text-6xl md:text-[7.5rem]"
            style={{ transform: 'scaleY(1.3)' }}
          >
            <AnimatedText text="RESIDENCE" delay={2.6} />
          </span>
        </h1>

        {/* Cursive 'Estepona' */}
        <div className="z-10 mt-4 -ml-4 flex justify-center md:mt-8 md:-ml-8">
          <span
            className="font-serif text-4xl text-white italic drop-shadow-md sm:text-5xl md:text-7xl"
            style={{ fontFamily: "'Brush Script MT', cursive, serif" }}
          >
            <AnimatedText text="Estepona" delay={3.0} />
          </span>
        </div>
      </div>

      {/* Horizontal Text Row (Bottom Center) */}
      <motion.div
        className="pointer-events-none absolute bottom-8 mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 md:bottom-16 md:px-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 3.2, ease: 'easeOut' }}
      >
        <div className="w-1/3 text-left text-[9px] tracking-[0.1em] text-white uppercase min-[400px]:text-xs sm:text-sm md:text-2xl md:tracking-[0.2em]">
          {t('a_place')}
        </div>

        {/* Day / Night Animated Slider */}
        <div
          className={`pointer-events-auto flex w-1/3 items-center justify-center gap-1.5 text-[7px] font-bold tracking-[0.12em] uppercase select-none min-[400px]:gap-2.5 min-[400px]:text-[8px] md:gap-4 md:text-[11px] md:tracking-[0.3em] ${inter.className}`}
        >
          {/* Day Button */}
          <button
            type="button"
            onClick={() => setHeroMode('day')}
            className={`cursor-pointer transition-all duration-700 ${
              heroMode === 'day'
                ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] opacity-100'
                : 'text-white/45 hover:text-white/80 opacity-60'
            }`}
          >
            {t('by_day')}
          </button>

          {/* Gliding Track & Indicator */}
          <div
            onClick={() => setHeroMode(heroMode === 'day' ? 'night' : 'day')}
            className="group relative flex h-4 w-8 cursor-pointer items-center justify-center min-[400px]:w-14 md:w-36"
            title="Chuyển đổi Ban ngày / Ban đêm"
          >
            {/* Background Track Line */}
            <div className="h-[1px] w-full bg-white/30 transition-colors group-hover:bg-white/50" />

            {/* Glowing Indicator Dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.9)] md:h-2 md:w-2"
              initial={false}
              animate={{
                left: heroMode === 'day' ? '0%' : 'calc(100% - 6px)',
              }}
              transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Night Button */}
          <button
            type="button"
            onClick={() => setHeroMode('night')}
            className={`cursor-pointer transition-all duration-700 ${
              heroMode === 'night'
                ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] opacity-100'
                : 'text-white/45 hover:text-white/80 opacity-60'
            }`}
          >
            {t('by_night')}
          </button>
        </div>

        <div className="flex w-1/3 justify-end text-right text-[9px] tracking-[0.1em] text-white uppercase min-[400px]:text-xs sm:text-sm md:text-2xl md:tracking-[0.2em]">
          <span className="max-w-[120px] text-right md:max-w-none">{t('to_return_to')}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
