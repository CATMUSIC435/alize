'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export function ThirdSection() {
  const t = useTranslations('Index');

  return (
    <section className="relative lg:h-screen min-h-[600px] w-full overflow-hidden bg-[#151926] md:min-h-[800px]">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920"
          alt="Alize Residence Pool"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Top Fade from #B3C6D3 to transparent to blend sections seamlessly */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-24 w-full bg-gradient-to-b from-[#B3C6D3] via-[#B3C6D3]/80 to-transparent md:h-64"></div>
        {/* Soft Gradient Overlay for better text readability */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute right-6 bottom-12 left-6 z-10 flex flex-col items-start text-white sm:right-8 sm:bottom-16 sm:left-auto sm:max-w-[80%] md:right-16 md:bottom-24 md:max-w-4xl"
      >
        <span
          className={`mb-0 font-serif text-[60px] leading-[0.7] text-white sm:mb-2 sm:text-[100px] md:-mb-2 md:text-[140px] ${playfair.className}`}
        >
          “
        </span>
        <p
          className={`text-[15px] leading-[1.6] tracking-wide text-white/90 uppercase sm:text-2xl sm:leading-[1.3] md:text-4xl md:leading-[1.1] lg:text-[42px] ${playfair.className} origin-top [transform:scaleY(1)] md:[transform:scaleY(1.15)]`}
        >
          {t('pool_quote')}
        </p>
      </motion.div>
    </section>
  );
}
