'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';
import { useRef } from 'react';
import { WebGLSlider } from './WebGLSlider';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

export function SecondSection() {
  const t = useTranslations('Index');
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  // Push the content up slightly for a parallax feel
  const contentY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative z-40 mt-[20vh] flex min-h-[150vh] w-full flex-col bg-transparent"
    >
      <motion.div
        className="relative z-10 mx-auto flex w-full flex-col items-center"
        style={{ y: contentY }}
      >
        {/* Unified SVG Curve and Text - Perfect Semi-Circle */}
        <svg
          viewBox="0 0 1920 960"
          className="-mb-[1px] block h-auto w-full"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            {/* Path specifically for text, without the Z closing line, so 50% is perfectly at the top arc */}
            <path id="curve-text-path" d="M 0,960 A 960,960 0 0,1 1920,960" />
          </defs>

          {/* Blue background curve (Perfect Semi-Circle) */}
          <path d="M 0,960 A 960,960 0 0,1 1920,960 Z" fill="#B3C6D3" />

          {/* Text following the curve, pushed down (dy) to sit inside the blue area */}
          <text
            letterSpacing="0.1em"
            className={`fill-[#151926] uppercase ${playfair.className} text-[110px] md:text-[75px]`}
          >
            <textPath href="#curve-text-path" startOffset="50%" textAnchor="middle">
              <tspan dy="120">{t('three_reasons')}</tspan>
            </textPath>
          </text>
        </svg>
        {/* Solid blue background for the rest of the section */}
        <div className="flex w-full flex-col items-center bg-[#B3C6D3] px-4 pt-0 pb-24 md:px-16 md:pb-48">
          {/* Wrapper to pull content UP into the empty blue space of the SVG semi-circle */}
          {/* On mobile, we pull up much less because the curve is physically shorter (only 50vw tall) */}
          <div className="relative z-20 -mt-[5vw] flex w-full flex-col items-center md:-mt-[25vw] lg:-mt-[22vw]">
            {/* Center Logo & Vertical Line */}
            <div className="mb-24 flex flex-col items-center md:mb-48">
              <div
                className={`flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-[#151926] uppercase md:gap-6 md:text-xs ${inter.className}`}
              >
                <span>{t('costa')}</span>
                {/* Minimalist Flower Logo */}
                <svg
                  width="24"
                  height="24"
                  className="md:h-8 md:w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C12 2 15 5 15 9C15 11 13.5 12 12 12C10.5 12 9 11 9 9C9 5 12 2 12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 22C12 22 9 19 9 15C9 13 10.5 12 12 12C13.5 12 15 13 15 15C15 19 12 22 12 22Z"
                    fill="currentColor"
                  />
                  <path
                    d="M22 12C22 12 19 9 15 9C13 9 12 10.5 12 12C12 13.5 13 15 15 15C19 15 22 12 22 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M2 12C2 12 5 15 9 15C11 15 12 13.5 12 12C12 10.5 11 9 9 9C5 9 2 12 2 12Z"
                    fill="currentColor"
                  />
                </svg>
                <span>{t('del_sol')}</span>
              </div>

              {/* Vertical Line */}
              <div className="my-12 h-24 w-[1px] bg-[#151926]/30 md:my-8 md:h-32 lg:h-48"></div>

              <p
                className={`max-w-[300px] text-center text-[11px] leading-loose font-bold tracking-[0.15em] text-[#151926] uppercase md:text-xs ${inter.className}`}
              >
                {t('a_place')} — {t('to_return_to')}
              </p>
            </div>

            {/* Real Life Location */}
            <div className="flex w-full flex-col items-center">
              <h2
                className={`mb-16 px-4 text-center text-[9vw] leading-[1.3] font-bold tracking-tighter text-[#151926] uppercase sm:text-[8vw] md:mb-32 md:text-[100px] md:leading-none lg:text-[120px] ${playfair.className}`}
                style={{ transform: 'scaleY(1.25)', transformOrigin: 'center' }}
              >
                {t('real_life_location')}
              </h2>

              {/* Image Slider Component */}
              <WebGLSlider
                images={[
                  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920',
                  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920',
                  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920',
                ]}
                autoplay
                noRounded
              />

              <p
                className={`mt-8 max-w-[600px] text-center text-xs leading-[1.8] font-light text-[#2D3346] sm:text-sm md:mt-12 md:text-base ${inter.className}`}
              >
                {t('location_desc')}
              </p>

              <p
                className={`mt-16 text-center text-[9px] font-bold tracking-[0.2em] text-[#151926] uppercase md:text-[11px] ${inter.className}`}
              >
                {t('designed_as')}
              </p>
            </div>
          </div>{' '}
          {/* End of content wrapper */}
        </div>{' '}
        {/* End of solid blue background div */}
      </motion.div>
    </section>
  );
}
