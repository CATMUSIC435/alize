'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import { SmartVideo } from '@/components/SmartVideo';
import { WaveDivider } from '@/components/ui/WaveDivider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export function GalleryHero(props: { totalItems: number }) {
  const t = useTranslations('GalleryPage');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const countDisplay = (props.totalItems || 24).toString().padStart(2, '0');

  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-[18vh] pb-8 md:pt-[20vh] md:pb-12">
      {/* Soft Bougainvillea Floral Accent - Signature Alizé Coastal Feel */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 hidden h-[80vw] max-h-[600px] w-[80vw] max-w-[600px] translate-x-[20%] translate-y-0 rotate-y-[180deg] opacity-85 md:block">
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
        className="relative z-10 mx-auto mt-[6vh] flex w-full max-w-[1400px] flex-col justify-between px-6 md:px-12"
      >
        {/* Main Hero Row: Massive Typographic Headline & Count */}
        <div className="flex w-full flex-row items-end justify-between gap-4 pb-4 md:pb-6">
          <motion.div variants={itemVariants}>
            <div className="mb-5 flex items-center gap-3 sm:mb-6 md:mb-8">
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-[#8B7043] opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#8B7043]" />
              </span>
              <span
                className={`text-[10px] font-bold tracking-[0.28em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}
              >
                ALIZÉ • {t('hero_badge')}
              </span>
              <span className="h-[1px] w-12 bg-gradient-to-r from-[#8B7043] to-transparent md:w-20" />
            </div>

            <h1
              className={`whitespace-nowrap text-[8vw] leading-none font-normal tracking-tight text-[#151926] uppercase sm:text-[9vw] md:text-[85px] lg:text-[100px] xl:text-[115px] ${playfair.className}`}
            >
              {t('hero_heading')}
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <span
              className={`block shrink-0 text-[8vw] leading-none font-light tracking-tighter text-[#8B7043]/30 sm:text-[9vw] md:text-[85px] lg:text-[100px] xl:text-[115px] ${playfair.className}`}
            >
              {countDisplay}
            </span>
          </motion.div>
        </div>

        {/* Hairline Divider & Fluid Architectural Story */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col items-start gap-4 border-t border-[#151926]/15 pt-6 md:flex-row md:items-center md:justify-between"
        >
          <p
            className={`max-w-2xl text-[10px] leading-relaxed font-medium tracking-[0.15em] text-[#151926]/75 uppercase sm:text-[11px] md:text-xs ${inter.className}`}
          >
            {t('hero_description')}
          </p>
          <span
            className={`text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[10px] ${inter.className}`}
          >
            {t('hero_curated_sub')}
          </span>
        </motion.div>

        {/* Ambient Wave Ripple Divider */}
        <motion.div variants={itemVariants} className="mt-8 md:mt-12">
          <WaveDivider color="#8B7043" className="text-[#8B7043]/15" />
        </motion.div>
      </motion.div>
    </section>
  );
}

