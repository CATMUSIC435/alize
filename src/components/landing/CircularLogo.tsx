'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['600'] });

export function CircularLogo() {
  const text = 'ALIZE · ALIZE · ALIZE · ALIZE · ';
  // eslint-disable-next-line unicorn/prefer-spread
  const characters = text.split('');

  const { scrollYProgress } = useScroll();
  // Rotate from 0 to 360 degrees as the user scrolls down
  const rotateScroll = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      className={`pointer-events-auto relative z-50 flex h-24 w-24 items-center justify-center md:h-32 md:w-32 ${inter.className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
      style={{ rotate: rotateScroll }}
    >
      {/* Center Star/Cross icon */}
      <div className="absolute z-10 text-lg font-light text-white md:text-xl">+</div>

      {/* Circular Text */}
      <div className="relative h-full w-full">
        {characters.map((char, i) => (
          <span
            key={i}
            className="absolute top-0 left-1/2 origin-[0_48px] text-[9px] font-bold tracking-widest text-white uppercase md:origin-[0_64px] md:text-[11px]"
            style={{
              transform: `translateX(-50%) rotate(${i * (360 / characters.length)}deg)`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
