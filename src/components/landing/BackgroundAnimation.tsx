'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export function BackgroundAnimation() {
  const { scrollY } = useScroll();
  // As the user scrolls down, move the background up slightly for parallax
  const y = useTransform(scrollY, [0, 1000], ['0%', '-15%']);
  // Zoom in the background image as the user scrolls down (increased for stronger effect)
  const scaleOnScroll = useTransform(scrollY, [0, 1000], [1, 1.4]);

  return (
    <motion.div
      className="fixed inset-0 z-0 h-[120vh] w-full bg-[#0D2D40]"
      style={{
        y,
        willChange: 'transform',
      }}
    >
      {/* 1. Background Image Container (Zooms out on load) */}
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 h-full w-full"
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.2,
          }}
        >
          {/* Zoom in on scroll */}
          <motion.div
            className="absolute inset-0 h-full w-full"
            style={{ scale: scaleOnScroll, willChange: 'transform' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=70&w=1920"
              alt="Mediterranean Villa"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 md:from-black/40 md:to-black/20"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. The Arch Mask Overlay (Nested SVGs for bottom-center origin) */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-10"
        style={{ willChange: 'opacity' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 1, 0] }}
        transition={{
          duration: 5,
          times: [0, 0.25, 0.75, 1],
          ease: ['easeOut', 'linear', [0.45, 0, 0.15, 1]],
          delay: 0.2,
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="loadingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#143A52" />
              <stop offset="50%" stopColor="#0D2D40" />
              <stop offset="100%" stopColor="#061824" />
            </linearGradient>

            <mask id="bottomArchMask">
              <rect width="100%" height="100%" fill="white" />
              {/* Nested SVG moves origin to bottom-center of the screen */}
              <svg
                x="50%"
                y="100%"
                overflow="visible"
              >
                <g className="scale-[0.65] sm:scale-[0.8] md:scale-100" style={{ transformOrigin: '0px 0px' }}>
                  <motion.g
                    style={{ willChange: 'transform', transformOrigin: '0px 0px' }}
                    initial={{ y: 700, scale: 1 }}
                    animate={{
                      y: [700, 0, 0, 0],
                      scale: [1, 1, 1, 16],
                    }}
                    transition={{
                      duration: 5,
                      times: [0, 0.25, 0.45, 1], // Slide up (1.25s), Pause (1s), Expand outward (2.75s)
                      ease: ['easeOut', 'linear', [0.22, 1, 0.36, 1]], // Smooth cinematic expansion
                      delay: 0.2,
                    }}
                  >
                    {/* The Hole: Width 350px (radius 175), Height 525px */}
                    {/* Center is at 0, Top arc center is at y=-350 */}
                    <path d="M -175 0 L -175 -350 A 175 175 0 0 1 175 -350 L 175 0 Z" fill="black" />
                  </motion.g>
                </g>
              </svg>
            </mask>
          </defs>

          {/* Solid Dark Overlay using linear gradient */}
          <rect width="100%" height="100%" fill="url(#loadingGrad)" mask="url(#bottomArchMask)" />

          {/* Decorative Borders (Radiate / expand outward with the arch opening) */}
          <svg
            x="50%"
            y="100%"
            overflow="visible"
          >
            <g className="scale-[0.65] sm:scale-[0.8] md:scale-100" style={{ transformOrigin: '0px 0px' }}>
              <motion.g
                style={{ willChange: 'transform, opacity', transformOrigin: '0px 0px' }}
                initial={{ y: 700, scale: 1, opacity: 1 }}
                animate={{
                  y: [700, 0, 0, 0],
                  scale: [1, 1, 1, 8],
                  opacity: [1, 1, 1, 0],
                }}
                transition={{
                  duration: 5,
                  times: [0, 0.25, 0.45, 1],
                  ease: ['easeOut', 'linear', [0.22, 1, 0.36, 1]],
                  delay: 0.2,
                }}
              >
                {/* Stroke 1 (Offset +12px -> Radius 187) */}
                <path
                  d="M -187 0 L -187 -350 A 187 187 0 0 1 187 -350 L 187 0 Z"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Stroke 2 (Offset +28px -> Radius 203) */}
                <path
                  d="M -203 0 L -203 -350 A 203 203 0 0 1 203 -350 L 203 0 Z"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Stroke 3 (Offset +48px -> Radius 223) */}
                <path
                  d="M -223 0 L -223 -350 A 223 223 0 0 1 223 -350 L 223 0 Z"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Stroke 4 (Offset +72px -> Radius 247) */}
                <path
                  d="M -247 0 L -247 -350 A 247 247 0 0 1 247 -350 L 247 0 Z"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Stroke 5 (Offset +100px -> Radius 275) */}
                <path
                  d="M -275 0 L -275 -350 A 275 275 0 0 1 275 -350 L 275 0 Z"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </motion.g>
            </g>
          </svg>
        </svg>
      </motion.div>

      {/* 3. Static Decorative Outer Frame (Chamfered Corners) - Only during load */}
      <motion.div
        className="pointer-events-none absolute inset-4 z-20 md:inset-8"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0], // Fades in quickly, stays, then fades out as arch expands
        }}
        transition={{
          duration: 4,
          times: [0, 0.1, 0.6, 1],
          ease: 'easeInOut',
          delay: 0.2,
        }}
      >
        {/* Top edge */}
        <div className="absolute top-0 right-[24px] left-[24px] h-[1px] bg-white/15" />
        {/* Bottom edge */}
        <div className="absolute right-[24px] bottom-0 left-[24px] h-[1px] bg-white/15" />
        {/* Left edge */}
        <div className="absolute top-[24px] bottom-[24px] left-0 w-[1px] bg-white/15" />
        {/* Right edge */}
        <div className="absolute top-[24px] right-0 bottom-[24px] w-[1px] bg-white/15" />

        {/* Top Left Chamfer */}
        <svg width="24" height="24" className="absolute top-0 left-0" overflow="visible">
          <line x1="0" y1="24" x2="24" y2="0" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
        </svg>
        {/* Top Right Chamfer */}
        <svg width="24" height="24" className="absolute top-0 right-0" overflow="visible">
          <line x1="0" y1="0" x2="24" y2="24" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
        </svg>
        {/* Bottom Right Chamfer */}
        <svg width="24" height="24" className="absolute right-0 bottom-0" overflow="visible">
          <line x1="0" y1="24" x2="24" y2="0" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
        </svg>
        {/* Bottom Left Chamfer */}
        <svg width="24" height="24" className="absolute bottom-0 left-0" overflow="visible">
          <line x1="0" y1="0" x2="24" y2="24" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
        </svg>
      </motion.div>
 
      {/* 4. Opening Intro Logos (ATG on left, Alizé project in center, DXMD on right) */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[12vh] z-30 px-6 sm:top-[15vh] sm:px-10 md:top-[18vh] md:px-16 lg:top-[20vh] lg:px-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [20, 0, 0, -10],
        }}
        transition={{
          duration: 3.2,
          times: [0, 0.25, 0.75, 1],
          ease: ['easeOut', 'linear', [0.45, 0, 0.15, 1]],
          delay: 0.3,
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          {/* Left: ATG Group Logo */}
          <div className="flex w-1/3 items-center justify-start">
            <Image
              src="/atg-logo.svg"
              alt="ATG Group"
              width={260}
              height={170}
              priority
              unoptimized
              className="h-11 w-auto object-contain drop-shadow-md sm:h-14 md:h-18 lg:h-22 xl:h-26"
            />
          </div>

          {/* Center: Alizé Project Logo */}
          <div className="flex w-1/3 items-center justify-center">
            <Image
              src="/logo-alize.png"
              alt="Alizé Hotel & Residences Da Nang"
              width={280}
              height={345}
              priority
              className="h-20 w-auto object-contain brightness-0 invert drop-shadow-[0_6px_20px_rgba(255,255,255,0.3)] sm:h-28 md:h-36 lg:h-44 xl:h-48"
            />
          </div>

          {/* Right: DXMD Logo */}
          <div className="flex w-1/3 items-center justify-end">
            <Image
              src="/dxmd-logo.svg"
              alt="DXMD Vietnam"
              width={260}
              height={115}
              priority
              unoptimized
              className="h-9 w-auto object-contain drop-shadow-md sm:h-12 md:h-15 lg:h-18 xl:h-22"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
