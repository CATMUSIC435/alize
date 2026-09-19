'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import { useUIStore } from '@/store/useUIStore';

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const playfairItalic = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  style: 'italic',
  display: 'swap',
});
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'], display: 'swap' });

/** Renders words with smooth baseline slide-up and fade-in without character jitter. */
const AnimatedWords = (props: {
  text: string;
  active: boolean;
  delay?: number;
  className?: string;
}) => {
  const words = props.text.split(' ');

  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${props.className ?? ''}`}
      initial="hidden"
      animate={props.active ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: props.delay ?? 0,
          },
        },
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden py-0.5">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: '110%' },
              visible: {
                opacity: 1,
                y: '0%',
                transition: {
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="inline-block max-md:!opacity-100 max-md:!transform-none"
          >
            {word}
            {wordIndex < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export function TypographyOverlay() {
  const t = useTranslations('Index');
  const isIntroComplete = useUIStore((state) => state.isIntroComplete);
  const heroMode = useUIStore((state) => state.heroMode);
  const setHeroMode = useUIStore((state) => state.setHeroMode);

  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 220], [1, 0]);

  return (
    <motion.div
      style={{ opacity: scrollOpacity }}
      className={`pointer-events-none relative flex min-h-[100dvh] h-[100vh] w-full flex-col items-center justify-center ${playfair.className}`}
    >
      {/* Central Layout Container */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 translate-y-14 min-[400px]:translate-y-18 sm:translate-y-24 md:translate-y-32 lg:translate-y-40">
        {/* Main Title */}
        <h1 className="flex flex-col items-center text-center text-white">
          <span className="text-3xl leading-none font-normal tracking-[0.24em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            <AnimatedWords text={t('hero_brand')} active={isIntroComplete} delay={0.05} />
          </span>
          <span className="mt-3 flex max-w-4xl justify-center px-4 text-center text-xs font-light tracking-[0.16em] uppercase text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] min-[380px]:text-sm sm:mt-4 sm:text-lg sm:tracking-[0.2em] md:text-2xl md:tracking-[0.24em] lg:text-3xl leading-relaxed">
            <AnimatedWords text={t('hero_tagline')} active={isIntroComplete} delay={0.18} />
          </span>
        </h1>

        {/* Signature developer credit */}
        <div className="z-10 mt-2.5 flex justify-center sm:mt-3.5 md:mt-4">
          <span
            className={`text-xs font-normal text-white/90 italic tracking-[0.18em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-sm md:text-base lg:text-lg ${playfairItalic.className}`}
          >
            <AnimatedWords text={t('hero_developer')} active={isIntroComplete} delay={0.32} />
          </span>
        </div>
      </div>

      {/* Horizontal Text Row (Bottom Center) */}
      <motion.div
        className="pointer-events-none absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 max-md:!opacity-100 max-md:!transform-none"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: isIntroComplete ? 1 : 0, y: isIntroComplete ? 0 : 18 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-1/4 sm:w-1/3 text-left text-[10px] min-[380px]:text-xs sm:text-sm md:text-lg lg:text-xl font-normal tracking-[0.14em] md:tracking-[0.2em] text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {t('a_place')}
        </div>

        {/* Day / Night Animated Slider */}
        <div
          className={`pointer-events-auto flex w-1/2 sm:w-1/3 items-center justify-center gap-2 min-[380px]:gap-2.5 sm:gap-3 md:gap-4 select-none ${inter.className}`}
        >
          {/* Day Button */}
          <button
            type="button"
            onClick={() => setHeroMode('day')}
            className={`cursor-pointer text-[8px] min-[380px]:text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.14em] md:tracking-[0.25em] transition-all duration-500 ${
              heroMode === 'day'
                ? 'text-white font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] opacity-100'
                : 'text-white/50 hover:text-white/80 opacity-60 font-normal'
            }`}
          >
            {t('by_day')}
          </button>

          {/* Gliding Track & Indicator */}
          <div
            onClick={() => setHeroMode(heroMode === 'day' ? 'night' : 'day')}
            className="group relative flex h-4 w-12 cursor-pointer items-center justify-center min-[380px]:w-16 sm:w-24 md:w-32 lg:w-36"
            title="Chuyển đổi Ban ngày / Ban đêm"
          >
            {/* Background Track Line */}
            <div className="h-[1px] w-full bg-white/40 transition-colors group-hover:bg-white/70" />

            {/* Glowing Indicator Dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.95)] md:h-2.5 md:w-2.5"
              initial={false}
              animate={{
                left: heroMode === 'day' ? '0%' : 'calc(100% - 8px)',
              }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Night Button */}
          <button
            type="button"
            onClick={() => setHeroMode('night')}
            className={`cursor-pointer text-[8px] min-[380px]:text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.14em] md:tracking-[0.25em] transition-all duration-500 ${
              heroMode === 'night'
                ? 'text-white font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] opacity-100'
                : 'text-white/50 hover:text-white/80 opacity-60 font-normal'
            }`}
          >
            {t('by_night')}
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end text-right text-[10px] min-[380px]:text-xs sm:text-sm md:text-lg lg:text-xl font-normal tracking-[0.14em] md:tracking-[0.2em] text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] whitespace-nowrap">
          {t('to_return_to')}
        </div>
      </motion.div>
    </motion.div>
  );
}
