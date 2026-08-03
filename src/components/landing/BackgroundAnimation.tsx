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
      className="fixed inset-0 z-0 h-[120vh] w-full bg-[#2c142c]"
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
            duration: 4,
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
      <div className="pointer-events-none absolute inset-0 z-10">
        <svg width="100%" height="100%">
          <defs>
            <mask id="bottomArchMask">
              <rect width="100%" height="100%" fill="white" />
              {/* Nested SVG moves origin to bottom-center of the screen */}
              <svg x="50%" y="100%" overflow="visible">
                <motion.g
                  initial={{ y: 700, scale: 1 }}
                  animate={{
                    y: [700, 0, 0, 0],
                    scale: [1, 1, 1, 40],
                  }}
                  transition={{
                    duration: 4,
                    times: [0, 0.3, 0.6, 1], // Slide up (30%), Pause (30%), Expand (40%)
                    ease: 'easeInOut',
                    delay: 0.2,
                  }}
                >
                  {/* The Hole: Width 350px (radius 175), Height 525px */}
                  {/* Center is at 0, Top arc center is at y=-350 */}
                  <path d="M -175 0 L -175 -350 A 175 175 0 0 1 175 -350 L 175 0 Z" fill="black" />
                </motion.g>
              </svg>
            </mask>
          </defs>

          {/* Solid Dark Burgundy Overlay */}
          <rect width="100%" height="100%" fill="#2c142c" mask="url(#bottomArchMask)" />

          {/* Decorative Borders (Animated identically to the mask) */}
          <svg x="50%" y="100%" overflow="visible">
            <motion.g
              initial={{ y: 700, scale: 1, opacity: 1 }}
              animate={{
                y: [700, 0, 0, 0],
                scale: [1, 1, 1, 40],
                opacity: [1, 1, 1, 0], // Fades out the stroke as it expands
              }}
              transition={{
                duration: 4,
                times: [0, 0.3, 0.6, 1],
                ease: 'easeInOut',
                delay: 0.2,
              }}
            >
              {/* Stroke 1 (Offset +20px -> Radius 195) */}
              <path
                d="M -195 0 L -195 -350 A 195 195 0 0 1 195 -350 L 195 0 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              {/* Stroke 2 (Offset +40px -> Radius 215) */}
              <path
                d="M -215 0 L -215 -350 A 215 215 0 0 1 215 -350 L 215 0 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </motion.g>
          </svg>
        </svg>
      </div>

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
    </motion.div>
  );
}
