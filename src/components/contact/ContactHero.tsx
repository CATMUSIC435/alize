'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import { SmartVideo } from '@/components/SmartVideo';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

/**
 * Hero header section for the Contact & Inquiry page.
 */
export function ContactHero() {
  const t = useTranslations('ContactPage');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-[16vh] pb-[4vh] md:pt-[20vh] md:pb-[6vh]">
      {/* Floral Decorative Video - Top Right */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 hidden h-[70vw] max-h-[560px] w-[70vw] max-w-[560px] translate-x-[15%] translate-y-[-10%] rotate-y-[180deg] opacity-85 md:block">
        <SmartVideo
          src="/bougainvillea-flowers_01.webm"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Decorative Bougainvillea Flowers"
          className="safari-video-hide h-full w-full object-contain"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col px-6 md:px-12"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-4">
          <span
            className={`inline-block text-[9px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-[10px] ${inter.className}`}
          >
            {t('hero_badge')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="pb-3">
          <h1
            className={`text-[9vw] leading-[0.95] text-[#151926] uppercase sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] ${playfair.className}`}
            style={{ transform: 'scaleY(1.3)', transformOrigin: 'bottom left' }}
          >
            {t('hero_title')}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <p
            className={`mt-6 max-w-2xl text-sm font-normal leading-relaxed text-[#151926]/75 sm:text-base md:text-lg ${inter.className}`}
          >
            {t('hero_subtitle')}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
