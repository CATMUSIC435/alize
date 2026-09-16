'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { SmartVideo } from '@/components/SmartVideo';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter, Pinyon_Script } from 'next/font/google';
import Image from 'next/image';
import { useRef } from 'react';
import { CircleButton } from './CircleButton';
import { WebGLSlider } from './WebGLSlider';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

const eighthSectionImages = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920',
];
const pinyon = Pinyon_Script({ subsets: ['latin'], weight: ['400'] });

export function EighthSection() {
  const t = useTranslations('Index');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rightColumnY = useTransform(scrollYProgress, [0, 1], [100, -200]);

  return (
    <div className="relative w-full bg-[#151926]">
      <section
        ref={sectionRef}
        className="bg-textured-sand relative z-20 w-full [border-top-left-radius:50vw] [border-top-right-radius:50vw] pt-[10vh] pb-6 text-[#151926] md:pt-[20vw] lg:pb-44"
      >
      {/* Center Title */}
      <div className="flex w-full flex-col items-center text-center">
        <h2
          className={`flex flex-col items-center text-[6vw] leading-[0.9] font-medium tracking-tighter text-[#151926] uppercase md:text-[8vw] md:leading-[0.92] ${playfair.className}`}
          style={{ transform: 'scaleY(1.15)' }}
        >
          {t('the_space')
            .split('\n')
            .map((word, i) => (
              <span key={i}>{word}</span>
            ))}
        </h2>
        <span
          className={`relative z-10 ml-[2vw] text-[20vw] leading-[0.5] text-[#151926] md:ml-[4vw] md:pt-24 md:text-[12vw] ${pinyon.className}`}
        >
          {t('live_in')}
        </span>
      </div>

      {/* Content Layout */}
      <div className="relative mt-24 flex w-full flex-col md:mt-48 md:flex-row">
        {/* Left Column (Burgundy Box & Flowers) */}
        <div className="relative w-full md:w-[45%]">
          <div className="relative flex h-[600px] w-full items-center justify-end rounded-r-xl md:h-[900px] md:w-full md:rounded-none lg:w-[90%]">

            {/* Flower Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 z-10 h-[75%] w-[80%] -translate-x-1/2 -translate-y-1/2 shadow-2xl md:h-[80%] md:w-[70%]"
            >
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                alt="Sunken terrace"
                fill
                sizes="(max-width: 768px) 80vw, 35vw"
                className="object-cover"
              />
            </motion.div>

            {/* Bougainvillea Video Overlay */}
            <SmartVideo
              autoPlay
              loop
              muted
              playsInline
              aria-label="Bougainvillea flowers video"
              className="safari-video-hide pointer-events-none absolute top-0 right-0 z-30 w-[80%] max-w-[600px] rotate-90 md:w-[100%]"
              src="/bougainvillea-flowers_04.webm"
            />
          </div>

          {/* Upgrades List */}
          <div className="mt-16 flex w-full justify-start pl-8 md:mt-16 md:pl-[8vw]">
            <div className="max-w-[400px]">
              <h3
                className={`mb-4 text-[10px] font-bold tracking-widest text-[#151926] uppercase md:text-[11px] ${inter.className}`}
              >
                {t('optional_upgrades')}
              </h3>
              <ul
                className={`space-y-2 text-[10px] font-bold tracking-widest text-[#151926] uppercase md:text-[11px] ${inter.className}`}
              >
                <li>{t('private_jacuzzi')}</li>
                <li>{t('ev_charging')}</li>
                <li>{t('photovoltaic')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column (Balcony Image & Text) */}
        <motion.div
          style={{ y: rightColumnY, willChange: 'transform' }}
          className="relative z-10 mt-24 flex w-full flex-col px-6 md:mt-0 md:w-[55%] md:px-0"
        >
          {/* Balcony Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative h-[35vh] w-full self-end shadow-xl md:h-[65vh] md:w-[95%]"
          >
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920"
              alt="Luxury balcony"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Text Content */}
          <div className="mt-16 flex w-full flex-col px-4 md:mt-32 md:px-16 xl:px-24">
            <h3
              className={`indent-[15%] text-3xl leading-[1.1] font-medium tracking-tighter text-[#151926] uppercase whitespace-pre-line md:indent-[20%] md:text-[2.5vw] md:leading-[1.15] xl:text-[2.2vw] ${playfair.className}`}
              style={{ transform: 'scaleY(1.15)', transformOrigin: 'left top' }}
            >
              {t('every_detail')}
            </h3>

            <div className="mt-16 flex w-full justify-end md:mt-24">
              <p
                className={`w-[90%] text-xs leading-[1.8] text-[#151926] opacity-80 md:w-[60%] md:text-[14px] ${inter.className}`}
              >
                {t('underfloor_heating')}
              </p>
            </div>

            {/* Massive Circle Button */}
            <div className="mt-16 flex justify-start md:mt-24 md:ml-[10%]">
              <CircleButton text={t('view_available')} variant="dark" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-height Image Slider */}
      <div className="mt-24 mb-32 w-full md:mt-32 md:mb-48">
        <WebGLSlider
          images={eighthSectionImages}
          fullHeight
          alignRight
          controlsLeft
          noRounded
          autoplay
        />
      </div>
    </section>
    </div>
  );
}
