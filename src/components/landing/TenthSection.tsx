'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';
import { inter, playfair } from '@/utils/Fonts';
import { CircleButton } from './CircleButton';

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

  const textY = useTransform(scrollYProgress, [0, 0.45], ['0%', '-30%']);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);

  const buttonOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.5, 0.75], [0.85, 1]);

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);

  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.65]);

  return (
    <section ref={targetRef} className="bg-textured-sand relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale: exitScale }}
          className="relative h-full w-full overflow-hidden will-change-transform origin-center"
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

          {/* Text Content (Moves up and fades out cleanly before button arrives) */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2
              className={`text-center text-[12vw] leading-[0.95] font-medium tracking-tight text-white uppercase md:text-[9vw] lg:text-[7vw] ${playfair.className}`}
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
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="pointer-events-auto mt-32 md:mt-80">
              <CircleButton text={t('view_available')} href="/apartments" variant="light" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
