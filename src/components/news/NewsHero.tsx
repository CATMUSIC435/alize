'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import { SmartVideo } from '@/components/SmartVideo';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export function NewsHero(props: { totalArticles?: number }) {
  const t = useTranslations('Index');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const countDisplay = (props.totalArticles ?? 4).toString().padStart(2, '0');

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F3ED] pt-[18vh] pb-[6vh] md:pt-[20vh] md:pb-[8vh]">
      {/* Floral Decorative Video - Top Right */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 h-[80vw] max-h-[600px] w-[80vw] max-w-[600px] translate-x-[20%] translate-y-0 rotate-y-[180deg] opacity-90">
        <SmartVideo
          src="/bougainvillea-flowers_02.webm"
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
        className="relative z-10 mx-auto mt-[8vh] flex w-full max-w-[1400px] flex-col justify-between px-6 md:px-12"
      >
        {/* Main Hero Row: Title & Count */}
        <div className="flex w-full flex-row items-end justify-between gap-4 pb-4">
          <div>
            <motion.div variants={itemVariants}>
              <span
                className={`block text-[10px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}
              >
                ALIZÉ EDITORIAL & JOURNAL
              </span>
              <h1
                className={`truncate py-4 text-[10vw] leading-[0.9] text-[#151926] uppercase sm:text-[11vw] md:py-8 md:text-[100px] xl:text-[120px] ${playfair.className}`}
                style={{ transform: 'scaleY(1.3)', transformOrigin: 'bottom left' }}
              >
                {t('news')}
              </h1>
            </motion.div>
          </div>

          <div className="pb-4">
            <motion.div variants={itemVariants}>
              <span
                className={`shrink-0 text-[10vw] leading-[0.85] tracking-tighter text-[#151926] sm:text-[11vw] md:text-[120px] xl:text-[140px] ${playfair.className}`}
                style={{ transform: 'scaleY(1.3)', transformOrigin: 'bottom right' }}
              >
                {countDisplay}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Hairline Divider & Subtitle */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col items-start gap-4 border-t border-[#151926]/15 pt-6 md:flex-row md:items-center md:justify-between"
        >
          <p
            className={`max-w-2xl text-[10px] leading-relaxed font-medium tracking-[0.15em] text-[#151926]/70 uppercase sm:text-[11px] md:text-xs ${inter.className}`}
          >
            Nhịp đập dự án, triết lý kiến trúc Địa Trung Hải và câu chuyện phong cách sống bên bờ biển Mỹ Khê
          </p>
          <span
            className={`text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[10px] ${inter.className}`}
          >
            ESTEPONA — ĐÀ NẴNG 2026
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
