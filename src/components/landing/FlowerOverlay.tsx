'use client';

import { motion } from 'framer-motion';

export function FlowerOverlay() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
    >
      {/* 01: Screen 1 Top-Left corner */}
      <video
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-20 left-20 w-[50vw] max-w-[600px] -translate-x-[15%] -translate-y-[15%] object-contain mix-blend-multiply"
        src="/bougainvillea-flowers_01.webm"
      />

      {/* 02: Screen 1 to 2 transition, Top */}
      <video
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute -bottom-55 left-[65vw] w-[50vw] max-w-[750px] -translate-y-[20%] rotate-90 object-contain mix-blend-multiply"
        src="/bougainvillea-flowers_02.webm"
      />

      {/* 06: Screen 4 end, Top Right */}
      <video
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-[370vw] w-[50vw] max-w-[600px] -scale-y-100 rotate-180 object-contain mix-blend-multiply"
        src="/bougainvillea-flowers_03.webm"
      />
    </motion.div>
  );
}
