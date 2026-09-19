'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { SandRipples } from './SandRipples';
import { LazyWebGLSlider } from './LazyWebGLSlider';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

const secondSectionImages = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920',
];

export function SecondSection() {
  const t = useTranslations('Index');
  const sectionRef = useRef<HTMLElement>(null);

  const setActiveSection = useUIStore((state) => state.setActiveSection);
  const isInView = useInView(sectionRef, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('second');
    }
  }, [isInView, setActiveSection]);

  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  // Push the content up slightly for a parallax feel
  const contentY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  // Dynamically expand text letter-spacing strongly along the arc as user scrolls into section
  const letterSpacing = useTransform(scrollYProgress, [0, 0.85], ['0.02em', '0.38em']);

  return (
    <section
      ref={sectionRef}
      className="relative z-40 mt-0 flex min-h-screen w-full flex-col bg-transparent md:mt-[20vh] lg:min-h-[150vh]"
    >
      <motion.div
        className="relative z-10 mx-auto flex w-full flex-col items-center"
        style={{ y: contentY, willChange: 'transform' }}
      >

        {/* Unified SVG Curve and Text - Perfect Semi-Circle */}
        <svg
          viewBox="0 0 1920 960"
          className="-mb-[1px] block h-auto w-full"
          preserveAspectRatio="xMidYMax meet"
          overflow="visible"
        >
          <defs>
            {/* Path specifically for text, without the Z closing line, so 50% is perfectly at the top arc */}
            <path id="curve-text-path" d="M 0,960 A 960,960 0 0,1 1920,960" />

            {/* Gradient matching the bg-textured-sand class */}
            <linearGradient id="sandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F0EBE1" />
              <stop offset="50%" stopColor="#EBD0B3" />
              <stop offset="100%" stopColor="#E1AC88" />
            </linearGradient>
          </defs>

          {/* Sand background curve (Perfect Semi-Circle) */}
          <path d="M 0,960 A 960,960 0 0,1 1920,960 Z" fill="url(#sandGrad)" />

          {/* Text following the curve, pushed down (dy) to sit inside the blue area */}
          <motion.text
            style={{ letterSpacing }}
            className={`fill-[#151926] uppercase ${playfair.className} text-[56px] sm:text-[62px] md:text-[68px]`}
          >
            <textPath href="#curve-text-path" startOffset="50%" textAnchor="middle">
              <tspan dy="120">{t('three_reasons')}</tspan>
            </textPath>
          </motion.text>
        </svg>
        {/* Project Map Background */}
        
        {/* Solid blue background for the rest of the section */}
        <div className="bg-textured-sand relative flex w-full flex-col items-center px-4 pt-0 pb-24 md:px-16 md:pb-48">
          <SandRipples position="left" />
          <SandRipples position="right" />
          <div className='relative h-[30vh] md:h-[50vh] w-full'>
<div className="pointer-events-none relative z-10 aspect-[2560/1440] w-full max-w-[1600px] overflow-visible md:-mt-[25vw]">
          <Image
            src="/map.png"
            alt="Bản đồ dự án"
            fill
            sizes="(max-width: 768px) 100vw, 1500px"
            className="object-contain object-top"
          />
        </div>
          </div>
          {/* Wrapper to pull content UP into the empty blue space of the SVG semi-circle */}
          {/* On mobile, we pull up much less because the curve is physically shorter (only 50vw tall) */}
          <div className="relative z-20 flex w-full flex-col items-center">
            {/* Center Logo & Vertical Line */}
            <div className="mb-24 flex flex-col items-center md:mb-48">
              <div className="mb-6 flex justify-center md:mb-8">
                <Image
                  src="/logo-alize.png"
                  alt="Alizé Logo"
                  width={140}
                  height={168}
                  className="h-20 w-auto object-contain md:h-28"
                />
              </div>

              <div
                className={`flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-[#151926] uppercase md:gap-6 md:text-xs ${inter.className}`}
              >
                <span>{t('costa')}</span>
                <span>{t('del_sol')}</span>
              </div>

              {/* Vertical Line */}
              <div className="my-12 h-24 w-[1px] bg-[#151926]/30 md:my-8 md:h-32 lg:h-48"></div>

              <p
                className={`max-w-[680px] px-4 text-center text-sm leading-[1.8] font-light tracking-wide text-[#2D3346] sm:text-base sm:leading-[1.85] md:text-[17px] md:leading-[1.9] ${inter.className}`}
              >
                {t('trade_wind_story')}
              </p>
            </div>

            {/* Real Life Location */}
            <div className="flex w-full flex-col items-center">
              <h2 className={`mb-14 max-w-[1150px] px-6 text-center text-2xl leading-[1.4] font-normal tracking-tight text-[#151926] sm:text-3xl sm:leading-[1.35] md:mb-24 md:text-4xl md:leading-[1.3] lg:text-[48px] lg:leading-[1.28] xl:text-[54px] xl:leading-[1.25] ${playfair.className}`}>
                {t('real_life_location')}
              </h2>

              {/* Image Slider Component wrapped with scale animation */}
              <motion.div
                className="flex w-full justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <LazyWebGLSlider
                  images={secondSectionImages}
                  autoplay
                  noRounded
                  className="w-[85vw] !max-w-[1150px]"
                />
              </motion.div>

              {/* Location Heading & Description Paragraphs */}
                <h3
                  className={`mt-12 text-center text-xs font-bold tracking-[0.25em] text-[#151926] uppercase sm:text-sm md:mt-16 md:text-base ${inter.className}`}
                >
                  {t('location_heading')}
                </h3>

                <div
                  className={`mt-6 max-w-[680px] space-y-4 px-4 text-center text-sm leading-[1.85] font-light text-[#2D3346] sm:text-base sm:leading-[1.9] md:text-[16px] md:leading-[1.95] ${inter.className}`}
                >
                  <p>{t('location_desc_1')}</p>
                  <p>{t('location_desc_2')}</p>
                </div>
            </div>
          </div>{' '}
          {/* End of content wrapper */}
        </div>{' '}
        {/* End of solid blue background div */}
      </motion.div>
    </section>
  );
}
