'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { SmartVideo } from '@/components/SmartVideo';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { CircleButton } from './CircleButton';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export function ArchitectureSplit() {
  const t = useTranslations('Index');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Split image merge (0 to 0.3)
  // Left half moves from -5vw to 0vw
  const leftX = useTransform(scrollYProgress, [0, 0.3], ['-5vw', '0vw']);
  // Right half moves from 5vw to 0vw
  const rightX = useTransform(scrollYProgress, [0, 0.3], ['5vw', '0vw']);

  // Image container expands to full screen (0.3 to 0.5)
  const containerWidth = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    [isMobile ? '90vw' : '70vw', '100vw'],
  );
  const containerHeight = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    [isMobile ? '70vh' : '80vh', '100vh'],
  );

  // "ARCHITECTURE" text appears (0.5 to 0.6) AFTER the image expands
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.5, 0.7], [0.8, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.9], ['0vh', '-100vh']);

  // Foreground flowers parallax and fly-out (0.3 to 0.5)
  const leftFlowerX = useTransform(scrollYProgress, [0.3, 0.5], ['0vw', '-150vw']);
  const leftFlowerScale = useTransform(scrollYProgress, [0.3, 0.5], [1, 2.5]);

  const rightFlowerY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rightFlowerX = useTransform(scrollYProgress, [0.3, 0.5], ['0vw', '150vw']);
  const rightFlowerScale = useTransform(scrollYProgress, [0.3, 0.5], [1, 2.5]);

  return (
    <div id="concept" ref={containerRef} className="bg-textured-sand relative h-[300vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Split Image Container */}
        <motion.div
          style={{ width: containerWidth, height: containerHeight }}
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
          className="pointer-events-none absolute top-[12vh] left-1/2 z-20 flex w-full items-center justify-center px-4 will-change-transform"
        >
          <h2
            className={`w-full text-center text-[14vw] leading-none font-medium tracking-tighter whitespace-nowrap text-white uppercase md:text-[12.5vw] ${playfair.className}`}
            style={{ transform: 'scaleY(1.4)', textShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            {t('architecture')}
          </h2>
        </motion.div>

        {/* Foreground Flowers (Videos with transparency) */}
        <motion.div
          style={{
            x: leftFlowerX,
            scale: leftFlowerScale,
            rotateX: 175,
            transformPerspective: 1000,
          }}
          className="pointer-events-none absolute bottom-0 left-[-10vw] z-35 hidden w-[80vw] max-w-[700px] will-change-transform md:left-[-5vw] md:block md:w-[80vw]"
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
            rotateY: -170,
            rotateZ: -37,
            willChange: 'transform',
          }}
          className="pointer-events-none absolute top-1/4 right-[-15vw] z-35 hidden w-[70vw] max-w-[700px] will-change-transform md:right-[-5vw] md:block md:w-[60vw]"
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
      </div>

      {/* Description and Button (Scrolling overlay) */}
      <div className="pointer-events-none absolute top-0 left-0 z-40 flex w-full flex-col px-6 pt-[220vh] md:px-[10vw] md:pt-[250vh]">
        <div className="flex w-full flex-col items-end justify-between md:flex-row md:items-end">
          {/* Left Text */}
          <div className="flex w-full flex-col justify-start md:w-2/3 lg:w-1/2">
            <h3
              className={`max-w-[85vw] text-[4vw] leading-[1.5] font-medium text-white uppercase md:max-w-[50vw] md:text-[2vw] xl:text-[1.6vw] ${playfair.className}`}
              style={{
                transform: 'scaleY(1.1)',
                transformOrigin: 'left bottom',
                textShadow: '0 10px 20px rgba(0,0,0,0.4)',
              }}
            >
              {t('architecture_split_title')}
            </h3>

            <div
              className={`mt-12 flex flex-col space-y-3 text-[9px] font-bold tracking-[0.2em] text-white/90 uppercase md:mt-20 md:text-[11px] ${inter.className}`}
              style={{ textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
            >
              <span>{t('architecture_split_author')}</span>
              <span>{t('architecture_split_studio')}</span>
            </div>
          </div>

          {/* Right Button */}
          <div className="pointer-events-auto mt-12 flex w-full justify-start md:mt-0 md:w-auto md:justify-end">
            <CircleButton
              text={t('book_a_call_now')}
              href="/contact"
              variant="light"
              className="h-28 w-28 border-white/50 bg-black/10 hover:border-white hover:bg-black/20 sm:h-36 sm:w-36 md:h-48 md:w-48 lg:h-56 lg:w-56"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
