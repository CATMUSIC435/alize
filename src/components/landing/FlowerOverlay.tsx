'use client';

import { motion } from 'framer-motion';
import { SmartVideo } from '@/components/SmartVideo';

export function FlowerOverlay() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 opacity-80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
    >
      {/* 01: Top-Left corner (Concept Section) */}
      <SmartVideo
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="safari-video-hide absolute top-[1%] left-[1%] w-[50vw] max-w-[600px] -translate-x-[15%] -translate-y-[15%] object-contain"
        src="/bougainvillea-flowers_01.webm"
      />

      {/* 02: Middle Right (Between Image and Timeline) */}
      <SmartVideo
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="safari-video-hide absolute top-[16%] right-0 w-[50vw] max-w-[750px] translate-x-[20%] rotate-90 object-contain md:w-[60vw] lg:top-[8%]"
        src="/bougainvillea-flowers_02.webm"
      />

      <SmartVideo
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="safari-video-hide absolute top-[16%] left-[-8%] w-[50vw] max-w-[750px] translate-x-[20%] rotate-90 rotate-x-[-180deg] object-contain md:w-[60vw] lg:top-[8%] lg:hidden"
        src="/bougainvillea-flowers_02.webm"
      />

      <SmartVideo
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="safari-video-hide absolute top-[52%] left-[-9%] w-[50vw] max-w-[750px] rotate-z-[-40deg] object-contain lg:top-[45%]"
        src="/bougainvillea-flowers_03.webm"
      />

      {/* 04: Bottom Left (Timeline end) */}
      <SmartVideo
        aria-label="Bougainvillea flowers background"
        autoPlay
        loop
        muted
        playsInline
        className="safari-video-hide absolute bottom-[2%] left-0 w-[50vw] max-w-[700px] -translate-x-[20%] -scale-y-100 rotate-180 rotate-y-[-180deg] rotate-z-[-25deg] object-contain"
        src="/bougainvillea-flowers_03.webm"
      />
    </motion.div>
  );
}
