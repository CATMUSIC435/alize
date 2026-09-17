'use client';

import { motion } from 'framer-motion';
import { SmartVideo } from '@/components/SmartVideo';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export function NinthSection() {
  const t = useTranslations('Index');

  return (
    <section className="bg-textured-sand relative flex w-full flex-col items-center justify-start overflow-hidden py-28 text-[#151926] md:py-44">
      {/* Top indicator with subtle vertical line */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span
          className={`text-[10px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}
        >
          {t('developer')}
        </span>
        <div className="my-6 h-12 w-[1px] bg-[#151926]/25 md:my-8 md:h-20"></div>
      </div>

      {/* Main Developer Narrative */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex max-w-[840px] flex-col items-center px-6 text-center"
      >
        <h2
          className={`text-2xl font-medium tracking-tight text-[#151926] uppercase sm:text-3xl md:text-4xl lg:text-[44px] lg:leading-[1.25] ${playfair.className}`}
        >
          {t('at_group_title')}
        </h2>

        <div
          className={`mt-8 space-y-5 text-sm leading-[1.85] font-light text-[#2D3346] sm:text-base sm:leading-[1.9] md:mt-10 md:text-[17px] md:leading-[1.95] ${inter.className}`}
        >
          <p>{t('at_group_desc_1')}</p>
          <p>{t('at_group_desc_2')}</p>
        </div>
      </motion.div>

      {/* Right side bleeding flowers */}
      <div className="pointer-events-none absolute top-1/3 right-[-10%] z-0 hidden w-[80vw] max-w-[700px] -translate-y-1/2 rotate-y-[175deg] rotate-z-[-40deg] md:right-[-10em] md:block md:w-[55vw] lg:top-1/2 lg:right-[-5%] lg:rotate-z-[-30deg]">
        <SmartVideo
          autoPlay
          loop
          muted
          playsInline
          aria-label="Bougainvillea flowers video"
          className="safari-video-hide h-full w-full object-cover opacity-90 mix-blend-multiply"
          src="/bougainvillea-flowers_03.webm"
        />
      </div>
    </section>
  );
}
