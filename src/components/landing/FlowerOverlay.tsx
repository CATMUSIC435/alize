'use client';

import { motion } from 'framer-motion';

export function FlowerOverlay() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 opacity-80 mix-blend-multiply"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
    >
      {/* 01: Top-Left corner (Concept Section) */}
      <video
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-[1%] left-[1%] w-[50vw] max-w-[600px] -translate-x-[15%] -translate-y-[15%] object-contain"
        src="/bougainvillea-flowers_01.webm"
      />

      {/* 02: Middle Right (Between Image and Timeline) */}
      <video
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-[16%] lg:top-[8%] right-0 w-[50vw] md:w-[60vw] max-w-[750px] translate-x-[20%] rotate-90 object-contain"
        src="/bougainvillea-flowers_02.webm"
      />

      <video
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-[16%] lg:top-[8%] left-[-8%] lg:hidden w-[50vw] md:w-[60vw] max-w-[750px] translate-x-[20%] rotate-90 rotate-x-[-180deg] object-contain"
        src="/bougainvillea-flowers_02.webm"
      />

      <video
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-[52%] lg:top-[45%] left-[-9%] w-[50vw] rotate-z-[-40deg] max-w-[750px] object-contain"
        src="/bougainvillea-flowers_03.webm"
      />

      {/* 04: Bottom Left (Timeline end) */}
      <video
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        className="absolute bottom-[2%] left-0 w-[50vw] max-w-[700px] -scale-y-100 rotate-180 rotate-y-[-180deg] rotate-z-[-25deg] -translate-x-[20%] object-contain"
        src="/bougainvillea-flowers_03.webm"
      />
    </motion.div>
  );
}
