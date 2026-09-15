'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export function NinthSection() {
  const t = useTranslations('Index');

  const items = [t('developer'), t('sales_marketing'), t('license_obtained'), t('year_2026')];

  return (
    <section className="bg-textured-sand relative flex w-full flex-col items-center justify-start overflow-hidden py-32 text-[#151926] md:py-48">
      {/* Top indicator: RETURN YEAR AFTER YEAR */}
      <div className="sticky top-32 z-20 flex flex-col items-center justify-center">
        <h4
          className={`text-[10px] font-bold tracking-[0.15em] text-[#151926] uppercase md:text-[11px] ${inter.className}`}
        >
          {t('return_year_after_year')}
        </h4>
        <div className="mt-8 h-16 w-[1px] bg-[#151926]/30 md:mt-12 md:h-24"></div>
      </div>

      {/* Main List */}
      <div
        className={`relative z-10 mt-24 flex flex-col items-center justify-center space-y-6 uppercase md:mt-32 md:space-y-10 ${playfair.className}`}
      >
        {items.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
            className="group flex cursor-pointer items-start justify-center transition-opacity hover:opacity-70"
          >
            <h2
              className="text-center text-[9vw] leading-[0.9] font-medium tracking-tighter sm:text-[7vw] md:text-[5vw] xl:text-[4.5vw]"
              style={{ transform: 'scaleY(1.3)' }}
            >
              {text}
            </h2>
            <span className="mt-2 ml-2 text-[3vw] font-light md:mt-4 md:ml-3 md:text-[1.5vw]">
              +
            </span>
          </motion.div>
        ))}
      </div>

      {/* Right side bleeding flowers */}
      <div className="pointer-events-none absolute top-1/3 right-[-10%] z-0 w-[80vw] max-w-[700px] -translate-y-1/2 rotate-y-[175deg] rotate-z-[-40deg] md:right-[-10em] md:w-[55vw] lg:top-1/2 lg:right-0 lg:rotate-z-[-30deg]">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-label="Bougainvillea flowers video"
          className="h-full w-full object-cover opacity-90 mix-blend-multiply"
          src="/bougainvillea-flowers_03.webm"
        />
      </div>
    </section>
  );
}
