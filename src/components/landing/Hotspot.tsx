'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';
import { useState } from 'react';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] });

type HotspotProps = {
  x: string;
  y: string;
  title: string;
  description: string;
};

export function Hotspot({ x, y, title, description }: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute z-40"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Interaction target (Dot or X) */}
      <div className="relative flex h-16 w-16 cursor-pointer items-center justify-center">
        <AnimatePresence>
          {isHovered ? (
            // Active 'X' State (When hovered)
            <motion.div
              key="close"
              initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pointer-events-none absolute flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F3EC] shadow-lg"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="#151926"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ) : (
            // Idle Dot State
            <motion.div
              key="dot"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pointer-events-none absolute flex h-10 w-10 items-center justify-center"
            >
              {/* Radiating rings */}
              {[0, 0.6, 1.2].map((delay, index) => (
                <motion.div
                  key={`ring-${index}`}
                  className="absolute inset-0 rounded-full border border-white/60"
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay }}
                />
              ))}

              {/* Outer thin ring (always visible) */}
              <div className="absolute inset-0 rounded-full border border-white/80 bg-white/5 backdrop-blur-[1px]"></div>

              {/* Inner solid dot */}
              <div className="relative z-10 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popup Card */}
      <AnimatePresence>
        {isHovered && (
          <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center md:absolute md:inset-auto md:top-1/2 md:left-20 md:-translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="pointer-events-auto relative flex h-auto min-h-[360px] w-[320px] cursor-default flex-col justify-between rounded-sm bg-[#F4F3EC] p-6 shadow-2xl min-[400px]:w-[340px] sm:min-h-[420px] sm:w-[380px] sm:p-10 md:w-[400px]"
            >
              {/* Inner Decorative Chamfered Border */}
              <div
                className="pointer-events-none absolute inset-2 bg-[#B0B2A6] sm:inset-3"
                style={{
                  clipPath:
                    'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
                }}
              >
                <div
                  className="absolute inset-[1px] bg-[#F4F3EC]"
                  style={{
                    clipPath:
                      'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)',
                  }}
                ></div>
              </div>

              {/* Title */}
              <h2
                className={`relative z-10 text-xl leading-snug tracking-tight text-[#151926] uppercase sm:text-4xl sm:leading-tight ${playfair.className}`}
              >
                {title}
              </h2>

              {/* Description */}
              <p
                className={`relative z-10 mt-4 text-xs leading-[1.6] font-light text-[#2D3346] sm:mt-6 sm:text-[13px] ${inter.className}`}
              >
                {description}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
