'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { SmartVideo } from '@/components/SmartVideo';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';
import Image from 'next/image';
import { useRef } from 'react';
import { CircleButton } from './CircleButton';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export function ArchitectureSplit() {
  const t = useTranslations('Index');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Split image merge (0 to 0.18)
  const leftX = useTransform(scrollYProgress, [0, 0.18], ['-7vw', '0vw']);
  const rightX = useTransform(scrollYProgress, [0, 0.18], ['7vw', '0vw']);

  // Image container expands to full screen (0.18 to 0.38)
  const containerWidth = useTransform(scrollYProgress, [0.18, 0.38], ['78vw', '100vw']);
  const containerHeight = useTransform(scrollYProgress, [0.18, 0.38], ['75vh', '100vh']);
  // Foreground flowers fly out as image expands (0.18 to 0.38)
  const leftFlowerX = useTransform(scrollYProgress, [0.18, 0.38], ['0vw', '-150vw']);
  const leftFlowerScale = useTransform(scrollYProgress, [0.18, 0.38], [1, 2.2]);

  const rightFlowerY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rightFlowerX = useTransform(scrollYProgress, [0.18, 0.38], ['0vw', '150vw']);
  const rightFlowerScale = useTransform(scrollYProgress, [0.18, 0.38], [1, 2.2]);
  const flowersOpacity = useTransform(scrollYProgress, [0.32, 0.38], [1, 0]);
  const flowersVisibility = useTransform(scrollYProgress, (v) => (v > 0.38 ? 'hidden' : 'visible'));

  // Step 2: "KIẾN TRÚC" text appears after full image is revealed (0.38 to 0.52), then lifts up (0.55 to 0.70)
  const textOpacity = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.38, 0.48], [0.85, 1]);
  const textY = useTransform(scrollYProgress, [0.55, 0.70], ['0vh', '-14vh']);

  // Step 3: Narrative Description & Redirect Button appear after "KIẾN TRÚC" lifts up (0.62 to 0.76)
  const descOpacity = useTransform(scrollYProgress, [0.62, 0.76], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.62, 0.76], ['40px', '0px']);

  return (
    <div id="concept" ref={containerRef} className="bg-textured-sand relative h-[300vh] w-full md:h-[350vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Split Image Container */}
        <motion.div
          style={{
            width: containerWidth,
            height: containerHeight
          }}
          className="relative flex overflow-hidden will-change-transform"
        >
          {/* Left Half Container */}
          <motion.div style={{ x: leftX }} className="relative h-full w-1/2 overflow-hidden">
            {/* Inner Image (full width of the whole container) */}
            <motion.div
              style={{ width: containerWidth }}
              className="absolute top-0 left-0 h-full will-change-transform"
            >
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920"
                alt="Architecture Left"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>

          {/* Right Half Container */}
          <motion.div
            style={{ x: rightX }}
            className="relative h-full w-1/2 overflow-hidden bg-transparent"
          >
            {/* Inner Image (full width of the whole container, anchored right) */}
            <motion.div
              style={{ width: containerWidth }}
              className="absolute top-0 right-0 h-full will-change-transform"
            >
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920"
                alt="Architecture Right"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* The "ARCHITECTURE" Text */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, x: '-50%', y: textY }}
          className="pointer-events-none absolute top-[24vh] left-1/2 z-20 flex w-full items-center justify-center px-4 will-change-transform md:top-[22vh]"
        >
          <h2
            className={`w-full text-center text-[13vw] leading-none font-medium tracking-tighter whitespace-nowrap text-white uppercase md:text-[11.5vw] ${playfair.className}`}
            style={{ transform: 'scaleY(1.3)', textShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
          >
            {t('architecture')}
          </h2>
        </motion.div>

        {/* Foreground Flowers (Videos with transparency) */}
        <motion.div
          style={{
            x: leftFlowerX,
            scale: leftFlowerScale,
            opacity: flowersOpacity,
            visibility: flowersVisibility,
            rotateX: 175,
            transformPerspective: 1000,
          }}
          className="pointer-events-none absolute bottom-0 left-[-10vw] z-30 hidden w-[80vw] max-w-[700px] will-change-transform md:left-[-5vw] md:block md:w-[80vw]"
        >
          <SmartVideo
            autoPlay
            loop
            muted
            playsInline
            aria-label="Bougainvillea flowers video"
            className="safari-video-hide h-full w-full object-cover opacity-90 mix-blend-multiply"
            src="/bougainvillea-flowers_01.webm"
          />
        </motion.div>

        <motion.div
          style={{
            y: rightFlowerY,
            x: rightFlowerX,
            scale: rightFlowerScale,
            opacity: flowersOpacity,
            visibility: flowersVisibility,
            rotateY: -170,
            rotateZ: -37,
            willChange: 'transform',
          }}
          className="pointer-events-none absolute top-1/4 right-[-15vw] z-30 hidden w-[70vw] max-w-[700px] will-change-transform md:right-[-5vw] md:block md:w-[60vw]"
        >
          <SmartVideo
            autoPlay
            loop
            muted
            playsInline
            aria-label="Bougainvillea flowers video"
            className="safari-video-hide h-full w-full object-cover opacity-90 mix-blend-multiply"
            src="/bougainvillea-flowers_03.webm"
          />
        </motion.div>

        {/* Description and Button - Directly embedded inside the sticky viewport */}
        <motion.div
          style={{ opacity: descOpacity, y: descY }}
          className="pointer-events-none absolute bottom-8 left-0 right-0 z-40 flex w-full flex-col px-6 sm:bottom-12 md:bottom-16 md:px-[8vw] lg:bottom-20 will-change-transform"
        >
          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-0">
            {/* Left Text */}
            <div className="flex w-full flex-col justify-start md:w-2/3 lg:w-3/5">
              <h3
                className={`max-w-[90vw] text-[18px] leading-[1.4] font-medium text-white uppercase sm:text-[22px] md:max-w-[50vw] md:text-[2.2vw] md:leading-[1.3] xl:text-[1.8vw] ${playfair.className}`}
                style={{
                  transform: 'scaleY(1.08)',
                  transformOrigin: 'left bottom',
                  textShadow: '0 10px 25px rgba(0,0,0,0.7)',
                }}
              >
                {t('architecture_split_title')}
              </h3>

              <div
                className={`mt-6 flex flex-col space-y-2 text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase md:mt-8 md:text-[11px] ${inter.className}`}
                style={{ textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}
              >
                <span className="text-[#E0D7C5]">{t('architecture_split_author')}</span>
                <span className="text-white/80">{t('architecture_split_studio')}</span>
              </div>
            </div>

            {/* Right Button */}
            <div className="pointer-events-auto flex w-full justify-start md:w-auto md:justify-end">
              <CircleButton
                text={t('book_a_call_now')}
                href="/contact"
                variant="light"
                className="h-24 w-24 border-white/60 bg-black/25 backdrop-blur-sm hover:border-white hover:bg-black/40 sm:h-32 sm:w-32 md:h-44 md:w-44 lg:h-52 lg:w-52"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
