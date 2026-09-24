'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from '@/libs/I18nNavigation';
import { inter } from '@/utils/Fonts';

export function CircleButton(props: {
  text: string;
  variant?: 'light' | 'dark';
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
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

  const isLight = props.variant === 'light';

  const defaultClasses =
    'group flex items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-500 overflow-hidden relative';

  const colorClasses = isLight
    ? 'border-white/30 bg-transparent text-white group-hover:border-white/60'
    : 'border-[#151926]/20 bg-transparent text-[#151926] group-hover:border-[#151926]/40';

  // Subtle glowing text outline and halo on hover
  const textHoverStyle = isLight
    ? '[-webkit-text-stroke:0px_transparent] [paint-order:stroke_fill] group-hover:[-webkit-text-stroke:0.5px_rgba(255,255,255,0.85)] group-hover:[text-shadow:0_0_12px_rgba(255,255,255,0.9),0_0_4px_rgba(255,255,255,0.9)]'
    : '[-webkit-text-stroke:0px_transparent] [paint-order:stroke_fill] group-hover:[-webkit-text-stroke:0.75px_rgba(255,255,255,0.85)] group-hover:[text-shadow:0_0_10px_rgba(255,255,255,0.85),0_0_2px_rgba(255,255,255,0.95),-1px_-1px_0_rgba(255,255,255,0.65),1px_-1px_0_rgba(255,255,255,0.65),-1px_1px_0_rgba(255,255,255,0.65),1px_1px_0_rgba(255,255,255,0.65)]';

  // Rendering text normally allows natural wrapping based on the container width (w-[80%])
  const content = (
    <span
      className={`relative z-10 w-[80%] text-center text-[9px] leading-relaxed font-bold tracking-[0.2em] uppercase transition-all duration-500 group-hover:scale-105 md:text-[11px] ${textHoverStyle} ${inter.className}`}
    >
      {props.text}
    </span>
  );

  const sizeClasses = `flex-shrink-0 h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-[250px] lg:w-[250px] ${props.className ?? ''}`;

  const mergedClasses = `${defaultClasses} ${colorClasses} ${sizeClasses}`;

  const motionProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: props.onClick,
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

  if (props.href) {
    if (props.href.startsWith('http') || props.href.startsWith('//')) {
      return (
        <motion.a href={props.href} target="_blank" rel="noopener noreferrer" {...motionProps}>
          {backgroundFill}
          {content}
        </motion.a>
      );
    }

    return (
      <Link href={props.href} prefetch={false} className="contents">
        <motion.div {...motionProps}>
          {backgroundFill}
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div {...motionProps}>
      {backgroundFill}
      {content}
    </motion.div>
  );
}
