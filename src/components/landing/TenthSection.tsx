'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';
import Image from 'next/image';
import { useRef } from 'react';
import { CircleButton } from './CircleButton';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export function TenthSection() {
  const t = useTranslations('Index');
  const targetRef = useRef<HTMLDivElement>(null);

  // 200vh container gives enough room to scroll and animate
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Exit animation when scrolling past the section
  const { scrollYProgress: exitProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });

  // Animations based on scroll position

  const textY = useTransform(scrollYProgress, [0, 0.4], ['0%', '-30%']);

  const buttonOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1]);

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);

  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.65]);
  const exitBorderRadius = useTransform(exitProgress, [0, 1], ['0px', '56px']);

  return (
    <section ref={targetRef} className="relative h-[200vh] w-full bg-[#2A141D]">
      <motion.div
        style={{ scale: exitScale, borderRadius: exitBorderRadius }}
        className="sticky top-0 h-screen w-full overflow-hidden will-change-transform"
      >
        {/* Background Image */}
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920"
            alt="Perfect Sea Views"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Subtle overlay to make text more readable */}
          <div className="absolute inset-0 bg-black/15" />
        </motion.div>

        {/* Text Content (Moves up without fading) */}
        <motion.div
          style={{ y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
        >
          <h2
            className={`text-center text-[12vw] leading-[0.85] font-medium tracking-tight text-white uppercase md:text-[9vw] lg:text-[7vw] ${playfair.className}`}
            style={{ transform: 'scaleY(1.2)', textShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          >
            {t('perfect_sea_views')
              .split('\n')
              .map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
          </h2>
          <p
            className={`mt-10 text-[8px] font-bold tracking-[0.4em] text-white uppercase md:mt-12 md:text-[10px] md:tracking-[0.5em] ${inter.className}`}
            style={{ textShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
          >
            {t('from_rooftop_terraces')}
          </p>
        </motion.div>

        {/* Button Content (Second half of scroll) */}
        <motion.div
          style={{ opacity: buttonOpacity, scale: buttonScale }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
        >
          <div className="pointer-events-auto mt-32 md:mt-80">
            <CircleButton text={t('view_available')} variant="light" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
