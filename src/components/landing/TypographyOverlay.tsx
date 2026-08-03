'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'], display: 'swap' });

// Helper component for staggered letter animations
const AnimatedText = ({
  text,
  delay = 0,
  className = '',
}: {
  text: string;
  delay?: number;
  className?: string;
}) => (
  <motion.span
    className={`inline-flex ${className}`}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: delay },
      },
    }}
  >
    {/* eslint-disable-next-line unicorn/prefer-spread */}
    {text.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={{
          hidden: { opacity: 0, x: 60, y: -80, rotate: 25, filter: 'blur(6px)' },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.5, ease: [0.2, 0.65, 0.3, 0.9] },
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

  return (
    <div
      className={`pointer-events-none relative flex h-[100vh] w-full flex-col items-center justify-center ${playfair.className}`}
    >
      {/* Central Layout Container */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
        {/* Main Title */}
        <h1 className="flex flex-col items-center text-center text-white">
          <span className="text-4xl leading-none font-normal tracking-[0.2em] drop-shadow-md md:text-7xl">
            <AnimatedText text="ERA" delay={3.5} />
          </span>
          <span
            className="mt-2 flex justify-center text-[2.75rem] leading-none tracking-tight drop-shadow-md sm:text-6xl md:text-[7.5rem]"
            style={{ transform: 'scaleY(1.3)' }}
          >
            <AnimatedText text="RESIDENCE" delay={3.7} />
          </span>
        </h1>

        {/* Cursive 'Estepona' */}
        <div className="z-10 mt-4 -ml-4 flex justify-center md:mt-8 md:-ml-8">
          <span
            className="font-serif text-4xl text-white italic drop-shadow-md sm:text-5xl md:text-7xl"
            style={{ fontFamily: "'Brush Script MT', cursive, serif" }}
          >
            <AnimatedText text="Estepona" delay={4.3} />
          </span>
        </div>
      </div>

      {/* Horizontal Text Row (Bottom Center) */}
      <motion.div
        className="absolute bottom-8 mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 md:bottom-16 md:px-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 4.8, ease: 'easeOut' }}
      >
        <div className="w-1/3 text-left text-[9px] tracking-[0.1em] text-white uppercase min-[400px]:text-xs sm:text-sm md:text-2xl md:tracking-[0.2em]">
          {t('a_place')}
        </div>

        <div
          className={`flex w-1/3 items-center justify-center gap-1 text-[6px] font-bold tracking-[0.1em] text-white/90 uppercase min-[400px]:gap-2 min-[400px]:text-[7px] md:gap-4 md:text-[11px] md:tracking-[0.3em] ${inter.className}`}
        >
          <span>{t('by_day')}</span>
          <div className="h-[1px] w-4 bg-white/70 min-[400px]:w-8 md:w-32"></div>
          <span>{t('by_night')}</span>
        </div>

        <div className="flex w-1/3 justify-end text-right text-[9px] tracking-[0.1em] text-white uppercase min-[400px]:text-xs sm:text-sm md:text-2xl md:tracking-[0.2em]">
          <span className="max-w-[120px] text-right md:max-w-none">{t('to_return_to')}</span>
        </div>
      </motion.div>
    </div>
  );
}
