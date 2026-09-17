'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
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

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';

export function FloorplanHero() {
  const t = useTranslations('FloorplansPage');

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

  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-[18vh] pb-[6vh] md:pt-[20vh] md:pb-[8vh]">
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
        {/* Main Hero Row: Massive Typographic Headline & Tower Height Count */}
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
              39
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

        {/* Soft Condotel Waveform Feature Banner (Nét gợn lượn sóng) */}
        <motion.div variants={itemVariants} className="mt-10 w-full md:mt-14">
          <div
            className="relative bg-[#D6D3C8] p-[1px] drop-shadow-xl"
            style={{ clipPath: clipPathPolygon }}
          >
            <div
              className="relative flex flex-col items-center justify-between gap-8 bg-[#FBF9F5] p-6 transition-colors duration-500 sm:p-8 lg:flex-row lg:gap-12 lg:p-12"
              style={{ clipPath: clipPathPolygon }}
            >
              {/* Left Column: Soft Architectural Waveform Visual */}
              <div className="relative w-full overflow-hidden lg:w-[55%]">
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden drop-shadow-md"
                  style={{ clipPath: clipPathPolygon }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=85&w=1400"
                    alt="Alizé Condotel Undulating Wave Balconies"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151926]/60 via-transparent to-transparent opacity-60" />

                  {/* Gold Aesthetic Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-[#8B7043]/40 bg-[#151926]/90 px-3.5 py-1.5 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E0AC87]" />
                    <span
                      className={`text-[8.5px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase md:text-[9.5px] ${inter.className}`}
                    >
                      AEDAS WAVEFORM ARCHITECTURE
                    </span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute right-4 bottom-4 left-4 z-10">
                    <span className={`block text-[8px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase md:text-[9px] ${inter.className}`}>
                      {t('waveform_badge')}
                    </span>
                    <h3 className={`text-sm font-medium text-white uppercase sm:text-base md:text-lg ${playfair.className}`}>
                      {t('waveform_caption')}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Narrative & Fluid Metrics */}
              <div className="flex w-full flex-col justify-between py-2 lg:w-[45%]">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8B7043]" />
                    <span className={inter.className}>{t('waveform_tag')}</span>
                  </div>

                  <h2
                    className={`mb-4 text-xl leading-[1.2] font-medium tracking-tight text-[#151926] uppercase sm:text-2xl lg:text-[28px] xl:text-[32px] ${playfair.className}`}
                  >
                    {t('hero_title_2')}
                  </h2>

                  <p
                    className={`mb-6 text-xs leading-relaxed text-[#151926]/75 sm:text-sm ${inter.className}`}
                  >
                    {t('waveform_desc')}
                  </p>
                </div>

                {/* 4 Soft Condotel Metrics Ribbon */}
                <div className="grid grid-cols-2 gap-4 border-t border-[#151926]/12 pt-5 sm:gap-6">
                  <div>
                    <span
                      className={`block text-[8.5px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[9.5px] ${inter.className}`}
                    >
                      {t('stat_stories_label')}
                    </span>
                    <span className={`text-base font-light text-[#151926] sm:text-lg md:text-xl ${playfair.className}`}>
                      {t('stat_stories_val')}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`block text-[8.5px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[9.5px] ${inter.className}`}
                    >
                      {t('stat_height_label')}
                    </span>
                    <span className={`text-base font-light text-[#151926] sm:text-lg md:text-xl ${playfair.className}`}>
                      {t('stat_height_val')}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`block text-[8.5px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[9.5px] ${inter.className}`}
                    >
                      {t('stat_balcony_label')}
                    </span>
                    <span className={`text-base font-light text-[#151926] sm:text-lg md:text-xl ${playfair.className}`}>
                      {t('stat_balcony_val')}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`block text-[8.5px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[9.5px] ${inter.className}`}
                    >
                      {t('stat_ceiling_label')}
                    </span>
                    <span className={`text-base font-light text-[#151926] sm:text-lg md:text-xl ${playfair.className}`}>
                      {t('stat_ceiling_val')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ambient Wave Ripple Divider */}
        <motion.div variants={itemVariants} className="mt-8 md:mt-12">
          <WaveDivider color="#8B7043" className="text-[#8B7043]/15" />
        </motion.div>
      </motion.div>
    </section>
  );
}
