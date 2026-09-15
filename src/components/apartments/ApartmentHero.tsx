'use client';

import { motion } from 'framer-motion';
import { SmartVideo } from '@/components/SmartVideo';
import { useTranslations } from 'next-intl';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export function ApartmentHero() {
  const t = useTranslations('Index');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F3ED] pt-[20vh] pb-[10vh]">
      {/* Floral Decorative Image - Top Right */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 h-[80vw] max-h-[600px] w-[80vw] max-w-[600px] translate-x-[20%] translate-y-0 rotate-y-[180deg] opacity-90">
        <SmartVideo
          src="/bougainvillea-flowers_01.webm"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Decorative Flowers"
          className="safari-video-hide h-full w-full object-contain"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto mt-[10vh] flex w-full max-w-[1400px] flex-row items-end justify-between gap-4 px-6 md:px-12"
      >
        <div className="pb-4">
          <motion.div variants={itemVariants}>
            <h1
              className={`truncate text-[10vw] leading-[0.85] text-[#151926] uppercase md:text-[120px] xl:text-[140px] ${playfair.className}`}
              style={{ transform: 'scaleY(1.3)', transformOrigin: 'bottom left' }}
            >
              {t('apartments')}
            </h1>
          </motion.div>
        </div>

        <div className="pb-4">
          <motion.div variants={itemVariants}>
            <span
              className={`shrink-0 text-[10vw] leading-[0.85] tracking-tighter text-[#151926] md:text-[120px] xl:text-[140px] ${playfair.className}`}
              style={{ transform: 'scaleY(1.3)', transformOrigin: 'bottom right' }}
            >
              25
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
