'use client';

import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'], weight: ['500', '700'] });

type CircleButtonProps = {
  text: string;
  variant?: 'light' | 'dark';
  href?: string;
  onClick?: () => void;
  className?: string; // For sizing or positioning overrides
};

export function CircleButton({
  text,
  variant = 'light',
  href,
  onClick,
  className = '',
}: CircleButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Magnetic pull strength (0.3 means it moves 30% of the distance from center to mouse)
    setPosition({ x: (clientX - centerX) * 0.3, y: (clientY - centerY) * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const isLight = variant === 'light';

  const defaultClasses =
    'group flex items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-500 overflow-hidden relative';

  const colorClasses = isLight
    ? 'border-white/30 bg-transparent text-white'
    : 'border-[#151926]/20 bg-transparent text-[#151926]';

  // Rendering text normally allows natural wrapping based on the container width (w-[80%])
  const content = (
    <span
      className={`relative z-10 w-[80%] text-center text-[9px] leading-relaxed font-bold tracking-[0.2em] uppercase transition-transform duration-500 group-hover:scale-105 md:text-[11px] ${inter.className}`}
    >
      {text}
    </span>
  );

  const sizeClasses = `flex-shrink-0 h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-[250px] lg:w-[250px] ${className}`;

  const mergedClasses = `${defaultClasses} ${colorClasses} ${sizeClasses}`;

  const motionProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    className: mergedClasses,
    style: { cursor: 'pointer' },
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.1 },
    initial: 'rest',
    whileHover: 'hover',
  };

  const backgroundFill = (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 100 100"
      overflow="visible"
    >
      {/* Circle 1: Top-Left arc, grows to Bottom-Right */}
      <motion.circle
        cx="50"
        cy="50"
        r="49.5"
        fill="none"
        strokeWidth="1.5"
        className={isLight ? 'stroke-white' : 'stroke-[#151926]'}
        transform="rotate(-153 50 50)"
        variants={{
          rest: { pathLength: 0.1, opacity: 1 },
          hover: { pathLength: 0.5, opacity: 1 },
        }}
        transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
      />
      {/* Circle 2: Bottom-Right arc, grows to Top-Left */}
      <motion.circle
        cx="50"
        cy="50"
        r="49.5"
        fill="none"
        strokeWidth="1.5"
        className={isLight ? 'stroke-white' : 'stroke-[#151926]'}
        transform="rotate(27 50 50)"
        variants={{
          rest: { pathLength: 0.1, opacity: 1 },
          hover: { pathLength: 0.5, opacity: 1 },
        }}
        transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
      />
    </svg>
  );

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {backgroundFill}
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps}>
      {backgroundFill}
      {content}
    </motion.div>
  );
}
