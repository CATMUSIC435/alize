'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { inter, playfair } from '@/utils/Fonts';

import { RevealHeading, RevealLabel, RevealLine, RevealParagraph } from './RevealText';

export function ThirdSection() {
  const t = useTranslations('Index');

  return (
    <section className="relative min-h-[600px] w-full overflow-hidden bg-[#151926] md:min-h-[800px] lg:h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920"
          alt="Alize Residence Pool"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Top Fade matching the sand gradient to blend sections seamlessly */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-24 w-full bg-gradient-to-b from-[#EBD0B3] via-[#EBD0B3]/40 to-transparent md:h-64"></div>
        {/* Soft Gradient Overlay for better text readability */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
      </div>

      {/* Vision Content */}
      <div className="absolute right-6 bottom-12 left-6 z-10 flex flex-col items-start text-white sm:right-8 sm:bottom-16 sm:left-auto sm:max-w-[85%] md:right-16 md:bottom-24 md:max-w-4xl">
        <RevealHeading
          as="h2"
          align="left"
          text={t('pool_quote_title')}
          className={`text-2xl leading-tight font-medium tracking-tight text-white uppercase sm:text-4xl md:text-5xl lg:text-[54px] ${playfair.className}`}
        />
        <RevealParagraph
          text={t('pool_quote_desc')}
          delay={0.25}
          className={`mt-3 max-w-2xl text-base font-light leading-relaxed text-white/90 sm:text-xl md:mt-5 md:text-2xl ${playfair.className}`}
        />
        <div className="mt-5 flex items-center gap-3.5 md:mt-7">
          <RevealLine direction="horizontal" className="h-[1px] w-8 bg-white/50 md:w-12" delay={0.4} />
          <a
            href="https://www.aedas.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs font-normal tracking-[0.2em] text-white/80 uppercase transition-opacity hover:opacity-100 hover:underline sm:text-sm ${inter.className}`}
          >
            <RevealLabel text={t('pool_quote_author')} delay={0.45} align="left" />
          </a>
        </div>
      </div>
    </section>
  );
}
